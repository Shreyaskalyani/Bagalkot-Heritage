"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Compass,
  Move,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Layers,
  MapPin,
  HelpCircle,
  Eye,
} from "lucide-react";
import PanoramaControls from "./PanoramaControls";
import PanoramaHotspots from "./PanoramaHotspots";
import PanoramaFullscreen from "./PanoramaFullscreen";

const VERTEX_SHADER_SRC = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SRC = `
  precision mediump float;
  varying vec2 v_uv;
  uniform sampler2D u_image;
  uniform float u_yaw;
  uniform float u_pitch;
  uniform float u_fov;
  uniform float u_aspect;

  #define PI 3.141592653589793

  void main() {
    vec2 screen = (v_uv - 0.5) * 2.0;
    screen.x *= u_aspect;

    float halfFov = u_fov * 0.5;
    vec3 ray = normalize(vec3(screen.x * tan(halfFov), screen.y * tan(halfFov), 1.0));

    // Pitch rotation (X-axis)
    float cosP = cos(u_pitch);
    float sinP = sin(u_pitch);
    vec3 rayP = vec3(
      ray.x,
      ray.y * cosP + ray.z * sinP,
      -ray.y * sinP + ray.z * cosP
    );

    // Yaw rotation (Y-axis)
    float cosY = cos(u_yaw);
    float sinY = sin(u_yaw);
    vec3 rayFinal = vec3(
      rayP.x * cosY + rayP.z * sinY,
      rayP.y,
      -rayP.x * sinY + rayP.z * cosY
    );

    // Equirectangular mapping with safe fract wrap
    float phi = atan(rayFinal.x, rayFinal.z);
    float theta = asin(clamp(rayFinal.y, -0.9999, 0.9999));

    float u = fract((phi / (2.0 * PI)) + 0.5);
    float v = clamp(0.5 - (theta / PI), 0.002, 0.998);

    gl_FragColor = texture2D(u_image, vec2(u, v));
  }
`;

