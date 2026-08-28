/* ==========================================================================
   MAA VINDHYAVASINI PACKERS MOVERS AND TRANSPORT - MAIN JAVASCRIPT
   Contact: +91 80100 41007
   ========================================================================== */

const COMPANY_PHONE = "8010041007";
const COMPANY_NAME = "MAA VINDHYAVASINI PACKERS MOVERS AND TRANSPORT";
const COMPANY_NAME_HI = "माँ विंध्यवासिनी पैकर्स मूवर्स एंड ट्रांसपोर्ट";

// Translations Dictionary
const I18N = {
  en: {
    hero_tag: "🇮🇳 ISO Certified & 100% Insured Shifting",
    hero_title: "Safe, Reliable & Fast Packers, Movers & Transport Across India",
    hero_subtitle: "Zero damage guarantee, professional 5-layer safety packaging, live GPS tracking, and transparent pricing with no hidden charges.",
    btn_get_quote: "Get Free Instant Quote",
    btn_call_now: "Call: +91 80100 41007",
    btn_whatsapp: "WhatsApp Now",
    calc_title: "Instant Shifting Cost Estimator",
    calc_subtitle: "Get an accurate estimate for your home, office, or vehicle shifting in seconds",
    track_title: "Live Consignment Tracking",
    track_placeholder: "Enter Tracking ID (e.g. MVP-8842)",
    track_btn: "Track Move",
    services_title: "Our Specialized Services",
    why_title: "Why Choose Maa Vindhyavasini Packers & Movers?",
    process_title: "How Our Shifting Process Works"
  },
  hi: {
    hero_tag: "🇮🇳 आईएसओ प्रमाणित एवं 100% सुरक्षित शिफ्टिंग",
    hero_title: "सुरक्षित, भरोसेमंद और सबसे तेज पैकर्स, मूवर्स एवं ट्रांसपोर्ट पूरे भारत में",
    hero_subtitle: "शून्य टूट-फूट की गारंटी, 5-लेयर मजबूत बबल पैकिंग, लाइव जीपीएस ट्रैकिंग, और बिना किसी छिपे हुए खर्च के पारदर्शी रेट।",
    btn_get_quote: "मुफ्त तुरंत कोटेशन पाएं",
    btn_call_now: "कॉल करें: +91 80100 41007",
    btn_whatsapp: "व्हाट्सएप करें",
    calc_title: "तुरंत शिफ्टिंग खर्च कैलकुलेटर",
    calc_subtitle: "अपने घर, ऑफिस या वाहन की शिफ्टिंग का अनुमानित खर्च तुरंत जानें",
    track_title: "लाइव सामान ट्रैकिंग सिस्टम",
    track_placeholder: "ट्रैकिंग आईडी दर्ज करें (उदा. MVP-8842)",
    track_btn: "ट्रैक करें",
    services_title: "हमारी प्रमुख सेवाएं",
    why_title: "माँ विंध्यवासिनी पैकर्स मूवर्स को क्यों चुनें?",
    process_title: "शिफ्टिंग की आसान 4-चरणीय प्रक्रिया"
  }
};

let currentLang = "hi"; // Default to Hindi for high cultural resonance, with English toggle

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  initLanguageToggle();
  initCostCalculator();
  initTrackingEngine();
  initFAQAccordion();
  initMobileMenu();
  initFormSubmissions();
  updateCalculatorEstimate();
});

// Toast System
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type === "error" ? "border-red-500" : "border-amber-500"}`;
  toast.innerHTML = `
    <span class="text-xl">${type === "error" ? "⚠️" : "✅"}</span>
    <span class="flex-1">${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Language Switcher
function initLanguageToggle() {
  const langButtons = document.querySelectorAll(".lang-btn");
  langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedLang = btn.getAttribute("data-lang");
      if (selectedLang) {
        setLanguage(selectedLang);
      }
    });
  });
}

function setLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll(".lang-btn").forEach(btn => {
    if (btn.getAttribute("data-lang") === lang) {
      btn.classList.add("bg-amber-500", "text-navy-900", "font-bold");
      btn.classList.remove("text-white", "opacity-80");
    } else {
      btn.classList.remove("bg-amber-500", "text-navy-900", "font-bold");
      btn.classList.add("text-white", "opacity-80");
    }
  });

  // Apply translations for elements with data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (I18N[lang] && I18N[lang][key]) {
      el.innerText = I18N[lang][key];
    }
  });
}

