/*********************************************************
 * PRICING DATA FROM CSV
 *********************************************************/
const csvPrices = {"apple_tv": 198.0, "sunbrite_43": 1650.95, "sunbrite_mount": 178.95, "projector_mount": 399.0, "epson_3800": 1699.99, "epson_ls9000": 3999.0, "sony_projector": 5999.99, "denon_soundbar": 699.0, "tv_labor": 265.0, "sonos_amp": 799.99, "sonos_era": 249.95, "denon_x1800": 862.65, "denon_x3800": 1699.0, "origin100": 399.0, "origin300": 649.0, "origin_lcr": 1299.0, "hdmi": 90.0, "power": 125.0, "labor": 120.0, "program": 150.0, "prewire714": 345.0, "prewire724": 365.0, "c4_dimmer": 244.95, "c4_keypad": 340.99, "ovrc": 20.0};

// Additional product aliases and fallbacks used by the updated product rules.
csvPrices.sonos_arc_ultra = csvPrices.sonos_arc_ultra || 1099;
csvPrices.samsung_terrace = csvPrices.samsung_terrace || 999.99;

// Origin is now preferred over Origin for architectural speakers.
csvPrices.origin_d65 = csvPrices.origin_d65 || 401;
csvPrices.origin_d85 = csvPrices.origin_d85 || 650;
csvPrices.origin_lcr = csvPrices.origin_lcr || 1700;
csvPrices.outdoor_speaker = csvPrices.outdoor_speaker || 535;


/*********************************************************
 * QUESTIONNAIRE DATA
 *********************************************************/
const questions = [
  ["What is this system for?", [
    ["Residential", "For home theater, living room TV, outdoor entertainment, or whole-home audio."],
    ["Commercial", "For office, conference room, training room, or business display needs."]
  ]],
  ["Which room or area?", [
    ["Living Room", "Everyday movies, sports, TV, and music."],
    ["Dedicated Theater", "More cinematic viewing and immersive surround."],
    ["Conference Room", "Presentation display and room control."],
    ["Outdoor", "Weather-aware outdoor TV or audio."],
    ["Multi-Room", "Music or AV across several areas."]
  ]],
  ["Primary use?", [
    ["Movies & TV", "Prioritize picture quality and comfortable watching."],
    ["Music Listening", "Prioritize casting and speakers."],
    ["Sports & Gaming", "Bright screen, motion handling, and response time."],
    ["Business Presentations", "Prioritize reliable displays and control."],
    ["Whole-Home Audio", "Prioritize zones and easy music access."]
  ]],
  ["Budget direction?", [
    ["Best Value", "Clean upgrade that can grow later."],
    ["Best Overall", "Balanced performance and value."],
    ["Premium Experience", "High-end immersive performance."]
  ]]
];

/*********************************************************
 * PACKAGE CARD DATA
 *********************************************************/
const packages = [
  {
    id: "overall",
    badge: "Best Overall",
    name: "TV + Music Casting",
    img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1200&auto=format&fit=crop",
    summary: "High-quality TV plus speakers for wireless music casting.",
    bullets: [
      "Excellent picture + music listening",
      "Includes casting-focused speaker path",
      "Customizable by brand, size, type, and resolution"
    ]
  },
  {
    id: "premium",
    badge: "Premium Experience",
    name: "Immersive Home Theater",
    img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop",
    summary: "Full surround sound with speakers (in-wall or in-ceiling) paired with premium TV or projector choices.",
    bullets: [
      "Premium TV or projector",
      "Surround speakers (in-wall or in-ceiling)",
      "Expandable to lighting and acoustics"
    ]
  },
  {
    id: "value",
    badge: "Best Value",
    name: "Smart TV + Audio Upgrade",
    img: "https://images.unsplash.com/photo-1601944179066-29786cb9d32a?q=80&w=1200&auto=format&fit=crop",
    summary: "A capable TV with easy audio upgrade options and room to expand later.",
    bullets: [
      "Budget-friendly starting point",
      "Smart TV configuration",
      "Optional soundbar or casting speakers"
    ]
  }
];

/*********************************************************
 * PRODUCT TYPE DATA
 * -------------------------------------------------------
 * Each product type has its own brand/model, size, type,
 * and resolution choices. This is what makes the builder
 * specific to the customer's selected product type.
 *********************************************************/
