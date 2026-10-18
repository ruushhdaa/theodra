import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Layouts
import { PublicLayout } from "./components/PublicLayout";
import { ICLayout } from "./components/ICLayout";
import { HRLayout } from "./components/HRLayout";

// Public Marketing & Legal Pages
import { LandingPage } from "./pages/public/LandingPage";
import { ProblemPage } from "./pages/public/ProblemPage";
import { HowItWorksPage } from "./pages/public/HowItWorksPage";
import { WhyTheodraPage } from "./pages/public/WhyTheodraPage";
import { PricingPage } from "./pages/public/PricingPage";
import { AboutPage } from "./pages/public/AboutPage";
import { TermsPage } from "./pages/legal/TermsPage";
import { PrivacyPolicyPage } from "./pages/legal/PrivacyPolicyPage";
import { CookiePolicyPage } from "./pages/legal/CookiePolicyPage";

// Employee Portal Pages
import { EmployeeDashboardPage } from "./pages/employee/EmployeeDashboardPage";
import { ReportLandingPage } from "./pages/report/ReportLandingPage";
import { ReportTrackPage } from "./pages/report/ReportTrackPage";
import { ReportQuietFlagPage } from "./pages/report/ReportQuietFlagPage";
import { ReportRightsPage } from "./pages/report/ReportRightsPage";
import { ReportResourcesPage } from "./pages/report/ReportResourcesPage";

// Auth & 404 Pages
import { ICLoginPage } from "./pages/ICLoginPage";
import { HRLoginPage } from "./pages/HRLoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";

// IC Member Portal Pages
import { ICDashboardOverview } from "./pages/ic/ICDashboardOverview";
import { ICPatternsPage } from "./pages/ic/ICPatternsPage";
import { ICPatternDetailPage } from "./pages/ic/ICPatternDetailPage";
import { ICCasesPage } from "./pages/ic/ICCasesPage";
import { ICCaseDetailPage } from "./pages/ic/ICCaseDetailPage";
import { ICReportsPage } from "./pages/ic/ICReportsPage";
import { ICReportDetailPage } from "./pages/ic/ICReportDetailPage";
import { ICLedgerPage } from "./pages/ic/ICLedgerPage";
import { ICClockPage } from "./pages/ic/ICClockPage";
import { ICTrainingPage } from "./pages/ic/ICTrainingPage";
import { ICMinutesPage } from "./pages/ic/ICMinutesPage";
import { ICSearchPage } from "./pages/ic/ICSearchPage";
import { ICNotificationsPage } from "./pages/ic/ICNotificationsPage";
import { ICSettingsPage } from "./pages/ic/ICSettingsPage";

