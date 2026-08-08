import SliderInput from '../SliderInput';
import { formatINRShort } from '../../utils/finance';

export default function SIPInputPanel({ params, update }) {
  const fmtMoney = (v) => formatINRShort(v);
  const fmtPct   = (v) => `${v}%`;
  const fmtYr    = (v) => `${v} yr${v > 1 ? 's' : ''}`;

  return (
    <div className="space-y-6">
      <SliderInput
        id="sip-monthly"
        label="Monthly Investment"
        value={params.monthlyAmount}
        min={500}
        max={200000}
        step={500}
        color="emerald"
        prefix="₹"
        formatDisplay={fmtMoney}
        onChange={(v) => update('monthlyAmount', v)}
      />
      <SliderInput
        id="sip-rate"
        label="Expected Annual Return"
        value={params.annualRate}
        min={1}
        max={30}
        step={0.5}
        unit="%"
        color="cyan"
        formatDisplay={fmtPct}
        onChange={(v) => update('annualRate', v)}
      />
      <SliderInput
        id="sip-years"
        label="Investment Period"
        value={params.years}
        min={1}
        max={40}
        step={1}
        unit=" yrs"
        color="amber"
        formatDisplay={fmtYr}
        onChange={(v) => update('years', v)}
      />
    </div>
  );
}
