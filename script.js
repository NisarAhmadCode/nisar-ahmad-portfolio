const menuBtn = document.querySelector(".menu-btn");
const menuOverlay = document.querySelector(".menu-overlay");

const menuLinks = document.querySelectorAll(".menu-link");
const menuTexts = document.querySelectorAll(".menu-text");
const menuNumbers = document.querySelectorAll(".menu-number");
const menuArrows = document.querySelectorAll(".menu-arrow");

let menuOpen = false;

gsap.set(menuOverlay, {
  autoAlpha: 0,
  clipPath: "inset(0 0 100% 0)",
});

gsap.set(menuTexts, {
  yPercent: 110,
});

gsap.set(menuNumbers, {
  opacity: 0,
  y: 20,
});

gsap.set(menuArrows, {
  opacity: 0,
  x: -20,
});

function openMenu() {
  if (menuOpen) return;

  menuOpen = true;

  document.body.classList.add("menu-open");

  gsap.set(menuOverlay, {
    autoAlpha: 1,
  });

  menuOverlay.style.visibility = "visible";
  menuOverlay.style.pointerEvents = "auto";

  const tl = gsap.timeline();

  tl.to(menuOverlay, {
    clipPath: "inset(0 0 0% 0)",

    duration: 0.9,

    ease: "power4.inOut",
  })

    .to(
      menuTexts,
      {
        yPercent: 0,

        duration: 1,

        stagger: 0.07,

        ease: "power4.out",
      },
      "-=0.45",
    )

    .to(
      menuNumbers,
      {
        opacity: 1,

        y: 0,

        duration: 0.6,

        stagger: 0.05,

        ease: "power3.out",
      },
      "-=.75",
    )

    .to(
      menuArrows,
      {
        opacity: 1,

        x: 0,

        duration: 0.6,

        stagger: 0.05,

        ease: "power3.out",
      },
      "-=.7",
    );
}

function closeMenu() {
  if (!menuOpen) return;

  menuOpen = false;

  document.body.classList.remove("menu-open");

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(menuOverlay, {
        autoAlpha: 0,
      });

      menuOverlay.style.visibility = "hidden";
      menuOverlay.style.pointerEvents = "none";
    },
  });

  tl.to(menuTexts, {
    yPercent: -110,

    duration: 0.5,

    stagger: 0.04,

    ease: "power3.in",
  })

    .to(
      menuNumbers,
      {
        opacity: 0,

        y: -15,

        duration: 0.3,
      },
      "<",
    )

    .to(
      menuArrows,
      {
        opacity: 0,

        x: 15,

        duration: 0.3,
      },
      "<",
    )

    .to(
      menuOverlay,
      {
        clipPath: "inset(0 0 100% 0)",

        duration: 0.8,

        ease: "power4.inOut",
      },
      "-=.1",
    );
}

if (menuBtn) {
  menuBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

menuLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    const target = this.getAttribute("href");

    closeMenu();

    if (target && target.startsWith("#")) {
      const section = document.querySelector(target);

      if (section) {
        e.preventDefault();

        setTimeout(() => {
          section.scrollIntoView({
            behavior: "smooth",
          });
        }, 500);
      }
    }
  });
});

const loader = document.querySelector(".loader");
const loaderWord = document.querySelector(".loader-word span");
const loaderNumber = document.querySelector(".loader-number");

const words = [
  "Hello",
  "السلام عليكم",
  "Ciao",
  "नमस्ते",
  "Bonjour",
  "你好",
  "Hola",
];

let progress = {
  value: 0,
};

gsap.set(".logo", {
  y: -30,
  opacity: 0,
});

gsap.set(".availability", {
  y: -20,
  opacity: 0,
});

gsap.set(".menu-btn", {
  scale: 0,
  opacity: 0,
});

gsap.set(".hero-name", {
  y: 60,
  opacity: 0,
});

gsap.set(".hero-location", {
  y: 25,
  opacity: 0,
});

gsap.set(".hero-status", {
  y: 25,
  opacity: 0,
});

gsap.set(".hero-image", {
  scale: 0.65,
  opacity: 0,
});

gsap.set(".hero-title span", {
  y: 100,
  opacity: 0,
});

gsap.set(".hero-bottom", {
  y: 30,
  opacity: 0,
});

function changeWord(index) {
  gsap.to(loaderWord, {
    y: -20,
    opacity: 0,
    duration: 0.15,

    onComplete: () => {
      loaderWord.textContent = words[index];

      gsap.fromTo(
        loaderWord,

        {
          y: 20,
          opacity: 0,
        },

        {
          y: 0,
          opacity: 1,
          duration: 0.15,
        },
      );
    },
  });
}

const loaderTL = gsap.timeline();

loaderTL.to(progress, {
  value: 100,

  duration: 3,

  ease: "power2.inOut",

  onUpdate: () => {
    const value = Math.floor(progress.value);

    loaderNumber.textContent = value;
  },
});

const wordDuration = 3 / words.length;

words.forEach((word, index) => {
  if (index === 0) return;

  loaderTL.call(
    () => {
      changeWord(index);
    },
    null,
    index * wordDuration,
  );
});

