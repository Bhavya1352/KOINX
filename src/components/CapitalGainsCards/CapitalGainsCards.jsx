import { useHarvesting } from "../../context/HarvestingContext";
import { formatCurrency } from "../../utils/formatters";
import "./CapitalGainsCards.css";

const CapitalGainsCards = () => {
  const {
    capitalGains,
    afterHarvestingGains,
    preHarvestingNet,
    afterHarvestingNet,
    savings,
  } = useHarvesting();

  if (!capitalGains) return null;

  return (
    <div className="cards" id="capital-gains-cards">
      <div className="card card--dark" id="pre-harvesting-card">
        <div className="card__header">
          <div className="card__icon card__icon--dark">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L18 18H2L10 2Z" fill="rgba(255,255,255,0.3)" />
              <path d="M10 6L15 16H5L10 6Z" fill="rgba(255,255,255,0.8)" />
            </svg>
          </div>
          <h2 className="card__title card__title--dark">Pre Harvesting</h2>
        </div>

        <table className="card__table">
          <thead>
            <tr>
              <th></th>
              <th>Short-term</th>
              <th>Long-term</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="card__label">Profits</td>
              <td className="card__value card__value--profit">
                {formatCurrency(capitalGains.stcg.profits)}
              </td>
              <td className="card__value card__value--profit">
                {formatCurrency(capitalGains.ltcg.profits)}
              </td>
            </tr>
            <tr>
              <td className="card__label">Losses</td>
              <td className="card__value card__value--loss">
                {formatCurrency(capitalGains.stcg.losses)}
              </td>
              <td className="card__value card__value--loss">
                {formatCurrency(capitalGains.ltcg.losses)}
              </td>
            </tr>
            <tr className="card__row--highlight">
              <td className="card__label card__label--bold">Net Capital Gains</td>
              <td className="card__value card__value--net">
                {formatCurrency(preHarvestingNet.stcg)}
              </td>
              <td className="card__value card__value--net">
                {formatCurrency(preHarvestingNet.ltcg)}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="card__footer card__footer--dark">
          <span className="card__footer-label">Realised Capital Gains</span>
          <span className="card__footer-value">
            {formatCurrency(preHarvestingNet.total)}
          </span>
        </div>
      </div>

      <div className="card card--blue" id="after-harvesting-card">
        <div className="card__header">
          <div className="card__icon card__icon--blue">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L18 18H2L10 2Z" fill="rgba(255,255,255,0.3)" />
              <path d="M10 6L15 16H5L10 6Z" fill="rgba(255,255,255,0.8)" />
            </svg>
          </div>
          <h2 className="card__title card__title--blue">After Harvesting</h2>
        </div>

        {savings > 0 && (
          <div className="card__savings" id="savings-banner">
            <span className="card__savings-emoji">🎉</span>
            <span>
              You are going to save upto{" "}
              <strong>{formatCurrency(savings)}</strong>
            </span>
          </div>
        )}

        <table className="card__table card__table--blue">
          <thead>
            <tr>
              <th></th>
              <th>Short-term</th>
              <th>Long-term</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="card__label">Profits</td>
              <td className="card__value card__value--profit">
                {formatCurrency(afterHarvestingGains.stcg.profits)}
              </td>
              <td className="card__value card__value--profit">
                {formatCurrency(afterHarvestingGains.ltcg.profits)}
              </td>
            </tr>
            <tr>
              <td className="card__label">Losses</td>
              <td className="card__value card__value--loss">
                {formatCurrency(afterHarvestingGains.stcg.losses)}
              </td>
              <td className="card__value card__value--loss">
                {formatCurrency(afterHarvestingGains.ltcg.losses)}
              </td>
            </tr>
            <tr className="card__row--highlight">
              <td className="card__label card__label--bold">Net Capital Gains</td>
              <td className="card__value card__value--net">
                {formatCurrency(afterHarvestingNet.stcg)}
              </td>
              <td className="card__value card__value--net">
                {formatCurrency(afterHarvestingNet.ltcg)}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="card__footer card__footer--blue">
          <span className="card__footer-label">
            Effective Capital Gains
          </span>
          <span className="card__footer-value">
            {formatCurrency(afterHarvestingNet.total)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CapitalGainsCards;
