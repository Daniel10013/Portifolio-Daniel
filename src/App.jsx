import React, { useState, useEffect } from "react";
import translations from "./translations.json";
import logo from "./assets/images/logo-daniel.png";
import foto from "./assets/images/daniel-foto.png";
import { FaGlobe, FaBars, FaTimes } from "react-icons/fa";
import "./App.css";

function App() {
  const [lang, setLang] = useState("pt");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = translations[lang];

  const toggleLang = () => setLang(lang === "pt" ? "en" : "pt");
  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const closeMenuOnResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", closeMenuOnResize);
    return () => window.removeEventListener("resize", closeMenuOnResize);
  }, []);

  useEffect(() => {
    const sobreSection = document.getElementById("sobre");
    if (sobreSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("active");
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(sobreSection);
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    const experiences = document.querySelectorAll("#experiencias .experience");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.3 }
    );
    experiences.forEach((exp) => observer.observe(exp));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("#projetos, #skills, #contato");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="App">
      <header className="header">

        <div className="nav-left">
          <a href="#home" onClick={() => setMenuOpen(false)}>{t.nav.home}</a>
          <a href="#sobre" onClick={() => setMenuOpen(false)}>{t.nav.sobre}</a>
          <a href="#experiencias" onClick={() => setMenuOpen(false)}>{t.nav.experiencias}</a>
        </div>

        <div className="header-center">
          <img src={logo} alt="Logo Daniel" className="logo" />
        </div>

        <div className="nav-right">
          <a href="#projetos" onClick={() => setMenuOpen(false)}>{t.nav.projetos}</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>{t.nav.skills}</a>
          <a href="#contato" onClick={() => setMenuOpen(false)}>{t.nav.contato}</a>
        </div>

        <button className="hamburger" onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <button className="btn-lang" onClick={toggleLang}>
          <FaGlobe className="icon" /> {lang.toUpperCase()}
        </button>

        <div className={`mobile-nav ${menuOpen ? "active" : ""}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>{t.nav.home}</a>
          <a href="#sobre" onClick={() => setMenuOpen(false)}>{t.nav.sobre}</a>
          <a href="#experiencias" onClick={() => setMenuOpen(false)}>{t.nav.experiencias}</a>
          <a href="#projetos" onClick={() => setMenuOpen(false)}>{t.nav.projetos}</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>{t.nav.skills}</a>
          <a href="#contato" onClick={() => setMenuOpen(false)}>{t.nav.contato}</a>
        </div>

      </header>

      <main>
        <section id="home">
          <div className="container">
            <img src={foto} alt="foto Daniel" className="Profile" />
            <div className="content">
              <h1>{t.home.greeting}</h1>
              <p>{t.home.welcome}</p>
              <a
                href={lang === "pt" ? "/assets/CV_PT.pdf" : "/assets/CV_EN.pdf"}
                download
                className="btn-download"
              >
                {t.home.downloadCV}
              </a>
            </div>
          </div>
        </section>

        <section id="sobre">
          <h1>{t.sobre.title}</h1>
          <p>{t.sobre.paragraph1}</p>
          <p>{t.sobre.paragraph2}</p>
          <p>{t.sobre.paragraph3}</p>
        </section>

        <section id="experiencias">
          <h1>{t.nav.experiencias}</h1>
          <div className="timeline">
            {t.experiencias.map((exp, i) => (
              <div className={`experience ${i % 2 === 0 ? "left" : "right"}`} key={i}>
                <h2>{exp.empresa}</h2>
                <span>{exp.periodo}</span>
                <ul>
                  {exp.atividades.map((atividade, idx) => (
                    <li key={idx}>{atividade}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="projetos">
          <h1>{t.nav.projetos}</h1>
          <div className="projects-container">
            {t.projetos.map((proj, i) => (
              <div
                className="project-card"
                key={i}
                onClick={() => window.open(proj.link, "_blank")}
              >
                <div
                  className="project-image"
                  style={{ backgroundImage: `url(${proj.image})` }}
                ></div>
                <div className="project-info">
                  <h3>{proj.title}</h3>
                  <p>{proj.description}</p>
                  <button onClick={() => window.open(proj.link, "_blank")}>
                    Ver Projeto
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills">
          <h1>{t.nav.skills}</h1>
          <div className="skills-container">
            {t.skills.map((skill, i) => (
              <div className="skill-card" key={i}>
                <img src={skill.image} alt={skill.name} />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="contato">
          <h1>{t.contato.title}</h1>
          <p>{t.contato.text}</p>
          <div className="contact-container">
            <a
              href={t.contato.linkedin}
              target="_blank"
              rel="noreferrer"
              className="contact-card"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                alt="LinkedIn"
              />
              <span>LinkedIn</span>
            </a>
            <a
              href={t.contato.github}
              target="_blank"
              rel="noreferrer"
              className="contact-card github"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="GitHub"
              />
              <span>GitHub</span>
            </a>
            <a href={t.contato.email} className="contact-card">
              <img
                src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
                alt="Email"
              />
              <span>Email</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
