import Header from "../components/Header";
import { useState } from "react";
import elements from "../data/elements.json";
import Footer from "../components/Footer";
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
  notFoundElements: string[]
}

function MolarMassCalc() {
  const [mol, setMol] = useState<string>("");


  function concatNumbers(dividedMol: string[]): string[] {
    return dividedMol.reduce((acc: string[], val) => {
      if (!isNaN(Number(val))) {
        if (acc.length > 0 && !isNaN(Number(acc[acc.length - 1]))) {
          acc[acc.length - 1] = String(
            Number(acc[acc.length - 1]) * 10 + Number(val)
          );
        } else {
          acc.push(val);
        }
      } else {
        acc.push(val);
      }
      return acc;
    }, []);
  }

  function getMassesAndInvalidSymbols(dividedMol : string[], elements: Element[]): {masses: number[]; notFoundElements: string[]}{
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
    return {masses: masses, notFoundElements: notFoundElements};
  }

  function calc(mol: string, elements: Element[]): Results {
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

    let massesAndNotFound: {masses: number[]; notFoundElements: string[]} = getMassesAndInvalidSymbols(dividedMol, elements);
    let masses: number[] = massesAndNotFound.masses;
    let notFoundElements: string[] = massesAndNotFound.notFoundElements;
    
    // deixa multiplicadores indíviduais subscritos
    dividedMol = dividedMol.map(item => !isNaN(Number(item)) ? `<sub>${item}</sub>` : item);
    return {
      molarMass: masses.reduce((acc, curr) => acc + curr, 0) * multiplier,
      mol: multiplier === 1 ? dividedMol.join("") : `${multiplier} ${dividedMol.join("")}`,
      notFoundElements: notFoundElements
    }
  }

  const result = calc(mol, elements);

  return (
    <div className="molar-mass-calc-page">
      <Header />
      <h1>Calculadora de Massa Molar</h1>
      <label htmlFor="mol-input">Insira a fórmula molecular:</label>
      <input
        type="text"
        className="mol-input"
        id="mol-input"
        placeholder="Ex: 2H2O, 3NaCl, C6H12O6, etc."
        value={mol}
        onChange={(e) => {
          setMol(e.target.value);
        }}
      />
      <h2 dangerouslySetInnerHTML={{ __html: result.mol }}></h2>
      <b>Massa Molar: {result.molarMass.toFixed(3)} g/mol</b>
      {result.notFoundElements.length > 0 ? (
        <div className="not-found-elements">
          <b>Elementos Não encontrados:</b>
          <p>{result.notFoundElements.join(" ")}</p>
        </div>
      ) : null}
      <Footer/>
    </div>
  );
}
export default MolarMassCalc;
