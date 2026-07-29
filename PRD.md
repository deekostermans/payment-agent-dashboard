# PRD — Payment Agent Dashboard (Portfolio Prototype)

> **Note on scope:** This PRD is a genericized, fictionalized version of a payment-operations product concept. Company name, brand, logo, financial figures, and internal system names have been replaced with placeholders (`NovaTrade` as the fictional broker) so this document and the resulting prototype are safe to publish publicly. No real company data, trademarks, or confidential figures are referenced anywhere below.

## Document status
Draft — prototype scope

## Contributors
Diana Yasmin (Product)

---

## 1. Problem Alignment

### 1.1 Objective
Online trading platforms often can't collect or pay out funds in certain markets because standard rails — cards, bank transfers, mainstream payment processors — are unavailable, restricted, or impractical there. In many of those markets, though, alternative local payment methods (e-wallets, mobile money, cash agents, QR payments) are widely trusted and used.

A **Payment Agent** is a local, vetted intermediary who bridges this gap: they collect deposits from traders and disburse withdrawals on the broker's behalf, using local currency and locally trusted payment methods, in exchange for a commission.

### 1.2 Current State (v1 — manual process)
Today this flow is entirely manual and off-system:
1. The trader pays the agent directly, offline (bank transfer, cash, e-wallet).
2. The agent emails an ops inbox: *"process this transaction."*
3. An internal operations team manually verifies and applies the ledger movement.

This is slow, error-prone, hard to audit, gives the trader no visibility into status, and gives the agent no self-service tooling — there is no in-product record of the request, no status tracking, and no automated ledger movement.