loaderTL.to(loader, {
  yPercent: -100,

  duration: 1.2,

  ease: "power4.inOut",

  onComplete: () => {
    loader.style.display = "none";

    startHeroAnimation();
  },
});

function startHeroAnimation() {
  const heroTL = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  heroTL

    .to(".logo", {
      y: 0,
      opacity: 1,
      duration: 0.8,
    })

    .to(
      ".availability",
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
      },
      "-=0.6",
    )

    .to(
      ".menu-btn",
      {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        ease: "back.out(1.7)",
      },
      "-=0.6",
    )

    .to(
      ".hero-name",
      {
        y: 0,
        opacity: 1,
        duration: 1,
      },
      "-=0.3",
    )

    .to(
      ".hero-location",
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
      },
      "-=0.6",
    )

    .to(
      ".hero-status",
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
      },
      "-=0.4",
    )

    .to(
      ".hero-image",
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1.4,
        ease: "power4.out",
      },
      "-=0.8",
    )

    .to(
      ".hero-title span",
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
      },
      "-=0.9",
    )

    .to(
      ".hero-bottom",
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
      },
      "-=0.4",
    );
}

const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");
const trail = document.querySelector(".cursor-trail");

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;

const trailDots = [];
const TRAIL_COUNT = 18;

for (let i = 0; i < TRAIL_COUNT; i++) {
  const particle = document.createElement("span");

  particle.classList.add("trail-dot");

  const size = 2 + Math.random() * 4;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  trail.appendChild(particle);
  trailDots.push({
    el: particle,
    x: 0,
    y: 0,
  });
}

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  document.body.classList.add("cursor-active");

  dot.style.left = `${mouseX}px`;
  dot.style.top = `${mouseY}px`;
});

document.addEventListener("mouseleave", () => {
  document.body.classList.remove("cursor-active");
});

