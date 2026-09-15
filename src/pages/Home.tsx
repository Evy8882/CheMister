import { useState } from "react";
import Header from "../components/Header";
import logo from "../assets/Logos/3.png";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faTableCells,
  faCalculator,
  faScaleBalanced,
  faVial,
  faFlask,
  faArrowRight,
  faBolt,
  faGraduationCap,
  faCircleInfo
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Home.css";

interface ToolItem {
  id: string;
  title: string;
  category: "tabela" | "calculo" | "simulacao";
  categoryLabel: string;
  path: string;
  icon: IconDefinition;
  description: string;
}

const toolsData: ToolItem[] = [
  {
    id: "periodic-table",
    title: "Tabela Periódica Interativa",
    category: "tabela",
    categoryLabel: "Consulta",
    path: "/periodic-table",
    icon: faTableCells,
    description: "Navegue por todos os 118 elementos químicos com informações sobre massa atômica, estado físico e grupos.",
  },
  {
    id: "molar-mass",
    title: "Calculadora de Massa Molar",
    category: "calculo",
    categoryLabel: "Cálculo",
    path: "/molar-mass-calculator",
    icon: faCalculator,
    description: "Insira qualquer fórmula química (ex: H₂SO₄, C₆H₁₂O₆) e descubra a massa molar precisa instantaneamente.",
  },
  {
    id: "equation-balancer",
    title: "Balanceador de Equações",
    category: "calculo",
    categoryLabel: "Cálculo",
    path: "/equation-balancer",
    icon: faScaleBalanced,
    description: "Balanceie reações químicas automaticamente com coeficientes estequiométricos corretos.",
  },
  {
    id: "ph-simulator",
    title: "Simulador de pH",
    category: "simulacao",
    categoryLabel: "Simulação",
    path: "/ph-simulator",
    icon: faVial,
    description: "Explore a acidez de soluções com base no valor da concentração de íons H⁺ e visualize mudanças de pH em tempo real.",
  }
];

function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredTools = toolsData.filter((tool) => {
    return selectedCategory === "all" || tool.category === selectedCategory;
  });

  return (
    <div className="home-page">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background-effects">
          <div className="glow-orb orb-1"></div>
          <div className="glow-orb orb-2"></div>
        </div>

        <div className="hero-container">
          <h1 className="hero-title">
            Reinventando o aprendizado de <span className="gradient-text">Química</span>
          </h1>

          <p className="hero-description">
            Explore ferramentas interativas de cálculos, tabela periódica, balanceamento de equações e simulações.
            Aprenda e pratique química com precisão e facilidade.
          </p>

          <div className="hero-actions">
            <a href="#tools-section" className="btn-primary">
              <FontAwesomeIcon icon={faFlask} /> Explorar Ferramentas
            </a>
            <a href="#features-section" className="btn-secondary">
              <FontAwesomeIcon icon={faCircleInfo} /> Conhecer a Plataforma
            </a>
          </div>
        </div>

        <div className="hero-logo-wrapper">
          <div className="logo-halo"></div>
          <img src={logo} alt="CheMister Mascot Logo" className="hero-logo" />
        </div>
      </section>

      {/* Stats Highlights Bar */}
      <section className="stats-bar-section">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <FontAwesomeIcon icon={faFlask} />
            </div>
            <div className="stat-info">
              <span className="stat-number">4</span>
              <span className="stat-label">Ferramentas Práticas</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <FontAwesomeIcon icon={faBolt} />
            </div>
            <div className="stat-info">
              <span className="stat-number">100%</span>
              <span className="stat-label">Gratuito & Rápido</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <FontAwesomeIcon icon={faGraduationCap} />
            </div>
            <div className="stat-info">
              <span className="stat-number">Etec</span>
              <span className="stat-label">Apoio Peruíbe</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools-section" className="tools-section">
        <div className="section-header">
          <h2 className="section-title">Ferramentas Disponíveis</h2>
          <p className="section-subtitle">
            Selecione uma das ferramentas abaixo para iniciar seus estudos e cálculos químicos.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="tools-filter-bar">
          <div className="category-pills">
            <button
              className={`pill-btn ${selectedCategory === "all" ? "active" : ""}`}
              onClick={() => setSelectedCategory("all")}
            >
              Todas
            </button>
            <button
              className={`pill-btn ${selectedCategory === "tabela" ? "active" : ""}`}
              onClick={() => setSelectedCategory("tabela")}
            >
              Tabela
            </button>
            <button
              className={`pill-btn ${selectedCategory === "calculo" ? "active" : ""}`}
              onClick={() => setSelectedCategory("calculo")}
            >
              Cálculo
            </button>
            <button
              className={`pill-btn ${selectedCategory === "simulacao" ? "active" : ""}`}
              onClick={() => setSelectedCategory("simulacao")}
            >
              Simulação
            </button>
          </div>
        </div>

        {/* Tools Cards Grid */}
        <div className="tools-grid">
          {filteredTools.map((tool) => (
            <Link to={tool.path} key={tool.id} className="tool-card">
              <div className="tool-card-header">
                <div className="tool-icon-box">
                  <FontAwesomeIcon icon={tool.icon} />
                </div>
              </div>

              <div className="tool-card-body">
                <span className="tool-category">{tool.categoryLabel}</span>
                <h3 className="tool-title">{tool.title}</h3>
                <p className="tool-desc">{tool.description}</p>
              </div>

              <div className="tool-card-footer">
                <span className="open-tool-text">
                  Acessar Ferramenta <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="cta-banner-section">
        <div className="cta-banner-container">
          <div className="cta-banner-content">
            <h2>Pronto para descomplicar seus estudos de química?</h2>
            <p>Explore a Tabela Periódica ou use nossas calculadoras científicas agora mesmo.</p>
          </div>
          <Link to="/periodic-table" className="btn-primary banner-btn">
            <FontAwesomeIcon icon={faTableCells} /> Explorar Tabela Periódica
          </Link>
          <Link to="/CalculadorSolubilidade" className="tool-card" style={{ gridColumn: "2" }}>
            <h3>Calculadora de Solubilidade</h3>
            <p>Calcule a solubilidade de compostos químicos facilmente.</p>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;

