import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Shield, ArrowLeft, BookOpen, Scale } from "lucide-react";

export const ReportRightsPage: React.FC = () => {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const sections = [
    {
      title: "What is the POSH Act?",
      content:
        "The Prevention of Sexual Harassment (POSH) Act of 2013 is an Indian federal statute designed to protect every woman at any workplace — whether full-time, part-time, intern, contract worker, or visitor. It mandates safe, respectful working conditions and requires all organizations with 10 or more employees to maintain an active, independent Internal Committee.",
    },
    {
      title: "What is an Internal Committee (IC)?",
      content:
        "An Internal Committee (IC) is a quasi-judicial body legally mandated at every administrative unit or office. It must be headed by a senior woman employee (the Presiding Officer), consist of at least 50% women members, and include an independent external specialist — typically an NGO leader, advocate, or counselor experienced in women's rights — to guarantee absolute neutrality.",
    },
    {
      title: "What must an IC do when I report?",
      content:
        "Upon receiving a complaint, the IC must acknowledge it within statutory timeframes, serve a confidential notice of allegations to the respondent, and provide interim protection if requested. The IC operates under strict principles of Natural Justice and must conclude its formal inquiry within 90 days, submitting a formal findings report within 10 days thereafter.",
    },
    {
      title: "What are my rights during an inquiry?",
      content:
        "You have the absolute right to confidentiality: POSH Section 16 strictly forbids publishing or leaking the names, identities, or proceedings of the parties. You have the right to be heard with dignity, present evidence, review documentation, request interim protections (such as team reassignment or paid leave up to 3 months without loss of seniority), and be protected from intimidating cross-examination.",
    },
    {
      title: "What is conciliation?",
      content:
        "Before commencing a formal inquiry, you may choose to settle the matter through conciliation under Section 10 of the Act. Conciliation is completely voluntary and can only be requested by you — the employer or respondent cannot force it. Under Indian law, no monetary settlement can form the basis of conciliation.",
    },
    {
      title: "What protections exist against retaliation?",
      content:
        "Retaliation is strictly prohibited under POSH jurisprudence and company policies. Any adverse employment action taken against someone for filing a complaint, testifying, or participating in an inquiry — including negative appraisals, sudden reassignments, termination threats, or social exclusion — constitutes independent misconduct. THEODRA's Retaliation Shield automatically flags unexplained HR changes.",
    },
    {
      title: "What if my IC doesn't act or fails to follow procedure?",
      content:
        "If an employer fails to constitute an IC, or if the IC fails to act, penal consequences apply under Section 26 of the Act, including government fines up to ₹50,000 and cancellation of business licenses for repeated violations. Aggrieved employees may also file directly with the Local Committee (LC) established by the District Officer or submit an official complaint through the Ministry of Women & Child Development's SHe-Box portal.",
    },
  ];

  return (
    <div className="bg-[#0A0E28] text-[#F4F1EB] min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back Link */}
        <Link
          to="/report"
          className="inline-flex items-center gap-2 text-xs text-[#A87C56] hover:text-[#DDA162] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Anonymous Portal</span>
        </Link>

        {/* Header */}
        <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Scale className="w-6 h-6 text-[#DDA162]" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#DDA162]">
              Statutory Empowerment Guide
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1EB]">Know Your Rights</h1>
          <p className="font-serif text-xs text-[#A87C56] mt-2 leading-relaxed">
            Plain-English guidance on your protections under India's Sexual Harassment of Women at Workplace Act 2013. Warm, clear, and without legalese.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {sections.map((sec, idx) => {
            const isOpen = openSection === idx;
            return (
              <div
                key={idx}
                className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl transition-all overflow-hidden shadow-md"
              >
                <button
                  type="button"
                  onClick={() => setOpenSection(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-[#262E5F] transition-colors cursor-pointer"
                >
                  <span className="font-serif text-base font-semibold text-[#F4F1EB]">
                    {sec.title}
                  </span>
                  <div className="w-7 h-7 rounded-xl bg-[#0E1438] border border-[#262E5F] flex items-center justify-center shrink-0 text-[#DDA162]">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 border-t border-[#262E5F]/60 bg-[#0E1438]/50">
                    <p className="font-serif text-xs sm:text-sm text-[#F4F1EB] leading-relaxed opacity-95 pt-4">
                      {sec.content}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help footer */}
        <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div>
            <h4 className="font-serif text-sm font-semibold text-[#F4F1EB]">Need immediate support?</h4>
            <p className="font-serif text-xs text-[#A87C56]">
              Browse verified national helplines and legal aid organizations.
            </p>
          </div>
          <Link
            to="/report/resources"
            className="px-5 py-2.5 bg-[#DDA162] text-[#0A0E28] text-xs font-bold uppercase tracking-wider hover:bg-[#EBBA4A] rounded-xl transition-colors shrink-0 shadow-md"
          >
            View Safety Resources
          </Link>
        </div>
      </div>
    </div>
  );
};