const productTypes = [
  {
    id: "indoorTv",
    name: "Indoor TV",
    img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1200&auto=format&fit=crop",
    desc: "Best for living rooms, bedrooms, and casual media spaces.",
    brands: [["Sony", 0], ["Samsung", 0], ["LG", 0]],
    sizes: [["55 inch", 1200], ["65 inch", 1800], ["75 inch", 2800], ["85 inch", 4200], ["98+ inch", 7000]],
    types: [["OLED — best contrast", 1200], ["QLED/Mini-LED — brighter rooms", 850], ["LED — value option", 350]],
    resolutions: [["4K", 0]],
    audioAllowed: ["soundbar", "surround", "audiophile", "none"]
  },
  {
    id: "projector",
    name: "Theater / Projector + Screen",
    img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop",
    desc: "Best for dedicated theaters and large cinematic viewing.",
    brands: [
      ["Epson LS9000", csvPrices.epson_ls9000],
      ["Sony VPL-XW5000ES", csvPrices.sony_projector],
      ["Epson QB1000", 7999]
    ],
    sizes: [["120 inch screen", 1400], ["135 inch screen", 2400], ["150 inch screen", 3200]],
    types: [["Standard screen", 0], ["Acoustically transparent screen", 1800]],
    resolutions: [["4K", 0]],
    audioAllowed: ["surround", "audiophile", "none"]
  },
  {
    id: "outdoorTv",
    name: "Outdoor TV",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    desc: "Best for patios, porches, and weather-aware entertainment areas.",
    brands: [
      ["SunBrite", csvPrices.sunbrite_43],
      ["Samsung Terrace", csvPrices.samsung_terrace]
    ],
    sizes: [["43 inch", 0], ["55 inch", 950], ["65 inch", 1500], ["75 inch", 2300]],
    types: [["Full-shade outdoor TV", 0], ["Partial-sun outdoor TV", 900], ["Samsung Full Sun", 2600]],
    resolutions: [["4K", 0]],
    audioAllowed: ["outdoorStereo", "none"]
  },
  {
    id: "commercial",
    name: "Commercial Display",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
    desc: "Best for conference rooms, offices, signage, and presentation spaces.",
    brands: [["Samsung", 2400], ["LG", 2300], ["Sony", 2600]],
    sizes: [["65 inch", 2100], ["75 inch", 3300], ["85 inch", 5000], ["100 inch", 8500]],
    types: [["Standard TV", 0], ["Commercial display", 950], ["Video conference display", 1200], ["Digital signage display", 800], ["Video Wall", 2500]],
    resolutions: [["4K", 0]],
    audioAllowed: ["commercialBasic", "micPa", "none"]
  }
];

    /*********************************************************
 * AUDIO, SUPPORTING ITEMS, ADD-ONS, SITE CONDITIONS
 *********************************************************/
const audioOptionsData = [
  ["none", "No Audio Add-On", "No added audio system. Display-only setup.", 0],
  ["soundbar", "Sonos Arc Ultra Soundbar", "Sonos Arc Ultra soundbar plus TV setup labor.", Math.round(csvPrices.sonos_arc_ultra + csvPrices.tv_labor)],
  ["surround", "Full Surround System (in-wall)", "Denon AVR-X1800H + Origin architectural in-wall speakers + prewire + estimated labor.", Math.round(csvPrices.denon_x1800 + (5 * csvPrices.origin_d65) + csvPrices.prewire714 + (6 * csvPrices.labor))],
  ["audiophile", "Premium Audiophile Setup (in-wall)", "Denon AVR-X3800H + premium Origin architectural in-wall speakers + 7.2.4 prewire + estimated labor.", Math.round(csvPrices.denon_x3800 + (3 * csvPrices.origin_lcr) + (4 * csvPrices.origin_d85) + csvPrices.prewire724 + (10 * csvPrices.labor))],
  ["outdoorStereo", "Streaming Stereo System + Outdoor Speakers", "Streaming stereo amplifier plus outdoor speakers for patio or outdoor audio.", Math.round(csvPrices.sonos_amp + (2 * csvPrices.outdoor_speaker) + csvPrices.tv_labor)],
  ["commercialBasic", "Commercial Display Audio", "Basic audio support for a commercial display or conference room.", 1200],
  ["micPa", "Microphone + PA System", "Commercial microphone and PA system for presentations, meetings, or events.", 5000]
];

    const requiredBase = [
  ["Premium HDMI / Low-Voltage Cabling", "CSV item add 16/4 + CAT6.", Math.round(csvPrices.hdmi)],
  ["Power / Outlet Preparation", "CSV item AC Outlet.", Math.round(csvPrices.power)],
  ["Professional Installation Package", "Estimated 4 tech-hours at CSV labor rate.", Math.round(4 * csvPrices.labor)],
  ["System Calibration & Setup", "Estimated 2 programming/setup hours.", Math.round(2 * csvPrices.program)],
  ["Apple TV 4K Streaming Device If Needed", "Apple TV 128GB WiFi/Ethernet 4K.", Math.round(csvPrices.apple_tv)]
];

