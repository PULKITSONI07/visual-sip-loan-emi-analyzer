import { useState, useMemo } from 'react';
import { calculateSIP } from '../utils/finance';

const DEFAULTS = {
  monthlyAmount: 10000,
  annualRate: 12,
  years: 15,
};

export default function useSIP() {
  const [params, setParams] = useState(DEFAULTS);

  const result = useMemo(
    () => calculateSIP(params.monthlyAmount, params.annualRate, params.years),
    [params]
  );

  const update = (key, value) =>
    setParams((prev) => ({ ...prev, [key]: Number(value) }));

  return { params, update, result };
}
