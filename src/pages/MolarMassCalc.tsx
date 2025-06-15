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

function MolarMassCalc() {
  const [mol, setMol] = useState<string>("");

  function calc(mol: string, elements: Element[]): number {
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
    console.log(nmol);
    let masses: number[] = [];
    elements.forEach((element: Element) => {
      nmol.forEach((symbol) => {
        if (element.symbol === symbol) {
          masses.push(element.atomicMass);
        }
      });
    });
    console.log(masses);
    return masses.reduce((acc, curr) => acc + curr, 0);
  }

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
      {mol}
      <br />
      {calc(mol, elements)}
    </div>
  );
}
export default MolarMassCalc;
