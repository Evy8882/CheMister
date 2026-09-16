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
  onClose?: () => void;
};

function GetSelected({ selected, color, fntColor, onClose }: GetSelectedProps) {
  if (!selected) return null;

  const bg = color || "#27272a";

  return (
    <>
      {/* Desktop View: Rendered inside Grid slots (Rows 1-2, Cols 4-11) */}
      <div
        className="element selected-element desktop-selected-preview"
        style={{
          backgroundColor: bg,
          color: fntColor,
          gridColumnStart: 4,
          gridColumnEnd: 6,
          gridRowStart: 1,
          gridRowEnd: 3,
          aspectRatio: "1/1",
          cursor: "default",
        }}
      >
        <div className="atomic-number">{selected.atomicNumber}</div>
        <div className="symbol">{selected.symbol}</div>
        <div className="name">{selected.name}</div>
        <div className="atomic-mass">{selected.atomicMass}</div>
      </div>

      <div
        className="element-details-card desktop-selected-details"
        style={{
          gridColumnStart: 6,
          gridColumnEnd: 12,
          gridRowStart: 1,
          gridRowEnd: 3,
          overflow: "auto",
        }}
      >
        {onClose && (
          <button className="details-close-btn" onClick={onClose} title="Fechar detalhes">
            ✕
          </button>
        )}
        <div className="details-header">
          <span className="details-symbol">{selected.symbol}</span>
          <div>
            <h3 className="details-title">{selected.name}</h3>
            <span className="details-number">Nº Atômico: {selected.atomicNumber}</span>
          </div>
        </div>
        <div className="details-grid">
          <p><strong>Massa Atômica:</strong> {selected.atomicMass} u</p>
          <p><strong>Grupo:</strong> {selected.group}</p>
          <p><strong>Período:</strong> {selected.period}</p>
          <p><strong>Categoria:</strong> {selected.category || "N/A"}</p>
          <p><strong>Estado Físico:</strong> {selected.state || "N/A"}</p>
          <p>
            <strong>Eletronegatividade:</strong>{" "}
            {selected.electronegativity !== null ? selected.electronegativity : "N/A"}
          </p>
        </div>
      </div>

      {/* Mobile Floating Card / Sticky Drawer */}
      <div className="mobile-selected-card">
        <div
          className="mobile-card-preview"
          style={{ backgroundColor: bg, color: fntColor }}
        >
          <div className="atomic-number">{selected.atomicNumber}</div>
          <div className="symbol">{selected.symbol}</div>
        </div>
        <div className="mobile-card-content">
          <div className="mobile-card-header">
            <h4>{selected.name} ({selected.symbol})</h4>
            {onClose && (
              <button className="details-close-btn" onClick={onClose} title="Fechar">
                ✕
              </button>
            )}
          </div>
          <div className="mobile-card-tags">
            <span><strong>Nº:</strong> {selected.atomicNumber}</span>
            <span><strong>Massa:</strong> {selected.atomicMass}</span>
            <span><strong>Grupo:</strong> {selected.group}</span>
            <span><strong>Período:</strong> {selected.period}</span>
            <span><strong>Cat:</strong> {selected.category || "N/A"}</span>
            <span><strong>Estado:</strong> {selected.state || "N/A"}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default GetSelected;