const addons = [
  ["Motorized Shades", 0],
  ["Additional Zone for Whole-Home Music", Math.round(csvPrices.sonos_amp + (2 * csvPrices.origin100) + 225), "Sonos Amp + two Origin speakers + audio zone labor."],
  ["Lighting Control Integration", Math.round(csvPrices.c4_dimmer + csvPrices.c4_keypad + (2 * csvPrices.program)), "Control4 dimmer + keypad + programming."],
  ["Acoustic Treatments", 0],
  ["Extended Service Plan", Math.round(12 * csvPrices.ovrc), "12 months of OVRC Monitoring."]
];

const siteConditions = [
  "Wires already run in the walls",
  "No existing wiring",
  "Unfinished utility closet nearby",
  "Finished walls/ceiling may require extra labor",
  "Outdoor or special location",
  "Customer wants everything hidden"
];

/*********************************************************
 * APP STATE
 *********************************************************/
let step = 0;
let answers = {};
let selectedPackage = "overall";
let productType = "indoorTv";
let selectedAudio = "soundbar";
let selectedAddons = [];
let selectedSites = [];
let selectedConfigByProduct = {};

/*********************************************************
 * GENERAL HELPERS
 *********************************************************/
function money(amount) {
  return Number(amount || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });
}

function go(pageId) {
  document.querySelectorAll(".page").forEach(page => page.classList.add("hidden"));
  document.getElementById(pageId).classList.remove("hidden");

  if (pageId === "quiz") renderQuestion();
  if (pageId === "results") renderResults();
  if (pageId === "builderPage") renderBuilder();
  if (pageId === "review") renderReview();

  window.scrollTo(0, 0);
}

function getProduct() {
  return productTypes.find(product => product.id === productType) || productTypes[0];
}

function getSelectValue(id) {
  const element = document.getElementById(id);
  return element ? Number(element.value || 0) : 0;
}

function getSelectLabel(id) {
  const element = document.getElementById(id);
  return element && element.selectedOptions[0] ? element.selectedOptions[0].textContent : "";
}

function getProductConfig() {
  if (!selectedConfigByProduct[productType]) {
    selectedConfigByProduct[productType] = {
      brand: 0,
      size: 0,
      type: 0,
      resolution: 0
    };
  }

  return selectedConfigByProduct[productType];
}

function saveProductConfig(key, index) {
  getProductConfig()[key] = Number(index || 0);
  updateTotals();

  if (key === "size") {
    renderScreenVisuals();
  }
}

/*********************************************************
 * QUESTIONNAIRE FUNCTIONS
 *********************************************************/
function renderQuestion() {
  qcount.textContent = `Question ${step + 1} of ${questions.length}`;
  qbar.style.width = `${((step + 1) / questions.length) * 100}%`;
  qtitle.textContent = questions[step][0];

  options.innerHTML = questions[step][1].map(option => `
    <div class="option ${answers[step] === option[0] ? "active" : ""}" onclick="answers[${step}]='${option[0]}';renderQuestion()">
      <strong>${option[0]}</strong>
      <span>${option[1]}</span>
    </div>
  `).join("");
}

function nextQuestion() {
  if (step < questions.length - 1) {
    step++;
    renderQuestion();
  } else {
    showLoading();
  }
}