### 1.3 Proposed Solution (v2 — this product)
Bring the flow in-app: the trader raises a deposit/withdrawal request in-app and selects a payment agent. The trader and agent coordinate the transfer offline (in local currency, via the agent's preferred method). The agent confirms in the dashboard once they've sent or received the funds, and the platform automatically executes the corresponding balance movement on approval — for both deposits and withdrawals.

### 1.4 Non-Goals (for this prototype)
- Real payment processing, banking integrations, or money movement of any kind.
- Real user authentication, KYC/AML verification, or account balances.
- Backend ledger/accounting system integration (e.g. journal entries, reconciliation).
- Multi-currency conversion logic.
- This is a **frontend-only, mock-data prototype** built to demonstrate product thinking and UI/UX craft — not a production-ready payments system.

---

## 2. Goals (Success Metrics)

**Product goals (original concept):**
- Let traders in supported regions place deposit and withdrawal requests in-app.
- Give agents a dashboard to review, approve, or reject requests.
- Automate ledger movement on approval, removing the manual email-and-process step.
- Surface risk context to the agent (e.g. is the trader close to a margin call) so time-sensitive funding requests can be prioritized.
- Maintain a full audit trail of every transaction.

**Success metrics (original concept):**
- Average/median time from request to transfer completion.
- Request success rate (reliability of the flow).
- Adoption % — share of eligible users in a region using the payment agent flow.

**Prototype goals (what this build actually demonstrates):**
- A believable, end-to-end operator experience: list → filter/search → inspect → action a request.
- Clear information hierarchy for a high-volume ops table (88+ rows, pagination, bulk actions).
- A polished marketing/onboarding surface for the agent-recruitment side of the product.
- Clean, typed, componentized React code suitable for a hiring manager to review.

---

## 3. Key Features

| # | Feature | Description | Priority |
|---|---------|-------------|----------|
| 1 | Payment agent dashboard | The agent's core view: a paginated list of all deposit and payout requests. Agent can accept/reject/update status directly from the list or a detail view. | P0 |
| 2 | Order detail drawer | Slide-in panel showing full request details (customer info, trading account, amount, comments/proof of payment) with inline status update and amount edit (deposit only). | P0 |
| 3 | Search, filter, export | Search by order ID/name/email; filter by date range and status; bulk-select rows; export to CSV. | P0 |
| 4 | Low balance alerts | Configurable automated alert to the agent when their operating balance drops below a threshold. | P1 |
| 5 | Agent recruitment landing page | Public marketing page explaining the payment agent program, with a live earnings calculator and 3-step onboarding explainer. | P1 |
| 6 | Access control | Only users provisioned as payment agents can see the dashboard; everyone else is directed to an "apply to become an agent" flow. | P0 (real product) / mocked toggle (prototype) |
| 7 | Staff/ops override view | Internal ops team can view and act on any agent's requests if the agent is unavailable. | P1 (not built in prototype) |

---

## 4. Key Flows & Requirements

### 4.1 Payment Agent Dashboard
- Agent lands on a table of all requests (deposits + payouts), paginated at 20 rows/page.
- Each row shows: type (Deposit/Payout), customer name + masked email, trading account ID, amount, request ID, date/time, status, and an action.
- Status values: `Sent` (pending) → `Success` or `Failed`. Only `Sent` rows are editable.
- Clicking the action icon opens the **order detail drawer**:
  - Read-only: customer name, customer ID, type, email, date/time, expandable "customer contact details" and "trading account details" sections.
  - Editable: amount (deposit only), status dropdown (Success/Failed), comments (shows the trader's submitted payment instructions/proof).
  - Primary CTA: "Confirm and submit."
- Bulk actions: multi-select rows via checkboxes → bulk mark Success/Failed or export selection to CSV.
- Toolbar: search (by ID/name/email), date range picker, status filter dropdown, export-to-CSV button, refresh button.
- Header bar shows available account balance and an "Add funds" CTA.

### 4.2 Trader Deposit Flow (context — not built in this prototype's scope, described for completeness)
1. Trader sees a "Pay via local agent" option among funding methods, alongside the amount the agent can currently support.
2. If multiple agents are available in the region, trader picks one (shown with agent's transaction volume/success rate); if only one agent exists, they skip straight to entering an amount.
3. Trader enters the amount, confirms, and receives a reference ID plus step-by-step instructions to contact the agent and transfer funds directly.
4. On the agent confirming success/failure in their dashboard, the trader is notified (email/push) and the request appears in their payment history.

### 4.3 Trader Withdrawal Flow (context only)
1. Trader selects an agent and enters the withdrawal amount.
2. Funds are held/blocked on the trader's account immediately upon request — not released to the agent until the agent confirms success.
3. Agent confirming success finalizes the transaction and releases the hold.

### 4.4 Agent Recruitment Landing Page
- Hero: value proposition ("Move money for clients, earn on every transfer") + primary CTA ("Become a Payment Agent").
- Social proof strip: volume processed, active agents, dashboard uptime/availability, currencies supported.
- "What is a payment agent" explainer (4 value pillars: process payments, earn commissions, live dashboard, backed by the platform).
- Live earnings calculator: sliders for monthly volume processed and commission rate (1–3%), computing estimated monthly earnings in real time.
- "3 steps to get started": submit application → KYC/compliance review → dashboard access.
- FAQ accordion.
- Footer CTA banner: refer traders, become an agent.

### 4.5 Compliance (context only)
- Only fully verified trader accounts may use the payment agent flow.

---

## 5. Future Scope (out of scope for both the real product's v2 and this prototype)
- Support for agents choosing live currency conversion vs. a static rate, including agent-defined markup.
- "Release funds" self-service button for traders in their payment history screen.
- Agent self-service profile editing (currently requires contacting support).
- Ability for an agent to deposit/withdraw against previously-used trading accounts directly from their dashboard.
- Home-screen nudges promoting the locally popular payment method/agent option, with recognizable local payment logos.

---

## 6. Prototype Build Scope (what will actually be scaffolded)

To keep this a realistic, reviewable portfolio piece rather than an over-scoped simulation, the initial build covers:

**In scope:**
- Orders dashboard: table, pagination, search, filters (status/date range), bulk select, CSV export (client-side, from mock data), detail drawer with status update and amount edit.
- Agent recruitment landing page with working earnings calculator (client-side math, no backend).
- Fully responsive layout, light/dark aware styling.
- Realistic mock dataset (~50–100 synthetic orders) generated locally — no real names, emails, or figures.
- Generic, original branding (not Axi's or any real company's colors/logo).

**Out of scope:**
- Authentication, real backend, database, or API.
- Real payment or ledger integrations.
- Trader-side deposit/withdrawal flows (described above for context, not built).
- Staff/ops override view.
- Notifications (email/push).

**Tech stack:** React + TypeScript + Vite, Tailwind CSS, deployed to Vercel from a public GitHub repo (MIT licensed).
