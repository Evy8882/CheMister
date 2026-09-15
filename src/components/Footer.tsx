import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faFlask,
  faExternalLinkAlt
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/Logos/4.png";
import "../styles/Footer.css";

interface Contributor {
  name: string;
  role: string;
  github?: string;
  avatar?: string;
}

// Lista de colaboradores e desenvolvedores (expansível para novos integrantes!)
const contributors: Contributor[] = [
  {
    name: "Everton Mancio",
    role: "Idealizador & Dev Lead",
    github: "https://github.com/Evy8882",
    avatar: "https://github.com/Evy8882.png"
  },
  {
    name: "Giovanna Momesso",
    role: "Programadora Front-End",
    github: "https://github.com/GiovannaMomesso",
    avatar: "https://github.com/GiovannaMomesso.png"
  },
  {
    name: "João Victor",
    role: "Programador Front-End",
    github: "https://github.com/Joao-Vic-Muniz",
    avatar: "https://github.com/Joao-Vic-Muniz.png"
  },
  {
    name: "Hillary Isabelle",
    role: "Apoiadora",
    github: "https://github.com/Hihi1502",
    avatar: "https://github.com/Hihi1502.png"
  }
];

function Footer() {
  return (
    <footer className="chemister-footer">
      <div className="footer-gradient-divider"></div>

      <div className="footer-container">
        {/* Coluna 1: Branding e Apoio da Etec de Peruíbe */}
        <div className="footer-col footer-brand">
          <div className="brand-header">
            <img src={logo} alt="CheMister Logo" className="footer-logo" />
          </div>
          <p className="brand-description">
            Plataforma interativa de Química desenvolvida para auxiliar  com ferramentas intuitivas de cálculo, simulação e consulta.
          </p>

          {/* Destaque para o Apoio da Etec de Peruíbe */}
          <div>
            <div className="etec-info">
              <span className="etec-tag">Apoio Institucional</span>
              <strong className="etec-title">Etec de Peruíbe</strong>
              <span className="etec-sub">Centro Paula Souza</span>
            </div>
          </div>
        </div>

        {/* Coluna 2: Equipe & Colaboradores */}
        <div className="footer-col footer-team">
          <h4 className="footer-title">
            <FontAwesomeIcon icon={faUsers} className="title-icon" /> Equipe & Colaboradores
          </h4>
          <p className="team-subtitle">
            Desenvolvido em colaboração por:
          </p>

          <div className="contributors-grid">
            {contributors.map((c, index) => (
              <a
                key={index}
                href={c.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="contributor-card"
                title={`Ver perfil de ${c.name} no GitHub`}
              >
                <div className="contributor-avatar">
                  {c.avatar ? (
                    <img src={c.avatar} alt={c.name} />
                  ) : (
                    <span className="avatar-placeholder">{c.name.charAt(0)}</span>
                  )}
                </div>
                <div className="contributor-details">
                  <span className="contributor-name">{c.name}</span>
                  <span className="contributor-role">{c.role}</span>
                </div>
                {c.github && (
                  <FontAwesomeIcon icon={faExternalLinkAlt} className="link-icon" />
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Coluna 3: Links Rápidos */}
        <div className="footer-col footer-links">
          <h4 className="footer-title">
            <FontAwesomeIcon icon={faFlask} className="title-icon" /> Ferramentas
          </h4>
          <ul className="footer-nav-list">
            <li><Link to="/">Início</Link></li>
            <li><Link to="/periodic-table">Tabela Periódica</Link></li>
            <li><Link to="/molar-mass-calculator">Calculadora de Massa Molar</Link></li>
            <li><Link to="/equation-balancer">Balanceador de Equações</Link></li>
            <li><Link to="/ph-simulator">Simulador de pH</Link></li>
            <li><Link to="/solubility-calculator">Calculadora de Solubilidade</Link></li>
          </ul>
        </div>
      </div>

      {/* Barra Inferior */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>
            © {new Date().getFullYear()} <strong>CheMister</strong> — Feito com apoio da <strong>Etec de Peruíbe</strong>.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;