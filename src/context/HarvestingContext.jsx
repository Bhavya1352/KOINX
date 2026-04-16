import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { fetchHoldings, fetchCapitalGains } from "../api/api";

const HarvestingContext = createContext();

export const useHarvesting = () => {
  const context = useContext(HarvestingContext);
  if (!context) {
    throw new Error("useHarvesting must be used within a HarvestingProvider");
  }
  return context;
};

export const HarvestingProvider = ({ children }) => {
  const [holdings, setHoldings] = useState([]);
  const [capitalGains, setCapitalGains] = useState(null);
  const [selectedAssets, setSelectedAssets] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [holdingsRes, gainsRes] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains(),
        ]);
        setHoldings(holdingsRes);
        setCapitalGains(gainsRes.capitalGains);
      } catch (err) {
        setError("Failed to load data. Please try again.");
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Toggle a single asset selection
  const toggleAsset = useCallback((index) => {
    setSelectedAssets((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  // Toggle all assets
  const toggleAll = useCallback(() => {
    setSelectedAssets((prev) => {
      if (prev.size === holdings.length) {
        return new Set();
      }
      return new Set(holdings.map((_, i) => i));
    });
  }, [holdings]);

  // Compute after-harvesting capital gains based on selections
  const afterHarvestingGains = useMemo(() => {
    if (!capitalGains) return null;

    let addedStcgProfits = 0;
    let addedStcgLosses = 0;
    let addedLtcgProfits = 0;
    let addedLtcgLosses = 0;

    selectedAssets.forEach((index) => {
      const holding = holdings[index];
      if (!holding) return;

      // Short-term capital gains
      if (holding.stcg.gain >= 0) {
        addedStcgProfits += holding.stcg.gain;
      } else {
        addedStcgLosses += Math.abs(holding.stcg.gain);
      }

      // Long-term capital gains
      if (holding.ltcg.gain >= 0) {
        addedLtcgProfits += holding.ltcg.gain;
      } else {
        addedLtcgLosses += Math.abs(holding.ltcg.gain);
      }
    });

    return {
      stcg: {
        profits: capitalGains.stcg.profits + addedStcgProfits,
        losses: capitalGains.stcg.losses + addedStcgLosses,
      },
      ltcg: {
        profits: capitalGains.ltcg.profits + addedLtcgProfits,
        losses: capitalGains.ltcg.losses + addedLtcgLosses,
      },
    };
  }, [capitalGains, selectedAssets, holdings]);

  // Calculate net capital gains
  const preHarvestingNet = useMemo(() => {
    if (!capitalGains) return { stcg: 0, ltcg: 0, total: 0 };
    const stcgNet = capitalGains.stcg.profits - capitalGains.stcg.losses;
    const ltcgNet = capitalGains.ltcg.profits - capitalGains.ltcg.losses;
    return { stcg: stcgNet, ltcg: ltcgNet, total: stcgNet + ltcgNet };
  }, [capitalGains]);

  const afterHarvestingNet = useMemo(() => {
    if (!afterHarvestingGains) return { stcg: 0, ltcg: 0, total: 0 };
    const stcgNet =
      afterHarvestingGains.stcg.profits - afterHarvestingGains.stcg.losses;
    const ltcgNet =
      afterHarvestingGains.ltcg.profits - afterHarvestingGains.ltcg.losses;
    return { stcg: stcgNet, ltcg: ltcgNet, total: stcgNet + ltcgNet };
  }, [afterHarvestingGains]);

  // Calculate savings
  const savings = useMemo(() => {
    const diff = preHarvestingNet.total - afterHarvestingNet.total;
    return diff > 0 ? diff : 0;
  }, [preHarvestingNet, afterHarvestingNet]);

  const value = {
    holdings,
    capitalGains,
    selectedAssets,
    loading,
    error,
    toggleAsset,
    toggleAll,
    afterHarvestingGains,
    preHarvestingNet,
    afterHarvestingNet,
    savings,
  };

  return (
    <HarvestingContext.Provider value={value}>
      {children}
    </HarvestingContext.Provider>
  );
};

export default HarvestingContext;
