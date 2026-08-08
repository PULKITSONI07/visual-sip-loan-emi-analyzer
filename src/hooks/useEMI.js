import { useState, useMemo } from 'react';
import { calculateEMI } from '../utils/finance';

const DEFAULTS = {
  principal: 2500000,
  annualRate: 8.5,
  tenureYears: 20,
};

export default function useEMI() {
  const [params, setParams] = useState(DEFAULTS);

  const result = useMemo(
    () => calculateEMI(params.principal, params.annualRate, params.tenureYears),
    [params]
  );

  const update = (key, value) =>
    setParams((prev) => ({ ...prev, [key]: Number(value) }));

  return { params, update, result };
}