// Interactive Cost Calculator
function initCostCalculator() {
  const moveType = document.getElementById("calc-move-type");
  const moveSize = document.getElementById("calc-size");
  const distanceSlider = document.getElementById("calc-distance");
  const distanceDisplay = document.getElementById("calc-distance-val");
  const vehicleSelect = document.getElementById("calc-vehicle");
  const packagingType = document.getElementById("calc-packaging");
  const insuranceCheck = document.getElementById("calc-insurance");

  if (!distanceSlider) return;

  distanceSlider.addEventListener("input", (e) => {
    if (distanceDisplay) {
      distanceDisplay.innerText = `${e.target.value} KM`;
    }
    updateCalculatorEstimate();
  });

  [moveType, moveSize, vehicleSelect, packagingType, insuranceCheck].forEach(input => {
    if (input) {
      input.addEventListener("change", updateCalculatorEstimate);
    }
  });

  // WhatsApp Quote Button from Calculator
  const calcWhatsAppBtn = document.getElementById("calc-whatsapp-btn");
  if (calcWhatsAppBtn) {
    calcWhatsAppBtn.addEventListener("click", () => {
      sendCalculatorQuoteViaWhatsApp();
    });
  }
}

function updateCalculatorEstimate() {
  const moveType = document.getElementById("calc-move-type")?.value || "domestic";
  const size = document.getElementById("calc-size")?.value || "2bhk";
  const distance = parseInt(document.getElementById("calc-distance")?.value || "150", 10);
  const vehicle = document.getElementById("calc-vehicle")?.value || "none";
  const packaging = document.getElementById("calc-packaging")?.value || "premium";
  const hasInsurance = document.getElementById("calc-insurance")?.checked || false;

  // Base costs by size
  const baseSizeRates = {
    "1rk": 3500,
    "1bhk": 5500,
    "2bhk": 8500,
    "3bhk": 12500,
    "4bhk": 18000,
    "villa": 24000,
    "small_office": 9000,
    "corporate_office": 22000,
    "only_vehicle": 2000
  };

  // Per KM rate based on volume
  const perKmRate = {
    "1rk": 14,
    "1bhk": 20,
    "2bhk": 28,
    "3bhk": 36,
    "4bhk": 45,
    "villa": 55,
    "small_office": 30,
    "corporate_office": 50,
    "only_vehicle": 12
  };

  let baseRate = baseSizeRates[size] || 6000;
  let kmCharge = (perKmRate[size] || 25) * distance;

  // Local shifting discount / rate adjustment
  if (moveType === "local") {
    kmCharge = distance * 18;
  }

  // Packaging tier
  let packingCost = 1500;
  if (packaging === "standard") packingCost = 1000;
  if (packaging === "premium") packingCost = 2500; // 5-Layer Bubble, Foam & Crate
  if (packaging === "wooden") packingCost = 4500; // Heavy duty custom wooden box

  // Vehicle add-on
  let vehicleCost = 0;
  if (vehicle === "bike") vehicleCost = 2500 + (distance * 3);
  if (vehicle === "car_hatchback") vehicleCost = 6500 + (distance * 7);
  if (vehicle === "car_suv") vehicleCost = 8500 + (distance * 9);

  let subtotal = baseRate + kmCharge + packingCost + vehicleCost;
  let insuranceCost = hasInsurance ? Math.round(subtotal * 0.035) : 0;
  let minTotal = Math.round((subtotal + insuranceCost) * 0.95);
  let maxTotal = Math.round((subtotal + insuranceCost) * 1.15);

  // Round to nearest 100
  minTotal = Math.round(minTotal / 100) * 100;
  maxTotal = Math.round(maxTotal / 100) * 100;

  const priceRangeEl = document.getElementById("calc-price-range");
  const packingFeeEl = document.getElementById("calc-breakdown-packing");
  const transitFeeEl = document.getElementById("calc-breakdown-transit");

  if (priceRangeEl) {
    priceRangeEl.innerHTML = `₹${minTotal.toLocaleString('en-IN')} - ₹${maxTotal.toLocaleString('en-IN')}`;
  }
  if (packingFeeEl) {
    packingFeeEl.innerText = `₹${packingCost.toLocaleString('en-IN')}`;
  }
  if (transitFeeEl) {
    transitFeeEl.innerText = `₹${(baseRate + kmCharge).toLocaleString('en-IN')}`;
  }
}

