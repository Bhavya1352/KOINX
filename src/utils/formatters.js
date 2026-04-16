/**
 * Format a number as Indian Rupee currency
 * @param {number} value - The number to format
 * @param {boolean} showSign - Whether to show +/- signs
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, showSign = false) => {
  const absValue = Math.abs(value);
  const formatted = absValue.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (showSign) {
    return value >= 0 ? `₹${formatted}` : `-₹${formatted}`;
  }
  return value < 0 ? `-₹${formatted}` : `₹${formatted}`;
};

/**
 * Format a number for display with appropriate decimal places
 * Very small numbers are formatted with more decimals
 * @param {number} value
 * @param {number} maxDecimals
 * @returns {string}
 */
export const formatNumber = (value, maxDecimals = 8) => {
  if (value === 0) return "0";
  const absVal = Math.abs(value);
  if (absVal < 0.00001) {
    return value.toExponential(4);
  }
  if (absVal < 1) {
    return value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: maxDecimals,
    });
  }
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
};

/**
 * Format a price value with ₹ symbol
 * @param {number} value
 * @returns {string}
 */
export const formatPrice = (value) => {
  if (value === 0) return "₹0.00";
  const absVal = Math.abs(value);
  if (absVal < 0.01) {
    return `₹${value.toFixed(8)}`;
  }
  return `₹${value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
