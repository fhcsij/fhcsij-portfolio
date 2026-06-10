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
const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const accentColors = ["coral", "teal", "blue", "gold", "violet", "cyan", "lime"];
let lastAnimatedProjectIndex = -1;
const rootElement = document.documentElement;
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

const isPerformanceLite = () => rootElement.classList.contains("performance-lite");

function enablePerformanceLite() {
  rootElement.classList.add("performance-lite");
  rootElement.classList.remove("custom-cursor-enabled");
  document.querySelector(".cursor-ring")?.classList.remove("cursor-visible");
}

function setupAdaptivePerformance() {
  const hasLimitedMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
  const hasLimitedCpu = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  const usesDataSaver = Boolean(connection?.saveData);
  const isSmallScreen = window.matchMedia(
    "(max-width: 1099px), (max-height: 699px)",
  ).matches;

  if (hasLimitedMemory || hasLimitedCpu || usesDataSaver || isSmallScreen) {
    enablePerformanceLite();
    return;
  }

  let monitoring = false;
  let monitorComplete = false;
  let monitorReady = false;
  let previousFrame = 0;
  let sampledFrames = 0;
  let slowFrames = 0;

  const sampleFrame = (now) => {
    if (previousFrame && now - previousFrame > 34) {
      slowFrames += 1;
    }

    previousFrame = now;
    sampledFrames += 1;

    if (sampledFrames < 90) {
      requestAnimationFrame(sampleFrame);
      return;
    }

    monitoring = false;
    monitorComplete = true;

    if (slowFrames >= 7) {
      enablePerformanceLite();
    }
  };

  window.setTimeout(() => {
    monitorReady = true;
  }, 1800);

  window.addEventListener(
    "scroll",
    () => {
      if (!monitorReady || monitoring || monitorComplete) {
        return;
      }

      monitoring = true;
      requestAnimationFrame(sampleFrame);
    },
    { passive: true },
  );
}

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
          <div class="project-page-front">
            <span class="project-page-fold" aria-hidden="true"></span>
            <span class="project-slide__shine" aria-hidden="true"></span>
            <span class="project-slide__orb" aria-hidden="true"></span>
            <span class="project-slide__scan" aria-hidden="true"></span>
            <div class="project-slide__top">
              <span class="project-kicker">${project.tag}</span>
              <span class="project-status"><i></i>${status}</span>
            </div>
            <div class="project-slide__content">
              <span class="project-number">${String(index + 1).padStart(2, "0")}</span>
              <h3 class="project-title">${project.title}</h3>
              <p class="project-description">${project.description}</p>
            </div>
            <div class="project-slide__footer">
              <div class="project-meta">${projectMeta(project)}</div>
              ${projectLink(project)}
            </div>
          </div>
          <div class="project-page-back" aria-hidden="true">
            <span>ARCHIVE PAGE</span>
            <strong>${String(index + 1).padStart(2, "0")}</strong>
            <small>${project.tag}</small>
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

  if (!cursor || !hasFinePointer || prefersReducedMotion || isPerformanceLite()) {
    return;
  }

  rootElement.classList.add("custom-cursor-enabled");

  let pointerX = 0;
  let pointerY = 0;
  let cursorFrame = 0;

  window.addEventListener("pointermove", (event) => {
    cursor.classList.add("cursor-visible");
    pointerX = event.clientX;
    pointerY = event.clientY;

    if (cursorFrame) {
      return;
    }

    cursorFrame = requestAnimationFrame(() => {
      cursor.style.setProperty("--cursor-x", `${pointerX}px`);
      cursor.style.setProperty("--cursor-y", `${pointerY}px`);
      cursorFrame = 0;
    });
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
  if (
    prefersReducedMotion ||
    !hasFinePointer ||
    window.innerWidth < 1024 ||
    isPerformanceLite() ||
    (window.gsap && window.ScrollTrigger)
  ) {
    return;
  }

  document.querySelectorAll(".project-slide").forEach((slide) => {
    let bounds;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let tiltFrame = 0;

    slide.addEventListener("pointerenter", () => {
      bounds = slide.getBoundingClientRect();
    });

    slide.addEventListener("pointermove", (event) => {
      bounds ||= slide.getBoundingClientRect();
      pointerX = (event.clientX - bounds.left) / bounds.width;
      pointerY = (event.clientY - bounds.top) / bounds.height;

      if (tiltFrame) {
        return;
      }

      tiltFrame = requestAnimationFrame(() => {
        const rotateY = (pointerX - 0.5) * 7;
        const rotateX = (0.5 - pointerY) * 5;

        slide.style.setProperty("--pointer-x", `${pointerX * 100}%`);
        slide.style.setProperty("--pointer-y", `${pointerY * 100}%`);
        slide.style.setProperty("--tilt-x", `${rotateX}deg`);
        slide.style.setProperty("--tilt-y", `${rotateY}deg`);
        tiltFrame = 0;
      });
    });

    slide.addEventListener("pointerleave", () => {
      bounds = null;
      if (tiltFrame) {
        cancelAnimationFrame(tiltFrame);
        tiltFrame = 0;
      }
      slide.style.setProperty("--pointer-x", "50%");
      slide.style.setProperty("--pointer-y", "50%");
      slide.style.setProperty("--tilt-x", "0deg");
      slide.style.setProperty("--tilt-y", "0deg");
    });
  });
}

function updateShowcaseHud(activeIndex, animate = true) {
  const counter = document.querySelector("#activeProjectNumber");
  const progress = document.querySelector("#showcaseProgressBar");
  const normalizedIndex = Math.min(projects.length - 1, Math.max(0, activeIndex));
  const slides = document.querySelectorAll(".project-slide");
  const activeSlide = slides[normalizedIndex];

  if (counter) {
    counter.textContent = String(normalizedIndex + 1).padStart(2, "0");
  }

  if (progress) {
    progress.style.transform = `scaleX(${(normalizedIndex + 1) / projects.length})`;
  }

  slides.forEach((slide, index) => {
    const historyDepth = normalizedIndex - index;

    slide.classList.toggle("is-active", index === normalizedIndex);
    slide.classList.toggle("is-past", index < normalizedIndex);
    slide.classList.toggle("is-future", index > normalizedIndex);
    slide.classList.toggle(
      "is-visible-past",
      historyDepth > 0 && historyDepth <= 3,
    );
  });

  if (
    animate &&
    normalizedIndex !== lastAnimatedProjectIndex &&
    window.gsap &&
    activeSlide &&
    !prefersReducedMotion &&
    !isPerformanceLite()
  ) {
    lastAnimatedProjectIndex = normalizedIndex;
    const content = activeSlide.querySelectorAll(
      ".project-number, .project-slide h3, .project-slide p, .project-slide__footer",
    );

    gsap.fromTo(
      content,
      { autoAlpha: 0.55, y: 18 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.045,
        ease: "power2.out",
        overwrite: true,
        clearProps: "opacity,visibility,transform",
      },
    );
  }
}

function setupShowcaseEffects() {
  const showcase = document.querySelector(".horizontal-showcase");

  if (!showcase || prefersReducedMotion) {
    return;
  }

  const visibilityObserver = new IntersectionObserver(
    ([entry]) => showcase.classList.toggle("is-in-view", entry.isIntersecting),
    { rootMargin: "120px 0px" },
  );
  visibilityObserver.observe(showcase);
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
      scrub: true,
    },
  });

  gsap.from(".site-header", { autoAlpha: 0, y: -22, duration: 0.65 });
  gsap.from(".hero-copy > *", { autoAlpha: 0, y: 42, stagger: 0.1, duration: 0.85 });
  gsap.from(".hero-visual", { autoAlpha: 0, x: 52, rotate: 2.5, duration: 1 });
  gsap.from(".hero-visual figcaption", { autoAlpha: 0, y: 24, delay: 0.4, duration: 0.7 });

  gsap.from(".intro-strip__inner", {
    autoAlpha: 0.45,
    x: 80,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".intro-strip",
      start: "top 92%",
      once: true,
    },
  });

  gsap.utils.toArray(".reveal").forEach((element) => {
    gsap.from(element, {
      autoAlpha: 0,
      y: 54,
      onStart: () => element.classList.add("is-visible"),
      scrollTrigger: {
        trigger: element,
        start: "top 82%",
        once: true,
      },
    });
  });

  ScrollTrigger.batch(".reveal-card", {
    start: "top 82%",
    once: true,
    onEnter: (batch) =>
      gsap.fromTo(
        batch,
        { autoAlpha: 0, y: 38 },
        { autoAlpha: 1, y: 0, stagger: 0.09, duration: 0.7, overwrite: true },
      ),
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

  mm.add("(min-width: 1100px) and (min-height: 700px)", () => {
    const track = document.querySelector(".project-track");
    const showcase = document.querySelector(".horizontal-showcase");
    const motionRails = document.querySelector(".motion-rails");
    const slides = gsap.utils.toArray(".project-slide");
    const folds = slides.map((slide) => slide.querySelector(".project-page-fold"));
    const fronts = slides.map((slide) => slide.querySelector(".project-page-front"));
    const backs = slides.map((slide) => slide.querySelector(".project-page-back"));
    const pageCount = Math.max(1, slides.length - 1);
    let activeProjectIndex = 0;

    showcase.classList.add("book-mode");

    const layoutPastPages = (currentIndex) => {
      slides.forEach((slide, index) => {
        const depth = currentIndex - index;

        if (depth <= 0 || depth > 3) {
          return;
        }

        gsap.set(slide, {
          xPercent: -100,
          x: -depth * 7,
          y: (depth - 2) * 7,
          z: -depth * 18,
          scale: 1 - depth * 0.012,
          rotationY: 4 + depth * 1.4,
          rotationZ: -1.2 - depth * 1.15,
          transformOrigin: "100% 50%",
          zIndex: 14 - depth,
        });
      });
    };

    gsap.set(track, { x: 0 });
    slides.forEach((slide, index) => {
      const fanOffset = Math.min(index, 5);

      gsap.set(slide, {
        x: fanOffset * 5,
        y: (fanOffset - 2) * 5,
        z: -fanOffset * 7,
        scale: 1 - fanOffset * 0.012,
        rotationY: -fanOffset * 1.8,
        rotationZ: (fanOffset - 2) * 1.15,
        autoAlpha: 1,
        zIndex: slides.length - index,
      });
    });
    gsap.set(slides, {
      transformOrigin: "0% 50%",
      force3D: true,
    });
    gsap.set(folds, { autoAlpha: 0, scaleX: 0, transformOrigin: "right center" });
    gsap.set(fronts, { autoAlpha: 1, backfaceVisibility: "hidden" });
    gsap.set(backs, { autoAlpha: 0, backfaceVisibility: "hidden" });

    const bookTimeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: showcase,
        start: "top top",
        end: () => `+=${Math.max(window.innerHeight * 0.9, 720) * pageCount}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const nextIndex = Math.min(
            pageCount,
            Math.floor(self.progress * pageCount + 0.53),
          );
          if (nextIndex !== activeProjectIndex) {
            activeProjectIndex = nextIndex;
            updateShowcaseHud(activeProjectIndex, false);
          }
          layoutPastPages(activeProjectIndex);
        },
      },
    });

    slides.slice(0, -1).forEach((slide, index) => {
      const nextSlide = slides[index + 1];
      const fold = folds[index];
      const position = index;
      const leftFan = Math.min(index, 5);

      bookTimeline
        .to(
          fold,
          { autoAlpha: 0.96, scaleX: 1, duration: 0.34 },
          position,
        )
        .to(
          slide,
          {
            rotationY: -89.5,
            rotationZ: -7,
            x: -12,
            y: -10,
            z: 34,
            scale: 0.97,
            duration: 0.48,
          },
          position,
        )
        .to(fronts[index], { autoAlpha: 0, duration: 0.02 }, position + 0.47)
        .to(backs[index], { autoAlpha: 1, duration: 0.02 }, position + 0.47)
        .set(
          slide,
          {
            xPercent: -100,
            rotationY: 89.5,
            z: -500,
            transformOrigin: "100% 50%",
            zIndex: index + 1,
          },
          position + 0.49,
        )
        .to(
          fold,
          { autoAlpha: 0.18, scaleX: 0.25, duration: 0.28 },
          position + 0.46,
        )
        .to(
          slide,
          {
            rotationY: 7 + leftFan * 1.5,
            rotationZ: -5 + leftFan * 1.4,
            x: -leftFan * 7,
            y: (leftFan - 2) * 6,
            z: -leftFan * 8,
            scale: 1 - leftFan * 0.012,
            duration: 0.51,
          },
          position + 0.49,
        )
        .to(
          nextSlide,
          {
            x: 0,
            y: 0,
            z: 0,
            scale: 1,
            rotationY: 0,
            rotationZ: 0,
            duration: 0.34,
          },
          position + 0.58,
        );
    });

    return () => {
      bookTimeline.kill();
      showcase.classList.remove("book-mode");
      gsap.set(slides, { clearProps: "all" });
      gsap.set(folds, { clearProps: "all" });
      gsap.set(fronts, { clearProps: "all" });
      gsap.set(backs, { clearProps: "all" });
      if (motionRails) {
        gsap.set(motionRails, { clearProps: "transform" });
      }
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

  let scrollFrame = 0;
  let showcaseFrame = 0;

  const renderScrollEffects = () => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progressBar.style.transform = `scaleX(${Math.min(1, window.scrollY / maxScroll)})`;
    scrollFrame = 0;
  };

  const updateScrollEffects = () => {
    if (!scrollFrame) {
      scrollFrame = requestAnimationFrame(renderScrollEffects);
    }
  };

  const renderActiveSlide = () => {
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

    showcaseFrame = 0;
  };

  const updateActiveSlide = () => {
    if (!showcaseFrame) {
      showcaseFrame = requestAnimationFrame(renderActiveSlide);
    }
  };

  renderScrollEffects();
  renderActiveSlide();
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
setupAdaptivePerformance();
renderFeaturedProjects();
setupMenu();
setupCustomCursor();
setupProjectTilt();
setupShowcaseEffects();
updateShowcaseHud(0, false);
setupAnimations();
