import Header from "../components/Header";
import { useState } from "react";
import Footer from "../components/Footer";

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
    <div style={styles.page}>
      <Header />
      <main style={styles.container}>
        <h1 style={styles.title}>Calculadora de Solubilidade</h1>

        <div style={styles.inputGroup}>
          <label htmlFor="solute-input" style={styles.label}>
            Massa do Soluto (g):
          </label>
          <input
            type="number"
            style={styles.input}
            id="solute-input"
            placeholder="Ex: 50"
            value={solute}
            onChange={(e) => setSolute(e.target.value)}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="coeff-input" style={styles.label}>
            Coeficiente de Solubilidade (g / 100g de H₂O):
          </label>
          <input
            type="number"
            style={styles.input}
            id="coeff-input"
            placeholder="Ex: 36 (NaCl a 20°C)"
            value={coefficient}
            onChange={(e) => setCoefficient(e.target.value)}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="water-input" style={styles.label}>
            Massa do Solvente / Água (g):
          </label>
          <input
            type="number"
            style={styles.input}
            id="water-input"
            placeholder="Ex: 100"
            value={water}
            onChange={(e) => setWater(e.target.value)}
          />
        </div>

        {result ? (
          <div style={styles.resultsContainer}>
            <h2 style={styles.resultTitle}>
              Estado da Solução: <span style={styles.highlight}>{result.status}</span>
            </h2>
            <b style={styles.resultDetail}>
              Limite máximo de dissolução: {result.maxSoluble.toFixed(2)} g
            </b>
            {result.precipitate > 0 && (
              <p style={styles.precipitateInfo}>
                <b>Corpo de chão (Precipitado):</b> {result.precipitate.toFixed(2)} g
              </p>
            )}
          </div>
        ) : (
          <p style={styles.placeholderText}>
            Preencha todos os campos com valores válidos para calcular.
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#0d0d0d",
    color: "#ffffff",
    fontFamily: "sans-serif",
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    width: "100%",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#ffffff",
    textAlign: "center",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#e2e8f0",
  },
  input: {
    padding: "10px 14px",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #333333",
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  resultsContainer: {
    marginTop: "20px",
    padding: "15px 20px",
    borderRadius: "8px",
    backgroundColor: "#161b22",
    border: "1px solid #30363d",
    width: "100%",
    textAlign: "center",
    boxSizing: "border-box",
  },
  resultTitle: {
    fontSize: "1.25rem",
    color: "#f0f6fc",
    marginBottom: "10px",
  },
  highlight: {
    color: "#38bdf8",
    fontWeight: "bold",
  },
  resultDetail: {
    display: "block",
    color: "#c9d1d9",
    marginTop: "5px",
  },
  precipitateInfo: {
    color: "#f87171",
    marginTop: "10px",
  },
  placeholderText: {
    marginTop: "20px",
    color: "#8b949e",
    fontSize: "0.95rem",
    textAlign: "center",
  },
};

export default SolubilityCalc;