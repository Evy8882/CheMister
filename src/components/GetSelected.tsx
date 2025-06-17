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

type GetSelectedProps = {
  selected: Element | null;
  color: string;
  fntColor: string;
};

function GetSelected({ selected, color, fntColor }: GetSelectedProps) {
    if (selected) {
      return (
        <>
        <div className="element selected-element" style={{ backgroundColor: color, color: fntColor, gridColumnStart: 4, gridColumnEnd: 6, gridRowStart: 1, gridRowEnd: 3, aspectRatio: "1/1", cursor: "default" }}>
          <div className="atomic-number">{selected.atomicNumber}</div>
            <div className="symbol">{selected.symbol}</div>
            <div className="name">{selected.name}</div>
            <div className="atomic-mass">{selected.atomicMass}</div>
        </div>
        <div className="element-details" style={{ gridColumnStart: 6, gridColumnEnd: 11, gridRowStart: 1, gridRowEnd: 3, fontSize: ".5em", overflow: "auto", padding: "4px" }}>
          <p><strong>Grupo:</strong> {selected.group}</p>
          <p><strong>Período:</strong> {selected.period}</p>
          <p><strong>Categoria:</strong> {selected.category || "N/A"}</p>
          <p><strong>Estado Físico:</strong> {selected.state || "N/A"}</p>
          <p><strong>Eletronegatividade:</strong> {selected.electronegativity !== null ? selected.electronegativity : "N/A"}</p>
        </div>
        </>
      );
    }
    return null;
  }

  export default GetSelected;