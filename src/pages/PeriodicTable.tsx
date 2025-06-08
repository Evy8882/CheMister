import Header from "../components/Header";
import data from "../data/elements.json";
import { useState } from "react";
import GetSelected from "../components/GetSelected";

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

const colors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#9013FE",
  "#FF33A1",
  "#33FFF5",
  "#F5FF33",
  "#FF8333",
  "#8333FF",
  "#33FF83",
  "#FF3383",
  "#3383FF",
  "#F5A623",
  "#50E3C2",
  "#B8E986",
  "#F8E71C",
  "#D0021B",
  "#F5A623",
  "#4A90E2",
];

const getColor = (element: Element, mode: string): string => {
  if (mode === "groups") {
    if (element.atomicNumber === 1) {
      return "#BBBBBB"; // Cor para o hidrogênio
    }
    if (element.group > 2 && element.group < 13) {
      return colors[3];
    }
    return colors[element.group]; // Cor para grupos
  } else if (mode === "periods") {
    return colors[element.period]; // Cor para períodos
  } else if (mode === "state") {
    if (element.state === "sólido") {
      return colors[0];
    } else if (element.state === "líquido") {
      return colors[1];
    } else if (element.state === "gasoso") {
      return colors[2];
    }
    return "#CCCCCC"; // Cor padrão para outros estados
  } else if (mode === "electronegativity") {
    if (element.electronegativity === null) {
      return "#CCCCCC"; // Cor padrão para elementos sem eletronegatividade
    }
    return "rgba(255, 0, 0, alpha )".replace(
      "alpha",
      (element.electronegativity / 4).toString()
    );
  } else if (mode === "category") {
    switch (element.category) {
      case "não metal":
        return colors[0];
      case "metal alcalino":
        return "#559a66";
      case "metal alcalino-terroso":
        return "#FF8a55";
      case "semi-metal":
        return "#FFD522";
      case "metal de transição":
        return "#FF8C00";
      case "metal representativo":
        return "#FF4500";
      case "halogênio":
        return colors[1];
      case "gás nobre":
        return colors[2];
      case "lantanídeo":
        return colors[3];
      case "actinídeo":
        return colors[4];
    }
  }
  return "";
};

function PeriodicTable() {
  const [mode, setMode] = useState<string>("none");
  const [selected, setSelected] = useState<Element | null>(null);

  return (
    <div className="periodic-table-page">
      <Header />
      <h1>Tabela Periódica</h1>
      <div className="periodic-table">
        {data.map((element: Element) => (
          <div
            key={element.atomicNumber}
            style={{
              gridColumn: (() => {
                if (element.atomicNumber > 56 && element.atomicNumber < 72) {
                  return element.group + element.atomicNumber - 56;
                }
                if (element.atomicNumber > 88 && element.atomicNumber < 104) {
                  return element.group + element.atomicNumber - 88;
                }
                return element.group;
              })(),
              gridRow: (() => {
                if (element.atomicNumber > 56 && element.atomicNumber < 72) {
                  return 9;
                }
                if (element.atomicNumber > 88 && element.atomicNumber < 104) {
                  return 10;
                }
                return element.period;
              })(),
              backgroundColor: getColor(element, mode),
            }}
            className="element"
            onClick={() => {
              setSelected(element);
            }}
          >
            <div className="atomic-number">{element.atomicNumber}</div>
            <div className="symbol">{element.symbol}</div>
            <div className="name">{element.name}</div>
            <div className="atomic-mass">{element.atomicMass}</div>
          </div>
        ))}
        <div
          className="element"
          style={{ gridColumn: 1, gridRow: 8, opacity: 0, cursor: "default" }}
        ></div>
        {
          <GetSelected
            selected={selected}
            color={selected == null ? "" : getColor(selected, mode)}
          />
        }
      </div>
      <div className="modes-container">
        <button
          className={"mode-btn" + (mode === "groups" ? " active" : "")}
          onClick={() => {
            setMode("groups");
          }}
        >
          Grupos
        </button>
        <button
          className={"mode-btn" + (mode === "periods" ? " active" : "")}
          onClick={() => {
            setMode("periods");
          }}
        >
          Períodos
        </button>
        <button
          className={"mode-btn" + (mode === "state" ? " active" : "")}
          onClick={() => {
            setMode("state");
          }}
        >
          Estado físico
        </button>
        <button
          className={
            "mode-btn" + (mode === "electronegativity" ? " active" : "")
          }
          onClick={() => {
            setMode("electronegativity");
          }}
        >
          Eletronegatividade
        </button>
        <button
          className={"mode-btn" + (mode === "category" ? " active" : "")}
          onClick={() => {
            setMode("category");
          }}
        >
          Categoria
        </button>
      </div>
    </div>
  );
}

export default PeriodicTable;
