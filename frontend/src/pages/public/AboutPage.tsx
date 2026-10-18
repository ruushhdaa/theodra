import React from "react";
import { Link } from "react-router-dom";
import { Shield, ArrowRight, Award, Scale, BookOpen } from "lucide-react";

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#0A0E28] text-[#F4F1EB] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#DDA162] font-semibold block mb-2">
            The Historical & Moral Genesis
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F4F1EB] leading-tight">
            About THEODRA
          </h1>
          <p className="font-serif text-base text-[#A87C56] mt-4 leading-relaxed">
            The story of Empress Theodora of Byzantium and the founding principles of early institutional protection.
          </p>
        </div>

        {/* Narrative Card: 3 paragraphs about Empress Theodora + System Principle */}
        <div className="bg-[#2C3259] border border-[#304A78] p-8 sm:p-12 shadow-2xl space-y-8 font-serif leading-relaxed">
          <div className="flex items-center gap-3 pb-6 border-b border-[#304A78]">
            <div className="w-10 h-10 bg-[#0A0E28] border border-[#304A78] flex items-center justify-center text-[#DDA162]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#DDA162] font-sans font-semibold">
                Historical Inspiration
              </span>
              <h2 className="text-2xl font-bold text-[#F4F1EB]">
                Empress Theodora of the Byzantine Empire
              </h2>
            </div>
          </div>

          {/* Paragraph 1 */}
          <p className="text-sm sm:text-base text-[#F4F1EB] opacity-95">
            In the sixth-century court of Constantinople, Empress Theodora emerged from the disenfranchised margins of Roman society to become one of history’s most formidable legal reformers for women’s bodily autonomy and institutional protection. Recognizing that power differentials render conventional justice avenues inaccessible to the vulnerable, Theodora systematically dismantled legal structures that allowed patrons, masters, and aristocrats to exploit subordinates with impunity. She established safe sanctuaries, outlawed forced prostitution, and reformed divorce, guardianship, and property rights, codifying protections that recognized societal pressure as an active, coercive force rather than mere passive circumstance.
          </p>

          {/* Paragraph 2 */}
          <p className="text-sm sm:text-base text-[#F4F1EB] opacity-95">
            Theodora understood what modern jurisprudence frequently forgets: that the most insidious harm does not occur in public forums, but in the unexamined corridors of power where hierarchy insulates the offender and silences the victim. Her governance was characterized by preemptive vigilance rather than passive arbitration. She did not wait for the vulnerable to mount perilous legal challenges against entrenched patricians; she created institutional mechanisms that actively intercepted exploitation, fundamentally altering the calculus of accountability in the Byzantine Empire.
          </p>

          {/* Paragraph 3 */}
          <p className="text-sm sm:text-base text-[#F4F1EB] opacity-95">
            THEODRA was founded upon this very principle. In contemporary enterprise environments, waiting for a formal grievance to land on an Internal Committee's desk is a design failure that leaves employees alone in the dark for months of compounding pressure. By engineering early warning through privacy-preserving communication rhythms, our platform restores the Empress’s vision to modern corporate life: protecting the vulnerable without subjecting them to intrusive surveillance, empowering quasi-judicial committees with actionable foresight, and honoring the fundamental right of every worker to earn their livelihood in safety and dignity.
          </p>
        </div>

        {/* Founding Principles Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          <div className="p-6 bg-[#2C3259] border border-[#304A78] shadow-2xl space-y-2">
            <span className="text-[10px] uppercase font-mono text-[#DDA162] block">Principle I</span>
            <h3 className="font-serif text-base font-bold text-[#F4F1EB]">Preemptive Vigilance</h3>
            <p className="font-serif text-xs text-[#A87C56] leading-relaxed">
              True safety cannot depend on victims risking their livelihoods to ring alarms. Systems must notice institutional distress early.
            </p>
          </div>

          <div className="p-6 bg-[#2C3259] border border-[#304A78] shadow-2xl space-y-2">
            <span className="text-[10px] uppercase font-mono text-[#DDA162] block">Principle II</span>
            <h3 className="font-serif text-base font-bold text-[#F4F1EB]">Mathematical Immunity</h3>
            <p className="font-serif text-xs text-[#A87C56] leading-relaxed">
              Surveillance destroys psychological trust. We protect every individual through strict k-anonymity (k ≥ 5) and zero content inspection.
            </p>
          </div>

          <div className="p-6 bg-[#2C3259] border border-[#304A78] shadow-2xl space-y-2">
            <span className="text-[10px] uppercase font-mono text-[#DDA162] block">Principle III</span>
            <h3 className="font-serif text-base font-bold text-[#F4F1EB]">Statutory Quorum</h3>
            <p className="font-serif text-xs text-[#A87C56] leading-relaxed">
              Respecting India's POSH Act 2013 by ensuring quasi-judicial IC independence, tamper-evident ledgers, and zero HR influence over active cases.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-8 border-t border-[#304A78] flex items-center justify-between font-sans">
          <Link to="/" className="text-xs text-[#A87C56] hover:text-[#F4F1EB]">
            ← Return to Home
          </Link>
          <Link
            to="/report"
            className="px-6 py-2.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] transition-colors inline-flex items-center gap-1.5"
          >
            <span>Confidential Employee Portal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