function backQuestion() {
  if (step > 0) {
    step--;
    renderQuestion();
  } else {
    go("landing");
  }
}

/*********************************************************
 * LOADING SCREEN
 *********************************************************/
function showLoading() {
  go("loading");

  const tips = [
    "Screen size options change based on product type.",
    "Existing wiring can lower labor estimates.",
    "High-end audio is labeled in-wall or in-ceiling."
  ];

  let i = 0;
  const timer = setInterval(() => {
    tip.textContent = tips[i++ % tips.length];
  }, 1000);

  setTimeout(() => {
    clearInterval(timer);
    go("results");
  }, 2300);
}

/*********************************************************
 * RESULTS DASHBOARD
 *********************************************************/
function renderResults() {
  const room = answers[1] || "your space";
  resultHeadline.textContent = `3 SYSTEMS FOR ${room.toUpperCase()}`;

  packageCards.innerHTML = packages.map(packageItem => `
    <article class="card">
      <img src="${packageItem.img}" alt="${packageItem.name}">
      <div class="pad">
        <span class="badge">${packageItem.badge}</span>
        <h3>${packageItem.name}</h3>
        <p>${packageItem.summary}</p>
        <ul>${packageItem.bullets.map(bullet => `<li>${bullet}</li>`).join("")}</ul>
        <button onclick="selectPackage('${packageItem.id}')">Customize This Package →</button>
      </div>
    </article>
  `).join("");
}

function selectPackage(id) {
  selectedPackage = id;

  // Default product/audio choices based on selected package
  if (id === "premium") {
    productType = "projector";
    selectedAudio = "surround";
  }
  if (id === "overall") {
    productType = "indoorTv";
    selectedAudio = "soundbar";
  }
  if (id === "value") {
    productType = "indoorTv";
    selectedAudio = "soundbar";
  }

  go("builderPage");
}

/*********************************************************
 * PACKAGE BUILDER FUNCTIONS
 *********************************************************/
function renderBuilder() {
  const packageItem = packages.find(item => item.id === selectedPackage) || packages[0];
  const product = getProduct();

  builderTitle.textContent = packageItem.name.toUpperCase();
  builderBadge.textContent = packageItem.badge;

  renderProductTypeGrid();
  renderDynamicProductConfig(product);
  renderScreenVisuals();
  renderAudioOptions();
  renderRequiredItems();
  renderSiteOptions();
  renderOptionalItems();
  updateTotals();
}

function renderProductTypeGrid() {
  productTypeGrid.innerHTML = productTypes.map(product => `
    <div class="ptype ${productType === product.id ? "active" : ""}" onclick="productType='${product.id}';renderBuilder()">
      <img src="${product.img}" alt="${product.name}">
      <div>
        <strong>${product.name}</strong>
        <span>${product.desc}</span>
      </div>
    </div>
  `).join("");
}

function renderDynamicProductConfig(product) {
  configTitle.textContent = `2. Configure ${product.name}`;
  configDescription.textContent = product.desc + " The choices below are specific to this product type.";
  const config = getProductConfig();

  dynamicConfig.innerHTML = `
    <label>Brand / Model
      <select id="brandSelect" onchange="saveProductConfig('brand', this.selectedIndex)">
        ${product.brands.map((item, index) => `<option value="${item[1]}" ${index === config.brand ? "selected" : ""}>${item[0]}${item[1] ? " — " + money(item[1]) : ""}</option>`).join("")}
      </select>
    </label>

    <label>Screen Size
      <select id="sizeSelect" onchange="saveProductConfig('size', this.selectedIndex)">
        ${product.sizes.map((item, index) => `<option value="${item[1]}" ${index === config.size ? "selected" : ""}>${item[0]}${item[1] ? " — " + money(item[1]) : ""}</option>`).join("")}
      </select>
    </label>

    <label>Screen Type
      <select id="typeSelect" onchange="saveProductConfig('type', this.selectedIndex)">
        ${product.types.map((item, index) => `<option value="${item[1]}" ${index === config.type ? "selected" : ""}>${item[0]}${item[1] ? " — " + money(item[1]) : ""}</option>`).join("")}
      </select>
    </label>

    <label>Resolution
      <select id="resolutionSelect" onchange="saveProductConfig('resolution', this.selectedIndex)">
        ${product.resolutions.map((item, index) => `<option value="${item[1]}" ${index === config.resolution ? "selected" : ""}>${item[0]}${item[1] ? " — " + money(item[1]) : ""}</option>`).join("")}
      </select>
    </label>
  `;
}

