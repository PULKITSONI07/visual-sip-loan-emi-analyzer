import { useState } from 'react';
import Header from './components/Header';
import SegmentControl from './components/SegmentControl';
import SIPAnalyzer from './components/sip/SIPAnalyzer';
import EMIAnalyzer from './components/emi/EMIAnalyzer';
import useSIP from './hooks/useSIP';
import useEMI from './hooks/useEMI';

export default function App() {
  const [activeTab, setActiveTab] = useState('sip');
  const sip = useSIP();
  const emi = useEMI();

  return (
    <div className="min-h-screen bg-[#050816] text-slate-200 antialiased">
      {/* Ambient background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-rose-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/4 blur-3xl" />
      </div>

      <Header />

      <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Segment Control */}
        <div className="mb-8 flex justify-center">
          <SegmentControl active={activeTab} onChange={setActiveTab} />
        </div>

        {/* Panel heading */}
        <div className="mb-6">
          <h2 className={`text-2xl font-extrabold sm:text-3xl ${activeTab === 'sip' ? 'grad-text-emerald' : 'grad-text-rose'}`}>
            {activeTab === 'sip' ? 'SIP Investment Analyzer' : 'Loan EMI Calculator'}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {activeTab === 'sip'
              ? 'Visualize how your monthly SIP investments compound over time into wealth.'
              : 'See the full cost of your loan: EMI, total interest, and year-by-year repayment.'}
          </p>
        </div>

        {/* Active panel */}
        {activeTab === 'sip' ? (
          <SIPAnalyzer
            params={sip.params}
            update={sip.update}
            result={sip.result}
          />
        ) : (
          <EMIAnalyzer
            params={emi.params}
            update={emi.update}
            result={emi.result}
          />
        )}
      </main>

      <footer className="mt-16 border-t border-white/5 py-6 text-center text-xs text-slate-600">
        <p>
          FinVision &mdash; Visual SIP &amp; Loan EMI Analyzer &nbsp;·&nbsp;
          Educational purpose only, not financial advice.
        </p>
      </footer>
    </div>
  );
}
