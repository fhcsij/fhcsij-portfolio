const projects = [
  {
    title: "ARC",
    category: "game",
    tag: "Unity",
    description:
      "使用 Unity 製作的半寫實賽車遊戲，後續會加入不同控制器測試，探索駕駛手感與輸入互動。",
    stack: ["Unity", "Racing Game", "Controller Test", "Vercel"],
    url: "https://arc-web-mocha.vercel.app/",
  },
  {
    title: "Lone Escape: Descent into Darkness",
    category: "game",
    tag: "Phaser",
    description:
      "像素風格 2D 俯視角恐怖逃生遊戲，以策略性移動、生存挑戰與關卡判斷為核心。",
    stack: ["Phaser", "Pixel Art", "2D Horror", "Vercel"],
    url: "https://lone-escape-descent-into-darkness.vercel.app/",
  },
  {
    title: "Chronostasis",
    category: "interactive",
    tag: "Interactive",
    description:
      "藉由手勢操控時間流動，讓觀眾不只是觀看者，而是參與影像、時間與感知變化的人。",
    stack: ["TouchDesigner", "MediaPipe", "Gesture", "Interactive Art"],
    url: "https://youtu.be/JFRc-Lt4ZZA",
    ctaLabel: "影片展示",
  },
  {
    title: "二拾光 TTL",
    category: "web",
    tag: "Web",
    description:
      "讓舊物再度閃耀的網站，每件物品都保存一段故事，也等待下一位使用者延續它的價值。",
    stack: ["PHP", "SQL", "Web App", "Storytelling"],
    url: "https://ttl-woad.vercel.app/",
  },
  {
    title: "互動式活動網站",
    category: "web",
    tag: "Web",
    description:
      "為校園活動設計的響應式網站，包含活動資訊、報名入口與視覺化時程，降低找資訊的成本。",
    stack: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "資料視覺化儀表板",
    category: "visual",
    tag: "Visual",
    description:
      "把分散資料整理成圖表與摘要卡片，協助快速比較趨勢、狀態與異常項目。",
    stack: ["Charts", "Dashboard", "Data"],
  },
  {
    title: "品牌作品集改版",
    category: "web",
    tag: "Web",
    description:
      "重新規劃個人品牌網站的架構、作品呈現與聯絡動線，讓訪客快速理解能力與風格。",
    stack: ["Branding", "Responsive", "SEO"],
  },
];

const featuredTrack = document.querySelector("#featuredTrack");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const accentColors = ["coral", "teal", "blue", "gold", "violet", "cyan", "lime"];

function projectMeta(project) {
  return project.stack.map((item) => `<span>${item}</span>`).join("");
}

function projectLink(project) {
  if (!project.url) {
    return "";
  }

  return `<span class="project-link" aria-hidden="true">${project.ctaLabel || "線上 Demo"}</span>`;
}

function renderFeaturedProjects() {
  featuredTrack.innerHTML = projects
    .map((project, index) => {
      const slideTag = project.url ? "a" : "article";
      const ctaLabel = project.ctaLabel || "線上 Demo";
      const linkAttributes = project.url
        ? `href="${project.url}" aria-label="開啟 ${project.title} ${ctaLabel}"`
        : "";
      const status = project.url ? "LIVE" : "CONCEPT";

      return `
        <${slideTag}
          class="project-slide project-slide--${accentColors[index % accentColors.length]} ${
            project.url ? "project-slide-clickable" : ""
          }"
          data-project-index="${index}"
          ${linkAttributes}
        >
          <span class="project-slide__shine" aria-hidden="true"></span>
          <span class="project-slide__orb" aria-hidden="true"></span>
          <span class="project-slide__scan" aria-hidden="true"></span>
          <div class="project-slide__top">
            <span class="project-kicker">${project.tag}</span>
            <span class="project-status"><i></i>${status}</span>
          </div>
          <div class="project-slide__content">
            <span class="project-number">${String(index + 1).padStart(2, "0")}</span>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
          </div>
          <div class="project-slide__footer">
            <div class="project-meta">${projectMeta(project)}</div>
            ${projectLink(project)}
          </div>
        </${slideTag}>
      `;
    })
    .join("");
}

