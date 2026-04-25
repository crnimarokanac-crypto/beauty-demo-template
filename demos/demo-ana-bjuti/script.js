(function () {
  const preloaderStartedAt = Date.now();
  const data = window.SITE_DATA;

  if (!data) {
    console.error("SITE_DATA is missing. Check data.template.js.");
    return;
  }

  const root = document.documentElement;

  const $all = (selector) => Array.from(document.querySelectorAll(selector));
  const isPlaceholder = (value) => typeof value === "string" && /^{{.+}}$/.test(value.trim());
  const previewImage = (label, color = "d88ca2") =>
    `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 1500'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23fff7f8'/%3E%3Cstop offset='1' stop-color='%23${color}'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='1500' fill='url(%23g)'/%3E%3Ccircle cx='930' cy='240' r='210' fill='%23ffffff' opacity='.42'/%3E%3Cpath d='M260 1010c130-250 260-424 390-520 42-31 102 1 99 53-10 180-70 344-181 490-72 94-197 113-308 58-31-16-17-52 0-81Z' fill='%23151313' opacity='.12'/%3E%3Ctext x='80' y='1320' fill='%23151313' font-family='Arial' font-size='64' font-weight='700'%3E${encodeURIComponent(label)}%3C/text%3E%3C/svg%3E`;
  const valueOr = (value, fallback) => (isPlaceholder(value) || value === "" ? fallback : value);
  const setText = (selector, value) => {
    $all(selector).forEach((element) => {
      element.textContent = value;
    });
  };
  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const cleanPhone = (phone) => String(phone).replace(/[^\d+]/g, "");
  const cleanWhatsApp = (phone) => String(phone).replace(/\D/g, "");
  const instagramUrl = (handle) => {
    const cleanHandle = String(handle).replace("@", "").trim();
    return `https://www.instagram.com/${cleanHandle}/`;
  };

  const business = {
    name: valueOr(data.business.name, "Luna Nail Studio"),
    city: valueOr(data.business.city, "Belgrade"),
    phone: valueOr(data.business.phone, "+381 60 123 4567"),
    whatsapp: valueOr(data.business.whatsapp, "+381 60 123 4567"),
    instagram: valueOr(data.business.instagram, "@lunanailstudio"),
    address: valueOr(data.business.address, "Knez Mihailova 12, Belgrade"),
    workingHours: data.business.workingHours
  };

  const tokens = {
    BUSINESS_NAME: business.name,
    CITY: business.city,
    PHONE: business.phone,
    WHATSAPP: business.whatsapp,
    INSTAGRAM: business.instagram,
    ADDRESS: business.address
  };

  const templateText = (value, fallback) => {
    const source = valueOr(value, fallback);
    return String(source).replace(/{{([A-Z0-9_]+)}}/g, (_, token) => tokens[token] || "");
  };

  const theme = {
    primaryColor: valueOr(data.theme.primaryColor, "#d88ca2"),
    primaryDarkColor: data.theme.primaryDarkColor || "#a94f6c"
  };

  const loadingConfig = {
    enabled: data.loading?.enabled !== false,
    minDuration: Number(data.loading?.minDuration) || 1200,
    fadeDuration: Number(data.loading?.fadeDuration) || 700
  };

  const hero = {
    title: valueOr(data.hero.title, "Premium Nail Care Made Personal"),
    subtitle: valueOr(data.hero.subtitle, "Elegant manicures, clean technique, and refined nail art for everyday beauty."),
    image: valueOr(data.hero.image, previewImage("Premium Nail Studio")),
    imageAlt: templateText(data.hero.imageAlt, `${business.name} manicure and nail design`)
  };

  root.style.setProperty("--primary", theme.primaryColor);
  root.style.setProperty("--primary-dark", theme.primaryDarkColor);

  document.title = `${business.name} | Nail Studio in ${business.city}`;
  document.querySelector("[data-site-description]").setAttribute("content", templateText(data.seo.description, `Premium nail salon and beauty nail studio in ${business.city}.`));

  setText("[data-business-name]", business.name);
  setText("[data-city-label]", `Nail studio in ${business.city}`);
  setText("[data-hero-title]", hero.title);
  setText("[data-hero-subtitle]", hero.subtitle);
  setText("[data-phone]", business.phone);
  setText("[data-whatsapp]", business.whatsapp);
  setText("[data-instagram]", business.instagram);
  setText("[data-address]", business.address);
  setText("[data-address-short]", business.address);
  setText("[data-working-hours]", business.workingHours);
  setText("[data-contact-text]", templateText(data.contactText, `Call, message on WhatsApp, or visit ${business.name} in ${business.city}.`));
  setText("[data-current-year]", new Date().getFullYear());
  setText("[data-loading-kicker]", templateText(data.loading?.kicker, "Beauty demo template"));
  setText("[data-loading-label]", templateText(data.loading?.label, "Preparing your glow"));
  setText("[data-mascot-title]", templateText(data.mascot?.title, "Meet the studio mascot"));
  setText("[data-mascot-text]", templateText(data.mascot?.text, "A playful beauty assistant built from HTML and CSS, designed for nail studios, hair salons, and beauty demos."));
  setText("[data-mascot-note]", templateText(data.mascot?.note, "This is only a demo mascot. A custom character can be designed around each salon's preferred style, colors, personality, and services."));

  const heroImage = document.querySelector("[data-hero-image]");
  heroImage.src = hero.image;
  heroImage.alt = hero.imageAlt;

  const phoneLink = document.querySelector("[data-phone-link]");
  phoneLink.href = `tel:${cleanPhone(business.phone)}`;

  const whatsappLink = document.querySelector("[data-whatsapp-link]");
  whatsappLink.href = `https://wa.me/${cleanWhatsApp(business.whatsapp)}?text=${encodeURIComponent(templateText(data.bookingMessage, `Hello ${business.name}, I would like to book a nail appointment.`))}`;

  const instagramLink = document.querySelector("[data-instagram-link]");
  instagramLink.href = instagramUrl(business.instagram);

  $all("[data-book-link]").forEach((link) => {
    link.href = whatsappLink.href;
    link.target = "_blank";
    link.rel = "noopener";
  });

  const servicesContainer = document.querySelector("[data-services]");
  servicesContainer.innerHTML = data.services
    .map((service, index) => `
      <article class="service-card reveal">
        <div>
          <span class="card-icon">${String(index + 1).padStart(2, "0")}</span>
          <h3>${service.name}</h3>
          <p>${service.description}</p>
        </div>
        <div class="service-meta">
          <span>${service.duration}</span>
          <span>${service.price}</span>
        </div>
      </article>
    `)
    .join("");

  const galleryContainer = document.querySelector("[data-gallery]");
  galleryContainer.innerHTML = data.gallery
    .map((image, index) => {
      const src = valueOr(image.src, previewImage(image.caption || `Nail Design ${index + 1}`, index === 1 ? "ecd5db" : "d88ca2"));
      const alt = escapeHtml(image.alt || image.caption || `Nail design ${index + 1}`);
      const caption = escapeHtml(image.caption || `Nail design ${index + 1}`);

      return `
      <figure class="gallery-item reveal">
        <button type="button" data-lightbox-trigger data-lightbox-src="${src}" data-lightbox-alt="${alt}" data-lightbox-caption="${caption}" aria-label="Open ${caption}">
          <img src="${src}" alt="${alt}">
          <span class="gallery-caption">${caption}</span>
        </button>
      </figure>
    `;
    })
    .join("");

  const benefitsContainer = document.querySelector("[data-benefits]");
  benefitsContainer.innerHTML = data.benefits
    .map((benefit) => `
      <article class="benefit-card reveal">
        <span class="card-icon">${benefit.icon}</span>
        <h3>${benefit.title}</h3>
        <p>${benefit.text}</p>
      </article>
    `)
    .join("");

  const testimonialsContainer = document.querySelector("[data-testimonials]");
  testimonialsContainer.innerHTML = data.testimonials
    .map((review) => `
      <article class="testimonial-card reveal">
        <p>"${review.text}"</p>
        <strong>${review.name}</strong>
      </article>
    `)
    .join("");

  const nav = document.querySelector("[data-nav]");
  const navToggle = document.querySelector("[data-nav-toggle]");

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  $all(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Gallery image preview");
  lightbox.innerHTML = `
    <div class="lightbox-panel">
      <button class="lightbox-close" type="button" aria-label="Close image preview">&times;</button>
      <div class="lightbox-image-wrap">
        <img src="" alt="" data-lightbox-image>
      </div>
      <div class="lightbox-caption" data-lightbox-caption></div>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector("[data-lightbox-image]");
  const lightboxCaption = lightbox.querySelector("[data-lightbox-caption]");
  const lightboxClose = lightbox.querySelector(".lightbox-close");

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  const openLightbox = (trigger) => {
    lightboxImage.src = trigger.dataset.lightboxSrc;
    lightboxImage.alt = trigger.dataset.lightboxAlt;
    lightboxCaption.textContent = trigger.dataset.lightboxCaption;
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  };

  $all("[data-lightbox-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", () => openLightbox(trigger));
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  $all(".reveal").forEach((element) => revealObserver.observe(element));

  const preloader = document.querySelector("[data-preloader]");
  const hidePreloader = () => {
    if (!preloader) {
      document.body.classList.remove("is-loading");
      return;
    }

    preloader.classList.add("is-hidden");
    document.body.classList.remove("is-loading");
    window.setTimeout(() => {
      preloader.remove();
    }, loadingConfig.fadeDuration + 100);
  };

  const finishPreloader = () => {
    const elapsed = Date.now() - preloaderStartedAt;
    window.setTimeout(hidePreloader, Math.max(0, loadingConfig.minDuration - elapsed));
  };

  root.style.setProperty("--loader-fade-duration", `${loadingConfig.fadeDuration}ms`);

  if (!loadingConfig.enabled) {
    hidePreloader();
  } else if (document.readyState === "complete") {
    finishPreloader();
  } else {
    window.addEventListener("load", finishPreloader, { once: true });
  }
})();
