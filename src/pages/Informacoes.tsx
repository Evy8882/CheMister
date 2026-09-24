import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faTableCells,
  faCalculator,
  faScaleBalanced,
  faVial,
  faDroplet,
  faArrowRight,
  faBookOpen,
  faLightbulb,
  faGraduationCap,
  faAtom
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Home.css";

interface InfoItem {
  id: string;
  title: string;
  subtitle: string;
  category: "basico" | "calculo" | "simulacao";
  categoryLabel: string;
  path: string;
  icon: IconDefinition;
  analogy: string;
  explanation: string;
}

const infoData: InfoItem[] = [
  {
    id: "periodic-table-info",
    title: "Tabela Periódica",
    subtitle: "O Catálogo do Universo",
    category: "basico",
    categoryLabel: "Conceito Base",
    path: "/periodic-table",
    icon: faTableCells,
    analogy: "Pense na Tabela Periódica como um menu de ingredientes fundamentais.",
    explanation: "Tudo o que existe no universo — desde o ar que você respira até o seu celular — é formado pela combinação desses 118 elementos químicos. A ferramenta te ajuda a consultar o 'peso' e as características de cada um deles.",
  },
  {
    id: "molar-mass-info",
    title: "Massa Molar",
    subtitle: "A Balança das Moléculas",
    category: "calculo",
    categoryLabel: "Cálculo",
    path: "/molar-mass-calculator",
    icon: faCalculator,
    analogy: "É como somar o peso de todos os ingredientes de uma receita.",
    explanation: "Como as moléculas são invisíveis e minúsculas, os químicos usam a 'massa molar' para saber quantos gramas pesa um grupo gigante de moléculas (1 mol). A calculadora faz essa soma pesada pra você instantaneamente.",
  },
  {
    id: "equation-balancer-info",
    title: "Balanceamento de Equações",
    subtitle: "A Regra do 'Nada se Perde'",
    category: "calculo",
    categoryLabel: "Cálculo",
    path: "/equation-balancer",
    icon: faScaleBalanced,
    analogy: "Funciona como uma balança de dois pratos que precisa ficar perfeitamente reta.",
    explanation: "Na química, os átomos apenas se rearranjam, nenhum desaparece. O balanceador descobre a quantidade exata de cada molécula necessária no início para que o resultado final tenha exatamente os mesmos átomos.",
  },
  {
    id: "solubility-info",
    title: "Solubilidade",
    subtitle: "O Limite da Mistura",
    category: "calculo",
    categoryLabel: "Cálculo",
    path: "/solubility-calculator",
    icon: faDroplet,
    analogy: "Sabe quando você coloca achocolatado demais e sobra aquele 'pó' no fundo do copo?",
    explanation: "Existe um limite exato de quanto pó a água consegue dissolver. Essa calculadora te diz até onde a mistura é perfeita e a partir de quantos gramas vai começar a sobrar resto (o chamado 'corpo de chão').",
  },
  {
    id: "ph-simulator-info",
    title: "Simulador de pH",
    subtitle: "Escala de Acidez",
    category: "simulacao",
    categoryLabel: "Simulação",
    path: "/ph-simulator",
    icon: faVial,
    analogy: "É o termômetro que mede se algo é 'azedo' ou 'amargo'.",
    explanation: "O pH mede a quantidade de íons de hidrogênio em um líquido. Vai de 0 a 14: valores baixos são ácidos (como limão), 7 é neutro (água pura) e valores altos são básicos (como sabão e água sanitária).",
  }
];

function Informacoes() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredInfo = infoData.filter((item) => {
    return selectedCategory === "all" || item.category === selectedCategory;
  });

  return (
    <div className="home-page">
      <Header />

      {/* Topo Explicativo */}
      <section className="hero-section">
        <div className="hero-background-effects">
          <div className="glow-orb orb-1"></div>
          <div className="glow-orb orb-2"></div>
        </div>

        <div className="hero-container">
          <h1 className="hero-title">
            Guia de Química para <span className="gradient-text">Iniciantes</span>
          </h1>

          <p className="hero-description">
            Não entende muito de química? Sem problemas! Aqui a gente explica o que cada
            ferramenta do CheMister faz usando analogias simples do seu dia a dia.
          </p>

          <div className="hero-actions">
            <a href="#info-cards-section" className="btn-primary">
              <FontAwesomeIcon icon={faBookOpen} /> Começar a Aprender
            </a>
          </div>
        </div>
      </section>

      {/* Lista de Seções Explicativas */}
      <section id="info-cards-section" className="tools-section">
        <div className="section-header">
          <h2 className="section-title">O que cada módulo faz?</h2>
          <p className="section-subtitle">
            Filtre por categoria e descubra o conceito por trás de cada funcionalidade.
          </p>
        </div>

        {/* Filtros */}
        <div className="tools-filter-bar">
          <div className="category-pills">
            <button
              className={`pill-btn ${selectedCategory === "all" ? "active" : ""}`}
              onClick={() => setSelectedCategory("all")}
            >
              Todos
            </button>
            <button
              className={`pill-btn ${selectedCategory === "basico" ? "active" : ""}`}
              onClick={() => setSelectedCategory("basico")}
            >
              Conceitos Base
            </button>
            <button
              className={`pill-btn ${selectedCategory === "calculo" ? "active" : ""}`}
              onClick={() => setSelectedCategory("calculo")}
            >
              Cálculos
            </button>
            <button
              className={`pill-btn ${selectedCategory === "simulacao" ? "active" : ""}`}
              onClick={() => setSelectedCategory("simulacao")}
            >
              Simulações
            </button>
          </div>
        </div>

        {/* Cards com as explicações */}
        <div className="tools-grid">
          {filteredInfo.map((item) => (
            <div key={item.id} className="tool-card" style={{ cursor: "default" }}>
              <div className="tool-card-header">
                <div className="tool-icon-box">
                  <FontAwesomeIcon icon={item.icon} />
                </div>
              </div>

              <div className="tool-card-body">
                <span className="tool-category">{item.categoryLabel}</span>
                <h3 className="tool-title">{item.title}</h3>
                <p style={{ color: "#38bdf8", fontWeight: "bold", fontSize: "0.9rem", marginBottom: "8px" }}>
                  "{item.subtitle}"
                </p>
                <p className="tool-desc" style={{ marginBottom: "12px", fontStyle: "italic", color: "#c9d1d9" }}>
                  👉 {item.analogy}
                </p>
                <p className="tool-desc">{item.explanation}</p>
              </div>

              <div className="tool-card-footer">
                <Link to={item.path} className="open-tool-text">
                  Testar essa ferramenta <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Informacoes;