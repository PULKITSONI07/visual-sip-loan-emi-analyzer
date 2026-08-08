import { useCallback, useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Reusable slider + number input combination.
 *
 * Typing behaviour:
 *   - The text box holds a LOCAL raw string while the user is typing — no
 *     clamping mid-keystroke, so "7000" can be typed naturally.
 *   - On blur the value is committed: if it is within [min, max] it is sent
 *     to the parent; otherwise an inline error is shown and the field is
 *     left so the user can correct it.
 *   - When the slider moves it updates both the parent AND the local text.
 */
export default function SliderInput({
  id,
  label,
  value,       // controlled value from parent (always valid)
  min,
  max,
  step = 1,
  unit = '',
  color = 'emerald',
  onChange,
  formatDisplay,
  prefix = '',
}) {
  // ── local raw text shown in the <input type="text"> ──────────────────────
  const [raw, setRaw]     = useState(String(value));
  const [error, setError] = useState('');

  // Keep raw in sync when the parent value changes (e.g. slider moves)
  useEffect(() => {
    setRaw(String(value));
    setError('');
  }, [value]);

  // ── slider ────────────────────────────────────────────────────────────────
  const handleSlider = useCallback(
    (e) => {
      const num = Number(e.target.value);
      const pct = ((num - min) / (max - min)) * 100;
      e.target.style.setProperty('--pct', `${pct}%`);
      setError('');
      onChange(num);          // parent value update → useEffect syncs raw
    },
    [min, max, onChange]
  );

  // ── text box: free typing, no clamping ───────────────────────────────────
  const handleChange = useCallback((e) => {
    setRaw(e.target.value);  // allow any text while typing
    setError('');            // clear error so user can see what they type
  }, []);

  // ── blur: validate and commit ─────────────────────────────────────────────
  const handleBlur = useCallback(() => {
    const stripped = raw.replace(/[^0-9.]/g, '');
    const num      = parseFloat(stripped);

    if (isNaN(num) || stripped === '') {
      setError('Please enter a valid number.');
      setRaw(String(value));  // revert to last good value
      return;
    }

    if (num < min) {
      setError(`Minimum allowed value is ${prefix}${min.toLocaleString('en-IN')}${unit}.`);
      // keep the raw text so the user can edit it
      return;
    }

    if (num > max) {
      setError(`Maximum allowed value is ${prefix}${max.toLocaleString('en-IN')}${unit}.`);
      return;
    }

    // Valid — commit
    setError('');
    setRaw(String(num));
    onChange(num);
  }, [raw, min, max, value, prefix, unit, onChange]);

  // ── derived ───────────────────────────────────────────────────────────────
  const pct     = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const display = formatDisplay ? formatDisplay(value) : `${prefix}${value}${unit}`;

  const accentClass =
    color === 'emerald' ? 'text-emerald-400' :
    color === 'rose'    ? 'text-rose-400'    :
    color === 'cyan'    ? 'text-cyan-400'    :
                          'text-amber-400';

  const inputBorderClass = error
    ? 'border-rose-500/70 focus:border-rose-500'
    : 'border-white/10 focus:border-white/30';

  return (
    <div className="space-y-2">
      {/* Label row */}
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium text-slate-300">
          {label}
        </label>

        {/* Number input — NO min/max attributes so browser won't restrict typing */}
        <div className="flex items-center gap-1">
          {prefix && (
            <span className="text-xs text-slate-500 font-medium">{prefix}</span>
          )}
          <input
            id={`${id}-text`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={raw}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-label={`${label} value`}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`num-input w-28 border ${inputBorderClass} transition-colors`}
          />
          {unit && (
            <span className="text-xs text-slate-500 font-medium">{unit}</span>
          )}
        </div>
      </div>

      {/* Inline error */}
      {error && (
        <div
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs text-rose-400"
        >
          <AlertCircle size={13} className="shrink-0" />
          {error}
        </div>
      )}

      {/* Range slider */}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={Math.min(max, Math.max(min, value))}
        onChange={handleSlider}
        style={{ '--pct': `${pct}%` }}
        className={`slider-${color} w-full`}
        aria-label={label}
      />

      {/* Bottom marks */}
      <div className="flex justify-between text-[10px] text-slate-600">
        <span />
        <span className={`font-semibold text-xs ${accentClass}`}>{display}</span>
        <span>{prefix}{max.toLocaleString('en-IN')}{unit}</span>
      </div>
    </div>
  );
}
