import Header from "../components/Header";
import { useState } from "react";
import Footer from "../components/Footer";
import "../styles/MolarMassCalc.css";

type Results = {
  maxSoluble: number;
  status: "Insaturada" | "Saturada" | "Saturada com corpo de chão";
  precipitate: number;
};

function SolubilityCalc() {
  const [solute, setSolute] = useState<string>("");
  const [coefficient, setCoefficient] = useState<string>("");
  const [water, setWater] = useState<string>("");

  function calcSolubility(): Results | null {
    const soluteNum = parseFloat(solute);
    const coeffNum = parseFloat(coefficient);
    const waterNum = parseFloat(water);

    if (isNaN(soluteNum) || isNaN(coeffNum) || isNaN(waterNum) || waterNum <= 0) {
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

  return (
    <div className="molar-mass-calc-page">
      <Header />
      
      <h1>Calculadora de Solubilidade</h1>

      <label htmlFor="solute-input">Massa do Soluto (g):</label>
      <input
        type="number"
        className="mol-input"
        id="solute-input"
        placeholder="Ex: 50"
        value={solute}
        onChange={(e) => setSolute(e.target.value)}
      />

      <label htmlFor="coeff-input">
        Coeficiente de Solubilidade (g / 100g de H₂O):
      </label>
      <input
        type="number"
        className="mol-input"
        id="coeff-input"
        placeholder="Ex: 36 (NaCl a 20°C)"
        value={coefficient}
        onChange={(e) => setCoefficient(e.target.value)}
      />

      <label htmlFor="water-input">Massa do Solvente / Água (g):</label>
      <input
        type="number"
        className="mol-input"
        id="water-input"
        placeholder="Ex: 100"
        value={water}
        onChange={(e) => setWater(e.target.value)}
      />

      {result ? (
        <div
          style={{
            marginTop: "25px",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#161b22",
            border: "1px solid #30363d",
            width: "100%",
            maxWidth: "400px",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              fontSize: "1.1rem",
              color: "#8b949e",
              marginBottom: "8px",
              fontWeight: "normal",
            }}
          >
            Estado da Solução
          </h2>

          <div
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              color: "#38bdf8",
              marginBottom: "15px",
            }}
          >
            {result.status}
          </div>

          <div
            style={{
              borderTop: "1px solid #21262d",
              paddingTop: "12px",
              fontSize: "0.95rem",
              color: "#c9d1d9",
            }}
          >
            <span>Limite máximo de dissolução: </span>
            <strong style={{ color: "#ffffff" }}>
              {result.maxSoluble.toFixed(2)} g
            </strong>
          </div>

          {result.precipitate > 0 && (
            <div
              style={{
                marginTop: "8px",
                fontSize: "0.95rem",
                color: "#f87171",
              }}
            >
              <span>Corpo de chão (Precipitado): </span>
              <strong>{result.precipitate.toFixed(2)} g</strong>
            </div>
          )}
        </div>
      ) : (
        <p style={{ marginTop: "20px", color: "#8b949e", fontSize: "0.9rem" }}>
          Preencha todos os campos com valores válidos para calcular.
        </p>
      )}

      <Footer />
    </div>
  );
}

export default SolubilityCalc;