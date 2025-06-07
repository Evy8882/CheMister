import Header from "../components/Header";
import data from "../data/elements.json";

function PeriodicTable() {



  return (
    <div className="periodic-table-page">
      <Header />
      <h1>Tabela Periódica</h1>
      <p>Em construção...</p>
      {data.map((element) => (
        <div key={element.atomicNumber}>
          <p>{element.name}<sup>{element.atomicNumber}</sup></p>
        </div>
      ))}
    </div>
  );
}
export default PeriodicTable;
