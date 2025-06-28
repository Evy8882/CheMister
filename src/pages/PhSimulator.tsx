import Header from "../components/Header";
import { useState } from "react";
import Footer from "../components/Footer";
import "../styles/PhSimulator.css"


function PhSimulator() {
  const [hp, setHp] = useState<number | null>(null);

  function calculatePh(hp: number): string | number {
    if (hp <= 0) {
      return ("A concentração de íons de hidrogênio deve ser maior que zero.");
    }
    return Math.log10(hp) * -1;
  };


  const ph = hp !== null ? calculatePh(hp) : null;

  return (
    <div className="molar-mass-calc-page">
      <Header />
      <h1>Simulador de PH</h1>
      <label htmlFor="hp">Digite o valor da concentração de íons de hidrogênio ( <b>[H⁺]</b> ) </label>
      <input type="number" id="hp" placeholder="Ex: 0.0001" value={hp ?? ""} onChange={
        (e) => {
          setHp(e.target.value ? parseFloat(e.target.value) : null);
        }
      }
      style={
        {width: "80%", padding: "10px", fontSize: "1.2em", backgroundColor: "#111", border: "1px solid #ccc", color: "#fff" }
      }/>
      <h2>pH: {ph}</h2>

      <p style={{margin: "0px 20px", fontSize: "1.2em", textAlign: "center"}}>
        Fórmula: <br />
        pH = -log<sub>10</sub>[H⁺]
      </p>

      <Footer/>
    </div>
  );
}
export default PhSimulator;
