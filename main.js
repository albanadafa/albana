// ===================== LOADING PAGE =====================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  if (loader) {
    loader.classList.add("hide");
    setTimeout(() => {
      loader.style.display = "none";
    }, 600); // Tunggu transisi selesai
  }
});

// ===================== SCROLL REVEAL ANIMATION (IntersectionObserver) =====================
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  },
  { threshold: 0.15 } // muncul ketika 15% elemen terlihat
);

revealElements.forEach((el) => revealObserver.observe(el));

// ===================== PAGE TRANSITION BLUR UNTUK SINGLE PAGE =====================
const blurOverlay = document.getElementById("transition-blur");
const navLinks = document.querySelectorAll("nav a, .logo, .cta");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    if (href && href.startsWith("#")) {
      e.preventDefault();

      blurOverlay.classList.add("active");
      document.body.classList.add("spa-fade");

      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }

        setTimeout(() => {
          blurOverlay.classList.remove("active");
          document.body.classList.remove("spa-fade");
        }, 400);
      }, 200);
    }
  });
});

// ===================== SECTION OVERLAY UNTUK WORK, ABOUT, CONTACT (IntersectionObserver) =====================
const overlay = document.getElementById("transition-overlay");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    let isActive = false;

    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        ["work", "about", "contact"].includes(entry.target.id)
      ) {
        isActive = true;
      }
    });

    if (isActive) {
      overlay.classList.add("active");
    } else {
      overlay.classList.remove("active");
    }
  },
  { threshold: 0.5 } // aktif jika 50% bagian tengah terlihat
);

document.querySelectorAll("section").forEach((sec) => sectionObserver.observe(sec));
