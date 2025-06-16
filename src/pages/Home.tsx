import Header from "../components/Header";
import logo from "../assets/Logos/3.png";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="home-page">
      <Header />
      <section className="home-section">
        <img src={logo} alt="" />
      <div>
      <h1 className="main-title">Super APP de química</h1>
      <p className="description">Explore ferramentas interativas de calculos, tabela periódica, equações e mais. Aprenda Química enquanto pratica.</p>
      </div>
      </section>
      <a className="get-started-btn" href="#tools-section">Comece a usar agora mesmo!</a>
      <section id="tools-section" className="tools-section">
        <h2>Ferramentas disponíveis</h2>
        <div className="tools-container">
          <a href="/periodic-table" className="tool-card" style={{ gridColumn: "1" }}>
            <h3>Tabela Periódica</h3>
            <p>Explore a tabela periódica com informações detalhadas sobre cada elemento.</p>
          </a>
          <a href="/" className="tool-card" style={{ gridColumn: "2" }}>
            <h3>Calculadora de Massa Molar</h3>
            <p>Calcule a massa molar de compostos químicos facilmente.</p>
          </a>
          <a href="/" className="tool-card" style={{ gridColumn: "1" }}>
            <h3>Balanceador de Equações</h3>
            <p>Balanceie equações químicas automaticamente.</p>
          </a>
          <a href="/" className="tool-card" style={{ gridColumn: "2" }}>
            <h3>Simulador de pH</h3>
            <p>Simule o pH de soluções químicas.</p>
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
