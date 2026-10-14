const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
  body.classList.add("dark");
  if (themeIcon) themeIcon.textContent = "☀️";
} else {
  if (themeIcon) themeIcon.textContent = "🌙";
}

function setTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark");
    if (themeIcon) themeIcon.textContent = "☀️";
    localStorage.setItem("portfolio-theme", "dark");
  } else {
    body.classList.remove("dark");
    if (themeIcon) themeIcon.textContent = "🌙";
    localStorage.setItem("portfolio-theme", "light");
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = body.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  });
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });
}

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (nav) nav.classList.remove("is-open");
  });
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => revealObserver.observe(element));