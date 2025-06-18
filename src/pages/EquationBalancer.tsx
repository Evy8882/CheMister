import Header from "../components/Header";
import { useState } from "react";
import Footer from "../components/Footer";
import "../styles/EquationBalancer.css"

function EquationBalancer() {
  const [reagents, setReagents] = useState<string>("");
  const [products, setProducts] = useState<string>("");


  function balanceEquation(reagents: string, products: string): string {
    // return `${reagents ? reagents : "Reagentes"} | ${products? products : "Produtos"}`;
    if (reagents && products) {
      let reagentsList = reagents.split("+").map(r => r.trim());
      let productsList = products.split("+").map(p => p.trim());
      
      // Remove multiplicadores do início de cada mol para cada item de reagentsList e productsList
      reagentsList = reagentsList.map(reagent => {
        while (!isNaN(Number(reagent.split("")[0]))) {
          reagent = reagent.slice(1);
        }
        return reagent;
      });

      productsList = productsList.map(product => {
        while (!isNaN(Number(product.split("")[0]))) {
          product = product.slice(1);
        }
        return product;
      });

      
      // return `Reagentes: ${reagentsList.join(", ")} | Produtos: ${productsList.join(", ")}`;
      const reagentsElements = reagentsList.map(reagent => reagent.split("").map(char => (char === char.toUpperCase() && isNaN(Number(char)) ? ` ${char}` : char)).join("").split(" ").filter(item => item !== ""));
      const productsElements = productsList.map(product => product.split("").map(char => (char === char.toUpperCase() && isNaN(Number(char)) ? ` ${char}` : char)).join("").split(" ").filter(item => item !== ""));
      console.table({
        "reagentes:": reagentsList.join(", "),
        "produtos:": productsList.join(", "),
        "elementos reagentes:": reagentsElements.join(", "),
        "elementos produtos:": productsElements.join(", ")
      })
      return `Elementos Reagentes: ${reagentsElements.join(", ")} | Elementos Produtos: ${productsElements.join(", ")}`;
    }
    return ""
  }
  
  const result: string = balanceEquation(reagents, products);

  return (
    <div className="molar-mass-calc-page">
      <Header />
      <h1>Balanceador de equações (Em desenvolvimento)</h1>
      <h2>Insira a equação:</h2>
      <div className="equation-inputs-container">
        <input type="text" placeholder="Reagente, Ex: H2 + O2"
        value={reagents}
        onChange={(e) => setReagents(e.target.value)}
        />
         = 
        <input type="text" placeholder="Produto, Ex: H2O"
        value={products}
        onChange={(e) => setProducts(e.target.value)}
        />
      </div>
      <p>{result}</p>
      <Footer/>
    </div>
  );
}
export default EquationBalancer;
