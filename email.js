/**
 * Technology Interiors Quote Form Sender
 */

const TI_FORM_CONFIG = {
  formName: "quote-request",
  companyName: "Technology Interiors"
};

function formatCurrency(value) {
  return Number(value || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });
}

function safeText(value, fallback = "Not provided") {
  if (value === null || value === undefined || value === "") return fallback;
  if (Array.isArray(value)) return value.length ? value.join(", ") : fallback;
  return String(value);
}

function buildQuoteEmailBody(quote) {
  const customer = quote.customer || {};
  const totals = quote.totals || {};

  return `
TECHNOLOGY INTERIORS - CUSTOM PACKAGE REQUEST
==================================================

REFERENCE
--------------------------------------------------
Reference #: ${safeText(quote.reference)}
Submitted: ${new Date().toLocaleString()}


CUSTOMER INFORMATION
--------------------------------------------------
Name: ${safeText(customer.name)}
Email: ${safeText(customer.email)}
Phone: ${safeText(customer.phone)}
Project Address: ${safeText(customer.address)}
Project Timeline: ${safeText(customer.timeline)}
Customer Notes: ${safeText(customer.notes)}


QUESTIONNAIRE ANSWERS
--------------------------------------------------
${JSON.stringify(quote.answers || {}, null, 2)}


SELECTED PACKAGE
--------------------------------------------------
Package: ${safeText(quote.package)}
Product Type: ${safeText(quote.productType)}
Brand / Model: ${safeText(quote.brandModel)}
Screen Size: ${safeText(quote.screenSize)}
Screen Type: ${safeText(quote.screenType)}
Resolution: ${safeText(quote.resolution)}
Audio: ${safeText(quote.audio)}


SITE CONDITIONS
--------------------------------------------------
Selected Site Conditions:
${safeText(quote.siteConditions)}

Site Notes:
${safeText(quote.siteNotes)}


OPTIONAL ADD-ONS
--------------------------------------------------
${safeText(quote.selectedAddons, "None selected")}


PRICING BREAKDOWN
--------------------------------------------------
Display: ${formatCurrency(totals.display)}
Audio: ${formatCurrency(totals.audio)}
Supporting Items: ${formatCurrency(totals.support)}
Optional Upgrades: ${formatCurrency(totals.add)}
Estimated Tax: ${formatCurrency(totals.tax)}

ESTIMATED TOTAL: ${formatCurrency(totals.total)}


IMPORTANT PRICING DISCLAIMER
--------------------------------------------------
Pricing is an estimate only. Final price must be verified after
Technology Interiors completes a site review and final design.
`.trim();
}

function buildTIQuoteFormData(quote) {
  const customer = quote.customer || {};
  const totals = quote.totals || {};
  const fullQuote = buildQuoteEmailBody(quote);

  return {
    "form-name": TI_FORM_CONFIG.formName,
    company_name: TI_FORM_CONFIG.companyName,
    subject: `Technology Interiors Quote Request - ${safeText(quote.reference)}`,
    reference: safeText(quote.reference),
    customer_name: safeText(customer.name, ""),
    customer_email: safeText(customer.email, ""),
    customer_phone: safeText(customer.phone, ""),
    customer_address: safeText(customer.address, ""),
    customer_timeline: safeText(customer.timeline, ""),
    customer_notes: safeText(customer.notes, ""),
    selected_package: safeText(quote.package),
    product_type: safeText(quote.productType),
    brand_model: safeText(quote.brandModel),
    screen_size: safeText(quote.screenSize),
    screen_type: safeText(quote.screenType),
    resolution: safeText(quote.resolution),
    audio: safeText(quote.audio),
    site_conditions: safeText(quote.siteConditions, "None selected"),
    site_notes: safeText(quote.siteNotes, ""),
    selected_addons: safeText(quote.selectedAddons, "None selected"),
    display_total: formatCurrency(totals.display),
    audio_total: formatCurrency(totals.audio),
    support_total: formatCurrency(totals.support),
    addon_total: formatCurrency(totals.add),
    estimated_tax: formatCurrency(totals.tax),
    estimated_total: formatCurrency(totals.total),
    quote_details: fullQuote,
    printable_quote: fullQuote
  };
}

async function sendTIQuoteEmail(quote) {
  const formData = new URLSearchParams(buildTIQuoteFormData(quote));

  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString()
    });

    if (!response.ok) {
      throw new Error("Netlify form submission failed.");
    }

    console.log("Technology Interiors quote submitted through Netlify Forms.");
    return { success: true, response };
  } catch (error) {
    console.error("Technology Interiors quote form submission failed:", error);
    return { success: false, error };
  }
}
