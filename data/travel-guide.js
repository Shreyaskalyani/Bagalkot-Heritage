// Practical Travel Logistics & Guide for Bagalkot Heritage Tourism

export const travelLogistics = {
  gettingHere: [
    {
      mode: "By Air",
      title: "Nearest Airports",
      icon: "Plane",
      details: [
        {
          name: "Hubballi Airport (HBX)",
          distance: "105 km (~2.5 hrs drive)",
          connectivity: "Direct flights to Bengaluru, Mumbai, Delhi, Hyderabad, Chennai.",
          recommendation: "Most convenient commercial airport with frequent connections.",
        },
        {
          name: "Belagavi Airport (IXG)",
          distance: "140 km (~3 hrs drive)",
          connectivity: "Connected to Bengaluru, Mumbai, Pune, Hyderabad, Tirupati.",
          recommendation: "Great alternative for travellers arriving from Maharashtra or Pune.",
        },
        {
          name: "Goa Dabolim / Mopa (GOI / GOX)",
          distance: "230 km (~5 hrs drive)",
          connectivity: "Major international and domestic flight hub.",
          recommendation: "Ideal for travellers combining a Goa beach holiday with Deccan heritage.",
        },
      ],
    },
    {
      mode: "By Train",
      title: "Railways & Direct Trains",
      icon: "Train",
      details: [
        {
          name: "Badami Railway Station (BDM)",
          distance: "4 km from Cave Temples",
          connectivity: "Daily express trains from Bengaluru, Mumbai, Hyderabad, Hubballi, Bijapur, Solapur.",
          recommendation: "The Gol Gumbaz Express (16535/16536) from Bengaluru arrives directly in Badami in the morning — the top choice for weekenders.",
        },
        {
          name: "Bagalkot Junction (BGK)",
          distance: "35 km from Badami",
          connectivity: "Major railway junction with more long-distance superfast train stops.",
          recommendation: "Well-connected by local taxis and buses to Badami (35 mins).",
        },
      ],
    },
    {
      mode: "By Road",
      title: "Highway Driving & Buses",
      icon: "Car",
      details: [
        {
          name: "From Bengaluru",
          distance: "450 km (~8 hours)",
          route: "NH-48 via Tumakuru, Chitradurga, then NH-50 via Hospet (Hampi) to Badami.",
          recommendation: "Can easily be combined with Hampi (140 km from Badami) for an epic Karnataka heritage road trip.",
        },
        {
          name: "From Pune / Mumbai",
          distance: "410 km (~7.5 hrs from Pune)",
          route: "NH-48 via Kolhapur, Belagavi, Bagalkot, Badami.",
          recommendation: "Excellent 4-lane expressway till Belagavi, scenic country roads onwards.",
        },
        {
          name: "From Hyderabad",
          distance: "390 km (~7.5 hours)",
          route: "Via Mahabubnagar, Raichur, Bagalkot to Badami.",
          recommendation: "Direct NWKRTC / TSRTC overnight sleeper buses operate daily.",
        },
        {
          name: "From Goa",
          distance: "240 km (~5 hours)",
          route: "Via Ponda, Mollem, Londa, Dharwad, Badami.",
          recommendation: "Scenic Western Ghats drive.",
        },
      ],
    },
  ],

  whereToStay: [
    {
      id: "mayura",
      name: "KSTDC Hotel Mayura Chalukya",
      image: "/images/kstdc-hotel-mayura-chalukya.jpg",
      category: "Official Government Heritage Hotel (Recommended)",
      location: "Ramdurg Road, Badami",
      distance: "1 km from Badami Cave Temples (Opposite ASI Museum)",
      priceRange: "₹1,800 – ₹3,500 / night",
      amenities: ["On-site restaurant (North & South Indian)", "AC Rooms & Cottages", "Tour Desk", "Safe Parking", "Lush Lawn"],
      whyStay: "The official Karnataka State Tourism hotel with real cottage rooms, verdant lawn, spacious parking, and helpful staff.",
      bookingLink: "https://kstdc.co",
    },
    {
      id: "heritage-resort",
      name: "The Heritage Resort Badami",
      image: "/images/heritage-resort-badami.jpg",
      category: "Boutique / Heritage Resort",
      location: "Station Road, Badami",
      distance: "2.5 km from caves",
      priceRange: "₹4,000 – ₹7,000 / night",
      amenities: ["Swimming Pool", "Multi-cuisine Restaurant", "Cottage Accommodations", "Travel Assistance", "Garden"],
      whyStay: "Best for families and leisure travellers seeking modern cottage amenities and a pool to relax after exploring stone monuments.",
    },
    {
      id: "badami-court",
      name: "Hotel Badami Court",
      image: "/images/the-badami-court-hotel.jpg",
      category: "Mid-Range Comfort Hotel",
      location: "Near Badami Railway Station",
      distance: "3 km from caves",
      priceRange: "₹2,500 – ₹4,200 / night",
      amenities: ["Swimming Pool", "Restaurant", "Wi-Fi", "Conference Hall", "24/7 Room Service"],
      whyStay: "Reliable hospitality, comfortable rooms, and convenient proximity to the railway station.",
    },
    {
      id: "kstdc-yatri-nivas",
      name: "KSTDC Yatri Nivas, Aihole",
      image: "/images/kstdc-yatri-nivas-aihole.jpg",
      category: "Budget Tourist Rest House",
      location: "Opposite Durga Temple, Aihole",
      distance: "35 km from Badami",
      priceRange: "₹800 – ₹1,500 / night",
      amenities: ["Verandah Rooms", "Neat Courtyard", "Neem Garden", "Walk to Monuments"],
      whyStay: "Quiet government guest house situated directly opposite Aihole's ancient complex for dawn and sunset photography.",
      bookingLink: "https://kstdc.co",
    },
    {
      id: "kudalasangama-yatri-nivas",
      name: "Kudalasangama Yatri Nivas & Guest Houses",
      image: "/images/kudalasangama.jpg",
      category: "Pilgrim Rest House & Riverside Suites",
      location: "Near Sangameshwara Temple, Kudalasangama",
      distance: "48 km from Badami (Krishna-Malaprabha Confluence)",
      priceRange: "₹500 – ₹1,800 / night",
      amenities: ["Riverfront Proximity", "Free Dasoha Meal Hall Nearby", "Spacious Family Suites", "Parking", "24/7 Water"],
      whyStay: "Managed by the Kudalasangama Kshetra Development Board. Best for spiritual seekers and river confluence sunsets.",
      bookingLink: "https://kudalasangama.karnataka.gov.in",
    },
    {
      id: "clarks-inn-bagalkot",
      name: "Clarks Inn / Hotel Anugraha Deluxe",
      image: "/images/badami-caves-4k.jpg",
      category: "Full-Service City Hotel",
      location: "Sector 24, Navanagar, Bagalkot City",
      distance: "34 km from Badami (Near Bagalkot Junction Station)",
      priceRange: "₹2,200 – ₹4,000 / night",
      amenities: ["Central AC", "Multi-Cuisine Restaurant", "Conference Hall", "High-Speed WiFi", "Valet Parking"],
      whyStay: "The top modern business and family hotel in Bagalkot city, offering corporate amenities, fine dining, and easy highway access.",
    },
  ],

  localTransport: [
    {
      type: "Full-Day Private Taxi / Cab",
      rate: "Approx ₹2,200 – ₹2,800 per day (Sedan / SUV)",
      coverage: "Badami – Mahakuta – Pattadakal – Aihole circuit (approx 80-90 km total running).",
      bookingTip: "Book through your hotel front desk or hire at Badami bus stand in the morning. Negotiate a fixed all-inclusive day fare with driver waiting charges.",
    },
    {
      type: "Auto-Rickshaws",
      rate: "₹50 – ₹100 inside Badami town; ₹400 – ₹600 for Badami + Banashankari + Mahakuta roundtrip.",
      coverage: "Great for intra-Badami travel: Station to Hotel, Cave Temples, Agastya Lake, and Banashankari.",
      bookingTip: "Readily available outside Badami railway station and near the bus stand.",
    },
    {
      type: "KSRTC / NWKRTC State Buses",
      rate: "₹25 – ₹45 per ride",
      coverage: "Regular local shuttle buses connect Badami Bus Stand to Pattadakal and Aihole every 30 to 45 minutes.",
      bookingTip: "Most economical travel option for solo and budget backpackers.",
    },
    {
      type: "Bicycle / Walking",
      rate: "Walking is free; cycle rentals occasionally available near lake.",
      coverage: "Badami Cave Temples, Agastya Lake, and Bhutanatha Temples are all easily walkable from each other (15-20 mins walk).",
      bookingTip: "Early mornings before 10 AM are pleasant for strolling between the lake and cliffs.",
    },
  ],

  foodAndCulture: {
    cuisineTitle: "North Karnataka Heritage Feast (Uttara Karnataka Oota)",
    dishes: [
      {
        name: "Jolada Rotti (Jowar Flatbread)",
        description: "Thin, hand-patted unleavened flatbreads made from roasted sorghum flour. Soft yet crisp, served piping hot.",
      },
      {
        name: "Yennegai (Stuffed Brinjal Curry)",
        description: "Baby eggplants slow-cooked in a rich paste of roasted peanuts, sesame seeds, coconut, and aromatic Deccan spices.",
      },
      {
        name: "Shenga Chutney Pudi & Mosaru",
        description: "Coarsely ground dry peanut powder spiked with garlic and red chillies, paired with fresh homemade cow's milk curd and dollops of white butter.",
      },
      {
        name: "Kaalu Palya (Sprouted Lentil Curry)",
        description: "Sprouted moth beans or green gram tempered with curry leaves and mustard seeds.",
      },
      {
        name: "Shenga Holige / Karadantu",
        description: "Famous local sweets: sweet stuffed lentil/peanut flatbread and the legendary energy-packed dry-fruit edible gum sweet of Aminagad.",
      },
    ],
    handloomsTitle: "Living Crafts & World-Famous Textiles",
    crafts: [
      {
        name: "Ilkal Sarees (GI Tagged)",
        location: "Ilkal town, Bagalkot district",
        detail: "Ancient weaving tradition famed for the red and white 'Topetenchi' temple-spire pallu and Kasuti hand embroidery.",
      },
      {
        name: "Guledgudda Khana",
        location: "Guledgudda, Bagalkot district",
        detail: "Traditional handwoven choli and blouse fabric with unique geometric and floral raised motifs.",
      },
      {
        name: "Chalukyan Stone Carvers",
        location: "Badami & Pattadakal village workshops",
        detail: "Artisans carving red sandstone sculptures, temple replicas, and mortar pedestals using centuries-old chisel techniques.",
      },
    ],
  },

  seasons: [
    {
      period: "October to March (Peak Season)",
      weather: "Pleasant & Sunny (18°C – 28°C)",
      verdict: "⭐ Best Time to Visit",
      highlights: "Clear blue skies, comfortable temperatures for climbing cliffs, and magnificent golden-hour light for photography. Banashankari Fair in January.",
    },
    {
      period: "July to September (Monsoon Season)",
      weather: "Lush & Breezy (22°C – 30°C)",
      verdict: "Scenic & Off-Beat",
      highlights: "Agastya Lake fills up, natural waterfalls tumble down the Badami red sandstone cliffs, and the Malaprabha river valley turns vibrant emerald green.",
    },
    {
      period: "April to June (Summer Season)",
      weather: "Hot & Dry (32°C – 42°C)",
      verdict: "Early Mornings Only",
      highlights: "High afternoon heat. Sightseeing is only advised between 6:30 AM – 10:00 AM and 4:30 PM – 6:30 PM. Carry ample water, hats, and sunscreen.",
    },
  ],

  essentialTips: [
    "Composite ASI Tickets: The ₹40 entrance ticket at Badami Cave Temples also grants entry to Badami Fort; keep your ticket handy.",
    "Footwear: You will climb stairs carved directly into sandstone at Badami and Meguti; wear sturdy, comfortable walking shoes.",
    "Certified Guides: ASI-authorized local guides are available at the entrance of Badami caves and Pattadakal. Look for their official ID cards.",
    "Monkeys: The cliff area around Badami caves has mischievous bonnet macaques; keep food items, sunglasses, and water bottles inside bags.",
    "Modest Attire: While temple compounds are protected historical monuments, Banashankari and Mahakuta are active pilgrimage shrines where modest attire is requested.",
  ],
};