document.addEventListener("mouseenter", () => {
  document.body.classList.add("cursor-active");
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;

  ring.style.left = `${ringX}px`;
  ring.style.top = `${ringY}px`;

  trailDots[0].x += (mouseX - trailDots[0].x) * 0.35;
  trailDots[0].y += (mouseY - trailDots[0].y) * 0.35;

  for (let i = 1; i < trailDots.length; i++) {
    const previous = trailDots[i - 1];
    const current = trailDots[i];

    current.x += (previous.x - current.x) * 0.25;
    current.y += (previous.y - current.y) * 0.25;
  }

  trailDots.forEach((particle, index) => {
    const progress = index / TRAIL_COUNT;

    particle.el.style.left = `${particle.x}px`;
    particle.el.style.top = `${particle.y}px`;

    particle.el.style.opacity = 0.65 * (1 - progress);

    const scale = 1 - progress * 0.65;

    particle.el.style.transform = `translate(-50%, -50%) scale(${scale})`;
  });

  requestAnimationFrame(animateCursor);
}

animateCursor();

gsap.registerPlugin(ScrollTrigger);

const aboutHeadingLines = document.querySelectorAll(".about-heading h2 span");

if (aboutHeadingLines.length) {
  gsap.fromTo(
    aboutHeadingLines,

    {
      yPercent: 110,
      opacity: 0,
    },

    {
      yPercent: 0,
      opacity: 1,

      stagger: 0.12,

      ease: "power4.out",

      scrollTrigger: {
        trigger: ".about-heading",

        start: "top 80%",

        end: "top 35%",

        scrub: 1,
      },
    },
  );
}

const aboutText = document.querySelector(".about-reveal-text");

if (aboutText) {
  const originalText = aboutText.textContent.replace(/\s+/g, " ").trim();

  aboutText.innerHTML = "";

  const words = originalText.split(" ");

  words.forEach((word, index) => {
    const wordSpan = document.createElement("span");

    wordSpan.className = "about-word";

    wordSpan.textContent = word;

    aboutText.appendChild(wordSpan);

    if (index < words.length - 1) {
      aboutText.appendChild(document.createTextNode(" "));
    }
  });

  const wordElements = aboutText.querySelectorAll(".about-word");

  const lines = [];

  let currentLine = [];

  let currentTop = null;

  wordElements.forEach((word) => {
    const top = word.offsetTop;

    if (currentTop !== null && Math.abs(top - currentTop) > 5) {
      lines.push(currentLine);

      currentLine = [];
    }

    currentLine.push(word);

    currentTop = top;
  });

  if (currentLine.length) {
    lines.push(currentLine);
  }

  aboutText.innerHTML = "";

  lines.forEach((lineWords) => {
    const line = document.createElement("span");

    line.className = "about-line";

    const lineText = lineWords.map((word) => word.textContent).join(" ");

    const base = document.createElement("span");

    base.className = "line-base";

    base.textContent = lineText;

    const fill = document.createElement("span");

    fill.className = "line-fill";

    fill.textContent = lineText;

    line.appendChild(base);

    line.appendChild(fill);

    aboutText.appendChild(line);
  });

  const revealLines = aboutText.querySelectorAll(".about-line");

  gsap.fromTo(
    revealLines,

    {
      "--reveal": "0%",
    },

    {
      "--reveal": "100%",

      ease: "none",

      stagger: 0.08,

      scrollTrigger: {
        trigger: ".about-description-wrap",

        start: "top 75%",

        end: "bottom 40%",

        scrub: 1,
      },
    },
  );
}

const projectItems = document.querySelectorAll(".project-item");
const projectPreview = document.querySelector(".project-cursor");
const projectPreviewImage = projectPreview?.querySelector("img");
const projectSection = document.querySelector(".projects-section");

if (
  projectItems.length &&
  projectPreview &&
  projectPreviewImage &&
  projectSection
) {
  projectItems.forEach((project) => {
    const imageURL = project.dataset.image;

    if (imageURL) {
      const img = new Image();
      img.src = imageURL;
    }
  });

  const previewMoveX = gsap.quickTo(projectPreview, "x", {
    duration: 0.45,
    ease: "power3.out",
  });

  const previewMoveY = gsap.quickTo(projectPreview, "y", {
    duration: 0.45,
    ease: "power3.out",
  });

  window.addEventListener("mousemove", (e) => {
    previewMoveX(e.clientX - 160);
    previewMoveY(e.clientY - 110);
  });

  projectItems.forEach((project) => {
    project.addEventListener("mouseenter", () => {
      const image = project.dataset.image;
      const color = project.dataset.color;

      if (color) {
        gsap.to(projectPreview, {
          backgroundColor: color,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (image) {
        gsap.killTweensOf(projectPreviewImage);

        gsap.to(projectPreviewImage, {
          opacity: 0,

          scale: 1.08,

          duration: 0.15,

          onComplete: () => {
            projectPreviewImage.src = image;

            gsap.to(projectPreviewImage, {
              opacity: 1,

              scale: 1,

              duration: 0.35,

              ease: "power3.out",
            });
          },
        });
      }
    });
  });

  projectSection.addEventListener("mouseenter", () => {
    gsap.to(projectPreview, {
      opacity: 1,

      scale: 1,

      duration: 0.35,

      ease: "power3.out",
    });
  });

  projectSection.addEventListener("mouseleave", () => {
    gsap.to(projectPreview, {
      opacity: 0,

      scale: 0.95,

      duration: 0.3,

      ease: "power2.out",
    });
  });
}

const servicesSection = document.querySelector(".services-section");
const serviceSlides = document.querySelectorAll(".service-slide");
const serviceImages = document.querySelectorAll(".service-image");

if (servicesSection && serviceSlides.length && serviceImages.length) {
  serviceSlides.forEach((slide, index) => {
    gsap.set(slide, {
      autoAlpha: index === 0 ? 1 : 0,
      y: index === 0 ? 0 : 80,
    });
  });

  serviceImages.forEach((image, index) => {
    gsap.set(image, {
      autoAlpha: index === 0 ? 1 : 0,
    });
  });

  const servicesTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".services-scroll",

      start: "top top",

      end: "bottom bottom",

      scrub: 1,
    },
  });

  for (let i = 0; i < serviceSlides.length - 1; i++) {
    const currentText = serviceSlides[i];
    const nextText = serviceSlides[i + 1];

    const currentImage = serviceImages[i];
    const nextImage = serviceImages[i + 1];

    servicesTL.to(currentText, {
      y: -70,
      autoAlpha: 0,

      duration: 1,

      ease: "power3.inOut",
    });

    servicesTL.to(
      currentImage,
      {
        autoAlpha: 0,

        duration: 0.8,

        ease: "power2.inOut",
      },
      "<",
    );

    servicesTL.fromTo(
      nextText,

      {
        y: 80,
        autoAlpha: 0,
      },

      {
        y: 0,
        autoAlpha: 1,

        duration: 1,

        ease: "power3.out",
      },
      "<0.25",
    );

    servicesTL.fromTo(
      nextImage,

      {
        autoAlpha: 0,
      },

      {
        autoAlpha: 1,

        duration: 1,

        ease: "power2.out",
      },
      "<0.1",
    );
  }
}

gsap.registerPlugin(ScrollTrigger);

const experienceSection = document.querySelector(".experience");

if (experienceSection) {
  const experienceItems = document.querySelectorAll(".experience-item");

  experienceItems.forEach((item) => {
    const year = item.querySelector(".experience-year");
    const content = item.querySelector(".experience-content");
    const dot = item.querySelector(".line-dot");
    const line = item.querySelector(".experience-line::before");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top 75%",
        end: "top 35%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(year, {
      x: -60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    tl.from(
      content,
      {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.5",
    );

    tl.from(
      dot,
      {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(2)",
      },
      "-=0.7",
    );
  });

  experienceItems.forEach((item) => {
    const line = item.querySelector(".experience-line");

    gsap.fromTo(
      line,
      {
        scaleY: 0,
        transformOrigin: "top",
      },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top 70%",
          end: "bottom 50%",
          scrub: true,
        },
      },
    );
  });
}

const backTop = document.querySelector(".back-top");

if (backTop) {
  backTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
