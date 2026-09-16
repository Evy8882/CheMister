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
  faArrowDown,
  faBookOpen,
  faLightbulb,
  faGraduationCap,
  faAtom
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Informacoes.css";

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
  { id: "periodic-table-info", title: "Tabela Periódica", subtitle: "O Catálogo do Universo", category: "basico", categoryLabel: "Conceito Base", path: "/periodic-table", icon: faTableCells, analogy: "Pense na Tabela Periódica como um menu de ingredientes fundamentais.", explanation: "Tudo o que existe no universo, desde o ar que você respira até o seu celular, é formado pela combinação desses 118 elementos químicos." },
  { id: "molar-mass-info", title: "Massa Molar", subtitle: "A Balança das Moléculas", category: "calculo", categoryLabel: "Cálculo", path: "/molar-mass-calculator", icon: faCalculator, analogy: "É como somar o peso de todos os ingredientes de uma receita.", explanation: "A calculadora soma a massa dos átomos de uma fórmula para descobrir quanto pesa um mol daquela substância." },
  { id: "equation-balancer-info", title: "Balanceamento de Equações", subtitle: "A Regra do Nada se Perde", category: "calculo", categoryLabel: "Cálculo", path: "/equation-balancer", icon: faScaleBalanced, analogy: "Funciona como uma balança de dois pratos que precisa ficar perfeitamente reta.", explanation: "Os átomos apenas se rearranjam. O balanceador encontra a quantidade exata de cada molécula para conservar todos eles." },
  { id: "solubility-info", title: "Solubilidade", subtitle: "O Limite da Mistura", category: "calculo", categoryLabel: "Cálculo", path: "/solubility-calculator", icon: faDroplet, analogy: "Sabe quando você coloca achocolatado demais e sobra pó no fundo do copo?", explanation: "A calculadora mostra quanto soluto a água consegue dissolver e quando o excesso começa a precipitar." },
  { id: "ph-simulator-info", title: "Simulador de pH", subtitle: "A Escala de Acidez", category: "simulacao", categoryLabel: "Simulação", path: "/ph-simulator", icon: faVial, analogy: "É o termômetro que mede se algo é azedo, neutro ou básico.", explanation: "Explore a escala de 0 a 14 e veja como a concentração de íons de hidrogênio muda o comportamento de uma solução." }
];

function Informacoes() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const filteredInfo = infoData.filter((item) => selectedCategory === "all" || item.category === selectedCategory);

  return (
    <div className="information-page">
      <Header />
      <main>
        <section className="info-hero">
          <div className="info-hero-copy">
            <span className="info-kicker"><FontAwesomeIcon icon={faBookOpen} /> Manual de bancada · 01</span>
            <h1>Química que faz <em>sentido.</em></h1>
            <p className="info-hero-lede">Um mapa rápido para entender o que acontece por trás de cada ferramenta do CheMister. Comece pelo conceito, depois coloque a mão na massa.</p>
            <a href="#info-modules" className="info-scroll-link"><span>Ver o mapa de ferramentas</span><FontAwesomeIcon icon={faArrowDown} /></a>
          </div>
          <div className="lab-illustration" aria-label="Ilustração de um frasco de laboratório">
            <span className="lab-caption lab-caption-top">ATENÇÃO AOS DETALHES</span><span className="lab-caption lab-caption-side">118 ELEMENTOS</span>
            <div className="lab-orbit lab-orbit-one"></div><div className="lab-orbit lab-orbit-two"></div>
            <div className="lab-flask"><div className="lab-neck"></div><div className="lab-liquid"><span></span></div><FontAwesomeIcon icon={faAtom} className="lab-atom" /></div>
            <div className="lab-tag"><span>CHE</span><strong>Mi</strong><span>STER</span></div>
          </div>
        </section>
        <section className="info-principles" aria-label="Como usar este guia">
          <div className="principle-item"><span className="principle-number">01</span><FontAwesomeIcon icon={faLightbulb} /><div><strong>Entenda primeiro</strong><span>Conceitos em linguagem humana.</span></div></div>
          <div className="principle-item"><span className="principle-number">02</span><FontAwesomeIcon icon={faAtom} /><div><strong>Conecte com a vida</strong><span>Analogias que ficam na memória.</span></div></div>
          <div className="principle-item"><span className="principle-number">03</span><FontAwesomeIcon icon={faGraduationCap} /><div><strong>Teste na prática</strong><span>Abra a ferramenta e experimente.</span></div></div>
        </section>
        <section id="info-modules" className="info-modules">
          <div className="info-section-heading"><div><span className="info-kicker">Escolha seu ponto de partida</span><h2>O mapa da bancada</h2></div><p>Não existe ordem certa. Siga a sua curiosidade e descubra como as peças se encaixam.</p></div>
          <div className="info-filter-row"><span className="filter-label">Mostrar:</span>{[["all", "Tudo"], ["basico", "Fundamentos"], ["calculo", "Cálculos"], ["simulacao", "Simulações"]].map(([value, label]) => <button key={value} className={`info-filter ${selectedCategory === value ? "active" : ""}`} onClick={() => setSelectedCategory(value)} aria-pressed={selectedCategory === value}>{label}</button>)}</div>
          <div className="info-list">{filteredInfo.map((item, index) => <article key={item.id} className={`info-module module-${(index % 3) + 1}`}><div className="module-index">{String(index + 1).padStart(2, "0")}</div><div className="module-icon"><FontAwesomeIcon icon={item.icon} /></div><div className="module-main"><span className="module-category">{item.categoryLabel}</span><h3>{item.title}</h3><p className="module-analogy">{item.analogy}</p><p className="module-explanation">{item.explanation}</p></div><div className="module-side"><span className="module-subtitle">{item.subtitle}</span><Link to={item.path} className="module-link">Abrir ferramenta <FontAwesomeIcon icon={faArrowRight} /></Link></div></article>)}</div>
        </section>
        <section className="info-note"><FontAwesomeIcon icon={faVial} /><div><span className="info-kicker">Uma coisa de cada vez</span><p>Use este guia como uma legenda, não como uma prova. A melhor forma de aprender é testar uma ideia e observar o que muda.</p></div><Link to="/periodic-table" aria-label="Ir para a tabela periódica"><FontAwesomeIcon icon={faArrowRight} /></Link></section>
      </main>
      <Footer />
    </div>
  );
}

export default Informacoes;