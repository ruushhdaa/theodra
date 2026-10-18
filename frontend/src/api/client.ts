/**
 * THEODRA API CLIENT
 * Fully typed client communicating with FastAPI backend & Supabase services
 */

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const headers = new Headers(options.headers || {});

  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const token = localStorage.getItem("theodra_auth_token");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(errorData.detail || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export const api = {
  // ── AUTH ────────────────────────────────────────────────────────────
  auth: {
    login: async (email: string, password: string = "demo1234") => {
      const data = await request<{
        token: string;
        user: {
          id: string;
          email: string;
          role: string;
          full_name: string;
          department: string;
          designation: string;
        };
      }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (data.token) {
        localStorage.setItem("theodra_auth_token", data.token);
      }
      return data;
    },
    me: async () => {
      return request<{
        id: string;
        email: string;
        role: string;
        full_name: string;
        department: string;
        designation: string;
      }>("/api/auth/me");
    },
    logout: () => {
      localStorage.removeItem("theodra_auth_token");
    },
  },

  // ── ANONYMOUS PORTAL ────────────────────────────────────────────────
  portal: {
    submit: async (report: {
      concern_types: string[];
      channel: string;
      timeframe_month: number;
      timeframe_year: number;
      description: string;
      evidence_file_paths?: string[];
      notification_token?: string;
    }) => {
      return request<{ reference_code: string; week_bucket: string }>("/api/portal/submit", {
        method: "POST",
        body: JSON.stringify(report),
      });
    },
    track: async (referenceCode: string) => {
      return request<{
        id: string;
        reference_code: string;
        concern_types: string[];
        status: string;
        week_bucket: string;
        created_at: string;
        messages: Array<{ sender_role: string; content: string; sent_at: string }>;
      }>(`/api/portal/track/${referenceCode}`);
    },
    sendMessage: async (referenceCode: string, content: string) => {
      return request<{ ok: boolean }>(`/api/portal/track/${referenceCode}/message`, {
        method: "POST",
        body: JSON.stringify({ content }),
      });
    },
    flag: async (data: { department: string; role_level: string; concern_types: string[] }) => {
      return request<{ ok: boolean; match_count: number }>("/api/portal/flag", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    pulse: async (data: { department: string; score: number }) => {
      return request<{ ok: boolean }>("/api/portal/pulse", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    upload: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return request<{ file_path: string; filename: string }>("/api/portal/upload", {
        method: "POST",
        body: formData,
      });
    },
  },

  // ── REPORTS (IC) ────────────────────────────────────────────────────
  reports: {
    list: async (status?: string) => {
      const query = status ? `?status=${encodeURIComponent(status)}` : "";
      return request<any[]>(`/api/reports${query}`);
    },
    get: async (reportId: string) => {
      return request<any>(`/api/reports/${reportId}`);
    },
    updateStatus: async (reportId: string, status: string) => {
      return request<{ ok: boolean }>(`/api/reports/${reportId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
    },
    sendMessage: async (reportId: string, content: string) => {
      return request<{ ok: boolean }>(`/api/reports/${reportId}/messages`, {
        method: "POST",
        body: JSON.stringify({ content }),
      });
    },
  },

  // ── PATTERNS (IC) ───────────────────────────────────────────────────
  patterns: {
    list: async (params?: { severity_tier?: string; department?: string }) => {
      const query = new URLSearchParams();
      if (params?.severity_tier) query.set("severity_tier", params.severity_tier);
      if (params?.department) query.set("department", params.department);
      const qs = query.toString() ? `?${query.toString()}` : "";
      return request<any[]>(`/api/patterns${qs}`);
    },
    get: async (patternId: string) => {
      return request<any>(`/api/patterns/${patternId}`);
    },
    vote: async (patternId: string) => {
      return request<{ vote_count: number; escalated: boolean }>(`/api/patterns/${patternId}/vote`, {
        method: "POST",
      });
    },
    recordDisposition: async (
      patternId: string,
      disposition: string,
      reasoning: string,
      resourceType: string = "pattern"
    ) => {
      return request<{ ok: boolean }>(`/api/patterns/${patternId}/disposition`, {
        method: "POST",
        body: JSON.stringify({ disposition, reasoning, resource_type: resourceType }),
      });
    },
    runDetection: async () => {
      return request<{ patterns_inserted: number; week: string }>("/api/patterns/run-detection");
    },
  },

  // ── CASES (IC) ──────────────────────────────────────────────────────
  cases: {
    list: async () => {
      return request<any[]>("/api/cases");
    },
    create: async (data: {
      department: string;
      severity: string;
      linked_pattern_id?: string;
      linked_report_id?: string;
    }) => {
      return request<any>("/api/cases", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    get: async (caseId: string) => {
      return request<any>(`/api/cases/${caseId}`);
    },
    updateStatus: async (caseId: string, status: string) => {
      return request<{ ok: boolean }>(`/api/cases/${caseId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
    },
    addNote: async (caseId: string, content: string) => {
      return request<{ ok: boolean }>(`/api/cases/${caseId}/notes`, {
        method: "POST",
        body: JSON.stringify({ content }),
      });
    },
  },

  // ── HR ADMIN ────────────────────────────────────────────────────────
  hr: {
    dashboard: async () => {
      return request<{
        total_reports: number;
        active_cases: number;
        flagged_patterns: number;
        training_completion_rate: number;
        compliance_score: number;
      }>("/api/hr/dashboard");
    },
    roster: async () => {
      return request<any[]>("/api/hr/roster");
    },
    healthScore: async () => {
      return request<any>("/api/hr/health-score");
    },
    benchmarks: async () => {
      return request<any[]>("/api/hr/benchmarks");
    },
    heatmap: async () => {
      return request<any[]>("/api/hr/heatmap");
    },
    auditLog: async () => {
      return request<any[]>("/api/hr/audit-log");
    },
    retaliation: async () => {
      return request<any[]>("/api/hr/retaliation");
    },
    annualReport: async () => {
      return request<any>("/api/hr/annual-report", {
        method: "POST",
      });
    },
  },

  // ── NOTIFICATIONS ───────────────────────────────────────────────────
  notifications: {
    list: async () => {
      return request<any[]>("/api/notifications");
    },
    markRead: async (notifId: string) => {
      return request<{ ok: boolean }>(`/api/notifications/${notifId}/read`, {
        method: "PATCH",
      });
    },
    markAllRead: async () => {
      return request<{ ok: boolean }>("/api/notifications/mark-all-read", {
        method: "POST",
      });
    },
  },

  // ── HEALTH ──────────────────────────────────────────────────────────
  health: async () => {
    return request<{ status: string; service: string }>("/api/health");
  },
};
