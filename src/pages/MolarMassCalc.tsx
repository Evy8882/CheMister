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
    elements = elements.concat(
      {
        symbol: "Unit",
        atomicNumber: 0,
        atomicMass: 1,
        name: "",
        group: 0,
        period: 0,
        category: null,
        state: null,
        electronegativity: null
      }
    )
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
    // dividedMol = dividedMol.map(item => !isNaN(Number(item)) ? `<sub>${item}</sub>` : item);
    return {
      molarMass: masses.reduce((acc, curr) => acc + curr, 0) * multiplier,
      mol: multiplier === 1 ? dividedMol.join("") : `${multiplier} ${dividedMol.join("")}`,
      notFoundElements: notFoundElements
    }
  }



  //necessário para cálculos com (),[],{}

  function removeBrackets(cMol: string, bStart: string, bEnd: string, elements: Element[])
  : {newMol: string, notFoundElements: string[]} {
    let currentMol: string = cMol;
    let notFoundElements: string[] = [];
    while (currentMol.includes(bStart) && currentMol.includes(bEnd)) {
      const start = currentMol.lastIndexOf(bStart);
      const end = currentMol.indexOf(bEnd, start);
      if (start === -1 || end === -1) break;

      const innerMol = currentMol.slice(start + 1, end);
      const multiplierMatch = currentMol.slice(end + 1).match(/^\d+/);
      let multiplier = multiplierMatch ? Number(multiplierMatch[0]) : 1;
      

      //massa presente dentro do () multiplicado pelo número depois
      const currentResult = calc(innerMol, elements);
      const currentMass = currentResult.molarMass * multiplier;
      notFoundElements = notFoundElements.concat(currentResult.notFoundElements);

      if (currentMol.slice(end + 2) == ")" || currentMol.slice(end + 2) == "]" || currentMol.slice(end + 2) == "}") {
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
    return {newMol: currentMol, notFoundElements: notFoundElements};
  }

  function calcAll(mol: string, elements: Element[]): Results {
    let currentMol: string = mol;
    let sum: number = 0;
    let notFoundElements: string[] = [];
    const formula = calc(mol, elements).mol;
    
    // remove () e calcula a massa
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

  const result = calcAll(mol, elements);

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
      <h2>{result.mol.split("").map((char,index) =>
        (!isNaN(Number(char)) || char === "." ?  ( index > result.mol.indexOf(" ") ? <sub>{char}</sub> : char) : char))}</h2>
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
