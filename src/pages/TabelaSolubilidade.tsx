import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faMagnifyingGlass, faRotateLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/App.css";
import "../styles/TabelaSolubilidade.css";

type Solubility = "soluble" | "slightly" | "insoluble";

type IonRow = {
	ion: string;
	name: string;
	values: Solubility[];
};

type SelectedCell = {
	row: IonRow;
	column: (typeof columns)[number];
	value: Solubility;
};

const columns = [
	{ ion: "Cl⁻", name: "Cloretos" }, { ion: "Br⁻", name: "Brometos" },
	{ ion: "I⁻", name: "Iodetos" }, { ion: "OH⁻", name: "Hidróxidos" },
	{ ion: "NO₃⁻", name: "Nitratos" }, { ion: "SO₄²⁻", name: "Sulfatos" },
	{ ion: "CO₃²⁻", name: "Carbonatos" }, { ion: "PO₄³⁻", name: "Fosfatos" },
];

const rows: IonRow[] = [
	{ ion: "Li⁺", name: "Lítio", values: ["soluble", "soluble", "soluble", "soluble", "soluble", "soluble", "soluble", "soluble"] },
	{ ion: "Na⁺", name: "Sódio", values: ["soluble", "soluble", "soluble", "soluble", "soluble", "soluble", "soluble", "soluble"] },
	{ ion: "K⁺", name: "Potássio", values: ["soluble", "soluble", "soluble", "soluble", "soluble", "soluble", "soluble", "soluble"] },
	{ ion: "NH₄⁺", name: "Amônio", values: ["soluble", "soluble", "soluble", "soluble", "soluble", "soluble", "soluble", "soluble"] },
	{ ion: "Ag⁺", name: "Prata", values: ["insoluble", "insoluble", "insoluble", "insoluble", "soluble", "slightly", "insoluble", "insoluble"] },
	{ ion: "Ba²⁺", name: "Bário", values: ["soluble", "soluble", "soluble", "soluble", "soluble", "soluble", "insoluble", "insoluble"] },
	{ ion: "Ca²⁺", name: "Cálcio", values: ["soluble", "soluble", "soluble", "slightly", "soluble", "slightly", "insoluble", "insoluble"] },
	{ ion: "Mg²⁺", name: "Magnésio", values: ["soluble", "soluble", "soluble", "slightly", "soluble", "soluble", "slightly", "insoluble"] },
	{ ion: "Zn²⁺", name: "Zinco", values: ["soluble", "soluble", "soluble", "slightly", "soluble", "soluble", "insoluble", "insoluble"] },
	{ ion: "Cu²⁺", name: "Cobre", values: ["soluble", "soluble", "soluble", "insoluble", "soluble", "soluble", "insoluble", "insoluble"] },
	{ ion: "Fe²⁺", name: "Ferro II", values: ["soluble", "soluble", "soluble", "insoluble", "soluble", "soluble", "insoluble", "insoluble"] },
	{ ion: "Fe³⁺", name: "Ferro III", values: ["soluble", "soluble", "soluble", "insoluble", "soluble", "soluble", "insoluble", "insoluble"] },
	{ ion: "Al³⁺", name: "Alumínio", values: ["soluble", "soluble", "soluble", "insoluble", "soluble", "soluble", "insoluble", "insoluble"] },
	{ ion: "Pb²⁺", name: "Chumbo", values: ["insoluble", "insoluble", "insoluble", "insoluble", "soluble", "insoluble", "insoluble", "insoluble"] },
];

const labels: Record<Solubility, { short: string; title: string }> = {
	soluble: { short: "S", title: "Solúvel" }, slightly: { short: "PS", title: "Pouco solúvel" }, insoluble: { short: "I", title: "Insolúvel" },
};

function removeCharge(ion: string) {
	return ion.replace(/[⁺⁻¹²³⁴⁵⁶⁷⁸⁹⁰]+$/u, "");
}

function getFormula(cation: string, anion: string) {
	return `${removeCharge(cation)}${removeCharge(anion)}`;
}