// HR Admin Console Pages
import { HRDashboardOverview } from "./pages/hr/HRDashboardOverview";
import { HRRosterPage } from "./pages/hr/HRRosterPage";
import { HRReportGeneratorPage } from "./pages/hr/HRReportGeneratorPage";
import { HRDisclosurePage } from "./pages/hr/HRDisclosurePage";
import { HRBenchmarksPage } from "./pages/hr/HRBenchmarksPage";
import { HRHealthPage } from "./pages/hr/HRHealthPage";
import { HRRetaliationPage } from "./pages/hr/HRRetaliationPage";
import { HRHeatmapPage } from "./pages/hr/HRHeatmapPage";
import { HRTrainingPage } from "./pages/hr/HRTrainingPage";
import { HRPolicyPage } from "./pages/hr/HRPolicyPage";
import { HRAuditPage } from "./pages/hr/HRAuditPage";
import { HRExportsPage } from "./pages/hr/HRExportsPage";
import { HRNotificationsPage } from "./pages/hr/HRNotificationsPage";
import { HRSettingsPage } from "./pages/hr/HRSettingsPage";

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Dedicated Auth Routes */}
          <Route path="/ic/login" element={<ICLoginPage />} />
          <Route path="/hr/login" element={<HRLoginPage />} />
          <Route path="/login" element={<Navigate to="/ic/login" replace />} />

          {/* Public Pages & Anonymous Reporting Portal (Shared Public Layout) */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/problem" element={<ProblemPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/why-theodra" element={<WhyTheodraPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Dedicated Employee Portal / Dashboard */}
            <Route path="/employee" element={<Navigate to="/employee/dashboard" replace />} />
            <Route path="/employee/dashboard" element={<EmployeeDashboardPage />} />
            <Route path="/report/dashboard" element={<Navigate to="/employee/dashboard" replace />} />

            {/* Employee Anonymous Reporting Flow */}
            <Route path="/report" element={<ReportLandingPage />} />
            <Route path="/report/track" element={<ReportTrackPage />} />
            <Route path="/report/quiet-flag" element={<ReportQuietFlagPage />} />
            <Route path="/report/rights" element={<ReportRightsPage />} />
            <Route path="/report/resources" element={<ReportResourcesPage />} />

            {/* Legal Pages */}
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/cookies" element={<CookiePolicyPage />} />
            <Route path="/legal/terms" element={<Navigate to="/terms" replace />} />
            <Route path="/legal/privacy" element={<Navigate to="/privacy" replace />} />
            <Route path="/legal/cookies" element={<Navigate to="/cookies" replace />} />

            {/* 404 Catch-all */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* IC Member Portal (Protected with "IC Member" Role, persistent ICLayout) */}
          <Route
            path="/ic"
            element={
              <ProtectedRoute allowedRoles={["IC Member"]}>
                <ICLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/ic/dashboard" replace />} />
            <Route path="dashboard" element={<ICDashboardOverview />} />
            <Route path="patterns" element={<ICPatternsPage />} />
            <Route path="patterns/:id" element={<ICPatternDetailPage />} />
            <Route path="cases" element={<ICCasesPage />} />
            <Route path="cases/:id" element={<ICCaseDetailPage />} />
            <Route path="reports" element={<ICReportsPage />} />
            <Route path="reports/:id" element={<ICReportDetailPage />} />
            <Route path="ledger" element={<ICLedgerPage />} />
            <Route path="clock" element={<ICClockPage />} />
            <Route path="training" element={<ICTrainingPage />} />
            <Route path="minutes" element={<ICMinutesPage />} />
            <Route path="search" element={<ICSearchPage />} />
            <Route path="notifications" element={<ICNotificationsPage />} />
            <Route path="settings" element={<ICSettingsPage />} />
          </Route>

          {/* HR Admin Console (Protected with "HR Admin" Role, persistent HRLayout) */}
          <Route
            path="/hr"
            element={
              <ProtectedRoute allowedRoles={["HR Admin"]}>
                <HRLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/hr/dashboard" replace />} />
            <Route path="dashboard" element={<HRDashboardOverview />} />
            <Route path="roster" element={<HRRosterPage />} />
            <Route path="report-generator" element={<HRReportGeneratorPage />} />
            <Route path="disclosure" element={<HRDisclosurePage />} />
            <Route path="benchmarks" element={<HRBenchmarksPage />} />
            <Route path="health" element={<HRHealthPage />} />
            <Route path="retaliation" element={<HRRetaliationPage />} />
            <Route path="heatmap" element={<HRHeatmapPage />} />
            <Route path="training" element={<HRTrainingPage />} />
            <Route path="policy" element={<HRPolicyPage />} />
            <Route path="audit" element={<HRAuditPage />} />
            <Route path="exports" element={<HRExportsPage />} />
            <Route path="notifications" element={<HRNotificationsPage />} />
            <Route path="settings" element={<HRSettingsPage />} />
          </Route>

          {/* Legacy Route Redirects */}
          <Route path="/dashboard/ic" element={<Navigate to="/ic/dashboard" replace />} />
          <Route path="/dashboard/admin" element={<Navigate to="/hr/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
