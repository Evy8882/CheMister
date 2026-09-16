import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faHouse,
  faFlask,
  faChevronDown,
  faTableCells,
  faCalculator,
  faScaleBalanced,
  faVial,
  faDroplet
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/Logos/4.png";
import "../styles/Header.css";

const TOOLS_ITEMS = [
  {
    path: "/periodic-table",
    label: "Tabela Periódica",
    icon: faTableCells,
    desc: "118 elementos interativos"
  },
  {
    path: "/molar-mass-calculator",
    label: "Massa Molar",
    icon: faCalculator,
    desc: "Cálculo preciso de massa molar"
  },
  {
    path: "/equation-balancer",
    label: "Balanceador de Equações",
    icon: faScaleBalanced,
    desc: "Balanceamento de reações"
  },
  {
    path: "/ph-simulator",
    label: "Simulador de pH",
    icon: faVial,
    desc: "Escala de acidez e alcalinidade"
  },
  {
    path: "/solubility-calculator",
    label: "Calculadora de Solubilidade",
    icon: faDroplet,
    desc: "Saturação de soluções"
  },
  {
    path: "/tabela-solubilidade",
    label: "Tabela de Solubilidade",
    icon: faTableCells,
    desc: "Tabela de solubilidade"
  }
];

function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  // Fechar menu mobile e dropdown ao mudar de rota
  useEffect(() => {
    setIsMobileOpen(false);
    setIsToolsDropdownOpen(false);
  }, [location.pathname]);

  // Bloquear rolagem da tela quando o menu mobile está aberto
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Fechar dropdown e menu mobile ao clicar fora ou ao pressionar ESC
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;

      // Fechar menu mobile se o clique for fora do drawer e do botão toggle
      if (
        isMobileOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(target)
      ) {
        setIsMobileOpen(false);
      }

      // Fechar dropdown de ferramentas no desktop se o clique for fora
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsToolsDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false);
        setIsToolsDropdownOpen(false);
      }
    };

    if (isMobileOpen || isToolsDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileOpen, isToolsDropdownOpen]);

  const isHomeActive = location.pathname === "/";

  const isSolubilityActive = (path: string) => {
    return (
      path === "/solubility-calculator" ||
      path === "/calculadora-solubilidade" ||
      path === "/CalculadorSolubilidade"
    );
  };

  const isToolActive = (path: string) => {
    if (path === "/solubility-calculator") {
      return isSolubilityActive(location.pathname);
    }

    return location.pathname === path;
  };

  const isAnyToolActive = TOOLS_ITEMS.some((tool) => isToolActive(tool.path));

  return (
    <header className="chemister-header">
      <div className="header-container">

        {/* Logo Apenas (Sem texto adjacente) */}
        <Link to="/" className="header-brand" aria-label="CheMister Início">
          <img src={logo} alt="CheMister" className="brand-logo" />
        </Link>

        {/* Navegação Desktop: Início + Submenu Ferramentas */}
        <nav className="desktop-nav" aria-label="Navegação Principal">

          <Link
            to="/"
            className={`nav-link ${isHomeActive ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faHouse} className="nav-icon" />
            <span>Início</span>
          </Link>

          {/* Submenu de Ferramentas */}
          <div
            className={`tools-dropdown-container ${
              isToolsDropdownOpen ? "open" : ""
            }`}
            ref={dropdownRef}
          >
            <button
              className={`nav-link dropdown-toggle ${
                isAnyToolActive ? "active" : ""
              }`}
              onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
              aria-expanded={isToolsDropdownOpen}
              type="button"
            >
              <FontAwesomeIcon icon={faFlask} className="nav-icon" />

              <span>Ferramentas</span>

              <FontAwesomeIcon
                icon={faChevronDown}
                className={`chevron-icon ${
                  isToolsDropdownOpen ? "rotate" : ""
                }`}
              />
            </button>

            <div
              className={`tools-dropdown-menu ${
                isToolsDropdownOpen ? "show" : ""
              }`}
            >
              <div className="dropdown-header-title">
                Ferramentas Interativas
              </div>

              {TOOLS_ITEMS.map((tool) => {
                const active = isToolActive(tool.path);

                return (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className={`dropdown-item ${active ? "active" : ""}`}
                    onClick={() => setIsToolsDropdownOpen(false)}
                  >
                    <span className="dropdown-item-icon">
                      <FontAwesomeIcon icon={tool.icon} />
                    </span>

                    <div className="dropdown-item-text">
                      <span className="item-title">{tool.label}</span>
                      <span className="item-desc">{tool.desc}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Botão Toggle Mobile */}
        <button
          ref={toggleBtnRef}
          className="mobile-toggle-btn"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMobileOpen}
          type="button"
        >
          <FontAwesomeIcon icon={isMobileOpen ? faXmark : faBars} />
        </button>
      </div>

      {/* Backdrop Mobile */}
      <div
        className={`mobile-backdrop ${isMobileOpen ? "open" : ""}`}
        onClick={() => setIsMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Menu Drawer Mobile - Preenche 100% da tela verticalmente */}
      <aside
        ref={drawerRef}
        className={`mobile-drawer ${isMobileOpen ? "open" : ""}`}
        aria-label="Menu Mobile"
      >
        <div className="drawer-header">

          {/* Logo Apenas no Drawer */}
          <Link
            to="/"
            className="drawer-brand"
            onClick={() => setIsMobileOpen(false)}
          >
            <img src={logo} alt="CheMister" className="drawer-logo" />
          </Link>

          <button
            className="drawer-close-btn"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Fechar menu"
            type="button"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <nav className="mobile-nav-list">

          <Link
            to="/"
            className={`mobile-nav-link ${
              isHomeActive ? "active" : ""
            }`}
            onClick={() => setIsMobileOpen(false)}
          >
            <div className="mobile-nav-content">
              <span className="mobile-icon-wrapper">
                <FontAwesomeIcon icon={faHouse} />
              </span>

              <span className="mobile-nav-label">Início</span>
            </div>

            {isHomeActive && (
              <span className="active-badge">Atual</span>
            )}
          </Link>

          <div className="mobile-section-divider">
            Ferramentas
          </div>

          {TOOLS_ITEMS.map((tool) => {
            const active = isToolActive(tool.path);

            return (
              <Link
                key={tool.path}
                to={tool.path}
                className={`mobile-nav-link ${
                  active ? "active" : ""
                }`}
                onClick={() => setIsMobileOpen(false)}
              >
                <div className="mobile-nav-content">
                  <span className="mobile-icon-wrapper">
                    <FontAwesomeIcon icon={tool.icon} />
                  </span>

                  <span className="mobile-nav-label">
                    {tool.label}
                  </span>
                </div>

                {active && (
                  <span className="active-badge">Atual</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="drawer-footer">
          <p>CheMister &copy; {new Date().getFullYear()}</p>
        </div>
      </aside>
    </header>
  );
}

export default Header;