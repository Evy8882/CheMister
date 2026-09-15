import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faFlask, faCheckCircle, faExclamationTriangle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "../styles/App.css";
import "../styles/CalculadoraSolubilidade.css";

type Results = {
  maxSoluble: number;
  status: "Insaturada" | "Saturada" | "Saturada com corpo de chão";
  precipitate: number;
};

const PRESET_SOLUTES = [
  { label: "🧂 Sal de Cozinha (NaCl @ 20°C)", coeff: "36", solute: "36", water: "100" },
  { label: "🍬 Açúcar (Sacarose @ 20°C)", coeff: "204", solute: "250", water: "100" },
  { label: "🧪 Nitrato de Potássio (KNO₃ @ 20°C)", coeff: "31.6", solute: "20", water: "100" },
  { label: "🧱 Sulfato de Cálcio (CaSO₄ @ 20°C)", coeff: "0.2", solute: "1", water: "100" },
];

function SolubilityCalc() {
  const [solute, setSolute] = useState<string>("");
  const [coefficient, setCoefficient] = useState<string>("");
  const [water, setWater] = useState<string>("");

  function calcSolubility(): Results | null {
    const soluteNum = parseFloat(solute);
    const coeffNum = parseFloat(coefficient);
    const waterNum = parseFloat(water);

    if (isNaN(soluteNum) || isNaN(coeffNum) || isNaN(waterNum) || waterNum <= 0 || soluteNum < 0 || coeffNum < 0) {
      return null;
    }

    const maxSoluble = (coeffNum * waterNum) / 100;

    let status: "Insaturada" | "Saturada" | "Saturada com corpo de chão" = "Insaturada";
    let precipitate = 0;

    if (soluteNum > maxSoluble) {
      status = "Saturada com corpo de chão";
      precipitate = soluteNum - maxSoluble;
    } else if (soluteNum === maxSoluble) {
      status = "Saturada";
    } else {
      status = "Insaturada";
    }

    return {
      maxSoluble,
      status,
      precipitate,
    };
  }

  const result = calcSolubility();

  const getStatusClass = (status: Results["status"]) => {
    switch (status) {
      case "Insaturada":
        return "insaturada";
      case "Saturada":
        return "saturada";
      case "Saturada com corpo de chão":
        return "corpo-de-chao";
    }
  };

  const getStatusIcon = (status: Results["status"]) => {
    switch (status) {
      case "Insaturada":
        return faDroplet;
      case "Saturada":
        return faCheckCircle;
      case "Saturada com corpo de chão":
        return faExclamationTriangle;
    }
  };

  return (
    <div className="tool-page-layout">
      <div className="tool-bg-effects">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>

      <Header />

      <main className="tool-main-content">
        <div className="tool-header-block">
          <h1 className="tool-page-title">Calculadora de Solubilidade</h1>
          <p className="tool-page-subtitle">
            Determine se uma solução química está insaturada, saturada ou saturada com corpo de chão (precipitado) com base no coeficiente de solubilidade.
          </p>
        </div>

        <div className="tool-glass-card">
          <div className="presets-wrapper">
            <span className="presets-label">
              <FontAwesomeIcon icon={faInfoCircle} /> Exemplos Práticos:
            </span>
            <div className="preset-chips">
              {PRESET_SOLUTES.map((preset, index) => (
                <button
                  key={index}
                  type="button"
                  className="chip-btn"
                  onClick={() => {
                    setCoefficient(preset.coeff);
                    setSolute(preset.solute);
                    setWater(preset.water);
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="solubility-form">
            <div className="tool-input-group">
              <label htmlFor="solute-input" className="tool-input-label">
                Massa do Soluto (g):
              </label>
              <input
                type="number"
                className="tool-input-field"
                id="solute-input"
                placeholder="Ex: 50"
                value={solute}
                onChange={(e) => setSolute(e.target.value)}
              />
            </div>

            <div className="tool-input-group">
              <label htmlFor="coeff-input" className="tool-input-label">
                Coeficiente de Solubilidade (g por 100g de H₂O):
              </label>
              <input
                type="number"
                className="tool-input-field"
                id="coeff-input"
                placeholder="Ex: 36 (para NaCl a 20°C)"
                value={coefficient}
                onChange={(e) => setCoefficient(e.target.value)}
              />
            </div>

            <div className="tool-input-group">
              <label htmlFor="water-input" className="tool-input-label">
                Massa do Solvente / Água (g):
              </label>
              <input
                type="number"
                className="tool-input-field"
                id="water-input"
                placeholder="Ex: 100"
                value={water}
                onChange={(e) => setWater(e.target.value)}
              />
            </div>
          </div>

          {result ? (
            <div className="solubility-result-card">
              <h2 className="solubility-result-header">Estado da Solução</h2>

              <div className={`solubility-status-badge ${getStatusClass(result.status)}`}>
                <FontAwesomeIcon icon={getStatusIcon(result.status)} />
                <span>{result.status}</span>
              </div>

              <div className="solubility-details">
                <div className="solubility-detail-row">
                  <span>Limite Máximo de Dissolução:</span>
                  <strong>{result.maxSoluble.toFixed(2)} g</strong>
                </div>

                <div className="solubility-detail-row">
                  <span>Soluto Adicionado:</span>
                  <strong>{parseFloat(solute).toFixed(2)} g em {parseFloat(water).toFixed(2)} g de H₂O</strong>
                </div>

                {result.precipitate > 0 && (
                  <div className="solubility-detail-row solubility-precipitate-alert">
                    <span>Corpo de Chão (Precipitado):</span>
                    <strong>{result.precipitate.toFixed(2)} g</strong>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="solubility-helper-text">
              Preencha todos os campos com valores válidos para calcular o estado da solução.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SolubilityCalc;