function sendCalculatorQuoteViaWhatsApp() {
  const moveType = document.getElementById("calc-move-type")?.selectedOptions[0]?.text || "Domestic Shifting";
  const size = document.getElementById("calc-size")?.selectedOptions[0]?.text || "2 BHK";
  const distance = document.getElementById("calc-distance")?.value || "150";
  const vehicle = document.getElementById("calc-vehicle")?.selectedOptions[0]?.text || "None";
  const packaging = document.getElementById("calc-packaging")?.selectedOptions[0]?.text || "5-Layer Premium Packing";
  const priceRange = document.getElementById("calc-price-range")?.innerText || "Instant Estimate";

  const message = `🙏 *नमस्ते MAA VINDHYAVASINI PACKERS MOVERS AND TRANSPORT टीम,*

मुझे शिफ्टिंग के लिए तुरंत बेस्ट रेट और फ्री सर्वे की आवश्यकता है:

📍 *शिफ्टिंग प्रकार:* ${moveType}
📦 *सामान का साइज:* ${size}
🛣️ *दूरी:* लगभग ${distance} KM
🚗 *वाहन ट्रांसपोर्ट:* ${vehicle}
🛡️ *पैकिंग स्तर:* ${packaging}
💰 *वेबसाइट अनुमानित खर्च:* ${priceRange}

कृपया मुझे अपना फाइनल डिस्काउंट कोटेशन और बुकिंग डिटेल साझा करें। धन्यवाद!`;

  const encodedUrl = `https://wa.me/91${COMPANY_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(encodedUrl, "_blank");
  showToast("WhatsApp कोटेशन फॉर्म तैयार हो गया है! आपको WhatsApp पर रीडायरेक्ट किया जा रहा है...");
}

// Consignment Tracking Engine
function initTrackingEngine() {
  const trackBtn = document.getElementById("track-submit-btn");
  const trackInput = document.getElementById("track-input");
  const samplePills = document.querySelectorAll(".sample-track-id");

  if (trackBtn && trackInput) {
    trackBtn.addEventListener("click", () => {
      executeTracking(trackInput.value);
    });

    trackInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        executeTracking(trackInput.value);
      }
    });
  }

  samplePills.forEach(pill => {
    pill.addEventListener("click", () => {
      const code = pill.getAttribute("data-id");
      if (trackInput) trackInput.value = code;
      executeTracking(code);
    });
  });
}

function executeTracking(trackingId) {
  const modal = document.getElementById("tracking-result-modal");
  const content = document.getElementById("tracking-result-content");
  
  if (!trackingId || !trackingId.trim()) {
    showToast("कृपया अपना कंसाइनमेंट / ट्रैकिंग नंबर दर्ज करें (उदा. MVP-8842)", "error");
    return;
  }

  const details = typeof getConsignmentDetails === "function" 
    ? getConsignmentDetails(trackingId) 
    : null;

  if (!details || !modal || !content) return;

  let stepsHtml = details.steps.map((step, idx) => `
    <div class="relative flex items-start gap-4 pb-6 last:pb-0">
      <div class="flex flex-col items-center">
        <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
          step.current 
            ? 'bg-amber-500 text-navy-950 ring-4 ring-amber-200' 
            : step.done 
              ? 'bg-emerald-500 text-white' 
              : 'bg-slate-200 text-slate-500'
        }">
          ${step.done ? '✓' : idx + 1}
        </div>
        ${idx < details.steps.length - 1 ? `<div class="w-0.5 h-full min-h-[30px] ${step.done ? 'bg-emerald-400' : 'bg-slate-200'}"></div>` : ''}
      </div>
      <div class="flex-1 -mt-1">
        <div class="flex items-center justify-between">
          <h4 class="font-bold text-slate-800 ${step.current ? 'text-amber-600' : ''}">${step.title}</h4>
          <span class="text-xs font-semibold px-2 py-0.5 rounded ${step.current ? 'bg-amber-100 text-amber-800' : 'text-slate-500'}">${step.date}</span>
        </div>
        <p class="text-sm text-slate-600 mt-0.5">📍 ${step.location}</p>
      </div>
    </div>
  `).join("");

  content.innerHTML = `
    <div class="bg-navy-900 text-white p-6 rounded-2xl shadow-lg mb-6 border border-slate-700">
      <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700 pb-4">
        <div>
          <span class="text-xs text-amber-400 font-bold uppercase tracking-wider">Consignment ID</span>
          <h3 class="text-2xl font-black text-white tracking-wide">${details.trackingId}</h3>
        </div>
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-sm font-semibold">
          <span class="live-dot"></span> ${details.status}
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
        <div>
          <span class="text-slate-400 block text-xs">Origin (कहाँ से)</span>
          <strong class="text-slate-100">${details.origin}</strong>
        </div>
        <div>
          <span class="text-slate-400 block text-xs">Destination (कहाँ तक)</span>
          <strong class="text-slate-100">${details.destination}</strong>
        </div>
        <div>
          <span class="text-slate-400 block text-xs">Driver / Pilot</span>
          <strong class="text-slate-100">${details.driverName}</strong>
        </div>
        <div>
          <span class="text-slate-400 block text-xs">Assigned Vehicle</span>
          <strong class="text-slate-100">${details.vehicleNumber}</strong>
        </div>
      </div>

      <div class="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
        <div>📍 <strong>वर्तमान लोकेशन:</strong> ${details.currentLocation}</div>
        <div>⏰ <strong>अपेक्षित डिलीवरी:</strong> ${details.expectedDelivery}</div>
      </div>
    </div>

    <div class="bg-white rounded-2xl p-6 border border-slate-200">
      <h4 class="font-black text-lg text-navy-900 mb-6 flex items-center gap-2">
        <span>📦</span> रियल-टाइम ट्रांजिट टाइमलाइन (Live Timeline)
      </h4>
      <div class="pl-2">
        ${stepsHtml}
      </div>
    </div>

    <div class="mt-6 flex flex-wrap items-center justify-between gap-3 bg-amber-50 p-4 rounded-xl border border-amber-200">
      <div class="text-xs text-amber-900">
        <strong>सहायता चाहिए?</strong> किसी भी प्रश्न के लिए हमारी 24/7 हेल्पलाइन पर सीधे बात करें।
      </div>
      <a href="tel:+918010041007" class="btn-primary py-2 px-4 text-sm">
        📞 कॉल करें (+91 80100 41007)
      </a>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeTrackingModal() {
  const modal = document.getElementById("tracking-result-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

// FAQ Accordion
function initFAQAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const header = item.querySelector(".faq-header");
    if (header) {
      header.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        faqItems.forEach(other => other.classList.remove("active"));
        if (!isActive) {
          item.classList.add("active");
        }
      });
    }
  });
}

