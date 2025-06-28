import Header from "../components/Header";
import { useState } from "react";
import Footer from "../components/Footer";
import "../styles/EquationBalancer.css";
import { fraction, lcm, matrix, lusolve } from "mathjs";

function EquationBalancer() {
  const [reagents, setReagents] = useState<string>("");
  const [products, setProducts] = useState<string>("");

  function createEquationSystem (
    reagentsList: string[],
    productsList: string[],
    reagentsElementsByReagent: string[][],
    productsElementsByProduct: string[][]
  ): {equations: string[]; variables: string[]} {
    const allCompounds = [...reagentsList, ...productsList];

    //cria uma letra para cada váriavel
    const variables = allCompounds.map((_, index) => {
      return String.fromCharCode(97 + index);
    })

    const elementsMap: {[element: string]: number[]} = {};

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
      const i = index + reagentsList.length; // Ajusta o índice somando o tamanho dos reagentes
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
        const term = coefficient === 1
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
    // Cria uma matriz de coeficientes e um vetor de constantes
    const coefficients: number[][] = [];
    const constants: number[] = [];

    equations.forEach((equation) => {
      const [lhs] = equation.split("=");
      const terms = lhs.split("+").map(term => term.trim());
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
      constants.push(0); // Todos os termos são iguais a zero
    });

    // Adiciona equações de normalização apenas se necessário para garantir que a matriz seja quadrada
    while (coefficients.length < variables.length) {
      const normalizationRow = Array(variables.length).fill(1);
      coefficients.push(normalizationRow);
      constants.push(1); // Normaliza os coeficientes
    }

    // Resolve o sistema de equações
    const coeffMatrix = matrix(coefficients);
    const constMatrix = matrix(constants);

    try {
      const solution = lusolve(coeffMatrix as math.Matrix, constMatrix as math.Matrix);
      const rawCoefficients = (solution.toArray() as number[][]).map(row => row[0]); // Extrai os valores da solução

      // Encontra o MMC dos denominadores para transformar os coeficientes em inteiros
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
    // return `${reagents ? reagents : "Reagentes"} | ${products? products : "Produtos"}`;
    if (reagents && products) {
      let reagentsList = reagents.split("+").map((r) => r.trim());
      let productsList = products.split("+").map((p) => p.trim());

      // Remove multiplicadores do início de cada mol para cada item de reagentsList e productsList
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

      // return `Reagentes: ${reagentsList.join(", ")} | Produtos: ${productsList.join(", ")}`;
      // Separa cada elemento presente na equação
      const reagentsElements = reagentsList.map((reagent) =>
        reagent
          .split("")
          .map((char) =>
            char === char.toUpperCase() && isNaN(Number(char))
              ? ` ${char}`
              : char
          )
          .join("")
          .split(" ")
          .filter((item) => item !== "")
      );
      const productsElements = productsList.map((product) =>
        product
          .split("")
          .map((char) =>
            char === char.toUpperCase() && isNaN(Number(char))
              ? ` ${char}`
              : char
          )
          .join("")
          .split(" ")
          .filter((item) => item !== "")
      );

      // Separa cada elemento de acordo com o reagente/produto
      const reagentsElementsByReagent: string[][] = reagentsList.map(
        (reagent) =>
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

      const productsElementsByProduct: string[][] = productsList.map(
        (product) =>
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

      //divide cada elemento com o multiplicador e conta os presentes no reagente/produto
      const reagentsElementsCount: { [key: string]: number } = {};
      reagentsElementsByReagent.forEach((elements) => {
        elements.forEach((element) => {
          //separar a parte numérica como contagem e o simbolo do elemento
          const match = element.match(/(\D+)(\d*)/);
          if (match) {
            const elementName = match[1];
            const count = match[2] ? parseInt(match[2], 10) : 1;
            
            reagentsElementsCount[elementName] =
              (reagentsElementsCount[elementName] || 0) + count;
          }
        });
      });

      const productsElementsCount: { [key: string]: number } = {};
      productsElementsByProduct.forEach((elements) => {
        elements.forEach((element) => {
          //separar a parte numérica como contagem e o simbolo do elemento
          const match = element.match(/(\D+)(\d*)/);
          if (match) {
            const elementName = match[1];
            const count = match[2] ? parseInt(match[2], 10) : 1;
            
            productsElementsCount[elementName] =
              (productsElementsCount[elementName] || 0) + count;
          }
        });
      });

      console.table({
        "reagentes:": reagentsList.join(", "),
        "produtos:": productsList.join(", "),
        "elementos reagentes:": reagentsElements.join(", "),
        "elementos produtos:": productsElements.join(", "),
      });
      console.log(reagentsElementsByReagent);
      console.log(productsElementsByProduct);
      console.table(reagentsElementsCount);
      console.table(productsElementsCount);

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
      console.log("Coeficientes:", coefficients);

      const reagentsStr = reagentsList.map((reagent, index) => {
        return `${coefficients[index] === 1 ? "" : coefficients[index]}${reagent}`;
      });
      const productsStr = productsList.map((product, index) => {
        return `${coefficients[index + reagentsList.length] === 1 ? "" : coefficients[index + reagentsList.length]}${product}`;
      });
      console.log("Equações do sistema:", equationSystem.equations);
      console.log("Variáveis do sistema:", equationSystem.variables);

      return `${reagentsStr.join(" + ")} = ${productsStr.join(" + ")}`;
    }
    return "";
  }

  const result: string = balanceEquation(reagents, products);

  return (
    <div className="molar-mass-calc-page">
      <Header />
      <h1>Balanceador de equações</h1>
      <h2>Insira a equação:</h2>
      <div className="equation-inputs-container">
        <input
          type="text"
          placeholder="Reagente, Ex: H2 + O2"
          value={reagents}
          onChange={(e) => setReagents(e.target.value)}
        />
        =
        <input
          type="text"
          placeholder="Produto, Ex: H2O"
          value={products}
          onChange={(e) => setProducts(e.target.value)}
        />
      </div>
      <p style={{fontSize: "1.4em", fontWeight: "bold"}}>{result}</p>
      <Footer />
    </div>
  );
}
export default EquationBalancer;
