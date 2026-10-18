import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { HelpCircle, ChevronRight, X, Check } from "lucide-react";

interface Step {
  title: string;
  description: string;
  highlightTarget?: string;
}

export const OnboardingTour: React.FC = () => {
  const { user, isIC, isHR } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsVisible(false);
      return;
    }
    const storageKey = isIC ? "theodra_tour_seen_ic" : "theodra_tour_seen_hr";
    const seen = localStorage.getItem(storageKey);
    if (!seen) {
      setIsVisible(true);
      setCurrentStep(0);
    }
  }, [user, isIC, isHR]);

  if (!isVisible || !user) return null;

  const icSteps: Step[] = [
    {
      title: "Welcome to the Internal Committee Console",
      description: "You are logged in as an IC Member. All communication telemetry here is privacy-guaranteed: minimum 5 persons per cohort before any pattern surfaces, and no message text is ever inspected.",
    },
    {
      title: "Persistent Left Navigation",
      description: "Use the left sidebar to navigate between Cohort Patterns, Case Management Kanban, Anonymous Reports Inbox, Statutory Compliance Clock, and the Response Ledger.",
    },
    {
      title: "Two-Vote Escalation & Pair Review",
      description: "Statutory safety protocols require two independent IC members to vote before any cohort pattern is escalated for investigation. All actions are sealed in the Response Ledger.",
    },
  ];

  const hrSteps: Step[] = [
    {
      title: "Welcome to the HR Admin Console",
      description: "THEODRA enforces strict separation of duties. As HR Admin, you review organization-wide health scores, compliance metrics, and the IC Roster. You never see individual case or pattern details.",
    },
    {
      title: "Organisation Health & Benchmarks",
      description: "Track your 67/100 workplace health score, peer industry benchmarks, and anonymous department wellness heatmaps to support your workforce proactively.",
    },
    {
      title: "Annual Reporting & Retaliation Shield",
      description: "Generate statutory annual POSH reports automatically and monitor the Retaliation Shield to prevent adverse employment actions against reporting individuals.",
    },
  ];

  const steps = isIC ? icSteps : hrSteps;
  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    const storageKey = isIC ? "theodra_tour_seen_ic" : "theodra_tour_seen_hr";
    localStorage.setItem(storageKey, "true");
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#0A0E28] border border-[#262E5F] rounded-2xl p-5 shadow-2xl text-[#F4F1EB] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between pb-3 border-b border-[#262E5F]">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#DDA162]" />
          <span className="text-xs uppercase tracking-wider text-[#DDA162] font-semibold">
            Platform Tour ({currentStep + 1} of {steps.length})
          </span>
        </div>
        <button
          type="button"
          onClick={handleComplete}
          className="text-[#A87C56] hover:text-[#F4F1EB] p-1 rounded-lg hover:bg-[#262E5F] transition-colors cursor-pointer"
          aria-label="Skip tour"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="py-3">
        <h4 className="font-serif text-sm font-semibold text-[#F4F1EB] mb-1.5">{step.title}</h4>
        <p className="text-xs text-[#F4F1EB] leading-relaxed opacity-90">{step.description}</p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[#262E5F]">
        <button
          type="button"
          onClick={handleComplete}
          className="text-xs text-[#A87C56] hover:text-[#F4F1EB] transition-colors cursor-pointer"
        >
          Skip tour
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#DDA162] text-[#0A0E28] text-xs font-semibold hover:bg-[#EBBA4A] rounded-xl transition-colors cursor-pointer shadow-md"
        >
          {currentStep === steps.length - 1 ? (
            <>
              Got it <Check className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              Next <ChevronRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
