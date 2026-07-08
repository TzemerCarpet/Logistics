-- צמר שטיחים יפים — סכמת בסיס נתונים ל-Supabase
-- הרץ את כל הקובץ הזה ב-SQL Editor של Supabase

create table accounts (
  id text primary key,
  name text not null,
  password text not null,
  role text not null default 'branch',
  can_view_all_tasks boolean default false,
  permissions jsonb default '{}'::jsonb
);

create table tasks (
  id text primary key,
  type text not null,
  zone text,
  status text,
  scheduled_date date,
  driver text,
  pending boolean default false,
  submitted_by text,
  route_order integer,
  data jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table task_photos (
  task_id text primary key references tasks(id) on delete cascade,
  before jsonb default '[]'::jsonb,
  after jsonb default '[]'::jsonb
);

create table transfers (
  id text primary key,
  to_location text,
  status text,
  pending boolean default false,
  submitted_by text,
  data jsonb not null,
  created_at timestamptz default now()
);

create table app_config (
  id text primary key,
  data jsonb not null
);

-- ערכי ברירת מחדל
insert into app_config (id, data) values ('next_carpet_number', '4137');
insert into accounts (id, name, password, role, can_view_all_tasks)
  values ('warehouse', 'מחסן', 'admin1234', 'admin', true);

-- מאפשר גישה מלאה כרגע (כמו ב-window.storage) — נשדרג לאבטחה אמיתית בשלב הבא
alter table accounts enable row level security;
alter table tasks enable row level security;
alter table task_photos enable row level security;
alter table transfers enable row level security;
alter table app_config enable row level security;

create policy "allow all - accounts" on accounts for all using (true) with check (true);
create policy "allow all - tasks" on tasks for all using (true) with check (true);
create policy "allow all - task_photos" on task_photos for all using (true) with check (true);
create policy "allow all - transfers" on transfers for all using (true) with check (true);
create policy "allow all - app_config" on app_config for all using (true) with check (true);
