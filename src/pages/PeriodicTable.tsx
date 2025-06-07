import Header from "../components/Header";
import data from "../data/elements.json";
import { useState } from "react";

function PeriodicTable() {
  const [mode, setMode] = useState<string>("none");
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#9013FE", "#FF33A1", "#33FFF5", "#F5FF33", "#FF8333", "#8333FF", "#33FF83", "#FF3383", "#3383FF", "#F5A623", "#50E3C2", "#B8E986"];
  
  type Element = {
    atomicNumber: number;
    symbol: string;
    name: string;
    atomicMass: number;
    group: number;
    period: number;
  }

  const getColor = (element: Element): string => {
    if (mode === "grups") {
      if (element.atomicNumber === 1) {
        return "#BBBBBB"; // Cor para o hidrogênio
      }
      if (element.group > 2 && element.group < 13) {
        return colors[3]
      }else if (element.group >= 13 && element.group <= 18) {
        return colors[element.group - 13];
      }
      return colors[element.group]; // Cor para grupos
    } else if (mode === "periods") {
      return colors[element.period]; // Cor para períodos
    }
    return "";
  };

  return (
    <div className="periodic-table-page">
      <Header />
      <h1>Tabela Periódica</h1>
      <p>Em construção...</p>
      <div className="periodic-table">

      {data.map((element: Element) => (
        <div key={element.atomicNumber} style={{ gridColumn: element.group, gridRow: element.period, backgroundColor: getColor(element) }} className="element">
          <div className="atomic-number">{element.atomicNumber}</div>
          <div className="symbol">{element.symbol}</div>
          <div className="name">{element.name}</div>
          <div className="atomic-mass">{element.atomicMass}</div>
        </div>
      ))}
      </div>
      <div className="modes-container">
        <button onClick={()=>{setMode("grups")}}>Grupos</button>
        <button onClick={()=>{setMode("periods")}}>Períodos</button>
      </div>
    </div>
  );
}
export default PeriodicTable;