export default function Heritage360Viewer({ viewpoint, className = "" }) {
  const [yaw, setYaw] = useState(viewpoint?.defaultHeading || 180);
  const [pitch, setPitch] = useState(viewpoint?.defaultPitch || 5);
  const [fov, setFov] = useState(viewpoint?.defaultFov || 75);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState("spherical"); // "spherical" | "streetview"
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [aspect, setAspect] = useState(1.77);
  const [isLoading, setIsLoading] = useState(true);
  const [hasWebGl, setHasWebGl] = useState(true);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const textureRef = useRef(null);
  const uniformsRef = useRef({});
  const animationFrameRef = useRef(null);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const isPointerDownRef = useRef(false);

  // Reset yaw/pitch/fov when viewpoint changes
  useEffect(() => {
    if (viewpoint) {
      setYaw(viewpoint.defaultHeading || 180);
      setPitch(viewpoint.defaultPitch || 5);
      setFov(viewpoint.defaultFov || 75);
      setActiveHotspot(null);
    }
  }, [viewpoint?.id]);

  // Keep aspect ratio updated
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        if (clientHeight > 0) {
          setAspect(clientWidth / clientHeight);
        }
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // WebGL Initialization & Texture loading
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl = canvas.getContext("webgl", { preserveDrawingBuffer: false, antialias: true });
    if (!gl) {
      gl = canvas.getContext("experimental-webgl");
    }

    if (!gl) {
      setHasWebGl(false);
      setIsLoading(false);
      return;
    }

    setHasWebGl(true);
    glRef.current = gl;

    // Helper: Compile shader
    const compileShader = (source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = compileShader(VERTEX_SHADER_SRC, gl.VERTEX_SHADER);
    const fragShader = compileShader(FRAGMENT_SHADER_SRC, gl.FRAGMENT_SHADER);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);
    programRef.current = program;

    // Set up full screen quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    uniformsRef.current = {
      image: gl.getUniformLocation(program, "u_image"),
      yaw: gl.getUniformLocation(program, "u_yaw"),
      pitch: gl.getUniformLocation(program, "u_pitch"),
      fov: gl.getUniformLocation(program, "u_fov"),
      aspect: gl.getUniformLocation(program, "u_aspect"),
    };

    // Load texture image
    setIsLoading(true);
    const img = new Image();
    if (viewpoint?.panoramaUrl && viewpoint.panoramaUrl.startsWith("http")) {
      img.crossOrigin = "anonymous";
    }
    img.src = viewpoint?.panoramaUrl || "/images/badami-panorama-8k.jpg";

    img.onload = () => {
      try {
        const gl = glRef.current;
        if (!gl) return;

        // Create standard power-of-two texture canvas (2048 x 1024)
        // Works on 100% of mobile and desktop GPUs without exceeding MAX_TEXTURE_SIZE
        const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 4096;
        const targetW = Math.min(maxTextureSize, 2048);
        const targetH = Math.floor(targetW / 2);

        const offscreen = document.createElement("canvas");
        offscreen.width = targetW;
        offscreen.height = targetH;
        const octx = offscreen.getContext("2d");
        if (octx) {
          octx.drawImage(img, 0, 0, targetW, targetH);
        }

        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          octx ? offscreen : img
        );

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        textureRef.current = texture;
        setHasWebGl(true);
      } catch (err) {
        console.warn("WebGL texture init error, falling back to 2D:", err);
        setHasWebGl(false);
      } finally {
        setIsLoading(false);
      }
    };

    img.onerror = () => {
      console.warn("Panorama image load error:", img.src);
      if (viewpoint?.fallbackImage && img.src !== viewpoint.fallbackImage) {
        img.src = viewpoint.fallbackImage;
      } else {
        setIsLoading(false);
        setHasWebGl(false);
      }
    };

    return () => {
      if (textureRef.current) gl.deleteTexture(textureRef.current);
      if (programRef.current) gl.deleteProgram(programRef.current);
    };
  }, [viewpoint?.id, viewpoint?.panoramaUrl, viewpoint?.fallbackImage]);

  // Continuous Render Loop with Inertia
  useEffect(() => {
    const render = () => {
      const gl = glRef.current;
      const program = programRef.current;
      const canvas = canvasRef.current;

      // Handle inertia momentum when not actively dragging
      if (!isPointerDownRef.current) {
        if (Math.abs(velocityRef.current.x) > 0.01 || Math.abs(velocityRef.current.y) > 0.01) {
          setYaw((prev) => (prev + velocityRef.current.x + 360) % 360);
          setPitch((prev) => Math.max(-50, Math.min(50, prev + velocityRef.current.y)));
          velocityRef.current.x *= 0.92;
          velocityRef.current.y *= 0.92;
        }
      }

      if (gl && program && canvas && textureRef.current) {
        // Adjust canvas internal dimensions to match display size
        const dpr = window.devicePixelRatio || 1;
        const width = Math.floor(canvas.clientWidth * dpr);
        const height = Math.floor(canvas.clientHeight * dpr);

        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          gl.viewport(0, 0, width, height);
        }

        gl.useProgram(program);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
        gl.uniform1i(uniformsRef.current.image, 0);

        // Convert angles to radians
        const yawRad = (yaw * Math.PI) / 180;
        const pitchRad = (pitch * Math.PI) / 180;
        const fovRad = (fov * Math.PI) / 180;
        const currentAspect = canvas.clientWidth / (canvas.clientHeight || 1);

        gl.uniform1f(uniformsRef.current.yaw, yawRad);
        gl.uniform1f(uniformsRef.current.pitch, pitchRad);
        gl.uniform1f(uniformsRef.current.fov, fovRad);
        gl.uniform1f(uniformsRef.current.aspect, currentAspect);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [yaw, pitch, fov]);

  // Pointer Interaction Handlers
  const handlePointerDown = (e) => {
    isPointerDownRef.current = true;
    isDraggingRef.current = true;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    lastMousePosRef.current = { x: clientX, y: clientY };
    velocityRef.current = { x: 0, y: 0 };
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

    const deltaX = clientX - lastMousePosRef.current.x;
    const deltaY = clientY - lastMousePosRef.current.y;

    lastMousePosRef.current = { x: clientX, y: clientY };

    // Degrees per pixel movement proportional to FOV
    const speed = (fov / 75) * 0.18;
    const yawDelta = -deltaX * speed;
    const pitchDelta = deltaY * speed;

    velocityRef.current = { x: yawDelta, y: pitchDelta };

    setYaw((prev) => (prev + yawDelta + 360) % 360);
    setPitch((prev) => Math.max(-50, Math.min(50, prev + pitchDelta)));
  };

  const handlePointerUp = () => {
    isPointerDownRef.current = false;
    isDraggingRef.current = false;
  };

  // Wheel zoom handler
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomDelta = e.deltaY > 0 ? 3 : -3;
    setFov((prev) => Math.max(40, Math.min(95, prev + zoomDelta)));
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      setYaw((prev) => (prev - 4 + 360) % 360);
    } else if (e.key === "ArrowRight") {
      setYaw((prev) => (prev + 4 + 360) % 360);
    } else if (e.key === "ArrowUp") {
      setPitch((prev) => Math.min(50, prev + 3));
    } else if (e.key === "ArrowDown") {
      setPitch((prev) => Math.max(-50, prev - 3));
    } else if (e.key === "+" || e.key === "=") {
      setFov((prev) => Math.max(40, prev - 5));
    } else if (e.key === "-" || e.key === "_") {
      setFov((prev) => Math.min(95, prev + 5));
    } else if (e.key.toLowerCase() === "r") {
      setYaw(viewpoint?.defaultHeading || 180);
      setPitch(viewpoint?.defaultPitch || 5);
      setFov(viewpoint?.defaultFov || 75);
    } else if (e.key.toLowerCase() === "f") {
      setIsFullscreen((prev) => !prev);
    }
  };

  const viewerContent = (
    <div
      ref={containerRef}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className={`relative w-full h-full overflow-hidden select-none outline-none focus:ring-1 focus:ring-gold-500/50 cursor-grab active:cursor-grabbing bg-charcoal-950 ${className}`}
    >
      {/* View Mode 1: Spherical Canvas */}
      {viewMode === "spherical" && (
        <>
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
          />

          {/* Fallback for non-WebGL */}
          {!hasWebGl && (
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-150"
              style={{
                backgroundImage: `url(${viewpoint?.fallbackImage || viewpoint?.panoramaUrl})`,
                backgroundPosition: `${((yaw % 360) / 360) * 100}% center`,
              }}
            />
          )}

          {/* Interactive Projected Hotspots */}
          <PanoramaHotspots
            hotspots={viewpoint?.hotspots || []}
            currentYaw={yaw}
            currentPitch={pitch}
            fov={fov}
            aspect={aspect}
            activeHotspot={activeHotspot}
            onSelectHotspot={(spot) => setActiveHotspot(spot)}
            onCloseHotspot={() => setActiveHotspot(null)}
            monumentSlug={viewpoint?.slug}
          />
        </>
      )}

      {/* View Mode 2: Google Maps 3D Satellite & Photosphere View */}
      {viewMode === "streetview" && (
        <div className="absolute inset-0 w-full h-full bg-charcoal-950">
          <iframe
            src={viewpoint?.googleStreetViewUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allow="accelerometer; gyroscope; magnetometer; vr; xr-spatial-tracking; fullscreen"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${viewpoint?.title} Google 3D Satellite Map`}
            className="w-full h-full"
            onLoad={() => setIsLoading(false)}
          />

          {/* External Maps Link Banner */}
          <div className="absolute top-4 right-4 z-20">
            <a
              href={viewpoint?.externalMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-gold-500/40 bg-charcoal-950/85 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gold-400 hover:bg-gold-500 hover:text-charcoal-950 transition-all backdrop-blur-md shadow-lg"
            >
              <span>Open in Google Maps App (360° Photospheres)</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      )}

      {/* Subtle Atmospheric Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-charcoal-950/40 pointer-events-none" />

      {/* Top HUD: Status Bar */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2 pointer-events-none">
        <span className="flex items-center gap-1.5 rounded-full border border-gold-500/35 bg-charcoal-950/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-400 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
          {viewMode === "spherical" ? "360° Interactive Canvas" : "Google 3D Satellite Map"}
        </span>

        <span className="hidden sm:inline-flex rounded-full border border-stone-800 bg-charcoal-950/80 px-2.5 py-1 text-[10px] font-mono text-stone-300 backdrop-blur-md">
          FOV: {Math.round(fov)}° · Elev: {Math.round(pitch)}°
        </span>
      </div>

      {/* Bottom Floating Control Bar */}
      <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-between pointer-events-auto">
        {/* Help Tip */}
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-stone-800 bg-charcoal-950/80 px-3.5 py-1 text-xs text-stone-400 backdrop-blur-md">
          <Move size={13} className="text-gold-400" />
          <span>
            {viewMode === "spherical"
              ? "Click & drag or swipe to look around in 360°"
              : "Explore aerial satellite view of monument footprint"}
          </span>
        </div>

        {/* Action Controls */}
        <div className="ml-auto">
          <PanoramaControls
            yaw={yaw}
            fov={fov}
            onZoomIn={() => setFov((prev) => Math.max(40, prev - 5))}
            onZoomOut={() => setFov((prev) => Math.min(95, prev + 5))}
            onReset={() => {
              setYaw(viewpoint?.defaultHeading || 180);
              setPitch(viewpoint?.defaultPitch || 5);
              setFov(viewpoint?.defaultFov || 75);
            }}
            isFullscreen={isFullscreen}
            onToggleFullscreen={() => setIsFullscreen((prev) => !prev)}
            viewMode={viewMode}
            onToggleViewMode={(mode) => setViewMode(mode)}
            hasStreetView={Boolean(viewpoint?.googleStreetViewUrl)}
          />
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && viewMode === "spherical" && (
        <div className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm grid place-items-center z-30">
          <div className="flex flex-col items-center gap-3">
            <Compass size={28} className="animate-spin text-gold-500" />
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-gold-400">
              Loading High-Definition 8K Vista…
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Standard Embedded View */}
      <div className="relative w-full h-[450px] md:h-[620px] rounded-3xl overflow-hidden border border-gold-500/25 shadow-2xl">
        {viewerContent}
      </div>

      {/* Dedicated Fullscreen Overlay */}
      <PanoramaFullscreen
        isFullscreen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        title={viewpoint?.title}
      >
        {viewerContent}
      </PanoramaFullscreen>
    </>
  );
}
