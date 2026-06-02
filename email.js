/**
* Technology Interiors Quote Email Sender
*/

const TI_EMAIL_CONFIG = {
  publicKey: "WH5XhjXbbdOELCAgP",
  serviceId: "service_lou1nh3",
  templateId: "template_g5neoku",
  recipientEmail: "saradustova@gmail.com",
  companyName: "Technology Interiors"
};

function initializeTIEmail() {
  if (!window.emailjs) {
    console.error("EmailJS SDK is not loaded.");
  return false;
}

  emailjs.init({ publicKey: TI_EMAIL_CONFIG.publicKey });
  return true;
}

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

function buildTIQuoteEmailData(quote) {
  const fullEmailBody = buildQuoteEmailBody(quote);

  return {
    to_email: TI_EMAIL_CONFIG.recipientEmail,
    company_name: TI_EMAIL_CONFIG.companyName,
    reference: safeText(quote.reference),
    subject: `Technology Interiors Quote Request - ${safeText(quote.reference)}`,

    // Put this in your EmailJS template body: {{message}}
    message: fullEmailBody,
    quote_body: fullEmailBody,
    quote_text: fullEmailBody,

    customer_name: safeText(quote.customer?.name),
    customer_email: safeText(quote.customer?.email),
    customer_phone: safeText(quote.customer?.phone),
    customer_address: safeText(quote.customer?.address),
    customer_timeline: safeText(quote.customer?.timeline),
    customer_notes: safeText(quote.customer?.notes),

    selected_package: safeText(quote.package),
    product_type: safeText(quote.productType),
    brand_model: safeText(quote.brandModel),
    screen_size: safeText(quote.screenSize),
    screen_type: safeText(quote.screenType),
    resolution: safeText(quote.resolution),
    audio: safeText(quote.audio),
    site_conditions: safeText(quote.siteConditions),
    site_notes: safeText(quote.siteNotes),
    selected_addons: safeText(quote.selectedAddons, "None selected"),

    display_total: formatCurrency(quote.totals?.display),
    audio_total: formatCurrency(quote.totals?.audio),
    support_total: formatCurrency(quote.totals?.support),
    addon_total: formatCurrency(quote.totals?.add),
    estimated_tax: formatCurrency(quote.totals?.tax),
    estimated_total: formatCurrency(quote.totals?.total),

    pricing_disclaimer:
      "Pricing is an estimate only. Final price must be verified after site review and final design."
  };
}

async function sendTIQuoteEmail(quote) {
  if (!initializeTIEmail()) {
    throw new Error("EmailJS was not initialized.");
  }

  const templateData = buildTIQuoteEmailData(quote);

  try {
    const response = await emailjs.send(
      TI_EMAIL_CONFIG.serviceId,
      TI_EMAIL_CONFIG.templateId,
      templateData
    );

    console.log("Technology Interiors quote email sent:", response);
    return { success: true, response };
  } catch (error) {
    console.error("Technology Interiors quote email failed:", error);
    return { success: false, error };
  }
}
