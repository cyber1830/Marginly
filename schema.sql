-- Marginly production foundation. All tenant-owned records carry restaurant_id.
create table if not exists restaurants (id uuid primary key, name text not null, created_at timestamptz not null default now());
create table if not exists locations (id uuid primary key, restaurant_id uuid not null references restaurants(id), name text not null, zipcode text not null, timezone text not null default 'America/Los_Angeles');
create table if not exists users (id uuid primary key, restaurant_id uuid not null references restaurants(id), email text not null, role text not null check (role in ('owner','manager','staff','marginly_team')));
create table if not exists menu_items (id uuid primary key, restaurant_id uuid not null references restaurants(id), location_id uuid references locations(id), name text not null, category text, price_cents integer not null, availability text not null default 'available');
create table if not exists benchmark_snapshots (id uuid primary key, restaurant_id uuid not null references restaurants(id), zipcode text not null, payload jsonb not null, refreshed_at timestamptz not null default now());
create table if not exists suggestions (id uuid primary key, restaurant_id uuid not null references restaurants(id), kind text not null, title text not null, reason text not null, impact jsonb, status text not null default 'pending', created_at timestamptz not null default now());
create table if not exists approvals (id uuid primary key, restaurant_id uuid not null references restaurants(id), suggestion_id uuid references suggestions(id), decision text not null, decided_by uuid references users(id), decided_at timestamptz not null default now());
create table if not exists orders (id uuid primary key, restaurant_id uuid not null references restaurants(id), location_id uuid references locations(id), channel text not null, status text not null, total_cents integer not null, created_at timestamptz not null default now());
create table if not exists audit_log (id uuid primary key, restaurant_id uuid not null references restaurants(id), actor_id uuid, action text not null, entity_type text not null, entity_id uuid, metadata jsonb, created_at timestamptz not null default now());

-- Production should enable row-level security and scope every query by restaurant_id.
