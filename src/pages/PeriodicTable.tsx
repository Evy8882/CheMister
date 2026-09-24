import Header from "../components/Header";
import data from "../data/elements.json";
import { useState } from "react";
import { GetSelectedDesktop, GetSelectedMobile } from "../components/GetSelected";
import Footer from "../components/Footer";
import "../styles/App.css";
import "../styles/PeriodicTable.css";

type Element = {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  group: number;
  period: number;
  category: string | null;
  state: string | null;
  electronegativity: number | null;
};

const colors = [
  "#C84021",
  "#1B933C",
  "#2242D8",
  "#740ECB",
  "#D61C7F",
  "#109E97",
  "#A68500",
  "#CC5810",
  "#621ACC",
  "#18A952",
  "#CC185C",
  "#1B63CC",
  "#C47D0E",
  "#1C9D82",
  "#6B9E32",
  "#A89800",
  "#A60013",
  "#C47D0E",
  "#2C6CBD",
];

const getColor = (element: Element, mode: string): string => {
  if (mode === "groups") {
    if (element.atomicNumber === 1) {
      return "#555555";
    }
    if (element.group > 2 && element.group < 13) {
      return colors[3];
    }
    return colors[element.group];
  } else if (mode === "periods") {
    return colors[element.period];
  } else if (mode === "state") {
    if (element.state === "sólido") {
      return colors[0];
    } else if (element.state === "líquido") {
      return colors[1];
    } else if (element.state === "gasoso") {
      return colors[2];
    }
    return "#555555";
  } else if (mode === "electronegativity") {
    if (element.electronegativity === null) {
      return "#333";
    }
    return "rgba(255, 0, 0, alpha )".replace(
      "alpha",
      (element.electronegativity / 4).toString()
    );
  } else if (mode === "category") {
    switch (element.category) {
      case "não metal":
        return colors[0];
      case "metal alcalino":
        return "#3D784A";
      case "metal alcalino-terroso":
        return "#D65E2A";
      case "semi-metal":
        return "#B88B00";
      case "metal de transição":
        return "#C45A00";
      case "metal representativo":
        return "#CC3300";
      case "halogênio":
        return colors[1];
      case "gás nobre":
        return colors[2];
      case "lantanídeo":
        return colors[3];
      case "actinídeo":
        return colors[4];
    }
  }
  return "";
};

