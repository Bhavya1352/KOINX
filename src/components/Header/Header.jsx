import "./Header.css";

const Header = () => {
  return (
    <header className="header" id="header">
      <div className="header__container">
        <div className="header__brand">
          <div className="header__logo">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" rx="8" fill="#0052FE" />
              <path
                d="M9 10L14 16L9 22H12L17 16L12 10H9Z"
                fill="white"
              />
              <path
                d="M16 10L21 16L16 22H19L24 16L19 10H16Z"
                fill="white"
                fillOpacity="0.6"
              />
            </svg>
          </div>
          <span className="header__title">KoinX</span>
        </div>
        <h1 className="header__heading">Tax Loss Harvesting</h1>
        <div className="header__badge">
          <span className="header__badge-dot"></span>
          <span>FY 2024-25</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
