// Demo monument dataset for Bagalkot Heritage AI.
// Historical information is based on widely published descriptions of these
// well-documented Chalukyan monuments. Photographs are sourced from Karnataka
// Tourism, the Bagalkote District portal and Wikimedia Commons.

export const monuments = [
  {
    id: 1,
    slug: "badami-cave-temples",
    name: "Badami Cave Temples",
    localName: "ವಾತಾಪಿ ಗುಹಾಲಯಗಳು",
    district: "Bagalkot",
    location: "Badami",
    latitude: 15.9166,
    longitude: 75.6878,
    category: "Caves",
    period: "6th–8th century CE",
    dynasty: "Early Chalukyas of Badami",
    shortDescription:
      "Four rock-cut cave temples carved into the sandstone cliffs above Agastya Lake, spanning Hindu and Jain traditions.",
    history:
      "The caves were carved under the Early Chalukya dynasty, which ruled from Vatapi (modern Badami) between the 6th and 8th centuries CE. The hillside above Agastya Lake was chosen for its soft red sandstone, ideal for fine carving. The site witnessed the rise and fall of empires — including later Chalukya, Hoysala and Vijayanagara influence — and remains one of the earliest grand rock-cut temple complexes of South India. An inscription in Cave 3 records its dedication by the Chalukya king Mangalesha.",
    architecture:
      "Each cave follows a similar plan: a columned veranda (mukha-mandapa) supported by robust square pillars, leading into a pillared hall, and finally an inner shrine cut into the rock. Cave 3, the largest and most elaborately decorated, is dedicated to Vishnu and carries a rich sculptural programme including a celebrated four-armed Vishnu seated on the serpent Adisesha. Cave 1 is devoted to Shiva, featuring a large Nataraja panel, while Cave 4 contains Jain Tirthankara images — making the complex a remarkable record of multiple faiths sharing one cliff.",
    significance:
      "The caves mark a pivotal moment in Indian temple architecture: the transition from wooden construction traditions to monumental stone. The carved pillars preserve the form of earlier timber architecture in stone, and the sculptural panels are among the finest early medieval work in the Deccan. The site is protected by the Archaeological Survey of India and is part of the UNESCO-listed 'Group of Monuments at Pattadakal' extended heritage landscape of the Malaprabha valley.",
    visitingInformation: {
      hours: "6:00 AM – 6:00 PM, daily; the on-site archaeological museum is closed on Fridays",
      entry: "₹40 for Indian visitors, ₹600 for foreign visitors — Badami Fort is included in the ticket",
      bestTime: "October – February, early morning or late afternoon light",
      tips: "The caves are reached by stairs cut into the cliff — wear comfortable shoes and carry water. Allow 2–3 hours. Combine with Agastya Lake and the Bhutanatha temples on the far shore.",
    },
    images: [
      {
        url: "/images/upper-shivalaya-6k.jpg",
        alt: "Upper Shivalaya Dravidian temple standing atop Badami northern sandstone cliff with stone reflection tank (6K UHD)",
        credit: "Wikimedia Commons · 6K Ultra-HD",
      },
      {
        url: "/images/badami-evening-4k.jpg",
        alt: "Golden hour sunset over Agastya Lake, Bhutanatha Temple, and sandstone canyon (4K UHD)",
        credit: "Wikimedia Commons · 4K UHD",
      },
      {
        url: "/images/badami-caves-4k.jpg",
        alt: "Panoramic view of Badami sandstone cliffs and rock-cut cave temples (5.7K UHD)",
        credit: "Wikimedia Commons · 5.7K UHD",
      },
      {
        url: "/images/malegitti-4k.jpg",
        alt: "7th-century Malegitti Shivalaya temple atop rocky spur in Badami (6K UHD)",
        credit: "Wikimedia Commons · 6K UHD",
      },
      {
        url: "/images/badami-caves.jpg",
        alt: "The rock-cut cave temples carved into the red sandstone cliffs above Agastya Lake, Badami",
        credit: "Karnataka Tourism",
      },
      {
        url: "/images/badami-caves-alt.jpg",
        alt: "Complete view of the Badami cave temples",
        credit: "Bagalkote District Tourism",
      },
    ],
    detectedFeatures: [
      "Rock-cut architecture",
      "Pillared hall (mandapa)",
      "Sculptural panels",
      "Cave temple entrance",
    ],
    nearbyPlaces: ["bhutanatha-temples", "agastya-lake-promenade", "banashankari-temple", "mahakuta-temples"],
  },
  {
    id: 2,
    slug: "bhutanatha-temples",
    name: "Bhutanatha Temples",
    localName: "ಭೂತನಾಥ ದೇವಾಲಯ",
    district: "Bagalkot",
    location: "Badami",
    latitude: 15.9184,
    longitude: 75.6931,
    category: "Temples",
    period: "7th–11th century CE (built in phases)",
    dynasty: "Early Chalukyas and later Kalyani Chalukyas",
    shortDescription:
      "A serene group of sandstone shrines standing at the edge of Agastya Lake, framed by the Badami cliffs.",
    history:
      "The Bhutanatha group grew in two phases: the earlier shrines on the lake's eastern edge date to the 7th century Badami Chalukyas, while the larger structures to the north-east belong to the 11th century Kalyani (Western) Chalukya period. Dedicated to Bhutanatha, a form of Shiva, the temples have long been tied to the ritual life of the lake and town.",
    architecture:
      "The temples are built of local sandstone and rise directly from the water's edge. The main shrine has a plain exterior with a stepped pyramidal superstructure (shikhara) typical of the Dravida (South Indian) order as interpreted by the Chalukyas, while later Kalyani Chalukya additions bring more ornate mouldings and pilasters.",
    significance:
      "The setting is among the most photographed in the district — calm lake water reflecting sandstone shrines and the red cliffs behind. The group demonstrates how temple building continued at one site across four centuries.",
    visitingInformation: {
      hours: "Open daylight hours",
      entry: "No entry fee",
      bestTime: "Sunrise and sunset for reflections on the lake; October – February",
      tips: "A short walk from the Badami caves. Very popular with photographers in the golden hour.",
    },
    images: [
      {
        url: "/images/badami-evening-4k.jpg",
        alt: "The Bhutanatha temple at golden hour sunset reflecting across Agastya Lake (4K UHD)",
        credit: "Wikimedia Commons · 4K UHD",
      },
      {
        url: "/images/bhutanatha-temple.jpg",
        alt: "The Bhutanatha temple at the water's edge of Agastya Lake, Badami",
        credit: "Wikimedia Commons",
      },
    ],
    detectedFeatures: [
      "Stepped shikhara (tower)",
      "Lakeside temple setting",
      "Chalukyan pilasters",
    ],
    nearbyPlaces: ["badami-cave-temples", "banashankari-temple"],
  },
  {
    id: 3,
    slug: "pattadakal-group-of-monuments",
    name: "Pattadakal Group of Monuments",
    localName: "ಪಟ್ಟದಕಲ್ಲು (Kisuvolalu)",
    district: "Bagalkot",
    location: "Pattadakal",
    latitude: 15.9487,
    longitude: 75.8197,
    category: "UNESCO World Heritage Site",
    period: "7th–8th century CE",
    dynasty: "Early Chalukyas of Badami",
    shortDescription:
      "A UNESCO World Heritage Site where North Indian (Nagara) and South Indian (Dravida) temple architecture were built side by side — a unique architectural laboratory.",
    history:
      "Pattadakal, then called Kisuvolalu, served as the ceremonial site where Chalukya kings were crowned, beside the Malaprabha river. Between the 7th and 8th centuries the dynasty's finest architects experimented here openly: the same sacred compound holds temples in the northern Nagara style and the southern Dravida style, together with hybrid forms. The most celebrated structure, the Virupaksha Temple, was built by Queen Lokamahadevi to commemorate a victory, and its inscriptions name the architects who built it.",
    architecture:
      "Nine Hindu temples and a Jain sanctuary make up the group. The Sangameshvara and Virupaksha temples follow the fully developed Dravida scheme — sanctum, circumbulatory passage, pillared halls and gateway — crowned by stepped pyramidal towers. The Papanatha temple blends the two styles, and the small Kadasiddheshvara and Galaganatha shrines carry curvilinear Nagara shikharas. The Virupaksha Temple's pillars carry extensive narrative sculpture from the epics.",
    significance:
      "Pattadakal was inscribed as a UNESCO World Heritage Site in 1987 precisely because it preserves, in one place, the coexistence and fusion of India's two great temple traditions. It is often described as an open-air museum of early medieval temple design, and inscriptions here are a key source for Chalukya history.",
    visitingInformation: {
      hours: "6:00 AM – 6:00 PM, daily",
      entry: "₹40 for Indian visitors, ₹600 for foreign visitors",
      bestTime: "October – March; mornings are quieter",
      tips: "About 22 km from Badami. Combine with Aihole (about 15 km) for a full Chalukyan day. Carry water — the site is large and mostly open ground.",
    },
    images: [
      {
        url: "/images/pattadakal-group.jpg",
        alt: "The group of Chalukyan temples at Pattadakal, a UNESCO World Heritage Site",
        credit: "Karnataka Tourism",
      },
      {
        url: "/images/pattadakal-galaganatha.jpg",
        alt: "The Galaganatha temple with its curvilinear Nagara shikhara at Pattadakal",
        credit: "Karnataka Tourism",
      },
    ],
    detectedFeatures: [
      "Dravida-style vimana",
      "Nagara-style shikhara",
      "Pillared mandapa",
      "Inscription panels",
    ],
    nearbyPlaces: ["virupaksha-temple-pattadakal", "mallikarjuna-temple-pattadakal", "aihole"],
  },
  {
    id: 4,
    slug: "virupaksha-temple-pattadakal",
    name: "Virupaksha Temple",
    localName: "ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ",
    district: "Bagalkot",
    location: "Pattadakal",
    latitude: 15.9499,
    longitude: 75.8208,
    category: "Temples",
    period: "c. 740 CE",
    dynasty: "Early Chalukyas of Badami",
    shortDescription:
      "The largest and finest temple at Pattadakal, commissioned by Queen Lokamahadevi — a masterpiece of early Dravida architecture.",
    history:
      "Built around 740 CE by Queen Lokamahadevi, consort of King Vikramaditya II, to commemorate the Chalukya victory over the Pallavas, the temple is also called the Lokeshvara or Trailokeshvara temple. Inscriptions record the names of its architects — Sundari and Gunda — a rare instance where medieval builders are known by name. The temple remained in worship through later centuries, and a later Virupaksha cult association continues today.",
    architecture:
      "The temple is the most complete early example of the Dravida order in the Deccan: a sanctum with a circumambulatory path, an antarala, a grand pillared mandapa, and a monumental gateway (gopura). The shikhara is a stepped pyramid of tiered roof forms. Its outer walls carry friezes of narrative sculpture — episodes from the Ramayana, Mahabharata and Bhagavata — and the pillars inside bear large relief images of Shiva, Vishnu and Devi.",
    significance:
      "Architectural historians regard it as a landmark: it directly influenced later temple design, and its scheme echoes onward in Kailasanatha at Kanchipuram and, centuries later, the Kailasa temple at Ellora.",
    visitingInformation: {
      hours: "6:00 AM – 6:00 PM, daily",
      entry: "Included in the Pattadakal group ASI ticket",
      bestTime: "Early morning — sculpture reads best in raking light; the March chariot festival draws large crowds",
      tips: "Walk clockwise around the outer walls to follow the narrative friezes in sequence.",
    },
    images: [
      {
        url: "/images/virupaksha-temple.jpg",
        alt: "The Virupaksha Temple at Pattadakal, the largest of the group",
        credit: "Wikimedia Commons",
      },
    ],
    detectedFeatures: [
      "Dravida vimana",
      "Monumental gopura gateway",
      "Narrative friezes",
      "Circumambulatory passage",
    ],
    nearbyPlaces: ["mallikarjuna-temple-pattadakal", "pattadakal-group-of-monuments", "aihole"],
  },
  {
    id: 5,
    slug: "mallikarjuna-temple-pattadakal",
    name: "Mallikarjuna Temple",
    localName: "ಮಲ್ಲಿಕಾರ್ಜುನ ದೇವಾಲಯ",
    district: "Bagalkot",
    location: "Pattadakal",
    latitude: 15.9504,
    longitude: 75.8213,
    category: "Temples",
    period: "c. 745 CE",
    dynasty: "Early Chalukyas of Badami",
    shortDescription:
      "A companion temple to Virupaksha, built by another Chalukya queen, on a slightly smaller scale with the same refined Dravida scheme.",
    history:
      "The Mallikarjuna Temple was built around 745 CE by Trailokyamahadevi, the younger queen of Vikramaditya II and sister of Lokamahadevi, who built the neighbouring Virupaksha Temple. The two temples were thus royal commissions by two sisters, raised side by side within a few years of each other.",
    architecture:
      "It follows the Virupaksha plan in miniature: sanctum with a star-in-plan circumambulatory path, an antarala, a mandapa and a stepped pyramidal shikhara of the Dravida order. The pillars and walls carry high-quality relief sculpture, including amorous couples (mithuna) figures and deity panels characteristic of Chalukyan art.",
    significance:
      "Together with Virupaksha it forms a matched pair of royal temple commissions — a rare instance where two queens of the same court patronised adjacent monuments — and it shows how fully the mature Dravida style had been absorbed at Pattadakal.",
    visitingInformation: {
      hours: "6:00 AM – 6:00 PM, daily",
      entry: "Included in the Pattadakal group ASI ticket",
      bestTime: "Morning; the temple festival falls in March–April",
      tips: "Compare the pillar sculpture with the Virupaksha temple next door — the workshops were related.",
    },
    images: [
      {
        url: "/images/mallikarjuna-temple.jpg",
        alt: "The Mallikarjuna Temple at Pattadakal, built by Queen Trailokyamahadevi",
        credit: "Karnataka Tourism",
      },
    ],
    detectedFeatures: [
      "Dravida shikhara",
      "Relief sculpture panels",
      "Pillared mandapa",
    ],
    nearbyPlaces: ["virupaksha-temple-pattadakal", "pattadakal-group-of-monuments", "aihole"],
  },
  {
    id: 6,
    slug: "aihole",
    name: "Aihole",
    localName: "ಐಹೊಳೆ (Ayyavole)",
    district: "Bagalkot",
    location: "Aihole",
    latitude: 16.0186,
    longitude: 75.8995,
    category: "Historical Sites",
    period: "4th–12th century CE",
    dynasty: "Chalukyas of Badami, Rashtrakutas and Kalyani Chalukyas",
    shortDescription:
      "An entire village of over a hundred ancient temples — often called the cradle of Indian temple architecture.",
    history:
      "Aihole (historical Ayyavole) was a thriving trade and guild town, and legend holds that Parashurama, after his battles, came here to wash his axe in the Malaprabha. The town's merchant wealth and royal patronage produced an extraordinary density of temples — over a hundred shrines — built and rebuilt from the 4th century CE through the Chalukya, Rashtrakuta and Kalyani Chalukya periods. Inscriptions here include the famous Meguti Temple inscription of 634 CE, which dates the temple and records the poet Ravikirti, one of the most important chronological anchors of early Indian history.",
    architecture:
      "No two temples at Aihole are quite alike — the site is effectively a catalogue of experimentation: flat-roofed shrines, apsidal plans, curved shikharas, stepped towers, and hybrid forms. The famous Durga Temple has an unusual apsidal (semi-circular) plan, the Lad Khan Temple reuses wood-imitating construction in stone, and small shrines such as the Huchimalligudi show early niched facades. This is why Aihole is described as a laboratory of temple architecture.",
    significance:
      "Aihole, with Badami and Pattadakal, forms the Malaprabha valley heritage corridor. Its sheer variety preserves the search for a mature temple form, and the Meguti inscription gives historians a firm dated landmark. Aihole is on the UNESCO tentative list as part of the extended Chalukyan serial nomination.",
    visitingInformation: {
      hours: "6:00 AM – 6:00 PM, daily",
      entry: "₹40 for Indian visitors, ₹600 for foreign visitors (covers the main clusters)",
      bestTime: "October – February; start early to avoid the midday heat",
      tips: "Hire a local guide or use this app's monument pages — the sites are scattered across and around the village. The Durga Temple, Lad Khan and Meguti are the highlights.",
    },
    images: [
      {
        url: "/images/aihole-temples.jpg",
        alt: "The ancient temples of Aihole, the cradle of Chalukyan architecture",
        credit: "Karnataka Tourism",
      },
    ],
    detectedFeatures: [
      "Experimental temple plans",
      "Flat-roofed early shrines",
      "Apsidal sanctuary form",
      "Stone lattice windows",
    ],
    nearbyPlaces: ["durga-temple-aihole", "lad-khan-temple", "meguti-jain-temple", "pattadakal-group-of-monuments"],
  },
  {
    id: 7,
    slug: "durga-temple-aihole",
    name: "Durga Temple, Aihole",
    localName: "ದುರ್ಗಾ ದೇವಾಲಯ",
    district: "Bagalkot",
    location: "Aihole",
    latitude: 16.0196,
    longitude: 75.8967,
    category: "Architecture",
    period: "Late 7th – early 8th century CE",
    dynasty: "Early Chalukyas of Badami",
    shortDescription:
      "The most famous temple at Aihole — an apsidal shrine wrapped by a unique covered processional gallery.",
    history:
      "Despite its name, the temple was probably not dedicated to Durga; the name is commonly explained as deriving from 'durg' — a fortification — since the temple stood near a defensive wall. Built in the late 7th or early 8th century, it reflects the Chalukyan fascination with Buddhist chaitya-hall forms translated into a Hindu shrine.",
    architecture:
      "The plan is apsidal — semi-circular at the rear like a rock-cut chaitya hall — with a rectangular front mandapa. What makes it exceptional is the covered ambulatory gallery that runs around the apse, its outer wall pierced by pierced-stone lattice windows casting patterned light inside. The shikhara over the sanctum is a curvilinear Nagara form, an interesting northern feature on an otherwise chaitya-derived plan. Pillars and panels carry bold sculpture, including large relief images of Narasimha and Harihara.",
    significance:
      "It is one of the most reproduced images of Indian temple architecture, illustrating the chaitya-to-temple transition. The lattice windows and apsidal ambulatory are almost unique in Hindu temple building.",
    visitingInformation: {
      hours: "6:00 AM – 6:00 PM, daily",
      entry: "Included in the Aihole ASI ticket",
      bestTime: "Morning to midday — light through the lattice windows",
      tips: "Walk the full ambulatory; stand inside at mid-morning to see the lattice light patterns.",
    },
    images: [
      {
        url: "/images/durga-temple-aihole.jpg",
        alt: "The apsidal Durga Temple at Aihole with its covered ambulatory gallery",
        credit: "Wikimedia Commons",
      },
    ],
    detectedFeatures: [
      "Apsidal plan",
      "Pierced-stone lattice windows",
      "Covered ambulatory gallery",
      "Relief sculpture",
    ],
    nearbyPlaces: ["lad-khan-temple", "meguti-jain-temple", "aihole"],
  },
  {
    id: 8,
    slug: "lad-khan-temple",
    name: "Lad Khan Temple",
    localName: "ಲಾಡ್ ಖಾನ್ ದೇವಾಲಯ",
    district: "Bagalkot",
    location: "Aihole",
    latitude: 16.0188,
    longitude: 75.8972,
    category: "Architecture",
    period: "5th century CE (among the oldest at Aihole)",
    dynasty: "Pre-Chalukyan / early Chalukya period",
    shortDescription:
      "One of the earliest surviving stone temples in India — its stone masonry deliberately imitates wooden construction.",
    history:
      "The Lad Khan Temple is dated to the 5th century, making it among the earliest standing temples in South India. Its unusual name comes not from its builder but from a 19th-century Muslim gentleman, Lad Khan, who is said to have used the temple as his residence — an accidental occupant whose name stuck to the monument.",
    architecture:
      "The temple is a flat-roofed square structure built like a wooden hall translated into stone: sloping stone slabs imitate timber roof joints, and a small second storey (a shrine-like attic) rises over the centre. Inside, a ring of pillars surrounds a central square platform carrying a Nandi. The sanctuary sits against the rear wall rather than in a separate chamber — an archaic arrangement. Wall panels carry early carvings including a notable figure of Surya, the sun god.",
    significance:
      "It preserves in stone the grammar of wooden architecture — the single clearest evidence for how early Indian builders moved from timber to stone. Every history of Indian temple architecture cites it.",
    visitingInformation: {
      hours: "6:00 AM – 6:00 PM, daily",
      entry: "Included in the Aihole ASI ticket",
      bestTime: "Morning",
      tips: "Look up at the ceiling joints and the imitation woodwork — the essence of this temple is in its construction logic.",
    },
    images: [
      {
        url: "/images/lad-khan-temple.jpg",
        alt: "The Lad Khan Temple at Aihole, its stone masonry imitating wooden construction",
        credit: "Wikimedia Commons",
      },
    ],
    detectedFeatures: [
      "Wooden-construction imitation in stone",
      "Flat roof",
      "Central pillar hall",
      "Nandi platform",
    ],
    nearbyPlaces: ["durga-temple-aihole", "meguti-jain-temple", "aihole"],
  },
  {
    id: 9,
    slug: "meguti-jain-temple",
    name: "Meguti Jain Temple",
    localName: "ಮೇಗುಟಿ ಜೈನ ಬಸದಿ",
    district: "Bagalkot",
    location: "Aihole",
    latitude: 16.0205,
    longitude: 75.9011,
    category: "Temples",
    period: "634 CE (dated by inscription)",
    dynasty: "Early Chalukyas of Badami",
    shortDescription:
      "A Jain temple perched on a hill above Aihole, carrying the famous inscription of 634 CE that dates it precisely.",
    history:
      "The Meguti Temple is the only monument at Aihole whose date is fixed beyond doubt: an inscription inside records that it was built in 634 CE by Ravikirti, a poet and minister in the court of Pulakeshin II. The same inscription praises the king's victories — including over the Pallava king Mahendravarman — and is one of the most celebrated documents of Sanskrit epigraphy. The temple remained in Jain use, and later Jain images have been placed nearby.",
    architecture:
      "The temple sits on a raised platform on the hill's flank. It follows a simple early plan: a flat-roofed pillared hall in front of a sanctum with a now-missing shikhara, and an ambulatory passage around the sanctum. The masonry is precise but austere compared to later Chalukyan work — ornament is concentrated in a few pilasters and niches. From the terrace the Malaprabha valley, with Pattadakal visible in the distance, opens up.",
    significance:
      "The 634 CE inscription makes Meguti a fixed chronological anchor for all of early Chalukyan architecture — scholars date Badami's caves and early Pattadakal temples partly against it. The hilltop setting also offers the best panorama of the heritage corridor.",
    visitingInformation: {
      hours: "Daylight hours",
      entry: "No separate ticket (outside the main Aihole cluster)",
      bestTime: "Late afternoon for the valley view and sunset",
      tips: "A short climb from the village. Modest steps but uneven in places — go carefully and carry water.",
    },
    images: [
      {
        url: "/images/meguti-temple.jpg",
        alt: "The Meguti Jain Temple on its hill above Aihole",
        credit: "Wikimedia Commons",
      },
    ],
    detectedFeatures: [
      "Jain Tirthankara sanctuary",
      "Pillared mandapa",
      "Sanskrit inscription slab",
      "Hilltop platform",
    ],
    nearbyPlaces: ["durga-temple-aihole", "lad-khan-temple", "aihole"],
  },
  {
    id: 10,
    slug: "banashankari-temple",
    name: "Banashankari Temple",
    localName: "ಬನಶಂಕರಿ ಅಮ್ಮನ ದೇವಸ್ಥಾನ",
    district: "Bagalkot",
    location: "Cholachagudd, near Badami",
    latitude: 15.8478,
    longitude: 75.6534,
    category: "Temples",
    period: "Original 7th century; present structure 18th century (Maratha period)",
    dynasty: "Chalukyan origin; rebuilt under Maratha patronage",
    shortDescription:
      "A living temple of the fierce goddess Banashankari, set beside a sacred water tank ringed by lamp towers.",
    history:
      "The worship of Banashankari (Shakambari), a form of Parvati associated with the forest, is ancient in this region, and the site's original Chalukyan temple dates to the 7th century. The present main structure, however, belongs to the 18th century, rebuilt in the Maratha architectural idiom with a domed hall and high entrance towers. The temple remains an active pilgrimage centre, especially during the annual Banashankari fair and Navaratri.",
    architecture:
      "The temple combines a garbhagriha for the goddess with a domed pillared hall and the distinctive deepastambha (lamp towers) rising from the tank steps. The sacred tank itself, with its encircling stone steps, is part of the sacred geography. The entrance tower carries stucco work in the Maratha style, quite distinct from the Chalukyan monuments of Badami.",
    significance:
      "It is the most important living (in-worship) goddess shrine in the region and demonstrates the continuity of devotion at Bagalkot from early medieval times to today. The contrast between its Maratha architecture and the Chalukyan monuments nearby makes it a distinctive part of the district's heritage.",
    visitingInformation: {
      hours: "5:00 AM – 9:00 PM, daily (pooja times vary)",
      entry: "No entry fee; offerings as per custom",
      bestTime: "Evening aarti, and during the annual Banashankari Jatra (January–February)",
      tips: "A major festival site — expect crowds during the fair and Navaratri. Modest dress appropriate for an active temple.",
    },
    images: [
      {
        url: "/images/banashankari-temple.jpg",
        alt: "The Banashankari (Shakambari) temple near Badami",
        credit: "Wikimedia Commons",
      },
    ],
    detectedFeatures: [
      "Temple tank with stone steps",
      "Deepastambha lamp towers",
      "Maratha-style stucco entrance",
      "Domed pillared hall",
    ],
    nearbyPlaces: ["badami-cave-temples", "bhutanatha-temples", "mahakuta-temples"],
  },
  {
    id: 11,
    slug: "mahakuta-temples",
    name: "Mahakuta Temples",
    localName: "ಮಹಾಕೂಟ ದೇವಾಲಯ ಸಮೂಹ",
    district: "Bagalkot",
    location: "Mahakuta, near Badami",
    latitude: 15.9298,
    longitude: 75.7272,
    category: "Temples",
    period: "6th–7th century CE (early Chalukyan phase)",
    dynasty: "Early Chalukyas of Badami",
    shortDescription:
      "A hidden grove of small early Chalukyan shrines around natural springs, still used for ritual bathing.",
    history:
      "Tucked into a wooded valley about 14 km from Badami, Mahakuta was developed by the early Chalukyas in the 6th–7th centuries. The shrines cluster around a spring-fed tank, and the site's inscriptions — including one of the two famous Mahakuta Pillar inscriptions of Mangalesha (dated 595–602 CE) — are key foundational sources for early Chalukya chronology. Worship at the main Mahakuteshvara shrine and ritual ablutions in the holy pushkarini continue actively to this day.",
    architecture:
      "The complex is an intimate cluster of early stone shrines demonstrating both Dravida and Nagara architectural models — including a rare circular shrine — nestled around the central freshwater spring pool. The miniature vimanas, ornamental niches, and simplified pilaster profiles showcase the experimental phase of Chalukyan craftsmanship before the monumental scale of Badami and Pattadakal was attained.",
    significance:
      "Mahakuta reveals the early genesis of Badami Chalukyan temple design in a tranquil forest retreat. Its royal inscriptions provide crucial political chronology, while the Vishnu Pushkarini pool preserves living Shaivite pilgrimage rituals uninterrupted for 1,400 years.",
    visitingInformation: {
      hours: "6:00 AM – 7:30 PM, daily",
      entry: "Free entry",
      bestTime: "Early morning (06:30 AM – 08:30 AM) when the sacred spring is calm, clear, and uncrowded",
      tips: "The perennial spring-fed tank (Vishnu Pushkarini) contains crystal-clear water with a submerged five-faced Shiva linga (Panchamukha) inside the central small pavilion. Reached in 25 minutes from Badami via Banashankari road.",
    },
    images: [
      {
        url: "/images/mahakuta-temples.jpg",
        alt: "The Mahakuta group of temples around their spring-fed tank",
        credit: "Bagalkote District Tourism",
      },
    ],
    detectedFeatures: [
      "Perennial sacred spring tank (Vishnu Pushkarini)",
      "Submerged Panchamukha Shiva Linga",
      "Mahakuteshvara & Mallikarjuna twin shrines",
      "Early Chalukyan Nagara & Dravida miniature vimanas",
      "Historic Mangalesha Pillar Inscription site (595 CE)",
    ],
    nearbyPlaces: ["badami-cave-temples", "banashankari-temple", "bhutanatha-temples"],
  },
  {
    id: 12,
    slug: "kudalasangama",
    name: "Kudalasangama",
    localName: "ಕುದಲಸಂಗಮ",
    district: "Bagalkot",
    location: "Kudalasangama, Indi taluk",
    latitude: 16.203,
    longitude: 76.0599,
    category: "Pilgrimage Centres",
    period: "12th century CE onward",
    dynasty: "Basavanna and the Lingayat tradition",
    shortDescription:
      "Where the Krishna meets the Malaprabha — the holiest pilgrimage centre of the Lingayat faith, holding the samadhi of Basavanna.",
    history:
      "Eight hundred years ago a couple, Madarasa and Madalambike, lived in Bagewadi near the Nandeeshwara temple; their son Basavanna grew up to lead the Lingayat movement of social equality, and tradition holds that he attained his samadhi in the waters where the Krishna and the Malaprabha merge at Kudalasangama. The Aikya Mantapa marks that spot and enshrines a linga believed to be swayambhu — self-born. The site has been a living pilgrimage centre ever since, and the Kudala Sangama Development Board, established by the government with an outlay of nearly ₹45 crore, maintains and develops it today.",
    architecture:
      "The heart of the site is the Aikya Mantapa — Basavanna's samadhi shrine — approached through pilgrim halls, mural galleries depicting Basavanna and the sharana poets, and rows of deepastambha lamp pillars. The river-front confluence itself is the spectacle: a wide, silent meeting of two rivers that the Chalukyas of Badami once commanded from both banks.",
    significance:
      "Kudalasangama is to the Lingayats what Kashi is to the wider Hindu tradition — the place of dissolution and unity (aikya). It anchors the northern edge of the Bagalkot heritage circuit and connects the Chalukyan temple story to the 12th-century social revolution of Basavanna.",
    visitingInformation: {
      hours: "Open daily; mantapa poojas morning and evening (timings vary)",
      entry: "No entry fee; offerings as per custom",
      bestTime: "October – February; Basavanna Jayanti (Phalguna Pournami, Feb–March) draws lakhs of pilgrims",
      tips: "About 45 km from Bagalkot town and 15 km from Almatti Dam — combine the two for a full Krishna-valley day. Expect crowds on Pournami days.",
    },
    images: [
      {
        url: "/images/kudalasangama.jpg",
        alt: "The Basavanna Aikya Mantapa at Kudalasangama, where the Krishna meets the Malaprabha",
        credit: "Karnataka Tourism",
      },
    ],
    detectedFeatures: [
      "Confluence of the Krishna and Malaprabha",
      "Aikya Mantapa — Basavanna's samadhi",
      "Swayambhu linga shrine",
      "Murals of Basavanna and the sharana poets",
    ],
    nearbyPlaces: ["almatti-dam"],
  },
  {
    id: 13,
    slug: "almatti-dam",
    name: "Almatti Dam",
    localName: "ಅಳಮಟ್ಟಿ ಅಣೆಕಟ್ಟು",
    district: "Bagalkot",
    location: "Almatti, on the Bagalkot–Vijayapura border",
    latitude: 16.331,
    longitude: 75.888,
    category: "Modern Engineering",
    period: "Completed July 2005",
    dynasty: "Karnataka Power Corporation Ltd. (KPCL)",
    shortDescription:
      "The Krishna valley's modern wonder — a 290 MW hydroelectric dam whose garden-fronted reservoir has become one of Karnataka's most visited day trips.",
    history:
      "Almatti is the main reservoir of the Upper Krishna Irrigation Project. The heavy works were completed in roughly 40 months, and the dam was finished in July 2005 at about ₹5.20 billion against an original estimate closer to ₹14.70 billion — a saving that made it a textbook case of Indian dam building. The Almatti I powerhouse came online first, and Almatti II took the station to its full capacity. The reservoir holds some 123.08 TMC ft of water and irrigates lakhs of acres across Bijapur and Bagalkot districts.",
    architecture:
      "A large earth-and-rockfill dam with a concrete spillway section across the Krishna. The powerhouse complex houses five 55 MW Kaplan units plus a 15 MW unit — 290 MW in all. The reservoir's backwaters stretch upstream past Kudalasangama, and the terraced Almatti Dam Garden on the near bank, with its lawns, fountains and sunset viewpoint, is what most visitors actually arrive for.",
    significance:
      "Almatti is the engineering counterweight to the Chalukyan temples of the same valley: it feeds a significant slice of Karnataka's grid, supplies the Upper Krishna canals, and has become the district's most popular modern tourist draw — boat rides, the garden, and the Kudalasangama confluence 15 km upstream packaged into a single day.",
    visitingInformation: {
      hours: "Garden open daily (roughly 8 AM – 6 PM); boating in daytime slots",
      entry: "Garden nominal fee; boating, camera and vehicle fees apply",
      bestTime: "October – February for comfort; July – September for full spillway views",
      tips: "Combine with Kudalasangama, 15 km upstream. Evenings are busiest — arrive before 5 PM for the sunset. Boating timings shift with reservoir levels; verify locally.",
    },
    images: [
      {
        url: "/images/almatti-dam.jpg",
        alt: "Almatti Dam across the Krishna, with its garden terraces on the near bank",
        credit: "Bagalkote District Tourism",
      },
    ],
    detectedFeatures: [
      "290 MW KPCL hydroelectric station (Almatti I & II)",
      "Main reservoir of the Upper Krishna Irrigation Project",
      "Almatti Dam Garden and musical fountain",
      "Sunset viewpoint over the Krishna backwaters",
    ],
    nearbyPlaces: ["kudalasangama"],
  },
  {
    id: 14,
    slug: "ravana-phadi-cave-aihole",
    name: "Ravanaphadi Cave Temple, Aihole",
    localName: "ರಾವಣಫಡಿ ಗುಹಾ ದೇವಾಲಯ, ಐಹೊಳೆ",
    district: "Bagalkot",
    location: "Aihole",
    latitude: 16.021,
    longitude: 75.882,
    category: "Caves",
    period: "c. 550 CE (6th century CE)",
    dynasty: "Early Chalukyas of Badami",
    shortDescription:
      "One of the earliest rock-cut shrines in Aihole, celebrated for its 10-armed Dancing Shiva Nataraja with Sapta Matrikas, Durga, and river goddesses.",
    history:
      "Excavated c. 550 CE into a standalone red sandstone knoll northeast of Aihole village, Ravanaphadi ('Rock of Ravana') predates even the Badami cave temples. Consecrated as a dedicated Shaiva rock sanctum, it witnessed the transition from early rock cutting to structural temple building.",
    architecture:
      "Features a fluted broken amalaka at its rock-cut entrance, leading through a rectangular vestibule into a square hall with a central linga sanctum. The interior side walls boast high-relief monumental masterworks: a majestic 10-armed Nataraja performing the cosmic dance flanked by the Seven Divine Mothers (Sapta Matrikas), Ganesha, and Bhringi, plus deeply cut panels of Varaha and Mahishasuramardini.",
    significance:
      "Ravanaphadi represents the supreme pinnacle of 6th-century Deccan sculptural dynamism, where kinetic stone motion was first mastered in the Malaprabha valley.",
    visitingInformation: {
      hours: "06:00 AM – 06:00 PM daily",
      entry: "Included in Aihole ASI Ticket (₹25 Indians / ₹300 Foreigners)",
      bestTime: "Morning light (07:00 – 10:00 AM)",
      tips: "Located 1 km northeast of the main Durga Temple complex. The interior carvings catch morning sun directly through the open entrance rock facade.",
    },
    images: [
      {
        url: "/images/monuments/ravana-phadi.jpg",
        alt: "Ravanaphadi rock-cut cave interior and sculpted Nataraja panel, Aihole",
        credit: "Archaeological Survey of India · Real Photograph",
      },
      {
        url: "/images/aihole-4k.jpg",
        alt: "Sandstone landscape around Aihole",
        credit: "Wikimedia Commons · 4K UHD",
      },
    ],
    detectedFeatures: [
      "10-armed Dancing Nataraja",
      "Sapta Matrikas relief",
      "Rock-cut sandstone sanctum",
      "Broken entrance amalaka",
    ],
    nearbyPlaces: ["durga-temple-aihole", "lad-khan-temple", "meguti-jain-temple"],
  },
  {
    id: 15,
    slug: "shivayogamandira",
    name: "Shivayogamandira Hermitage & Ghats",
    localName: "ಶಿವಯೋಗಮಂದಿರ ತಪೋಭೂಮಿ",
    district: "Bagalkot",
    location: "Badami-Pattadakal Route",
    latitude: 15.939,
    longitude: 75.758,
    category: "Pilgrimage",
    period: "1909 CE (Living Heritage)",
    dynasty: "Veerashaiva Spiritual Trust / Hangal Kumareshwara Swamiji",
    shortDescription:
      "Tranquil spiritual hermitage, Sanskrit ashram, and river retreat nestled in a forested grove on the banks of the Malaprabha River.",
    history:
      "Established in 1909 CE by Hangal Sri Kumareshwara Swamiji as an institution for moral, spiritual, and philosophical learning under the Veerashaiva-Lingayat tradition. Over a century, it has trained hundreds of pontiffs and scholars in Vachana literature, Sanskrit, and meditation.",
    architecture:
      "A harmonious synthesis of traditional Deccan stone courtyards, peaceful shaded prayer halls (prarthana mandiras), Sanskrit gurukula dormitories, and broad red stone ghats leading directly into the sacred currents of the Malaprabha River beneath ancient banyan and neem canopies.",
    significance:
      "A living oasis of peace between the ancient monuments of Badami and Pattadakal. Visitors stop here to experience river meditation, serene tree canopies, and authentic community hospitality.",
    visitingInformation: {
      hours: "06:00 AM – 07:30 PM daily",
      entry: "Free entry for all pilgrims and visitors",
      bestTime: "Morning (07:00 – 09:30 AM) or peaceful sunset (05:00 – 06:30 PM)",
      tips: "Located exactly halfway along State Highway 14 between Badami (12 km) and Pattadakal (10 km). Modest attire required. Free pure vegetarian prasada is served to visitors daily.",
    },
    images: [
      {
        url: "/images/kudalasangama.jpg",
        alt: "River Malaprabha ghats and forested banks at Shivayogamandira",
        credit: "Bagalkot Tourism Portal",
      },
      {
        url: "/images/mahakuta-temples.jpg",
        alt: "Lush grove and serene stone courtyards",
        credit: "Karnataka Tourism",
      },
    ],
    detectedFeatures: [
      "Malaprabha river bathing ghats",
      "Ancient banyan grove",
      "Sanskrit ashram mandapa",
      "Samadhi sanctuary of Kumareshwara Swamiji",
    ],
    nearbyPlaces: ["badami-cave-temples", "pattadakal-group-of-monuments", "mahakuta-temples"],
  },
  {
    id: 16,
    slug: "galaganatha-temple-pattadakal",
    name: "Galaganatha Temple, Pattadakal",
    localName: "ಗಳಗನಾಥ ದೇವಾಲಯ, ಪಟ್ಟದಕಲ್ಲು",
    district: "Bagalkot",
    location: "Pattadakal",
    latitude: 15.9505,
    longitude: 75.816,
    category: "Temples",
    period: "c. 750 CE (8th century CE)",
    dynasty: "Badami Chalukyas",
    shortDescription:
      "Classical Northern Rekhanagara temple standing sentinel on the Malaprabha river edge, famed for its 8-armed Shiva slaying Andhaka.",
    history:
      "Constructed around the mid-8th century CE, the Galaganatha Temple is positioned on the northern perimeter of the UNESCO World Heritage group at Pattadakal. Facing east directly toward the flowing waters of the Malaprabha, it marks the mature synthesis of North Indian Nagara curvilinear architecture within the southern Chalukya capital.",
    architecture:
      "Features a dramatic curvilinear Rekha-prasad shikhara (Nagara spire) adorned with decorative chaitya arches and topped with a prominent fluted stone amalaka. The exterior niche preserves one of the greatest dynamic sculptures of Indian art: an 8-armed Shiva (Andhakasura-samhara-murti) piercing the demon of darkness on his trident (trishula) with ferocious grace.",
    significance:
      "Demonstrates Pattadakal's unique role as an architectural crucible where northern Nagara spires were constructed immediately alongside southern Dravida vimanas like Virupaksha.",
    visitingInformation: {
      hours: "06:00 AM – 06:00 PM daily",
      entry: "Included in Pattadakal UNESCO Ticket (₹40 Indians / ₹600 Foreigners)",
      bestTime: "Late afternoon for golden river reflections",
      tips: "Walk north past the Sangameshwara temple to reach this riverside sanctuary. The exterior Shiva panel is best photographed in afternoon light.",
    },
    images: [
      {
        url: "/images/pattadakal-galaganatha.jpg",
        alt: "Galaganatha Northern Nagara temple shikhara and riverbank setting, Pattadakal",
        credit: "Wikimedia Commons · High-Res",
      },
      {
        url: "/images/pattadakal-4k.jpg",
        alt: "Pattadakal UNESCO monument complex overview",
        credit: "4K Heritage Collection",
      },
    ],
    detectedFeatures: [
      "Curvilinear Rekhanagara shikhara",
      "8-armed Shiva slaying Andhakasura",
      "Fluted stone amalaka",
      "Malaprabha riverside plinth",
    ],
    nearbyPlaces: [
      "virupaksha-temple-pattadakal",
      "mallikarjuna-temple-pattadakal",
      "pattadakal-group-of-monuments",
    ],
  },
  {
    id: 17,
    slug: "huchappayya-matha-aihole",
    name: "Huchappayya Matha & Gudi, Aihole",
    localName: "ಹುಚ್ಚಪ್ಪಯ್ಯ ಮಠ ಮತ್ತು ಗುಡಿ, ಐಹೊಳೆ",
    district: "Bagalkot",
    location: "Aihole",
    latitude: 16.015,
    longitude: 75.875,
    category: "Temples",
    period: "8th century CE",
    dynasty: "Badami Chalukyas",
    shortDescription:
      "Hidden temple gem set amidst village crop fields, celebrated across art history for its jewel-carved ceiling panels and mithuna sculptures.",
    history:
      "Erected in the 8th century CE during the flourishing later years of the Early Chalukya dynasty, the Huchappayya complex is set slightly west of the main village walls among tranquil agricultural fields, preserving astonishingly crisp carving details protected from urban weathering.",
    architecture:
      "A square sanctum with a curvilinear Northern Nagara spire fronted by an open hall. What sets Huchappayya apart is its jaw-dropping mandapa ceiling: deeply carved stone coffers depicting Lord Brahma seated majestically on his celestial swan, Vishnu soaring upon Garuda, and a magnificent dancing Nataraja flanked by musicians, framed by sensual lovers (mithunas).",
    significance:
      "Considered by art historians as containing some of the most emotionally nuanced and technically refined ceiling sculpture ever achieved in early medieval Deccan art.",
    visitingInformation: {
      hours: "06:00 AM – 05:30 PM daily",
      entry: "Free / ASI Protected site",
      bestTime: "Early morning or late afternoon for warm side lighting",
      tips: "Carry a flashlight or phone torch to illuminate the shadowed ceiling coffers. Located 500m west of Aihole bus stand along a peaceful rural path.",
    },
    images: [
      {
        url: "/images/monuments/aihole-complex.jpg",
        alt: "Pillared hall and carved panels of Huchappayya Matha, Aihole",
        credit: "Archaeological Survey of India · Real Photograph",
      },
      {
        url: "/images/monuments/lad-khan-interior.jpg",
        alt: "Intricate interior ceiling and pillar masonry details",
        credit: "ASI Heritage Records",
      },
    ],
    detectedFeatures: [
      "Intricate ceiling coffer carvings",
      "Brahma on celestial hamsa (swan)",
      "Vishnu mounted on soaring Garuda",
      "Mithuna lovers and decorative bracket figures",
    ],
    nearbyPlaces: [
      "durga-temple-aihole",
      "lad-khan-temple",
      "ravana-phadi-cave-aihole",
    ],
  },
];

// Lookup helpers
export const getMonumentBySlug = (slug) =>
  monuments.find((m) => m.slug === slug);

export const getMonumentById = (id) => monuments.find((m) => m.id === id);

export const getNearbyMonuments = (slug) => {
  const monument = getMonumentBySlug(slug);
  if (!monument) return [];
  return monument.nearbyPlaces
    .map((s) => getMonumentBySlug(s))
    .filter(Boolean);
};

// Category list derived from the data itself, so new monuments appear
// automatically. (DestinationsPage derives the same list at runtime;
// this export exists for any future consumer.)
export const categories = [
  "All",
  ...new Set(monuments.map((m) => m.category)),
];