function renderScreenVisuals() {
  const product = getProduct();
  const selectedSize = getSelectLabel("sizeSelect").split("—")[0].trim();
  const maxIndex = Math.max(1, product.sizes.length - 1);

  screenVisuals.innerHTML = product.sizes.map((size, index) => {
    const width = 54 + (index / maxIndex) * 86;
    const height = width * 0.56;
    const label = size[0];
    const isActive = label === selectedSize;

    return `
      <div class="screen-box ${isActive ? "active" : ""}" onclick="selectScreenSize(${index})" title="Select ${label}">
        <div class="screen ${isActive ? "active" : ""}" style="width:${width}px;height:${height}px"></div>
        <b>${label}</b>
        ${isActive ? "<span>Selected</span>" : "<span>Click to select</span>"}
      </div>
    `;
  }).join("");
}

function selectScreenSize(index) {
  const sizeSelect = document.getElementById("sizeSelect");
  if (!sizeSelect) return;

  sizeSelect.selectedIndex = index;
  saveProductConfig("size", index);
}

function renderAudioOptions() {
  const product = getProduct();
  const allowedAudioIds = product.audioAllowed || audioOptionsData.map(audio => audio[0]);
  const filteredAudio = audioOptionsData.filter(audio => allowedAudioIds.includes(audio[0]));

  // If the current audio choice is not valid for this product type,
  // automatically select the first valid option.
  if (!allowedAudioIds.includes(selectedAudio)) {
    selectedAudio = filteredAudio[0]?.[0] || "none";
  }

  audioOptions.innerHTML = filteredAudio.map(audio => `
    <div class="option ${selectedAudio === audio[0] ? "active" : ""}" onclick="selectedAudio='${audio[0]}';renderBuilder()">
      <strong>${audio[1]}</strong>
      <span>${audio[2]}<br>${audio[3] > 0 ? money(audio[3]) + " estimate" : "No added cost"}</span>
    </div>
  `).join("");
}

    function getRequiredItems() {
  const items = [...requiredBase];

  if (productType === "projector") {
    items.unshift(["Projector Mount", "Chief Mounts CHF4500 from uploaded item list.", Math.round(csvPrices.projector_mount)]);
  } else {
    items.unshift(["Display Mount", "Wall/display mount estimate from uploaded item list where available.", Math.round(csvPrices.sunbrite_mount || 179)]);
  }

  return items;
}

function renderRequiredItems() {
  requiredItems.innerHTML = getRequiredItems().map(item => `
    <div class="line">
      <span><b>${item[0]}</b><small>${item[1]}</small></span>
      <b>${money(item[2])}</b>
    </div>
  `).join("");
}

function renderSiteOptions() {
  siteOptions.innerHTML = siteConditions.map((condition, index) => `
    <div class="option ${selectedSites.includes(index) ? "active" : ""}" onclick="toggleSite(${index})">
      <strong>${condition}</strong>
      <span>Helps estimate labor and prep needs.</span>
    </div>
  `).join("");
}

function renderOptionalItems() {
  optionalItems.innerHTML = addons.map((addon, index) => `
    <div class="option ${selectedAddons.includes(index) ? "active" : ""}" onclick="toggleAddon(${index})">
      <strong>${addon[0]}</strong>
      <span>${addon[1] > 0 ? money(addon[1]) + " estimate" : "Quoted after review"}${addon[2] ? "<br>" + addon[2] : ""}</span>
    </div>
  `).join("");
}

function toggleAddon(index) {
  selectedAddons = selectedAddons.includes(index)
    ? selectedAddons.filter(item => item !== index)
    : [...selectedAddons, index];

  renderBuilder();
}

function toggleSite(index) {
  selectedSites = selectedSites.includes(index)
    ? selectedSites.filter(item => item !== index)
    : [...selectedSites, index];

  renderBuilder();
}

