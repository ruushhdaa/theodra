import React from "react";
import { Link } from "react-router-dom";
import { Phone, ExternalLink, HeartHandshake, Shield, ArrowLeft, Scale, LifeBuoy } from "lucide-react";

export const ReportResourcesPage: React.FC = () => {
  const resourceCards = [
    {
      name: "iCall Psychosocial Helpline",
      tagline: "Tata Institute of Social Sciences (TISS)",
      offers:
        "Free, confidential telephone and email-based counseling and psychosocial support by trained professionals across India for stress, trauma, and workplace abuse.",
      contact: "+91 91529 87821",
      linkText: "icallhelpline.org",
      linkUrl: "https://icallhelpline.org",
    },
    {
      name: "National Women's Helpline 181",
      tagline: "Ministry of Women and Child Development",
      offers:
        "24/7 toll-free emergency response and grievance support service for women affected by violence, harassment, or distress in workplace and public environments.",
      contact: "181 (Toll-Free All India)",
      linkText: "wcd.nic.in",
      linkUrl: "https://wcd.nic.in",
    },
    {
      name: "Shakti Shalini Crisis Intervention",
      tagline: "Community Support & Shelter NGO",
      offers:
        "Comprehensive crisis management, counseling, legal aid advocacy, and safe emergency accommodation for women facing gender harassment and domestic distress.",
      contact: "+91 11 2437 3736 / +91 98113 90630",
      linkText: "shaktishalini.org",
      linkUrl: "https://shaktishalini.org",
    },
    {
      name: "SHe-Box (Sexual Harassment Electronic Box)",
      tagline: "Government of India Central Portal",
      offers:
        "Centralized online complaint management system allowing any female employee in India (organized or unorganized sector) to lodge workplace sexual harassment complaints directly to the Ministry.",
      contact: "Online Statutory Gateway",
      linkText: "shebox.wcd.gov.in",
      linkUrl: "https://shebox.wcd.gov.in",
    },
    {
      name: "POSH at Work",
      tagline: "Legal Practice & Awareness Advisory",
      offers:
        "Specialized legal advisory, employee rights consultations, inquiry procedure assistance, and compliance guidance under the Sexual Harassment Act 2013.",
      contact: "+91 90041 33334",
      linkText: "poshatwork.com",
      linkUrl: "https://poshatwork.com",
    },
  ];

  const legalAidTypes = [
    {
      title: "1. National & State Legal Services Authorities (NALSA / SLSA)",
      description:
        "Under the Legal Services Authorities Act 1987, all women in India are entitled to free, state-funded legal aid regardless of their income level. This covers court representation, drafting legal pleadings, and advocates assigned through District Legal Services Authorities (DLSA).",
      link: "nalsa.gov.in",
    },
    {
      title: "2. High Court & Supreme Court Legal Aid Committees",
      description:
        "For appeals or judicial review against employer or IC proceedings, institutional legal aid cells provide pro bono senior panel counsel representation in High Courts across states and the Supreme Court of India.",
      link: "main.sci.gov.in/legal-aid",
    },
    {
      title: "3. Accredited Pro-Bono Legal Clinics & Women's Law Networks",
      description:
        "Civil society organizations such as the Human Rights Law Network (HRLN) and Majlis Legal Centre offer specialized legal counselors who advise victims through preliminary IC conciliations and formal inquiry hearings.",
      link: "hrln.org",
    },
  ];

  return (
    <div className="bg-[#0A0E28] text-[#F4F1EB] min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Back Link */}
        <Link
          to="/report"
          className="inline-flex items-center gap-2 text-xs text-[#A87C56] hover:text-[#DDA162] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Anonymous Portal</span>
        </Link>

        {/* Header */}
        <div className="bg-[#2C3259] border border-[#304A78] p-6 sm:p-8 shadow-2xl">
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
              className="bg-[#2C3259] border border-[#304A78] p-6 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-[#DDA162] uppercase tracking-wider block mb-1">
                  {res.tagline}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#F4F1EB] mb-2">{res.name}</h3>
                <p className="font-serif text-xs text-[#A87C56] leading-relaxed mb-4">{res.offers}</p>
              </div>

              <div className="pt-4 border-t border-[#304A78] space-y-2 text-xs">
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
        <div className="bg-[#2C3259] border border-[#304A78] p-6 sm:p-8 shadow-2xl">
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
              <div key={idx} className="p-4 bg-[#0A0E28] border border-[#304A78] space-y-1.5">
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
