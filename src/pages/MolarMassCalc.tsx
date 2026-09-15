import Header from "../components/Header";
import { useState } from "react";
import elements from "../data/elements.json";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator, faFlask, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import "../styles/App.css";
import "../styles/MolarMassCalc.css";

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

type Results = {
  molarMass: number;
  mol: string;
  notFoundElements: string[];
};

const PRESET_FORMULAS = [
  { label: "Água (H₂O)", value: "H2O" },
  { label: "Sal de Cozinha (NaCl)", value: "NaCl" },
  { label: "Glicose (C₆H₁₂O₆)", value: "C6H12O6" },
  { label: "Ácido Sulfúrico (H₂SO₄)", value: "H2SO4" },
  { label: "Hidróxido de Cálcio Ca(OH)₂", value: "Ca(OH)2" },
  { label: "Óxido de Ferro (Fe₂O₃)", value: "Fe2O3" },
];

function MolarMassCalc() {
  const [mol, setMol] = useState<string>("");

  function concatNumbers(dividedMol: string[]): string[] {
    return dividedMol.reduce((acc: string[], val) => {
      if (!isNaN(Number(val)) || val === ".") {
        if (acc.length > 0 && (!isNaN(Number(acc[acc.length - 1])) || acc[acc.length - 1].includes("."))) {
          acc[acc.length - 1] += val;
        } else {
          acc.push(val);
        }
      } else {
        acc.push(val);
      }
      return acc;
    }, []);
  }

  function getMassesAndInvalidSymbols(dividedMol: string[], elements: Element[]): { masses: number[]; notFoundElements: string[] } {
    let masses: number[] = [];
    let notFoundElements: string[] = [];
    dividedMol.forEach((symbol) => {
      if (!isNaN(Number(symbol))) {
        masses[masses.length - 1] *= Number(symbol);
        return;
      }
      const element = elements.find((el) => el.symbol === symbol);
      if (element) {
        masses.push(element.atomicMass);
      } else {
        notFoundElements.push(symbol);
        masses.push(0);
      }
    });
    return { masses: masses, notFoundElements: notFoundElements };
  }

  function calc(mol: string, elements: Element[]): Results {
    const extendedElements = elements.concat({
      symbol: "Unit",
      atomicNumber: 0,
      atomicMass: 1,
      name: "",
      group: 0,
      period: 0,
      category: null,
      state: null,
      electronegativity: null,
    });
    let dividedMol: string[] = mol
      .split("")
      .map((e: string) => (e === e.toUpperCase() ? ` ${e}` : e))
      .join("")
      .split(" ")
      .filter((e: string) => e !== "");

    dividedMol = concatNumbers(dividedMol);

    let multiplier: number = 1;
    if (!isNaN(Number(dividedMol[0]))) {
      multiplier = Number(dividedMol[0]);
      dividedMol = dividedMol.slice(1);
    }

    let massesAndNotFound: { masses: number[]; notFoundElements: string[] } = getMassesAndInvalidSymbols(dividedMol, extendedElements);
    let masses: number[] = massesAndNotFound.masses;
    let notFoundElements: string[] = massesAndNotFound.notFoundElements;

    return {
      molarMass: masses.reduce((acc, curr) => acc + curr, 0) * multiplier,
      mol: multiplier === 1 ? dividedMol.join("") : `${multiplier} ${dividedMol.join("")}`,
      notFoundElements: notFoundElements,
    };
  }

  function removeBrackets(cMol: string, bStart: string, bEnd: string, elements: Element[]): { newMol: string; notFoundElements: string[] } {
    let currentMol: string = cMol;
    let notFoundElements: string[] = [];
    while (currentMol.includes(bStart) && currentMol.includes(bEnd)) {
      const start = currentMol.lastIndexOf(bStart);
      const end = currentMol.indexOf(bEnd, start);
      if (start === -1 || end === -1) break;

      const innerMol = currentMol.slice(start + 1, end);
      const multiplierMatch = currentMol.slice(end + 1).match(/^\d+/);
      let multiplier = multiplierMatch ? Number(multiplierMatch[0]) : 1;

      const currentResult = calc(innerMol, elements);
      const currentMass = currentResult.molarMass * multiplier;
      notFoundElements = notFoundElements.concat(currentResult.notFoundElements);

      if (currentMol.slice(end + 2) === ")" || currentMol.slice(end + 2) === "]" || currentMol.slice(end + 2) === "}") {
        const nextMultiplierMatch = currentMol.slice(end + 3).match(/^\d+/);
        const nextMultiplier = nextMultiplierMatch ? Number(nextMultiplierMatch[0]) : 1;

        multiplier *= nextMultiplier;
      }

      if (multiplier > 1) {
        currentMol = currentMol.slice(0, start) + `${bStart}Unit${currentMass}${bEnd}` + currentMol.slice(end + (multiplierMatch?.[0]?.length || 0) + 1);
      } else {
        currentMol = currentMol.slice(0, start) + `Unit${currentMass}` + currentMol.slice(end + (multiplierMatch?.[0]?.length || 0) + 1);
      }
    }
    return { newMol: currentMol, notFoundElements: notFoundElements };
  }

  function calcAll(mol: string, elements: Element[]): Results {
    let currentMol: string = mol;
    let sum: number = 0;
    let notFoundElements: string[] = [];
    const formula = calc(mol, elements).mol;

    const result = removeBrackets(currentMol, "(", ")", elements);
    currentMol = result.newMol;
    notFoundElements = notFoundElements.concat(result.notFoundElements);
    const result2 = removeBrackets(currentMol, "[", "]", elements);
    currentMol = result2.newMol;
    notFoundElements = notFoundElements.concat(result2.notFoundElements);
    const result3 = removeBrackets(currentMol, "{", "}", elements);
    currentMol = result3.newMol;
    notFoundElements = notFoundElements.concat(result3.notFoundElements);

    let finalResult = calc(currentMol, elements);
    finalResult.molarMass += sum;
    finalResult.mol = formula;
    return finalResult;
  }

  const result = mol.trim() ? calcAll(mol.trim(), elements as Element[]) : null;

  return (
    <div className="tool-page-layout">
      <div className="tool-bg-effects">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>

      <Header />

      <main className="tool-main-content">
        <div className="tool-header-block">
          <h1 className="tool-page-title">Calculadora de Massa Molar</h1>
          <p className="tool-page-subtitle">
            Insira a fórmula molecular de um composto químico para determinar sua massa molar exata em g/mol.
          </p>
        </div>

        <div className="tool-glass-card">
          <div className="tool-input-group">
            <label htmlFor="mol-input" className="tool-input-label">
              Fórmula Molecular:
            </label>
            <input
              type="text"
              className="tool-input-field"
              id="mol-input"
              placeholder="Ex: 2H2O, NaCl, C6H12O6, H2SO4..."
              value={mol}
              onChange={(e) => setMol(e.target.value)}
            />
          </div>

          <div className="presets-wrapper">
            <span className="presets-label">
              <FontAwesomeIcon icon={faFlask} /> Exemplo de Fórmulas:
            </span>
            <div className="preset-chips">
              {PRESET_FORMULAS.map((preset) => (
                <button
                  key={preset.value}
                  className={`chip-btn ${mol === preset.value ? "active" : ""}`}
                  onClick={() => setMol(preset.value)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {result && mol.trim().length > 0 && (
            <div className="tool-result-card">
              <h2 className="molar-mass-formula-display">
                {result.mol.split("").map((char, index) =>
                  !isNaN(Number(char)) || char === "." ? (
                    index > result.mol.indexOf(" ") ? (
                      <sub key={index}>{char}</sub>
                    ) : (
                      char
                    )
                  ) : (
                    char
                  )
                )}
              </h2>

              <div className="molar-mass-value-badge">
                Massa Molar: <span className="highlight-mass">{result.molarMass.toFixed(3)}</span>
                <span className="molar-mass-unit">g/mol</span>
              </div>

              {result.notFoundElements.length > 0 && (
                <div className="not-found-elements-card">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="alert-icon" />
                  <div>
                    Símbolos não encontrados:
                    <span className="not-found-symbols-list">
                      {result.notFoundElements.join(", ")}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MolarMassCalc;
