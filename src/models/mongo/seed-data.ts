import { Role } from "../../types/user-types.js";

export const seedData = {
  users: {
    _model: "User",
    admin: {
      firstName: "Ad",
      lastName: "Min",
      email: "admin@mail.com",
      password: "$2a$10$hs80q3Xc9QineM6z9xXK3ugRNNfRxbLp0POwFFTRnFGIKwzPhMJHO",
      role: Role.Admin,
    },
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "$2a$10$1KtPUXBSM9Ie5B9pugxxReUqyLDJKrEYWNSrA.kua/3BQUwmoBJem",
      role: Role.User,
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "$2a$10$XwiNJAkK/O0le8WpPQQX3.nIy/DZ8Ib3MnI2cAHZjH9L/i05.HZTW",
      role: Role.User,
    },
  },
  categories: {
    _model: "Category",
    sites: {
      title: "Historic Town Centers",
      img: {
        url: "",
        publicID: "",
      },
      userID: "->users.admin",
    },
    nature: {
      title: "Natural Landscapes",
      img: {
        url: "",
        publicID: "",
      },
      userID: "->users.admin",
    },
    routes: {
      title: "Cultural Routes",
      img: {
        url: "",
        publicID: "",
      },
      userID: "->users.admin",
    },
    religious: {
      title: "Cathedrals & Abbeys",
      img: {
        url: "",
        publicID: "",
      },
      userID: "->users.admin",
    },
    industrial: {
      title: "Industrial Heritage",
      img: {
        url: "",
        publicID: "",
      },
      userID: "->users.admin",
    },
    palaces: {
      title: "Palaces & Gardens",
      img: {
        url: "",
        publicID: "",
      },
      userID: "->users.admin",
    },
  },
  pointofinterests: {
    _model: "PointOfInterest",

    // Religious
    aachen_cathedral: {
      name: "Aachen Cathedral",
      description:
        "Construction of this chapel-basilica, with its octagonal dome and core, began about 790-800 under Emperor Charlemagne. It was the first German monument to be inscribed on the UNESCO list.",
      location: { lat: "50.7747", lng: "6.0839" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.religious",
      createdAt: 1740265200,
    },
    speyer_cathedral: {
      name: "Speyer Cathedral",
      description:
        "A majestic Romanesque basilica with four towers and two domes, founded by Konrad II in 1030. It was the burial place of German emperors for almost 300 years.",
      location: { lat: "49.3172", lng: "8.4424" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.religious",
      createdAt: 1740265200,
    },
    wies_church: {
      name: "Pilgrimage Church of Wies",
      description:
        "A miraculous preservation of Bavarian Rococo. Built by Dominikus Zimmermann, it is famous for its light-filled interior and complex ceiling frescoes.",
      location: { lat: "47.6808", lng: "10.9001" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.religious",
      createdAt: 1740438000,
    },
    hildesheim_cathedral: {
      name: "St. Mary's Cathedral & St. Michael's Church",
      description:
        "These two churches in Hildesheim are exceptional examples of Ottonian Romanesque art, featuring the famous Bernward Doors and the 1,000-year-old rosebush.",
      location: { lat: "52.1489", lng: "9.9472" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.religious",
      createdAt: 1740697200,
    },
    lorsch_abbey: {
      name: "Abbey and Altenmünster of Lorsch",
      description:
        "The Torhall (Gatehouse) is one of the few surviving architectural remains from the Carolingian period, blending Roman and Germanic styles.",
      location: { lat: "49.6536", lng: "8.5700" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.religious",
      createdAt: 1740870000,
    },
    maulbronn_monastery: {
      name: "Maulbronn Monastery Complex",
      description:
        "Founded in 1147, it is the most complete and best-preserved medieval Cistercian monastery complex north of the Alps, featuring a sophisticated water system.",
      location: { lat: "49.0001", lng: "8.8123" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.religious",
      createdAt: 1741042800,
    },
    cologne_cathedral: {
      name: "Cologne Cathedral",
      description:
        "A masterpiece of High Gothic architecture. Despite being damaged in WWII, its twin spires remain a symbol of European Christianity and German identity.",
      location: { lat: "50.9413", lng: "6.9583" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.religious",
      createdAt: 1741042800,
    },
    luther_memorials: {
      name: "Luther Memorials (Eisleben/Wittenberg)",
      description:
        "Sites related to the life of Martin Luther and his fellow reformer Melanchthon, representing one of the most significant events in European history: the Reformation.",
      location: { lat: "51.8664", lng: "12.6496" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.religious",
      createdAt: 1741388400,
    },
    reichenau_island: {
      name: "Monastic Island of Reichenau",
      description:
        "Located on Lake Constance, this island features three medieval churches that were major centers of art, science, and manuscript illumination in the 10th century.",
      location: { lat: "47.6917", lng: "9.0642" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.religious",
      createdAt: 1741388400,
    },
    corvey_abbey: {
      name: "Carolingian Westwork and Civitas Corvey",
      description:
        "The only surviving Westwork from the Carolingian era, showing the transition from antiquity to the Middle Ages through its architecture and paintings.",
      location: { lat: "51.7783", lng: "9.4103" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.religious",
      createdAt: 1741388400,
    },
    naumburg_cathedral: {
      name: "Naumburg Cathedral",
      description:
        "A unique testimony to medieval art and architecture, famous for the 'Naumburg Master' and the lifelike statues of its twelve founders.",
      location: { lat: "51.1542", lng: "11.8039" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.religious",
      createdAt: 1741993200,
    },
    shum_sites: {
      name: "ShUM Sites of Speyer, Worms and Mainz",
      description:
        "These three Rhine cities were the center of Jewish life and scholarship in Europe during the Middle Ages, shaping Jewish culture for centuries.",
      location: { lat: "49.6294", lng: "8.3619" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.religious",
      createdAt: 1741993200,
    },
    moravian_settlements: {
      name: "Moravian Church Settlements (Herrnhut)",
      description:
        "A transboundary site showcasing the planned urban settlements of the Moravian Church, emphasizing social equality and community-focused living.",
      location: { lat: "51.0180", lng: "14.7436" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.religious",
      createdAt: 1742166000,
    },

    // Palaces and Gardens
    wurzburg_residence: {
      name: "Würzburg Residence",
      description:
        "One of the most important Baroque palaces in Europe, famous for its grand staircase and the massive ceiling fresco by Tiepolo.",
      location: { lat: "49.7928", lng: "9.9388" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.palaces",
      createdAt: 1742511600,
    },
    augustusburg_brühl: {
      name: "Castles of Augustusburg and Falkenlust",
      description:
        "Built for the Prince-Archbishop of Cologne, these are early examples of German Rococo, featuring a magnificent staircase and hunting lodge.",
      location: { lat: "50.8275", lng: "6.9083" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.palaces",
      createdAt: 1744063200,
    },
    potsdam_palaces: {
      name: "Palaces and Parks of Potsdam and Berlin",
      description:
        "With over 500 hectares of parks and 150 buildings, this ensemble (including Sanssouci) represents the artistic unity of 18th and 19th-century Prussian culture.",
      location: { lat: "52.4042", lng: "13.0385" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.palaces",
      createdAt: 1744063200,
    },
    wartburg_castle: {
      name: "Wartburg Castle",
      description:
        "An iconic medieval castle where Martin Luther translated the New Testament into German. It is a symbol of German unity and history.",
      location: { lat: "50.9664", lng: "10.3061" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.palaces",
      createdAt: 1744408800,
    },
    dessau_worlitz: {
      name: "Garden Kingdom of Dessau-Wörlitz",
      description:
        "An 18th-century landscape park that applied Enlightenment ideals to garden design, integrating buildings, sculpture, and nature.",
      location: { lat: "51.8464", lng: "12.4189" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.palaces",
      createdAt: 1744581600,
    },
    muskau_park: {
      name: "Muskau Park / Park Mużakowski",
      description:
        "A border-crossing landscape park created by Prince Pückler-Muskau, blending man-made structures with the natural landscape of the Neisse river valley.",
      location: { lat: "51.5475", lng: "14.7231" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.palaces",
      createdAt: 1745186400,
    },
    wilhelmshohe_park: {
      name: "Bergpark Wilhelmshöhe",
      description:
        "A monumental landscape park in Kassel featuring the Hercules monument and water displays that operate via natural pressure.",
      location: { lat: "51.3158", lng: "9.3925" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.palaces",
      createdAt: 1745618400,
    },
    bayreuth_opera: {
      name: "Margravial Opera House Bayreuth",
      description:
        "A masterpiece of Baroque theater architecture, it is the only remaining example of its kind where the original audience can experience the acoustics of the era.",
      location: { lat: "49.9444", lng: "11.5781" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.palaces",
      createdAt: 1747951200,
    },
    schwerin_residence: {
      name: "Schwerin Residence Ensemble",
      description:
        "Inscribed in 2024, this 'Fairytale Castle' and its administrative buildings highlight the peak of 19th-century historicist architecture in Northern Germany.",
      location: { lat: "53.6247", lng: "11.4189" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.palaces",
      createdAt: 1747951200,
    },
    ludwig_castles: {
      name: "Palaces of King Ludwig II (Neuschwanstein)",
      description:
        "Inscribed in 2025, these Bavarian landmarks (Neuschwanstein, Linderhof, Herrenchiemsee) represent the romantic revival and advanced 19th-century technology.",
      location: { lat: "47.5576", lng: "10.7498" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.palaces",
      createdAt: 1747605600,
    },

    // Industrial
    rammelsberg_goslar: {
      name: "Mines of Rammelsberg and Goslar",
      description:
        "Operated for 1,000 years, this mining complex fueled the wealth of the town of Goslar and showcases centuries of engineering progress.",
      location: { lat: "51.8903", lng: "10.4186" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.industrial",
      createdAt: 1748124000,
    },
    volklingen_ironworks: {
      name: "Völklingen Ironworks",
      description:
        "The only intact ironworks from the golden age of the iron and steel industry, now a massive cultural venue and industrial museum.",
      location: { lat: "49.2503", lng: "6.8447" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.industrial",
      createdAt: 1748296800,
    },
    zollverein_mine: {
      name: "Zollverein Coal Mine Industrial Complex",
      description:
        "A masterpiece of Modernist industrial architecture in Essen. Once the largest coal mine in the world, it is now the 'Eiffel Tower of the Ruhr'.",
      location: { lat: "51.4858", lng: "7.0442" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.industrial",
      createdAt: 1748988000,
    },
    fagus_factory: {
      name: "Fagus Factory in Alfeld",
      description:
        "Designed by Walter Gropius, this factory is a landmark of modern architecture, featuring revolutionary glass and steel curtain walls.",
      location: { lat: "51.9847", lng: "9.8119" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.industrial",
      createdAt: 1749160800,
    },
    speicherstadt_hamburg: {
      name: "Speicherstadt and Kontorhaus District",
      description:
        "The largest historic warehouse complex in the world, built on oak piles in Hamburg, representing the growth of international trade.",
      location: { lat: "53.5437", lng: "9.9917" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.industrial",
      createdAt: 1749852000,
    },
    erzgebirge_mining: {
      name: "Erzgebirge/Krušnohoří Mining Region",
      description:
        "A cross-border landscape between Saxony and Czechia, showcasing 800 years of silver and tin mining that transformed European technology.",
      location: { lat: "50.6272", lng: "13.2675" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.industrial",
      createdAt: 1750456800,
    },
    augsburg_water: {
      name: "Water Management System of Augsburg",
      description:
        "A sophisticated system of water towers, canals, and pumping stations dating back to the 14th century, documenting the history of hydro-technology.",
      location: { lat: "48.3665", lng: "10.8944" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.industrial",
      createdAt: 1750456800,
    },

    // Historic Town Centers and Sites
    trier_monuments: {
      name: "Roman Monuments in Trier",
      description:
        "Known as the 'Second Rome', Trier contains the best-preserved Roman gate (Porta Nigra), amphitheater, and imperial baths north of the Alps.",
      location: { lat: "49.7597", lng: "6.6440" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.sites",
      createdAt: 1768086000,
    },
    lubeck_city: {
      name: "Hanseatic City of Lübeck",
      description:
        "The former capital of the Hanseatic League, famous for its brick Gothic architecture, the Holstentor gate, and its historic trading soul.",
      location: { lat: "53.8665", lng: "10.6847" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.sites",
      createdAt: 1750456800,
    },
    bamberg_town: {
      name: "Town of Bamberg",
      description:
        "Built on seven hills, this medieval town plan layout remained intact through WWII, featuring the unique Old Town Hall on a bridge.",
      location: { lat: "49.8917", lng: "10.8869" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.sites",
      createdAt: 1751061600,
    },
    quedlinburg_town: {
      name: "Old Town of Quedlinburg",
      description:
        "An exceptional example of a European medieval town, featuring over 1,300 half-timbered houses and a Romanesque castle church.",
      location: { lat: "51.7891", lng: "11.1414" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.sites",
      createdAt: 1752530400,
    },
    classical_weimar: {
      name: "Classical Weimar",
      description:
        "The cultural heart of 18th-century Germany, home to Goethe and Schiller, reflecting the intellectual peak of the Enlightenment.",
      location: { lat: "50.9794", lng: "11.3297" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.sites",
      createdAt: 1752876000,
    },
    museum_island: {
      name: "Museum Island, Berlin",
      description:
        "Five world-renowned museums built between 1824 and 1930, illustrating the evolution of modern museum design and archaeology.",
      location: { lat: "52.5169", lng: "13.3984" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.sites",
      createdAt: 1754949600,
    },
    stralsund_wismar: {
      name: "Historic Centres of Stralsund and Wismar",
      description:
        "Two Baltic ports that preserve the wealth and architectural style of the Hanseatic League through brick Gothic monuments.",
      location: { lat: "54.3153", lng: "13.0905" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.sites",
      createdAt: 1768086000,
    },
    bremen_town_hall: {
      name: "Town Hall and Roland on the Marketplace of Bremen",
      description:
        "The Town Hall and the statue of Roland are exceptional symbols of civic liberty and autonomy in the Holy Roman Empire.",
      location: { lat: "53.0762", lng: "8.8083" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.sites",
      createdAt: 1755813600,
    },
    regensburg_old_town: {
      name: "Old Town of Regensburg",
      description:
        "A perfectly preserved medieval city on the Danube, showing the layers of Roman, Romanesque, and Gothic history.",
      location: { lat: "49.0203", lng: "12.0975" },
      img: [
        {
          url: "http://res.cloudinary.com/dif8elawf/image/upload/v1768697824/fo9imogsjrxwc1dhsk0f.png",
          publicID: "fo9imogsjrxwc1dhsk0f",
        },
        {
          url: "http://res.cloudinary.com/dif8elawf/image/upload/v1768697837/uelwbpc7kvcofbqhxoba.png",
          publicID: "uelwbpc7kvcofbqhxoba",
        },
      ],
      categoryID: "->categories.sites",
      createdAt: 1768086000,
    },
    berlin_modernism: {
      name: "Berlin Modernism Housing Estates",
      description:
        "Six housing estates built between 1913 and 1934, representing the social and aesthetic innovations of modern urban housing.",
      location: { lat: "52.4181", lng: "13.4547" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.sites",
      createdAt: 1757973600,
    },
    erfurt_heritage: {
      name: "Jewish-Medieval Heritage of Erfurt",
      description:
        "Includes the Old Synagogue (one of the oldest in Europe), the Mikveh, and the Stone House, documenting a vibrant medieval Jewish community.",
      location: { lat: "50.9786", lng: "11.0289" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.sites",
      createdAt: 1757109600,
    },
    spa_towns: {
      name: "Great Spa Towns of Europe (Baden-Baden/Ems/Kissingen)",
      description:
        "These three German towns represent the international spa culture of the 18th and 19th centuries, combining medical use with grand architecture.",
      location: { lat: "48.7622", lng: "8.2394" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.sites",
      createdAt: 1761606000,
    },

    // Nature
    messel_pit: {
      name: "Messel Pit Fossil Site",
      description:
        "A former oil shale quarry that yielded some of the world's most perfectly preserved fossils from the Eocene era.",
      location: { lat: "49.9172", lng: "8.7558" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.nature",
      createdAt: 1761692400,
    },
    wadden_sea: {
      name: "The Wadden Sea",
      description:
        "A unique intertidal ecosystem stretching across the German North Sea coast, vital for millions of migratory birds.",
      location: { lat: "53.8333", lng: "8.5000" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.nature",
      createdAt: 1760133600,
    },
    beech_forests: {
      name: "Ancient and Primeval Beech Forests",
      description:
        "Representing the post-glacial spread of the European beech, these forests are essential for studying forest evolution and biodiversity.",
      location: { lat: "54.5189", lng: "13.6544" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.nature",
      createdAt: 1762383600,
    },

    // Routes and Architecture
    middle_rhine: {
      name: "Upper Middle Rhine Valley",
      description:
        "The 'Romantic Rhine', a cultural landscape defined by castles, historic towns, and vineyards along the river.",
      location: { lat: "50.1394", lng: "7.7194" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.routes",
      createdAt: 1762642800,
    },
    roman_limes: {
      name: "Frontiers of the Roman Empire (Limes)",
      description:
        "The 550km border defense system built by the Romans to separate the Empire from Germanic tribes.",
      location: { lat: "50.3114", lng: "8.5714" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.routes",
      createdAt: 1763247600,
    },
    bauhaus_dessau: {
      name: "Bauhaus and its Sites",
      description:
        "The cradle of modernism in Weimar, Dessau, and Bernau. These buildings revolutionized architecture in the 20th century.",
      location: { lat: "51.8392", lng: "12.2272" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.routes",
      createdAt: 1765321200,
    },
    pile_dwellings: {
      name: "Prehistoric Pile Dwellings around the Alps",
      description:
        "Underwater remains of settlements from 5000 to 500 BC, offering unique insights into early agrarian life.",
      location: { lat: "47.7265", lng: "9.2277" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.routes",
      createdAt: 1765839600,
    },
    le_corbusier: {
      name: "The Architectural Work of Le Corbusier (Weissenhof)",
      description:
        "Two houses in Stuttgart designed by Le Corbusier, proving the international reach of modern architectural principles.",
      location: { lat: "48.8000", lng: "9.1775" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.routes",
      createdAt: 1766530800,
    },
    ice_age_caves: {
      name: "Caves and Ice Age Art in the Swabian Jura",
      description:
        "The site of some of the oldest figurative art and musical instruments ever discovered (up to 43,000 years old).",
      location: { lat: "48.4528", lng: "10.1542" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.routes",
      createdAt: 1767999600,
    },
    hedeby_danevirke: {
      name: "Hedeby and the Danevirke",
      description:
        "A Viking-age trading center and defensive wall system that connected the North Sea and the Baltic Sea.",
      location: { lat: "54.4842", lng: "9.5608" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.routes",
      createdAt: 1768258800,
    },
    danube_limes: {
      name: "Frontiers of the Roman Empire – Danube Limes",
      description:
        "The western segment of the Roman Empire's border defenses along the Danube river in Bavaria.",
      location: { lat: "48.9175", lng: "12.1814" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.routes",
      createdAt: 1768258800,
    },
    lower_german_limes: {
      name: "Frontiers of the Roman Empire – Lower German Limes",
      description:
        "The Roman border line following the Rhine, featuring archaeological remains of forts and settlements.",
      location: { lat: "51.6583", lng: "6.6111" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.routes",
      createdAt: 1768604400,
    },
    mathildenhöhe: {
      name: "Mathildenhöhe Darmstadt",
      description:
        "An artist colony founded in 1899 that became a center for emerging Reform movements in architecture and design.",
      location: { lat: "49.8772", lng: "8.6672" },
      img: [{ url: "", publicID: "" }],
      categoryID: "->categories.routes",
      createdAt: 1768690800,
    },
  },
};
