import { useState, useMemo } from "react";
import { useHarvesting } from "../../context/HarvestingContext";
import { formatCurrency, formatNumber, formatPrice } from "../../utils/formatters";
import "./HoldingsTable.css";

const INITIAL_VISIBLE = 8;

const HoldingsTable = () => {
  const { holdings, selectedAssets, toggleAsset, toggleAll } = useHarvesting();
  const [showAll, setShowAll] = useState(false);

  const allSelected = selectedAssets.size === holdings.length && holdings.length > 0;
  const someSelected = selectedAssets.size > 0 && !allSelected;

  const sortedHoldings = useMemo(() => {
    return holdings.map((h, i) => ({ ...h, originalIndex: i }))
      .sort((a, b) => Math.abs(b.stcg.gain) - Math.abs(a.stcg.gain));
  }, [holdings]);

  const visibleHoldings = showAll
    ? sortedHoldings
    : sortedHoldings.slice(0, INITIAL_VISIBLE);

  const remainingCount = sortedHoldings.length - INITIAL_VISIBLE;

  return (
    <div className="holdings" id="holdings-section">
      <div className="holdings__header">
        <h2 className="holdings__title">Holdings</h2>
        <p className="holdings__subtitle">
          {selectedAssets.size} of {holdings.length} assets selected
        </p>
      </div>

      <div className="holdings__table-wrapper">
        <table className="holdings__table" id="holdings-table">
          <thead>
            <tr>
              <th className="holdings__th holdings__th--check">
                <label className="checkbox" id="select-all-checkbox">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    ref={(el) => {
                      if (el) el.indeterminate = someSelected;
                    }}
                  />
                  <span className="checkbox__box">
                    <svg className="checkbox__icon" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6L5 9L10 3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </label>
              </th>
              <th className="holdings__th">Asset</th>
              <th className="holdings__th holdings__th--right">
                Holdings<br />
                <span className="holdings__th-sub">Current Market Rate</span>
              </th>
              <th className="holdings__th holdings__th--right">Total Current Value</th>
              <th className="holdings__th holdings__th--right">
                Short-term<br />
                <span className="holdings__th-sub">Gain</span>
              </th>
              <th className="holdings__th holdings__th--right">
                Long-Term<br />
                <span className="holdings__th-sub">Gain</span>
              </th>
              <th className="holdings__th holdings__th--right">Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {visibleHoldings.map((holding) => {
              const idx = holding.originalIndex;
              const isSelected = selectedAssets.has(idx);
              const totalCurrentValue = holding.totalHolding * holding.currentPrice;
              return (
                <tr
                  key={`${holding.coin}-${idx}`}
                  className={`holdings__row ${isSelected ? "holdings__row--selected" : ""}`}
                  onClick={() => toggleAsset(idx)}
                  id={`holding-row-${idx}`}
                >
                  <td className="holdings__td holdings__td--check">
                    <label className="checkbox" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleAsset(idx)}
                      />
                      <span className="checkbox__box">
                        <svg className="checkbox__icon" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M2 6L5 9L10 3"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </label>
                  </td>
                  <td className="holdings__td">
                    <div className="holdings__asset">
                      <img
                        src={holding.logo}
                        alt={holding.coin}
                        className="holdings__asset-logo"
                        onError={(e) => {
                          e.target.src =
                            "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg";
                        }}
                      />
                      <div className="holdings__asset-info">
                        <span className="holdings__asset-symbol">{holding.coinName}</span>
                        <span className="holdings__asset-name">{holding.coin}</span>
                      </div>
                    </div>
                  </td>
                  <td className="holdings__td holdings__td--right">
                    <div className="holdings__cell-stack">
                      <span className="holdings__cell-primary">
                        {formatNumber(holding.totalHolding)} {holding.coin}
                      </span>
                      <span className="holdings__cell-secondary">
                        {formatPrice(holding.currentPrice)}/{holding.coin}
                      </span>
                    </div>
                  </td>
                  <td className="holdings__td holdings__td--right">
                    <span className="holdings__cell-primary">
                      {formatCurrency(totalCurrentValue)}
                    </span>
                  </td>
                  <td className="holdings__td holdings__td--right">
                    <div className="holdings__cell-stack">
                      <span
                        className={`holdings__gain ${
                          holding.stcg.gain >= 0
                            ? "holdings__gain--positive"
                            : "holdings__gain--negative"
                        }`}
                      >
                        {formatCurrency(holding.stcg.gain)}
                      </span>
                      <span className="holdings__cell-secondary">
                        {formatNumber(holding.stcg.balance)} {holding.coin}
                      </span>
                    </div>
                  </td>
                  <td className="holdings__td holdings__td--right">
                    <div className="holdings__cell-stack">
                      <span
                        className={`holdings__gain ${
                          holding.ltcg.gain >= 0
                            ? "holdings__gain--positive"
                            : "holdings__gain--negative"
                        }`}
                      >
                        {formatCurrency(holding.ltcg.gain)}
                      </span>
                      <span className="holdings__cell-secondary">
                        {formatNumber(holding.ltcg.balance)} {holding.coin}
                      </span>
                    </div>
                  </td>
                  <td className="holdings__td holdings__td--right">
                    <span
                      className={`holdings__sell-amount ${
                        isSelected ? "holdings__sell-amount--active" : ""
                      }`}
                    >
                      {isSelected
                        ? `${formatNumber(holding.totalHolding)} ${holding.coin}`
                        : "-"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {sortedHoldings.length > INITIAL_VISIBLE && (
        <div className="holdings__view-all">
          <button
            className="holdings__view-all-btn"
            onClick={() => setShowAll(!showAll)}
            id="view-all-btn"
          >
            {showAll ? "Show less" : "View all"}
          </button>
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;