function TabelaSolubilidade() {
	const [query, setQuery] = useState("");
	const [filter, setFilter] = useState<"all" | Solubility>("all");
	const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
	const visibleRows = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();
		return rows.filter((row) => {
			const matchesQuery = !normalizedQuery || `${row.ion} ${row.name}`.toLowerCase().includes(normalizedQuery);
			return matchesQuery && (filter === "all" || row.values.includes(filter));
		});
	}, [filter, query]);

	function resetFilters() { setQuery(""); setFilter("all"); }

	return (
		<div className="tool-page-layout solubility-table-page">
			<div className="tool-bg-effects" aria-hidden="true"><div className="glow-orb orb-1"></div><div className="glow-orb orb-2"></div></div>
			<Header />
			<main className="tool-main-content">
				<div className="tool-header-block">
					<h1 className="tool-page-title">Tabela de Solubilidade</h1>
					<p className="tool-page-subtitle">Consulte a solubilidade dos principais compostos iônicos em água, à temperatura ambiente.</p>
				</div>
				<section className="solubility-table-card" aria-label="Tabela de solubilidade">
					<div className="solubility-table-toolbar">
						<label className="solubility-search"><FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" /><span className="sr-only">Buscar cátion</span><input type="search" placeholder="Buscar por íon ou nome..." value={query} onChange={(event) => setQuery(event.target.value)} /></label>
						<div className="solubility-filters" aria-label="Filtrar resultados">
							<button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>Todos</button>
							<button className={filter === "soluble" ? "active" : ""} onClick={() => setFilter("soluble")}>Solúveis</button>
							<button className={filter === "slightly" ? "active" : ""} onClick={() => setFilter("slightly")}>Pouco solúveis</button>
							<button className={filter === "insoluble" ? "active" : ""} onClick={() => setFilter("insoluble")}>Insolúveis</button>
							{(query || filter !== "all") && <button className="reset-filter" onClick={resetFilters} title="Limpar filtros"><FontAwesomeIcon icon={faRotateLeft} /></button>}
						</div>
					</div>
					<div className="solubility-scroll-area">
						<table className="solubility-matrix">
							<thead><tr><th scope="col" className="corner-cell"><span>Cátion</span><small>Anião →</small></th>{columns.map((column) => <th scope="col" key={column.ion} title={column.name}>{column.ion}</th>)}</tr></thead>
							<tbody>{visibleRows.map((row) => <tr key={row.ion}><th scope="row"><strong>{row.ion}</strong><span>{row.name}</span></th>{row.values.map((value, index) => <td key={`${row.ion}-${columns[index].ion}`}><button className={`solubility-cell ${value} ${selectedCell?.row.ion === row.ion && selectedCell.column.ion === columns[index].ion ? "selected" : ""}`} title={`${labels[value].title}: ${row.ion} + ${columns[index].ion}`} aria-label={`Consultar ${row.ion} com ${columns[index].ion}`} onClick={() => setSelectedCell({ row, column: columns[index], value })}>{labels[value].short}</button></td>)}</tr>)}</tbody>
						</table>
						{visibleRows.length === 0 && <p className="empty-table-message">Nenhum cátion encontrado para esta busca.</p>}
					</div>
					{selectedCell && <div className="selected-solubility-card" aria-live="polite">
						<div className="selected-solubility-heading"><span>Consulta selecionada</span><button onClick={() => setSelectedCell(null)} aria-label="Fechar consulta" title="Fechar consulta"><FontAwesomeIcon icon={faXmark} /></button></div>
						<div className="selected-solubility-content">
							<div className="formula-display"><small>Composto</small><strong>{getFormula(selectedCell.row.ion, selectedCell.column.ion)}</strong></div>
							<div><small>Formado por</small><strong>{selectedCell.row.name} + {selectedCell.column.name}</strong></div>
							<div className={`selected-status ${selectedCell.value}`}><small>Classificação</small><strong>{labels[selectedCell.value].title}</strong></div>
						</div>
						<p><FontAwesomeIcon icon={faCircleInfo} /> Esta classificação é uma regra geral para soluções aquosas em temperatura ambiente.</p>
					</div>}
					<div className="solubility-table-footer">
						<div className="solubility-legend"><span><i className="legend-dot soluble"></i><strong>S</strong> Solúvel</span><span><i className="legend-dot slightly"></i><strong>PS</strong> Pouco solúvel</span><span><i className="legend-dot insoluble"></i><strong>I</strong> Insolúvel</span></div>
						<p><FontAwesomeIcon icon={faCircleInfo} /> Regras gerais; exceções podem ocorrer conforme a concentração e a temperatura.</p>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}

export default TabelaSolubilidade;