/*********************************************************
 * PRICING FUNCTIONS
 *********************************************************/
function totals() {
  const display =
    getSelectValue("brandSelect") +
    getSelectValue("sizeSelect") +
    getSelectValue("typeSelect") +
    getSelectValue("resolutionSelect");

  const product = getProduct();
  const allowedAudioIds = product.audioAllowed || audioOptionsData.map(item => item[0]);
  const validAudio = allowedAudioIds.includes(selectedAudio) ? selectedAudio : allowedAudioIds[0];
  const audio = (audioOptionsData.find(item => item[0] === validAudio) || audioOptionsData[0])[3];
  const support = getRequiredItems().reduce((sum, item) => sum + Number(item[2] || 0), 0);
  const add = selectedAddons.reduce((sum, index) => sum + Number(addons[index][1] || 0), 0);
  const tax = (display + audio + support + add) * 0.07;

  return {
    display,
    audio,
    support,
    add,
    tax,
    total: display + audio + support + add + tax
  };
}

function updateTotals() {
  const currentTotals = totals();

  displayTotal.textContent = money(currentTotals.display);
  audioTotal.textContent = money(currentTotals.audio);
  supportTotal.textContent = money(currentTotals.support);
  addonTotal.textContent = money(currentTotals.add);
  taxTotal.textContent = money(currentTotals.tax);
  grandTotal.textContent = money(currentTotals.total);
}

/*********************************************************
 * QUOTE DATA + REVIEW SUMMARY
 *********************************************************/
function collectQuoteData() {
  const product = getProduct();
  const currentTotals = totals();
  const allowedAudioIds = product.audioAllowed || audioOptionsData.map(item => item[0]);
  const validAudio = allowedAudioIds.includes(selectedAudio) ? selectedAudio : allowedAudioIds[0];
  const audio = audioOptionsData.find(item => item[0] === validAudio) || audioOptionsData[0];

  return {
    reference: `TI-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 89999)}`,
    customer: {
      name: customerName.value,
      email: customerEmail.value,
      phone: customerPhone.value,
      address: customerAddress.value,
      timeline: customerTimeline.value,
      notes: projectNotes.value
    },
    answers,
    package: (packages.find(item => item.id === selectedPackage) || packages[0]).name,
    productType: product.name,
    brandModel: getSelectLabel("brandSelect"),
    screenSize: getSelectLabel("sizeSelect"),
    screenType: getSelectLabel("typeSelect"),
    resolution: getSelectLabel("resolutionSelect"),
    audio: audio[1],
    siteConditions: selectedSites.map(index => siteConditions[index]),
    siteNotes: siteNotes.value,
    selectedAddons: selectedAddons.map(index => addons[index][0]),
    totals: currentTotals
  };
}

function renderReview() {
  const quote = collectQuoteData();

  reviewSummary.innerHTML = `
    <div class="line"><span>Product Type</span><b>${quote.productType}</b></div>
    <div class="line"><span>Brand / Model</span><b>${quote.brandModel}</b></div>
    <div class="line"><span>Screen Size</span><b>${quote.screenSize}</b></div>
    <div class="line"><span>Screen Type</span><b>${quote.screenType}</b></div>
    <div class="line"><span>Resolution</span><b>${quote.resolution}</b></div>
    <div class="line"><span>Audio</span><b>${quote.audio}</b></div>
    <div class="line"><span>Site Conditions</span><b>${quote.siteConditions.join(", ") || "No site conditions selected"}</b></div>
    <div class="line"><span>Site Notes</span><b>${quote.siteNotes || "No notes added"}</b></div>
    <div class="line"><span>Estimated Total</span><b class="price">${money(quote.totals.total)}</b></div>
    <p class="muted">Pricing is estimate-only and must be finalized after site review.</p>
  `;
}

function validateContactInfo() {
  const requiredFields = [
    customerName,
    customerEmail,
    customerPhone,
    customerAddress,
    customerTimeline
  ];
  const isValid = requiredFields.every(field => field.checkValidity());

  contactError.classList.toggle("hidden", isValid);

  if (!isValid) {
    const firstInvalid = requiredFields.find(field => !field.checkValidity());
    firstInvalid.reportValidity();
    firstInvalid.focus();
  }

  return isValid;
}

