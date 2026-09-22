import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <div className="logo">🛍️</div>

        <div>
          <h1>TechStore</h1>
          <span>Produtos para tecnologia</span>
        </div>
      </div>

      <button className="highlight-button">
        Ofertas
      </button>
    </header>
  );
}

export default Header;