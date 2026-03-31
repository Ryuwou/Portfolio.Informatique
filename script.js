document.addEventListener("DOMContentLoaded", () => {

  if (window.innerWidth >= 768) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 60 },
        color: { value: ["#00FFCC", "#00FFFF"] },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#00ffcc",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
        },
        modes: {
          repulse: { distance: 100, duration: 0.4 },
          push: { particles_nb: 4 },
        },
      },
      retina_detect: true,
    });
  } else {
    const pJs = document.getElementById("particles-js");
    if (pJs) pJs.style.display = "none";
  }

  const burgerMenu = document.querySelector(".burger-menu");
  const navLinks = document.querySelector(".nav-links");

  if (burgerMenu && navLinks) {
    burgerMenu.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      burgerMenu.classList.toggle("open");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", (e) => {
        navLinks.classList.remove("active");
        burgerMenu.classList.remove("open");

        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  const observerOptions = {
    threshold: window.innerWidth < 768 ? 0.2 : 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("hidden");
      }
    });
  }, observerOptions);

  document.querySelectorAll("section").forEach((sec) => observer.observe(sec));

  // --- PARTIE TRADUCTION ---
  const savedLang = localStorage.getItem("lang") || "fr";

  i18next.init({
    lng: savedLang,
    resources: {
      en: {
        translation: {
          "home": "Home", "about": "About", "skills": "Skills", "projects": "Projects",
          "title": "IT Portfolio", "name": "Student", "tagline": "", "cta": "Discover",
          "aboutTitle": "Profile", 
          "aboutText": "I am currently studying Multimedia and Internet Technology (MMI), where I am specializing in computer science, particularly development. I enjoy coding clean solutions, understanding the logic behind each feature, and solving problems. Whether it's web development or more general programming, my main goal is to write efficient and high-performing code.",
          "skillsTitle": "Stack", "development": "Development", "graphics": "Graphics", "algorithmics": "Algorithmics & 3D",
          "projectsTitle": "Projects", 
          "project1": "Hexapod",
          "project1Desc": "The six-legged robot is designed to explore places inaccessible to humans in chaotic situations.",
          "project2": "Time Tempest",
          "project2Desc": "Time Tempest is a game where you play as Neyth, a time traveler tasked with correcting historical distortions.",
          "project3": "Site",
          "project3Desc": "Design of a culinary website with images and links to recipes, as well as interactive features.",
          "project4": "Web Game Development",
          "project4Desc": "Creation of an interactive game engine in JavaScript with collision management and smooth animations.",
          "project5": "Web Site",
          "project5Desc": "Complete design and development of a website to present my resume for specific projects.",
          "moreProjectsTitle": "And much more!", 
          "moreProjectsText": "Some projects are still in development.", 
          "discover": "Discover"
        }
      },
      fr: {
        translation: {
          "home": "Accueil", "about": "À propos", "skills": "Compétences", "projects": "Projets",
          "title": "Portfolio Informatique", "name": "Étudiante", "tagline": "", "cta": "Découvrir",
          "aboutTitle": "Profil", 
          "aboutText": "Je suis actuellement en BUT MMI, là où je me spécialise en informatique, surtout en développement. J’aime coder des solutions propres, comprendre la logique derrière chaque fonctionnalité et résoudre des problèmes. Que ce soit en web ou en programmation plus générale, je cherche surtout à écrire du code efficace et performant.",
          "skillsTitle": "Compétences", "development": "Développement", "algorithmics": "Algorithmique & 3D", "graphics": "Graphisme",
          "projectsTitle": "Projets", 
          "project1": "Hexapode",
          "project1Desc": "Le robot à six pattes est conçu pour explorer des endroits inaccessibles pour l'homme en cas de situation chaotique.",
          "project2": "Time Tempest",
          "project2Desc": "Time Tempest est un jeu où vous incarnez Neyth, un voyageur temporel chargé de corriger les distorsions historiques.",
          "project3": "Site",
          "project3Desc": "Conception d'un site culinaire avec des images et des liens vers des recettes, ainsi que des fonctionnalités interactives.",
          "project4": "Développement Jeu Web",
          "project4Desc": "Création d'un moteur de jeu interactif en JavaScript avec gestion des collisions et animations fluides.",
          "project5": "Site Web",
          "project5Desc": "Conception et développement complet d'un site web pour présenter mon CV pour des projets.",
          "moreProjectsTitle": "Et bien plus encore !", 
          "moreProjectsText": "Certains projets sont encore en cours de développement", 
          "discover": "Découvrir"
        }
      }
    }
  }, function (err, t) {
    updateContent();
    updateButtons(i18next.language);
  });

  function updateContent() {
    document.querySelectorAll("[data-key]").forEach((element) => {
      const key = element.getAttribute("data-key");
      element.textContent = i18next.t(key);
    });
  }

  function updateButtons(lang) {
    const frBtn = document.getElementById("fr");
    const enBtn = document.getElementById("en");
    if(frBtn) frBtn.classList.toggle("selected", lang === "fr");
    if(enBtn) enBtn.classList.toggle("selected", lang === "en");
  }

  window.switchLanguage = function(lang) {
    i18next.changeLanguage(lang, function () {
      updateContent();
      localStorage.setItem("lang", lang);
      updateButtons(lang);
    });
  };

  const frBtn = document.getElementById("fr");
  const enBtn = document.getElementById("en");
  if(frBtn) frBtn.addEventListener("click", () => window.switchLanguage("fr"));
  if(enBtn) enBtn.addEventListener("click", () => window.switchLanguage("en"));

});