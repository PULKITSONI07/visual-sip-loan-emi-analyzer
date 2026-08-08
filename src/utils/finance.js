// ─── Indian Number System Formatter ───────────────────────────────────────────
const inFmt = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function formatINR(value) {
  if (isNaN(value) || !isFinite(value)) return '₹0';
  return inFmt.format(Math.round(value));
}

export function formatINRShort(value) {
  if (isNaN(value) || !isFinite(value)) return '₹0';
  const abs = Math.abs(value);
  if (abs >= 1e7) return `₹${(value / 1e7).toFixed(2)} Cr`;
  if (abs >= 1e5) return `₹${(value / 1e5).toFixed(2)} L`;
  if (abs >= 1e3) return `₹${(value / 1e3).toFixed(1)}K`;
  return `₹${Math.round(value)}`;
}

export function formatPct(value, decimals = 1) {
  if (isNaN(value) || !isFinite(value)) return '0%';
  return `${value.toFixed(decimals)}%`;
}

// ─── SIP Calculator ────────────────────────────────────────────────────────────
/**
 * Calculates SIP future value using the standard SIP formula:
 * FV = P × [(1+r)^n − 1] / r × (1+r)
 * where r = monthly rate, n = total months
 */
export function calculateSIP(monthlyAmount, annualRate, years) {
  const r = annualRate / 100 / 12; // monthly rate
  const n = years * 12;            // total months
  const totalInvested = monthlyAmount * n;

  if (r === 0) {
    return {
      totalInvested,
      totalValue: totalInvested,
      totalReturns: 0,
      returnPct: 0,
      yearlyData: buildSIPYearlyData(monthlyAmount, 0, years),
    };
  }

  const totalValue = monthlyAmount * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
  const totalReturns = totalValue - totalInvested;
  const returnPct = (totalReturns / totalInvested) * 100;

  return {
    totalInvested,
    totalValue,
    totalReturns,
    returnPct,
    yearlyData: buildSIPYearlyData(monthlyAmount, r, years),
  };
}

function buildSIPYearlyData(monthlyAmount, r, years) {
  const data = [];
  for (let y = 1; y <= years; y++) {
    const n = y * 12;
    const invested = monthlyAmount * n;
    const corpus = r === 0
      ? invested
      : monthlyAmount * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    data.push({
      year: `Y${y}`,
      invested: Math.round(invested),
      corpus: Math.round(corpus),
      returns: Math.round(corpus - invested),
    });
  }
  return data;
}

// ─── EMI Calculator ────────────────────────────────────────────────────────────
/**
 * EMI = P × r × (1+r)^n / [(1+r)^n − 1]
 * where r = monthly interest rate, n = total months
 */
export function calculateEMI(principal, annualRate, tenureYears) {
  const r = annualRate / 100 / 12;
  const n = tenureYears * 12;
  const totalInvested = principal;

  if (r === 0) {
    const emi = principal / n;
    return {
      emi,
      totalPayment: principal,
      totalInterest: 0,
      interestRatio: 0,
      principal,
      yearlyData: buildEMIYearlyData(principal, 0, n, emi),
    };
  }

  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - principal;
  const interestRatio = (totalInterest / totalPayment) * 100;

  return {
    emi,
    totalPayment,
    totalInterest,
    interestRatio,
    principal,
    yearlyData: buildEMIYearlyData(principal, r, n, emi),
  };
}

function buildEMIYearlyData(principal, r, totalMonths, emi) {
  const data = [];
  const years = Math.ceil(totalMonths / 12);
  let balance = principal;

  for (let y = 1; y <= years; y++) {
    const monthsThisYear = Math.min(12, totalMonths - (y - 1) * 12);
    let interestPaid = 0;
    let principalPaid = 0;
    const openingBalance = balance;

    for (let m = 0; m < monthsThisYear; m++) {
      if (balance <= 0) break;
      const interest = balance * r;
      const principalComponent = Math.min(emi - interest, balance);
      interestPaid += interest;
      principalPaid += principalComponent;
      balance = Math.max(0, balance - principalComponent);
    }

    data.push({
      year: `Y${y}`,
      opening: Math.round(openingBalance),
      principalPaid: Math.round(principalPaid),
      interestPaid: Math.round(interestPaid),
      closing: Math.round(balance),
    });
    if (balance <= 0) break;
  }
  return data;
}
