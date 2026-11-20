# Integration contracts

The current local server intentionally uses illustrative data. These are the production seams:

| Capability   | Current demo                        | Production contract                                          |
| ------------ | ----------------------------------- | ------------------------------------------------------------ |
| Lead capture | `POST /api/leads`, local JSON store | CRM webhook with consent and retry queue                     |
| Benchmark    | `GET /api/benchmark`                | Licensed competitor data provider, cached by zipcode         |
| Menu sync    | UI state only                       | POS/platform connector writes normalized menu items          |
| Agent jobs   | Approve/skip UI state               | Queue-backed job with audit log and owner approval gate      |
| Orders       | Illustrative queue                  | POS order push, payment processor, refund events             |
| Analytics    | Browser event buffer                | PostHog/GA4 with consent and event versioning                |
| Images       | CSS demo scene                      | Object storage + image-processing job with original retained |

No production write should bypass the approval and audit-log boundary represented in the UI.
`lib/jobs.ts` provides both the local demo queue and a Redis-compatible adapter; `REDIS_URL` enables the production queue boundary.

## Next.js runtime routes

The App Router now owns the runtime contract: `/api/lead`, `/api/session`, `/api/benchmark`, `/api/orders`, `/api/approvals/[id]`, `/api/marketing`, `/api/reports`, `/api/visuals`, `/api/storefront`, `/api/team/invites`, `/api/settings`, `/api/jobs`, `/api/analytics`, and `/api/health`. `POST /api/lead` uses Prisma when `DATABASE_URL` is configured and returns explicitly marked illustrative data otherwise. `POST /api/jobs` uses Redis when `REDIS_URL` is configured and a side-effect-free in-memory queue otherwise.