function PeriodicTable() {
  const [mode, setMode] = useState<string>("none");
  const [selected, setSelected] = useState<Element | null>(null);

  // Detail display toggles (can hide info when space is tight or per user choice)
  const [showNumber, setShowNumber] = useState<boolean>(true);
  const [showName, setShowName] = useState<boolean>(true);
  const [showMass, setShowMass] = useState<boolean>(true);

  // Table zoom scale (from 0.75x to 1.25x)
  const [zoom, setZoom] = useState<number>(1);

  // Quick element search query
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleDensityChange = (density: "full" | "compact" | "minimal") => {
    if (density === "full") {
      setShowNumber(true);
      setShowName(true);
      setShowMass(true);
    } else if (density === "compact") {
      setShowNumber(true);
      setShowName(false);
      setShowMass(false);
    } else if (density === "minimal") {
      setShowNumber(false);
      setShowName(false);
      setShowMass(false);
    }
  };

  const currentDensity =
    showNumber && showName && showMass
      ? "full"
      : showNumber && !showName && !showMass
      ? "compact"
      : !showNumber && !showName && !showMass
      ? "minimal"
      : "custom";

  return (
    <div className="tool-page-layout">
      <div className="tool-bg-effects">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>

      <Header />

      <main className="tool-main-content">
        <div className="tool-header-block">
          <h1 className="tool-page-title">Tabela Periódica Interativa</h1>
          <p className="tool-page-subtitle">
            Navegue pelos 118 elementos químicos com layout responsivo. Personalize a exibição e oculte informações para otimizar o espaço em qualquer tela.
          </p>
        </div>

        <div className="periodic-table-wrapper">
          {/* Main Controls Panel */}
          <div className="table-controls-panel">
            {/* Filter Modes */}
            <div className="control-group">
              <span className="control-label">Filtros:</span>
              <div className="modes-container">
                <button
                  className={"mode-btn" + (mode === "groups" ? " active" : "")}
                  onClick={() => setMode(mode !== "groups" ? "groups" : "none")}
                >
                  Grupos
                </button>
                <button
                  className={"mode-btn" + (mode === "periods" ? " active" : "")}
                  onClick={() => setMode(mode !== "periods" ? "periods" : "none")}
                >
                  Períodos
                </button>
                <button
                  className={"mode-btn" + (mode === "state" ? " active" : "")}
                  onClick={() => setMode(mode !== "state" ? "state" : "none")}
                >
                  Estado Físico
                </button>
                <button
                  className={"mode-btn" + (mode === "electronegativity" ? " active" : "")}
                  onClick={() => setMode(mode !== "electronegativity" ? "electronegativity" : "none")}
                >
                  Eletronegatividade
                </button>
                <button
                  className={"mode-btn" + (mode === "category" ? " active" : "")}
                  onClick={() => setMode(mode !== "category" ? "category" : "none")}
                >
                  Categoria
                </button>
              </div>
            </div>

            {/* Display / Info Density Controls */}
            <div className="control-group">
              <span className="control-label">Ocultar Informações:</span>
              <div className="display-toggles-container">
                <div className="preset-buttons">
                  <button
                    className={"density-btn" + (currentDensity === "full" ? " active" : "")}
                    onClick={() => handleDensityChange("full")}
                    title="Exibir todos os dados (Nº, Símbolo, Nome, Massa)"
                  >
                    Completo
                  </button>
                  <button
                    className={"density-btn" + (currentDensity === "compact" ? " active" : "")}
                    onClick={() => handleDensityChange("compact")}
                    title="Exibir apenas Nº Atômico e Símbolo"
                  >
                    Compacto
                  </button>
                  <button
                    className={"density-btn" + (currentDensity === "minimal" ? " active" : "")}
                    onClick={() => handleDensityChange("minimal")}
                    title="Exibir apenas o Símbolo do elemento"
                  >
                    Mínimo
                  </button>
                </div>

                <div className="custom-toggles">
                  <label className="toggle-checkbox">
                    <input
                      type="checkbox"
                      checked={showNumber}
                      onChange={(e) => setShowNumber(e.target.checked)}
                    />
                    <span>Nº Atômico</span>
                  </label>
                  <label className="toggle-checkbox">
                    <input
                      type="checkbox"
                      checked={showName}
                      onChange={(e) => setShowName(e.target.checked)}
                    />
                    <span>Nome</span>
                  </label>
                  <label className="toggle-checkbox">
                    <input
                      type="checkbox"
                      checked={showMass}
                      onChange={(e) => setShowMass(e.target.checked)}
                    />
                    <span>Massa</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Zoom & Search Controls */}
            <div className="control-group search-zoom-row">
              <div className="search-box">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Buscar elemento (ex: Fe, Ferro, 26)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="search-clear-btn" onClick={() => setSearchQuery("")}>
                    ✕
                  </button>
                )}
              </div>

              <div className="zoom-controls">
                <span className="control-label zoom-label">Zoom:</span>
                <div className="zoom-btn-group">
                  <button
                    className="zoom-btn"
                    onClick={() => setZoom((prev) => Math.max(0.7, Math.round((prev - 0.1) * 10) / 10))}
                    disabled={zoom <= 0.7}
                    title="Diminuir zoom"
                  >
                    −
                  </button>
                  <span className="zoom-value">{Math.round(zoom * 100)}%</span>
                  <button
                    className="zoom-btn"
                    onClick={() => setZoom((prev) => Math.min(1.3, Math.round((prev + 0.1) * 10) / 10))}
                    disabled={zoom >= 1.3}
                    title="Aumentar zoom"
                  >
                    +
                  </button>
                </div>
                <button
                  className={`zoom-reset-btn ${zoom !== 1 ? "is-visible" : "is-hidden"}`}
                  onClick={() => setZoom(1)}
                  title="Redefinir zoom para 100%"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Color Legend Bar */}
            {mode === "category" && (
              <div className="legend-bar">
                <span className="legend-item"><span className="color-dot" style={{ background: "#C84021" }}></span> Não Metal</span>
                <span className="legend-item"><span className="color-dot" style={{ background: "#3D784A" }}></span> Metal Alcalino</span>
                <span className="legend-item"><span className="color-dot" style={{ background: "#D65E2A" }}></span> Alcalino-terroso</span>
                <span className="legend-item"><span className="color-dot" style={{ background: "#B88B00" }}></span> Semi-metal</span>
                <span className="legend-item"><span className="color-dot" style={{ background: "#C45A00" }}></span> Metal de Transição</span>
                <span className="legend-item"><span className="color-dot" style={{ background: "#CC3300" }}></span> Metal Representativo</span>
                <span className="legend-item"><span className="color-dot" style={{ background: "#1B933C" }}></span> Halogênio</span>
                <span className="legend-item"><span className="color-dot" style={{ background: "#2242D8" }}></span> Gás Nobre</span>
                <span className="legend-item"><span className="color-dot" style={{ background: "#740ECB" }}></span> Lantanídeo</span>
                <span className="legend-item"><span className="color-dot" style={{ background: "#D61C7F" }}></span> Actinídeo</span>
              </div>
            )}

            {mode === "state" && (
              <div className="legend-bar">
                <span className="legend-item"><span className="color-dot" style={{ background: "#C84021" }}></span> Sólido</span>
                <span className="legend-item"><span className="color-dot" style={{ background: "#1B933C" }}></span> Líquido</span>
                <span className="legend-item"><span className="color-dot" style={{ background: "#2242D8" }}></span> Gasoso</span>
              </div>
            )}

            {mode === "electronegativity" && (
              <div className="legend-bar electronegativity-legend">
                <span>0.7 (Baixa)</span>
                <div className="gradient-bar"></div>
                <span>4.0 (Alta)</span>
              </div>
            )}
          </div>

          {/* Scrollable Container with Zoom scaling */}
          <div className="periodic-table-scroll-wrapper">
            <div
              className={`periodic-table ${!showName ? "hide-names" : ""} ${!showMass ? "hide-masses" : ""} ${!showNumber ? "hide-numbers" : ""}`}
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "top center",
                marginBottom: zoom < 1 ? `-${(1 - zoom) * 350}px` : zoom > 1 ? `${(zoom - 1) * 350}px` : "0px",
              }}
            >
              {data.map((element: Element) => {
                const bg = getColor(element, mode);
                const q = searchQuery.trim().toLowerCase();
                const matchesSearch =
                  !q ||
                  element.symbol.toLowerCase().includes(q) ||
                  element.name.toLowerCase().includes(q) ||
                  element.atomicNumber.toString() === q;

                return (
                  <div
                    key={element.atomicNumber}
                    style={{
                      gridColumn: (() => {
                        if (element.atomicNumber > 56 && element.atomicNumber < 72) {
                          return element.group + element.atomicNumber - 56;
                        }
                        if (element.atomicNumber > 88 && element.atomicNumber < 104) {
                          return element.group + element.atomicNumber - 88;
                        }
                        return element.group;
                      })(),
                      gridRow: (() => {
                        if (element.atomicNumber > 56 && element.atomicNumber < 72) {
                          return 9;
                        }
                        if (element.atomicNumber > 88 && element.atomicNumber < 104) {
                          return 10;
                        }
                        return element.period;
                      })(),
                      backgroundColor: bg || "#27272a",
                      color: mode === "electronegativity" || (bg && mode !== "none") ? "white" : "#e4e4e7",
                      opacity: q ? (matchesSearch ? 1 : 0.25) : 1,
                      transform: selected?.atomicNumber === element.atomicNumber ? "scale(1.15)" : undefined,
                    }}
                    className={`element ${selected?.atomicNumber === element.atomicNumber ? "is-selected" : ""}`}
                    onClick={() => setSelected(element)}
                  >
                    {showNumber && <div className="atomic-number">{element.atomicNumber}</div>}
                    <div className="symbol">{element.symbol}</div>
                    {showName && <div className="name">{element.name}</div>}
                    {showMass && <div className="atomic-mass">{element.atomicMass}</div>}
                  </div>
                );
              })}
              <div
                className="element"
                style={{ gridColumn: 1, gridRow: 8, opacity: 0, cursor: "default", minHeight: "30px" }}
              ></div>

              <GetSelectedDesktop
                selected={selected}
                color={selected == null ? "" : getColor(selected, mode)}
                fntColor={mode === "electronegativity" || mode !== "none" ? "white" : "#e4e4e7"}
                onClose={() => setSelected(null)}
              />
            </div>
          </div>

          {/* Floating Mobile Info Card - Rendered outside scroll & transform wrapper for true viewport fixed overlay */}
          <GetSelectedMobile
            selected={selected}
            color={selected == null ? "" : getColor(selected, mode)}
            fntColor={mode === "electronegativity" || mode !== "none" ? "white" : "#e4e4e7"}
            onClose={() => setSelected(null)}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PeriodicTable;
