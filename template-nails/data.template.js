// MASTER TEMPLATE DATA
// Change only this file to personalize the website for another nail salon.
// Keep the placeholder style values when creating reusable demo versions.

window.SITE_DATA = {
  business: {
    name: "{{BUSINESS_NAME}}",
    city: "{{CITY}}",
    phone: "{{PHONE}}",
    whatsapp: "{{WHATSAPP}}",
    instagram: "{{INSTAGRAM}}",
    address: "{{ADDRESS}}",
    workingHours: "Mon - Sat, 09:00 - 19:00"
  },

  theme: {
    primaryColor: "{{PRIMARY_COLOR}}",
    primaryDarkColor: "#a94f6c"
  },

  seo: {
    description: "Premium nail salon and beauty nail studio in {{CITY}}."
  },

  hero: {
    title: "{{HERO_TITLE}}",
    subtitle: "{{HERO_SUBTITLE}}",
    image: "{{IMAGE_1}}",
    imageAlt: "{{BUSINESS_NAME}} manicure and nail design"
  },

  loading: {
    // Loading screen settings can be changed per demo.
    enabled: true,
    kicker: "Beauty demo template",
    label: "Preparing your glow",
    minDuration: 1200,
    fadeDuration: 700
  },

  mascot: {
    title: "Meet the studio mascot",
    text: "A playful beauty assistant built from HTML and CSS, designed for nail studios, hair salons, and beauty demos.",
    note: "This is only a demo mascot. A custom character can be created according to each salon's preferred style, colors, personality, and services."
  },

  bookingMessage: "Hello {{BUSINESS_NAME}}, I would like to book a nail appointment.",
  contactText: "Call, message on WhatsApp, or visit {{BUSINESS_NAME}} in {{CITY}}.",

  services: [
    {
      name: "Gel polish",
      description: "Glossy, long-lasting gel polish with careful nail preparation and a refined finish.",
      duration: "60 min",
      price: "From EUR 25"
    },
    {
      name: "Nail extensions",
      description: "Elegant extensions shaped to suit your hands, style, and everyday routine.",
      duration: "120 min",
      price: "From EUR 45"
    },
    {
      name: "Nail correction / refill",
      description: "Balanced refill and correction for grown-out nails with a fresh salon look.",
      duration: "90 min",
      price: "From EUR 35"
    },
    {
      name: "Nail art",
      description: "Minimal details, statement designs, chrome, glitter, French, and seasonal looks.",
      duration: "Add-on",
      price: "From EUR 5"
    }
  ],

  gallery: [
    {
      src: "{{IMAGE_1}}",
      alt: "Elegant nude manicure",
      caption: "Nude elegance"
    },
    {
      src: "{{IMAGE_2}}",
      alt: "Detailed nail art design",
      caption: "Fine nail art"
    },
    {
      src: "{{IMAGE_3}}",
      alt: "Premium gel polish manicure",
      caption: "Gloss finish"
    }
  ],

  benefits: [
    {
      icon: "P",
      title: "Precise work",
      text: "Every shape, line, and finish is handled with patience and attention to detail."
    },
    {
      icon: "H",
      title: "Hygiene and quality",
      text: "Clean tools, quality products, and a calm studio experience from start to finish."
    },
    {
      icon: "M",
      title: "Modern design",
      text: "Trendy, wearable nail designs tailored to each client's personal style."
    }
  ],

  testimonials: [
    {
      name: "Ana",
      text: "Beautiful work, clean studio, and my nails lasted perfectly."
    },
    {
      name: "Mila",
      text: "The shaping is always precise and the designs look expensive."
    },
    {
      name: "Sara",
      text: "My favorite place for elegant nails and a relaxing appointment."
    }
  ]
};