/*********************************************************
 * PDF / EMAIL SUBMISSION FUNCTIONS
 *********************************************************/

/*
  Creates a printable quote view.
  Customer or sales team can use the browser's Print > Save as PDF.
*/
function openPrintableQuote(quote) {
  const popup = window.open("", "_blank");

  popup.document.write(`
    <html>
      <head>
        <title>${quote.reference} Quote Package</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 32px; color: #111; }
          h1 { margin-bottom: 4px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          td, th { border: 1px solid #ccc; padding: 10px; text-align: left; }
          .total { font-size: 24px; font-weight: bold; }
          .note { margin-top: 24px; font-size: 13px; color: #555; }
        </style>
      </head>
      <body>
        <h1>Technology Interiors Quote Package</h1>
        <p><strong>Reference:</strong> ${quote.reference}</p>
        <p><strong>Customer:</strong> ${quote.customer.name || "Not provided"}</p>
        <p><strong>Email:</strong> ${quote.customer.email || "Not provided"}</p>
        <p><strong>Phone:</strong> ${quote.customer.phone || "Not provided"}</p>
        <p><strong>Address:</strong> ${quote.customer.address || "Not provided"}</p>
        <p><strong>Timeline:</strong> ${quote.customer.timeline || "Not provided"}</p>

        <table>
          <tr><th>Package</th><td>${quote.package}</td></tr>
          <tr><th>Product Type</th><td>${quote.productType}</td></tr>
          <tr><th>Brand / Model</th><td>${quote.brandModel}</td></tr>
          <tr><th>Screen Size</th><td>${quote.screenSize}</td></tr>
          <tr><th>Screen Type</th><td>${quote.screenType}</td></tr>
          <tr><th>Resolution</th><td>${quote.resolution}</td></tr>
          <tr><th>Audio</th><td>${quote.audio}</td></tr>
          <tr><th>Site Conditions</th><td>${quote.siteConditions.join(", ") || "None selected"}</td></tr>
          <tr><th>Site Notes</th><td>${quote.siteNotes || "None"}</td></tr>
          <tr><th>Add-ons</th><td>${quote.selectedAddons.join(", ") || "None selected"}</td></tr>
          <tr><th>Display</th><td>${money(quote.totals.display)}</td></tr>
          <tr><th>Audio</th><td>${money(quote.totals.audio)}</td></tr>
          <tr><th>Supporting Items</th><td>${money(quote.totals.support)}</td></tr>
          <tr><th>Optional Upgrades</th><td>${money(quote.totals.add)}</td></tr>
          <tr><th>Estimated Tax</th><td>${money(quote.totals.tax)}</td></tr>
          <tr><th class="total">Estimated Total</th><td class="total">${money(quote.totals.total)}</td></tr>
        </table>

        <p class="note">
          Pricing is an estimate only. Final price must be verified after site review and final design.
        </p>

        <script>
          window.onload = function() {
            window.print();
          };
        <\/script>
      </body>
    </html>
  `);

  popup.document.close();
}

/*
  Form delivery is handled by email.js and Netlify Forms.

  This page calls:
    sendTIQuoteEmail(quote)

  Netlify detects the hidden quote-request form in this HTML file
  and stores each submitted package request.
*/

async function submitPackage() {
  if (!validateContactInfo()) return;

  const quote = collectQuoteData();

  /*
    The external file email.js provides sendTIQuoteEmail().
    That function sends the customer's selections to Netlify Forms.
  */
  let emailResult = { success: false };

  if (typeof sendTIQuoteEmail === "function") {
    emailResult = await sendTIQuoteEmail(quote);
  } else {
    console.error("sendTIQuoteEmail() was not found. Make sure email.js is loaded.");
  }

  /*
    Keep the printable quote view so the team/customer can also
    save the quote as a PDF from the browser.
  */
  openPrintableQuote(quote);

  ref.textContent = emailResult.success
    ? `Reference #: ${quote.reference} — Request submitted successfully.`
    : `Reference #: ${quote.reference} — Submission failed. Please contact Technology Interiors.`;

  go("thanks");
}

/*********************************************************
 * INITIALIZE APP
 *********************************************************/
renderQuestion();