// Mobile Menu
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-menu-btn");
  const closeBtn = document.getElementById("mobile-menu-close");
  const menu = document.getElementById("mobile-menu-drawer");
  const backdrop = document.getElementById("mobile-menu-backdrop");
  const navLinks = document.querySelectorAll(".mobile-nav-link");

  function openMenu() {
    if (menu) menu.classList.remove("translate-x-full");
    if (backdrop) backdrop.classList.remove("hidden");
  }

  function closeMenu() {
    if (menu) menu.classList.add("translate-x-full");
    if (backdrop) backdrop.classList.add("hidden");
  }

  if (toggleBtn) toggleBtn.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (backdrop) backdrop.addEventListener("click", closeMenu);
  navLinks.forEach(link => link.addEventListener("click", closeMenu));
}

// Form Handlers
function initFormSubmissions() {
  // Hero Instant Quote Form
  const heroForm = document.getElementById("hero-quote-form");
  if (heroForm) {
    heroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fromCity = document.getElementById("hero-from-city")?.value || "Not Specified";
      const toCity = document.getElementById("hero-to-city")?.value || "Not Specified";
      const moveType = document.getElementById("hero-move-type")?.value || "Household Shifting";
      const moveDate = document.getElementById("hero-move-date")?.value || "ASAP";
      const phone = document.getElementById("hero-phone")?.value || "";

      if (!phone || phone.length < 10) {
        showToast("कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें!", "error");
        return;
      }

      const message = `🙏 *नमस्ते MAA VINDHYAVASINI PACKERS MOVERS AND TRANSPORT,*

मुझे शिफ्टिंग के लिए फ्री कोटेशन और पिकअप स्लॉट चाहिए:

📍 *Pickup City:* ${fromCity}
🏁 *Drop City:* ${toCity}
📦 *Shift Type:* ${moveType}
📅 *Move Date:* ${moveDate}
📞 *Customer Phone:* ${phone}

कृपया मुझे सबसे कम रेट और तुरंत कन्फर्मेशन दें।`;

      window.open(`https://wa.me/91${COMPANY_PHONE}?text=${encodeURIComponent(message)}`, "_blank");
      showToast("आपकी रिक्वेस्ट दर्ज हो गई है! WhatsApp पर ट्रांसफर किया जा रहा है...");
      heroForm.reset();
    });
  }

  // Contact Form
  const contactForm = document.getElementById("main-contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("contact-name")?.value;
      const phone = document.getElementById("contact-phone")?.value;
      const service = document.getElementById("contact-service")?.value;
      const msg = document.getElementById("contact-message")?.value;

      if (!name || !phone || phone.length < 10) {
        showToast("कृपया नाम और वैध मोबाइल नंबर भरें!", "error");
        return;
      }

      const waMsg = `🙏 *नई इन्क्वायरी - MAA VINDHYAVASINI PACKERS MOVERS AND TRANSPORT*

👤 *नाम:* ${name}
📞 *फोन नंबर:* ${phone}
🚚 *सेवा की आवश्यकता:* ${service}
📝 *विवरण:* ${msg || 'कृपया शीघ्र संपर्क करें'}

कृपया तुरंत बेस्ट कोटेशन के साथ कॉल करें।`;

      window.open(`https://wa.me/91${COMPANY_PHONE}?text=${encodeURIComponent(waMsg)}`, "_blank");
      showToast("धन्यवाद! हमारी टीम कुछ ही पलों में आपसे संपर्क करेगी।");
      contactForm.reset();
    });
  }
}
