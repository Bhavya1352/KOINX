import "./Disclaimer.css";

const Disclaimer = () => {
  return (
    <div className="disclaimer" id="disclaimer-section">
      <div className="disclaimer__header">
        <svg
          className="disclaimer__icon"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <circle cx="10" cy="10" r="9" stroke="#3b82f6" strokeWidth="1.5" />
          <path
            d="M10 9V14"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="10" cy="6.5" r="0.75" fill="#3b82f6" />
        </svg>
        <h3 className="disclaimer__title">Important Notes & Disclaimers</h3>
      </div>
      <ul className="disclaimer__list">
        <li>
          Tax-loss harvesting is currently not allowed under Indian tax
          regulations. Please consult your tax advisor before making any
          decisions.
        </li>
        <li>
          Tax harvesting does not apply to derivatives or futures. These are
          handled separately as business income under tax rules.
        </li>
        <li>
          Price and market value data is fetched from CoinGecko, not from
          individual exchanges. As a result, values may slightly differ from the
          ones on your exchange.
        </li>
        <li>
          Some countries do not have a short-term / long-term bifurcation. For
          now, we are calculating everything as long-term.
        </li>
        <li>
          Only realized losses are considered for harvesting. Unrealized losses
          in held assets are not counted.
        </li>
      </ul>
    </div>
  );
};

export default Disclaimer;
