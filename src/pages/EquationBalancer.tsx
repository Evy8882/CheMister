import Header from "../components/Header";
import { useState } from "react";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScaleBalanced, faFlask, faArrowRight, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import "../styles/App.css";
import "../styles/EquationBalancer.css";
import { fraction, lcm, matrix, lusolve } from "mathjs";

const PRESET_REACTIONS = [
  { label: "Síntese da Água", reagents: "H2 + O2", products: "H2O" },
  { label: "Combustão do Metano", reagents: "CH4 + O2", products: "CO2 + H2O" },
  { label: "Oxidação do Ferro", reagents: "Fe + O2", products: "Fe2O3" },
  { label: "Neutralização Ácido-Base", reagents: "HCl + NaOH", products: "NaCl + H2O" },
  { label: "Oxidação do Alumínio", reagents: "Al + O2", products: "Al2O3" },
];

function EquationBalancer() {
  const [reagents, setReagents] = useState<string>("");
  const [products, setProducts] = useState<string>("");

  function createEquationSystem(
    reagentsList: string[],
    productsList: string[],
    reagentsElementsByReagent: string[][],
    productsElementsByProduct: string[][]
  ): { equations: string[]; variables: string[] } {
    const allCompounds = [...reagentsList, ...productsList];

    const variables = allCompounds.map((_, index) => {
      return String.fromCharCode(97 + index);
    });

    const elementsMap: { [element: string]: number[] } = {};

    reagentsElementsByReagent.forEach((compound, index) => {
      compound.forEach((elementStr) => {
        const match = elementStr.match(/(\D+)(\d*)/);
        if (match) {
          const element = match[1];
          const count = match[2] ? parseInt(match[2], 10) : 1;

          if (!elementsMap[element]) {
            elementsMap[element] = Array(allCompounds.length).fill(0);
          }
          elementsMap[element][index] += count;
        }
      });
    });

    productsElementsByProduct.forEach((compound, index) => {
      const i = index + reagentsList.length;
      compound.forEach((elementStr) => {
        const match = elementStr.match(/(\D+)(\d*)/);
        if (match) {
          const element = match[1];
          const count = match[2] ? parseInt(match[2], 10) : 1;

          if (!elementsMap[element]) {
            elementsMap[element] = Array(allCompounds.length).fill(0);
          }
          elementsMap[element][i] -= count;
        }
      });
    });

    const equations: string[] = [];

    for (const element in elementsMap) {
      const terms: string[] = [];

      elementsMap[element].forEach((coefficient, i) => {
        const term =
          coefficient === 1
            ? `${variables[i]}`
            : coefficient === -1
            ? `-${variables[i]}`
            : `${coefficient}${variables[i]}`;
        terms.push(term);
      });

      equations.push(`${terms.join(" + ")} = 0`);
    }

    return { equations, variables };
  }

  function resolveEquation(equations: string[], variables: string[]): number[] {
    const coefficients: number[][] = [];
    const constants: number[] = [];

    equations.forEach((equation) => {
      const [lhs] = equation.split("=");
      const terms = lhs.split("+").map((term) => term.trim());
      const row: number[] = Array(variables.length).fill(0);

      terms.forEach((term) => {
        const match = term.match(/([+-]?\d*)([a-z])/i);
        if (match) {
          const coefficient = match[1] === "" || match[1] === "+" ? 1 : match[1] === "-" ? -1 : parseFloat(match[1]);
          const variableIndex = variables.indexOf(match[2]);
          if (variableIndex !== -1) {
            row[variableIndex] = coefficient;
          }
        }
      });

      coefficients.push(row);
      constants.push(0);
    });

    while (coefficients.length < variables.length) {
      const normalizationRow = Array(variables.length).fill(1);
      coefficients.push(normalizationRow);
      constants.push(1);
    }

    const coeffMatrix = matrix(coefficients);
    const constMatrix = matrix(constants);

    try {
      const solution = lusolve(coeffMatrix as math.Matrix, constMatrix as math.Matrix);
      const rawCoefficients = (solution.toArray() as number[][]).map((row) => row[0]);

      const fractions = rawCoefficients.map((value) => fraction(value));
      const denominators = fractions.map((frac) => frac.d);
      const mmcValue = denominators.map((d) => Number(d)).reduce((acc, curr) => lcm(acc, curr));
      const integerCoefficients = fractions.map((frac) => Number(frac.mul(fraction(mmcValue)).n));
      return integerCoefficients;
    } catch (error) {
      console.error("Erro ao resolver o sistema de equações:", error);
      return [];
    }
  }

  function balanceEquation(reagents: string, products: string): string {
    if (reagents && products) {
      let reagentsList = reagents.split("+").map((r) => r.trim()).filter(r => r !== "");
      let productsList = products.split("+").map((p) => p.trim()).filter(p => p !== "");

      if (reagentsList.length === 0 || productsList.length === 0) return "";

      reagentsList = reagentsList.map((reagent) => {
        while (!isNaN(Number(reagent.split("")[0]))) {
          reagent = reagent.slice(1);
        }
        return reagent;
      });

      productsList = productsList.map((product) => {
        while (!isNaN(Number(product.split("")[0]))) {
          product = product.slice(1);
        }
        return product;
      });

      const reagentsElementsByReagent: string[][] = reagentsList.map((reagent) =>
        reagent
          .split("")
          .reduce((acc: string[], char: string) => {
            if (char === char.toUpperCase() && isNaN(Number(char))) {
              acc.push(` ${char}`);
            } else {
              acc.push(char);
            }
            return acc;
          }, [])
          .join("")
          .split(" ")
          .filter((item: string) => item !== "")
      );

      const productsElementsByProduct: string[][] = productsList.map((product) =>
        product
          .split("")
          .reduce((acc: string[], char: string) => {
            if (char === char.toUpperCase() && isNaN(Number(char))) {
              acc.push(` ${char}`);
            } else {
              acc.push(char);
            }
            return acc;
          }, [])
          .join("")
          .split(" ")
          .filter((item: string) => item !== "")
      );

      const equationSystem = createEquationSystem(
        reagentsList,
        productsList,
        reagentsElementsByReagent,
        productsElementsByProduct
      );

      const coefficients = resolveEquation(
        equationSystem.equations,
        equationSystem.variables
      );
      if (coefficients.length === 0) {
        return "Não foi possível balancear a equação.";
      }

      const reagentsStr = reagentsList.map((reagent, index) => {
        const coef = coefficients[index];
        return `${coef === 1 ? "" : `<coeff>${coef}</coeff>`}${reagent}`;
      });
      const productsStr = productsList.map((product, index) => {
        const coef = coefficients[index + reagentsList.length];
        return `${coef === 1 ? "" : `<coeff>${coef}</coeff>`}${product}`;
      });

      return `${reagentsStr.join(" + ")} → ${productsStr.join(" + ")}`;
    }
    return "";
  }

  const result: string = balanceEquation(reagents.trim(), products.trim());

  return (
    <div className="tool-page-layout">
      <div className="tool-bg-effects">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>

      <Header />

      <main className="tool-main-content">
        <div className="tool-header-block">
          <h1 className="tool-page-title">Balanceador de Equações</h1>
          <p className="tool-page-subtitle">
            Insira os reagentes e produtos para determinar automaticamente os coeficientes estequiométricos da reação.
          </p>
        </div>

        <div className="tool-glass-card">
          <div className="equation-inputs-grid">
            <div className="tool-input-group">
              <label className="tool-input-label">Reagentes:</label>
              <input
                type="text"
                className="tool-input-field"
                placeholder="Ex: H2 + O2"
                value={reagents}
                onChange={(e) => setReagents(e.target.value)}
              />
            </div>

            <div className="reaction-equals-badge">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>

            <div className="tool-input-group">
              <label className="tool-input-label">Produtos:</label>
              <input
                type="text"
                className="tool-input-field"
                placeholder="Ex: H2O"
                value={products}
                onChange={(e) => setProducts(e.target.value)}
              />
            </div>
          </div>

          <div className="presets-wrapper">
            <span className="presets-label">
              <FontAwesomeIcon icon={faFlask} /> Exemplo de Reações:
            </span>
            <div className="preset-chips">
              {PRESET_REACTIONS.map((preset) => (
                <button
                  key={preset.label}
                  className={`chip-btn ${reagents === preset.reagents && products === preset.products ? "active" : ""}`}
                  onClick={() => {
                    setReagents(preset.reagents);
                    setProducts(preset.products);
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {result && (
            <div className="tool-result-card">
              {result.startsWith("Não foi possível") ? (
                <div className="equation-error-card">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  <span>{result} Verifique as fórmulas informadas.</span>
                </div>
              ) : (
                <div className="balanced-equation-result">
                  {result.split(" ").map((token, index) => {
                    if (token.includes("<coeff>")) {
                      const val = token.replace("<coeff>", "").replace("</coeff>", "");
                      return (
                        <span key={index} className="coefficient-badge">
                          {val}
                        </span>
                      );
                    }
                    if (token === "→") {
                      return (
                        <FontAwesomeIcon key={index} icon={faArrowRight} className="reaction-arrow" />
                      );
                    }
                    return <span key={index}>{token}</span>;
                  })}
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

export default EquationBalancer;
