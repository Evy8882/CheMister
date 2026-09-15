import Header from "../components/Header";
import { useState } from "react";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlask, faVialCircleCheck } from "@fortawesome/free-solid-svg-icons";
import "../styles/App.css";
import "../styles/PhSimulator.css";

const PRESET_SOLUTIONS = [
  { label: "🍋 Suco de Limão ([H⁺] = 0.01)", hp: "0.01" },
  { label: "☕ Café ([H⁺] = 0.00001)", hp: "0.00001" },
  { label: "💧 Água Pura ([H⁺] = 0.0000001)", hp: "0.0000001" },
  { label: "🧼 Sabão ([H⁺] = 1e-10)", hp: "1e-10" },
  { label: "🧪 Soda Cáustica ([H⁺] = 1e-14)", hp: "1e-14" },
];

function PhSimulator() {
  const [hpInput, setHpInput] = useState<string>("");

  function getPhValue(inputVal: string): number | null {
    const num = parseFloat(inputVal);
    if (isNaN(num) || num <= 0) return null;
    const computed = -Math.log10(num);
    return Math.max(0, Math.min(14, computed));
  }

  function getPhCategory(ph: number): { label: string; color: string; bg: string } {
    if (ph < 3) return { label: "Ácido Forte", color: "#ef4444", bg: "rgba(239, 68, 68, 0.2)" };
    if (ph < 6.5) return { label: "Ácido Fraco", color: "#f97316", bg: "rgba(249, 115, 22, 0.2)" };
    if (ph <= 7.5) return { label: "Solução Neutra", color: "#10be6d", bg: "rgba(16, 190, 109, 0.2)" };
    if (ph <= 11) return { label: "Base Fraca", color: "#3b82f6", bg: "rgba(59, 130, 246, 0.2)" };
    return { label: "Base Forte", color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.2)" };
  }

  const computedPh = getPhValue(hpInput);
  const category = computedPh !== null ? getPhCategory(computedPh) : null;

  return (
    <div className="tool-page-layout">
      <div className="tool-bg-effects">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>

      <Header />

      <main className="tool-main-content">
        <div className="tool-header-block">
          <h1 className="tool-page-title">Simulador de pH</h1>
          <p className="tool-page-subtitle">
            Calcule e visualize o valor do pH e o nível de acidez ou alcalinidade de uma solução com base na concentração de íons [H⁺].
          </p>
        </div>

        <div className="tool-glass-card">
          <div className="tool-input-group">
            <label htmlFor="hp" className="tool-input-label">
              Concentração de íons de hidrogênio ( <b>[H⁺] em mol/L</b> ):
            </label>
            <input
              type="text"
              id="hp"
              className="tool-input-field"
              placeholder="Ex: 0.0001 ou 1e-4"
              value={hpInput}
              onChange={(e) => setHpInput(e.target.value)}
            />
          </div>

          <div className="presets-wrapper">
            <span className="presets-label">
              <FontAwesomeIcon icon={faFlask} /> Exemplos de Soluções:
            </span>
            <div className="preset-chips">
              {PRESET_SOLUTIONS.map((preset) => (
                <button
                  key={preset.label}
                  className={`chip-btn ${hpInput === preset.hp ? "active" : ""}`}
                  onClick={() => setHpInput(preset.hp)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {computedPh !== null && category ? (
            <div className="tool-result-card">
              <div className="ph-result-display">
                <div className="ph-value-badge">
                  <span>pH =</span>
                  <span
                    className="ph-value-number"
                    style={{ backgroundColor: category.bg, border: `1px solid ${category.color}`, color: category.color }}
                  >
                    {computedPh.toFixed(2)}
                  </span>
                </div>

                <div
                  className="ph-status-pill"
                  style={{ backgroundColor: category.bg, border: `1px solid ${category.color}`, color: category.color }}
                >
                  <FontAwesomeIcon icon={faVialCircleCheck} style={{ marginRight: 6 }} />
                  {category.label}
                </div>

                <div className="ph-spectrum-wrapper">
                  <div className="ph-spectrum-bar">
                    <div
                      className="ph-spectrum-pin"
                      style={{ left: `${(computedPh / 14) * 100}%` }}
                    />
                  </div>
                  <div className="ph-spectrum-labels">
                    <span>0 (Ácido)</span>
                    <span>7 (Neutro)</span>
                    <span>14 (Alcalino)</span>
                  </div>
                </div>
              </div>

              <div className="ph-formula-card">
                Fórmula: <code>pH = -log₁₀[H⁺]</code>
              </div>
            </div>
          ) : (
            <div className="ph-formula-card">
              Insira um valor maior que zero para calcular o pH. Fórmula: <code>pH = -log₁₀[H⁺]</code>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PhSimulator;