function setupMenu() {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (!event.target.matches("a")) {
      return;
    }

    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
}

function setupCustomCursor() {
  const cursor = document.querySelector(".cursor-ring");
  const canUseCustomCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (!cursor || !canUseCustomCursor || prefersReducedMotion) {
    return;
  }

  let moveCursor = (x, y) => {
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
  };

  if (window.gsap) {
    const quickX = gsap.quickTo(cursor, "left", { duration: 0.18, ease: "power3.out" });
    const quickY = gsap.quickTo(cursor, "top", { duration: 0.18, ease: "power3.out" });
    moveCursor = (x, y) => {
      quickX(x);
      quickY(y);
    };
  }

  window.addEventListener("pointermove", (event) => {
    cursor.classList.add("cursor-visible");
    moveCursor(event.clientX, event.clientY);
  });

  window.addEventListener("pointerleave", () => {
    cursor.classList.remove("cursor-visible");
  });

  window.addEventListener("pointerdown", () => {
    cursor.classList.add("cursor-pressed");
  });

  window.addEventListener("pointerup", () => {
    cursor.classList.remove("cursor-pressed");
  });

  document.addEventListener("pointerover", (event) => {
    if (event.target.closest("a, button, .project-slide-clickable")) {
      cursor.classList.add("cursor-hover");
    }
  });

  document.addEventListener("pointerout", (event) => {
    if (event.target.closest("a, button, .project-slide-clickable")) {
      cursor.classList.remove("cursor-hover");
    }
  });
}

function setupProjectTilt() {
  if (prefersReducedMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return;
  }

  document.querySelectorAll(".project-slide").forEach((slide) => {
    slide.addEventListener("pointermove", (event) => {
      const bounds = slide.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      const rotateY = (x - 0.5) * 9;
      const rotateX = (0.5 - y) * 7;

      slide.style.setProperty("--pointer-x", `${x * 100}%`);
      slide.style.setProperty("--pointer-y", `${y * 100}%`);
      slide.style.setProperty("--tilt-x", `${rotateX}deg`);
      slide.style.setProperty("--tilt-y", `${rotateY}deg`);
    });

    slide.addEventListener("pointerleave", () => {
      slide.style.setProperty("--pointer-x", "50%");
      slide.style.setProperty("--pointer-y", "50%");
      slide.style.setProperty("--tilt-x", "0deg");
      slide.style.setProperty("--tilt-y", "0deg");
    });
  });
}

function updateShowcaseHud(activeIndex) {
  const counter = document.querySelector("#activeProjectNumber");
  const progress = document.querySelector("#showcaseProgressBar");
  const normalizedIndex = Math.min(projects.length - 1, Math.max(0, activeIndex));

  if (counter) {
    counter.textContent = String(normalizedIndex + 1).padStart(2, "0");
  }

  if (progress) {
    progress.style.transform = `scaleX(${(normalizedIndex + 1) / projects.length})`;
  }

  document.querySelectorAll(".project-slide").forEach((slide, index) => {
    slide.classList.toggle("is-active", index === normalizedIndex);
  });
}

