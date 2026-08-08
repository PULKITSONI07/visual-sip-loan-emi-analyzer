import SliderInput from '../SliderInput';
import { formatINRShort } from '../../utils/finance';

export default function EMIInputPanel({ params, update }) {
  const fmtMoney = (v) => formatINRShort(v);
  const fmtPct   = (v) => `${v}%`;
  const fmtYr    = (v) => `${v} yr${v > 1 ? 's' : ''}`;

  return (
    <div className="space-y-6">
      <SliderInput
        id="emi-principal"
        label="Loan Amount (Principal)"
        value={params.principal}
        min={50000}
        max={50000000}
        step={50000}
        color="rose"
        prefix="₹"
        formatDisplay={fmtMoney}
        onChange={(v) => update('principal', v)}
      />
      <SliderInput
        id="emi-rate"
        label="Annual Interest Rate"
        value={params.annualRate}
        min={1}
        max={36}
        step={0.1}
        unit="%"
        color="amber"
        formatDisplay={fmtPct}
        onChange={(v) => update('annualRate', v)}
      />
      <SliderInput
        id="emi-tenure"
        label="Loan Tenure"
        value={params.tenureYears}
        min={1}
        max={30}
        step={1}
        unit=" yrs"
        color="cyan"
        formatDisplay={fmtYr}
        onChange={(v) => update('tenureYears', v)}
      />
    </div>
  );
}
