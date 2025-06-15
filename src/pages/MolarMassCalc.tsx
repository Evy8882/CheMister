import Header from "../components/Header";
import { useState } from "react";
import elements from "../data/elements.json";

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

  function calc(mol: string, elements: Element[]): Results {
    let nmol: string[] = [];
    nmol = mol
      .split("")
      .map((e: string) => (e === e.toUpperCase() ? ` ${e}` : e))
      .join("")
      .split(" ")
      .filter((e: string) => e !== "");
    nmol = nmol.reduce((acc: string[], val) => {
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
    let multiplier: number = 1;
    if (!isNaN(Number(nmol[0]))) {
      multiplier = Number(nmol[0]);
      nmol = nmol.slice(1);
    }
    console.log(nmol);
    let masses: number[] = [];
    let notFoundElements: string[] = [];
    nmol.forEach((symbol) => {
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
    console.log(masses);
    nmol = nmol.map(item => !isNaN(Number(item)) ? `<sub>${item}</sub>` : item);
    return {
      molarMass: masses.reduce((acc, curr) => acc + curr, 0) * multiplier,
      mol: multiplier === 1 ? nmol.join("") : `${multiplier} ${nmol.join("")}`,
      notFoundElements: notFoundElements
    }
  }

  const result = calc(mol, elements);

  return (
    <div className="molar-mass-calc-page">
      <Header />
      <h1>Calculadora de Massa Molar</h1>
      <input
        type="text"
        className="mol-input"
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
    </div>
  );
}
export default MolarMassCalc;
