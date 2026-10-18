create extension if not exists "uuid-ossp";

create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  password_hash text not null,
  role text not null check (role in ('ic_member', 'hr_admin')),
  full_name text not null,
  department text,
  designation text,
  is_active boolean default true,
  created_at timestamptz default now(),
  last_login timestamptz
);

create table if not exists anonymous_reports (
  id uuid primary key default uuid_generate_v4(),
  reference_code text unique not null,
  concern_types text[] not null,
  channel text not null,
  timeframe_month int not null,
  timeframe_year int not null,
  description text not null,
  evidence_file_paths text[],
  status text default 'new' check (status in ('new','under_review','responded','closed')),
  week_bucket text not null,
  notification_token_hash text,
  created_at timestamptz default now()
);

create table if not exists report_messages (
  id uuid primary key default uuid_generate_v4(),
  report_id uuid references anonymous_reports(id) on delete cascade,
  sender_role text not null check (sender_role in ('reporter','ic_member')),
  content text not null,
  sent_at timestamptz default now()
);

create table if not exists detected_patterns (
  id uuid primary key default uuid_generate_v4(),
  cohort_id text unique not null,
  department text not null,
  role_pairing text not null,
  severity_tier text not null check (severity_tier in ('watch','elevated','flagged')),
  anomaly_score float not null,
  duration_weeks int not null,
  cohort_size int not null check (cohort_size >= 5),
  frequency_trend float not null,
  after_hours_ratio float not null,
  exclusivity_score float not null,
  first_detected_week text not null,
  last_updated_week text not null,
  status text default 'active' check (status in ('active','monitoring','escalated','closed')),
  created_at timestamptz default now()
);

create table if not exists escalation_votes (
  id uuid primary key default uuid_generate_v4(),
  pattern_id uuid references detected_patterns(id) on delete cascade,
  ic_member_id uuid references users(id),
  voted_at timestamptz default now(),
  unique(pattern_id, ic_member_id)
);

create table if not exists cases (
  id uuid primary key default uuid_generate_v4(),
  case_number text unique not null,
  department text not null,
  status text default 'open' check (status in ('open','conciliation','inquiry','closed')),
  severity text not null check (severity in ('low','medium','high')),
  assigned_ic_members uuid[],
  linked_pattern_id uuid references detected_patterns(id),
  linked_report_id uuid references anonymous_reports(id),
  inquiry_started_at timestamptz,
  inquiry_deadline timestamptz,
  report_deadline timestamptz,
  employer_action_deadline timestamptz,
  interim_relief text,
  disposition text,
  disposition_reasoning text,
  opened_at timestamptz default now(),
  closed_at timestamptz
);

create table if not exists case_events (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id) on delete cascade,
  event_type text not null,
  description text not null,
  performed_by uuid references users(id),
  performed_at timestamptz default now()
);

create table if not exists case_notes (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id) on delete cascade,
  author_id uuid references users(id),
  content text not null,
  created_at timestamptz default now()
);

create table if not exists witnesses (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id) on delete cascade,
  witness_alias text not null,
  interview_date date,
  interview_method text,
  status text default 'scheduled' check (status in ('scheduled','completed','declined')),
  notes text
);

create table if not exists response_ledger (
  id uuid primary key default uuid_generate_v4(),
  resource_type text not null check (resource_type in ('pattern','report')),
  resource_id uuid not null,
  reviewed_by uuid references users(id),
  disposition text not null,
  reasoning text not null,
  reviewed_at timestamptz default now(),
  is_locked boolean default true
);

create table if not exists quiet_flags (
  id uuid primary key default uuid_generate_v4(),
  department text not null,
  role_level text not null,
  concern_types text[] not null,
  flag_token_hash text not null,
  week_bucket text not null,
  created_at timestamptz default now()
);

create table if not exists retaliation_events (
  id uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id),
  event_type text not null check (event_type in ('performance_review_drop','transfer','termination','role_change','other')),
  event_date date not null,
  logged_by uuid references users(id),
  justification text,
  justification_provided_at timestamptz,
  alert_sent boolean default false,
  created_at timestamptz default now()
);

create table if not exists wellness_pulse (
  id uuid primary key default uuid_generate_v4(),
  department text not null,
  score int not null check (score between 1 and 5),
  week_bucket text not null,
  created_at timestamptz default now()
);

create table if not exists meeting_minutes (
  id uuid primary key default uuid_generate_v4(),
  meeting_date date not null,
  attendees uuid[],
  agenda_items jsonb not null,
  decisions text[],
  action_items jsonb,
  next_meeting_date date,
  created_by uuid references users(id),
  created_at timestamptz default now()
);

create table if not exists training_records (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  module_name text not null,
  status text default 'pending' check (status in ('pending','in_progress','completed','overdue')),
  completed_at timestamptz,
  certificate_url text,
  expiry_date date
);

create table if not exists policy_documents (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  version text not null,
  file_path text not null,
  uploaded_by uuid references users(id),
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists audit_log (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  role text not null,
  action text not null,
  resource_type text not null,
  resource_id text,
  ip_masked text,
  status text default 'success',
  performed_at timestamptz default now()
);

create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  type text not null,
  title text not null,
  message text not null,
  link text,
  is_read boolean default false,
  created_at timestamptz default now()
);
