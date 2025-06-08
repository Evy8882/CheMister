import Header from "../components/Header";

function Home() {
  return (
    <div className="home-page">
      <Header />
      <h1 className="main-title">CheMister</h1>
      <h2>Super APP de química</h2>
      <a className="get-started-btn">Comece a usar agora mesmo!</a>
    </div>
  );
}

export default Home;
