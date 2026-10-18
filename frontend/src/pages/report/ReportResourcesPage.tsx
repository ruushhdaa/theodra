import React from "react";
import { Link } from "react-router-dom";
import { Phone, ExternalLink, ArrowLeft, LifeBuoy, HeartHandshake, Scale, ShieldAlert } from "lucide-react";

export const ReportResourcesPage: React.FC = () => {
  const resourceCards = [
    {
      name: "National Commission for Women (NCW)",
      tagline: "Government of India Statutory Body",
      contact: "7827170170 (24/7 Helpline)",
      offers:
        "Emergency distress intake, legal counseling referrals, and direct monitoring of workplace harassment inquiries nationwide.",
      linkText: "ncw.nic.in",
      linkUrl: "http://ncw.nic.in",
    },
    {
      name: "SHe-Box (Sexual Harassment e-Box)",
      tagline: "Ministry of Women & Child Development",
      contact: "Official Central Government Portal",
      offers:
        "Direct central government tracking mechanism. Any complaint filed here routes directly to the District Officer and the employer's Internal Committee with mandated oversight.",
      linkText: "shebox.wcd.gov.in",
      linkUrl: "https://shebox.wcd.gov.in",
    },
    {
      name: "National Women Helpline (181)",
      tagline: "Toll-Free 24/7 Government Emergency Support",
      contact: "Dial 181 (Toll-Free Nationwide)",
      offers:
        "24-hour emergency response, psychological counseling referrals, hospital coordination, and immediate intervention.",
      linkText: "wcd.nic.in/women-helpline",
      linkUrl: "https://wcd.nic.in",
    },
    {
      name: "iCall Psychosocial Helpline (TISS)",
      tagline: "Tata Institute of Social Sciences Counseling",
      contact: "9152987821 (Mon–Sat, 10 AM – 8 PM)",
      offers:
        "Confidential, free psychological support and mental health counseling for workplace distress, trauma, and anxiety.",
      linkText: "icallhelpline.org",
      linkUrl: "https://icallhelpline.org",
    },
    {
      name: "VIMHANS Mental Health Helpline",
      tagline: "Specialized Psychiatric Counseling",
      contact: "011-26924371 (24/7 Mental Health Support)",
      offers:
        "Trauma-informed crisis counseling, stress decompensation support, and clinical mental healthcare assistance.",
      linkText: "vimhans.com",
      linkUrl: "https://vimhans.com",
    },
    {
      name: "National Legal Services Authority (NALSA)",
      tagline: "Statutory Legal Aid & Representation",
      contact: "Dial 15100 (Toll-Free Legal Aid)",
      offers:
        "Free, state-provided legal counsel, representation before Magistrate courts, and statutory dispute defense for women under the Legal Services Authorities Act 1987.",
      linkText: "nalsa.gov.in",
      linkUrl: "https://nalsa.gov.in",
    },
  ];

  const legalAidTypes = [
    {
      title: "State Legal Services Authorities (SLSA)",
      description:
        "Every state high court administers an SLSA providing free advocate appointments and dispute guidance without any income-test threshold for women complainants under Indian law.",
      link: "nalsa.gov.in/state-legal-services-authorities",
    },
    {
      title: "Local Committee (LC) established by District Officer",
      description:
        "If you work at an organization with fewer than 10 employees, or if your complaint is against the employer or CEO directly, the statutory inquiry must be handled by the District Officer's Local Committee.",
      link: "Contact your local District Collector or Deputy Commissioner office",
    },
    {
      title: "Pro-Bono POSH Legal Clinics",
      description:
        "Multiple certified women advocates and legal non-profits offer confidential pro-bono advisory sessions to help you evaluate evidence, draft complaints, and understand your rights.",
      link: "Access pro-bono directory through bar council panels",
    },
  ];

  return (
    <div className="bg-[#0A0E28] text-[#F4F1EB] min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
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
            <LifeBuoy className="w-6 h-6 text-[#DDA162]" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#DDA162]">
              Emergency & Legal Support Network
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#F4F1EB]">
            Safety & Support Resources
          </h1>
          <p className="font-serif text-xs text-[#A87C56] mt-2 max-w-2xl leading-relaxed">
            Verified external helplines, governmental portals, and institutional legal aid organizations operating across India. Independent of your employer's systems.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resourceCards.map((res, i) => (
            <div
              key={i}
              className="bg-[#0A0E28] border border-[#262E5F] hover:bg-[#262E5F] hover:border-[#DDA162] p-6 rounded-2xl shadow-xl flex flex-col justify-between transition-all group"
            >
              <div>
                <span className="text-[10px] font-mono text-[#DDA162] uppercase tracking-wider block mb-1">
                  {res.tagline}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#F4F1EB] group-hover:text-[#DDA162] mb-2 transition-colors">
                  {res.name}
                </h3>
                <p className="font-serif text-xs text-[#A87C56] leading-relaxed mb-4">{res.offers}</p>
              </div>

              <div className="pt-4 border-t border-[#262E5F]/60 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#EBBA4A] font-semibold">
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span>{res.contact}</span>
                </div>
                <a
                  href={res.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#A87C56] hover:text-[#F4F1EB] transition-colors"
                >
                  <span>Visit website: {res.linkText}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Support Section */}
        <div className="bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-5 h-5 text-[#DDA162]" />
            <h2 className="font-serif text-xl font-bold text-[#F4F1EB]">
              Legal Support Architecture in India
            </h2>
          </div>
          <p className="font-serif text-xs text-[#A87C56] mb-6 leading-relaxed">
            Every employee in India has constitutional and statutory guarantees for free legal assistance in matters involving harassment or discrimination.
          </p>

          <div className="space-y-4">
            {legalAidTypes.map((item, idx) => (
              <div key={idx} className="p-4 bg-[#0E1438] border border-[#262E5F] rounded-xl space-y-1.5 hover:bg-[#262E5F] transition-colors">
                <h4 className="font-serif text-sm font-semibold text-[#DDA162]">{item.title}</h4>
                <p className="font-serif text-xs text-[#F4F1EB] opacity-90 leading-relaxed">{item.description}</p>
                <span className="text-[11px] font-mono text-[#A87C56] block pt-1">
                  Official resource: {item.link}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