function setupShowcaseEffects() {
  const showcase = document.querySelector(".horizontal-showcase");

  if (!showcase || prefersReducedMotion) {
    return;
  }

  showcase.addEventListener("pointermove", (event) => {
    const bounds = showcase.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    showcase.style.setProperty("--showcase-x", `${x}%`);
    showcase.style.setProperty("--showcase-y", `${y}%`);
  });

  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return;
  }

  let lastTrailAt = 0;
  showcase.addEventListener("pointermove", (event) => {
    const now = performance.now();
    if (now - lastTrailAt < 44) {
      return;
    }

    lastTrailAt = now;
    const trail = document.createElement("span");
    trail.className = "cursor-trail";
    trail.style.left = `${event.clientX}px`;
    trail.style.top = `${event.clientY}px`;
    trail.style.setProperty("--trail-color", `hsl(${(event.clientX + event.clientY) % 360} 82% 62%)`);
    document.body.appendChild(trail);
    trail.addEventListener("animationend", () => trail.remove(), { once: true });
  });
}

function setupAnimations() {
  if (!window.gsap || !window.ScrollTrigger || prefersReducedMotion) {
    setupFallbackMotion();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out", duration: 0.9 });

  gsap.to(".scroll-progress__bar", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      start: 0,
      end: "max",
      scrub: 0.2,
    },
  });

  gsap.from(".site-header", { autoAlpha: 0, y: -22, duration: 0.65 });
  gsap.from(".hero-copy > *", { autoAlpha: 0, y: 42, stagger: 0.1, duration: 0.85 });
  gsap.from(".hero-visual", { autoAlpha: 0, x: 52, rotate: 2.5, duration: 1 });
  gsap.from(".hero-visual figcaption", { autoAlpha: 0, y: 24, delay: 0.4, duration: 0.7 });

  gsap.to(".showcase-aura--one", {
    xPercent: 22,
    yPercent: -14,
    rotate: 24,
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-showcase",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
    },
  });

  gsap.to(".showcase-aura--two", {
    xPercent: -26,
    yPercent: 18,
    rotate: -18,
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-showcase",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
    },
  });

  gsap.to(".intro-strip__inner", {
    xPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: ".intro-strip",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.utils.toArray(".reveal").forEach((element) => {
    gsap.from(element, {
      autoAlpha: 0,
      y: 54,
      scrollTrigger: {
        trigger: element,
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
    });
  });

  ScrollTrigger.batch(".reveal-card", {
    start: "top 82%",
    onEnter: (batch) =>
      gsap.fromTo(
        batch,
        { autoAlpha: 0, y: 38 },
        { autoAlpha: 1, y: 0, stagger: 0.09, duration: 0.7, overwrite: true },
      ),
    onLeaveBack: (batch) => gsap.set(batch, { autoAlpha: 0, y: 38, overwrite: true }),
  });

  gsap.set(".reveal-card", { autoAlpha: 0, y: 38 });

  gsap.utils.toArray("[data-count]").forEach((number) => {
    const value = Number(number.dataset.count);

    gsap.fromTo(
      number,
      { textContent: 0 },
      {
        textContent: value,
        duration: 1.35,
        ease: "power1.out",
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: number,
          start: "top 86%",
          once: true,
        },
        onUpdate() {
          number.textContent = String(Math.round(Number(number.textContent)));
        },
      },
    );
  });

  const mm = gsap.matchMedia();

  mm.add("(min-width: 780px)", () => {
    const track = document.querySelector(".project-track");
    const getScrollDistance = () => Math.max(1, track.scrollWidth - window.innerWidth);

    const horizontalTween = gsap.to(track, {
      x: () => -getScrollDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontal-showcase",
        start: "top top",
        end: () => `+=${getScrollDistance()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    gsap.utils.toArray(".project-slide").forEach((slide) => {
      const projectIndex = Number(slide.dataset.projectIndex);

      gsap.fromTo(
        slide,
        {
          scale: 0.82,
          autoAlpha: 0.28,
          rotateY: projectIndex % 2 === 0 ? -10 : 10,
          y: projectIndex % 2 === 0 ? 70 : -55,
        },
        {
          scale: 1,
          autoAlpha: 1,
          rotateY: 0,
          y: 0,
        scrollTrigger: {
          trigger: slide,
          containerAnimation: horizontalTween,
          start: "left 82%",
            end: "center 54%",
            scrub: 0.75,
            onEnter: () => {
              updateShowcaseHud(projectIndex);
            },
            onEnterBack: () => {
              updateShowcaseHud(projectIndex);
            },
          },
        },
      );

      gsap.to(slide.querySelector(".project-slide__orb"), {
        xPercent: projectIndex % 2 === 0 ? 42 : -38,
        yPercent: projectIndex % 3 === 0 ? -30 : 34,
        rotate: 90,
        ease: "none",
        scrollTrigger: {
          trigger: slide,
          containerAnimation: horizontalTween,
          start: "left right",
          end: "right left",
          scrub: 1,
        },
      });
    });

    return () => {
      horizontalTween.kill();
    };
  });
}

function setupFallbackMotion() {
  document.documentElement.classList.add("no-gsap");

  const progressBar = document.querySelector(".scroll-progress__bar");
  const showcase = document.querySelector(".horizontal-showcase");
  const counter = document.querySelector("#activeProjectNumber");
  const slides = [...document.querySelectorAll(".project-slide")];
  const revealElements = document.querySelectorAll(".reveal, .reveal-card");

  const updateScrollEffects = () => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progressBar.style.transform = `scaleX(${Math.min(1, window.scrollY / maxScroll)})`;
  };

  const updateActiveSlide = () => {
    if (!showcase || !slides.length) {
      return;
    }

    const center = showcase.scrollLeft + showcase.clientWidth / 2;
    let activeIndex = 0;
    let shortestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(center - slideCenter);
      const signedDistance = (slideCenter - center) / Math.max(1, showcase.clientWidth);
      const intensity = Math.max(0, 1 - Math.abs(signedDistance) * 1.4);

      if (distance < shortestDistance) {
        shortestDistance = distance;
        activeIndex = index;
      }

      slide.style.setProperty("--scroll-scale", String(0.88 + intensity * 0.12));
      slide.style.setProperty("--scroll-y", `${(1 - intensity) * 54}px`);
      slide.style.setProperty("--scroll-rotate-y", `${signedDistance * -7}deg`);
      slide.style.opacity = String(0.68 + intensity * 0.32);
    });

    updateShowcaseHud(activeIndex);
    slides.forEach((slide, index) => slide.classList.toggle("is-active", index === activeIndex));

    const scrollRatio = showcase.scrollLeft / Math.max(1, showcase.scrollWidth - showcase.clientWidth);
    document.querySelector(".showcase-aura--one")?.style.setProperty("transform", `translate3d(${scrollRatio * 170}px, ${scrollRatio * -80}px, 0)`);
    document.querySelector(".showcase-aura--two")?.style.setProperty("transform", `translate3d(${scrollRatio * -190}px, ${scrollRatio * 90}px, 0)`);
  };

  updateScrollEffects();
  updateActiveSlide();
  window.addEventListener("scroll", updateScrollEffects, { passive: true });
  showcase?.addEventListener("scroll", updateActiveSlide, { passive: true });
  showcase?.addEventListener(
    "wheel",
    (event) => {
      if (window.innerWidth < 780 || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return;
      }

      const atStart = showcase.scrollLeft <= 1;
      const atEnd = showcase.scrollLeft >= showcase.scrollWidth - showcase.clientWidth - 1;
      const canMove = (event.deltaY > 0 && !atEnd) || (event.deltaY < 0 && !atStart);

      if (canMove) {
        event.preventDefault();
        showcase.scrollLeft += event.deltaY * 1.15;
      }
    },
    { passive: false },
  );

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  document.querySelectorAll("[data-count]").forEach((number) => {
    number.textContent = number.dataset.count;
  });
}

document.querySelector("#year").textContent = new Date().getFullYear();
renderFeaturedProjects();
setupMenu();
setupCustomCursor();
setupProjectTilt();
setupShowcaseEffects();
updateShowcaseHud(0);
setupAnimations();
