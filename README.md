# PayBridge — Payment Agent Dashboard (Portfolio Prototype)

A frontend prototype of a **payment agent operations dashboard** for fintech platforms — the tool a local payment intermediary would use to review, approve, and track deposit/withdrawal requests, plus the public landing page used to recruit new agents.

Built as a portfolio piece to demonstrate product thinking, UI craft, and frontend engineering. **All data is synthetic** (generated in-browser) and **PayBridge is a fictional brand** — this isn't affiliated with, and doesn't reproduce data from, any real company.

**Live demo:** _add your Vercel URL here after deploying_

## What's in it

- **Orders dashboard** — a paginated table of deposit/payout requests with search, status + date-range filtering, bulk selection, CSV export, and a detail drawer for approving/rejecting a request and editing its amount.
- **Agent recruitment landing page** — value proposition, stats strip, a live earnings calculator (volume × commission rate), a 3-step onboarding explainer, and an FAQ accordion.
- Light/dark mode aware, built on a validated, colorblind-safe status palette (see `PRD.md` for the product spec this was built from).

## Tech stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for tooling/build
- [React Router](https://reactrouter.com/) for navigation
- [Tailwind CSS](https://tailwindcss.com/) for styling

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

```bash
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Project structure

```
src/
  components/
    dashboard/    # Toolbar, OrdersTable, Pagination, OrderDetailDrawer
    landing/      # Hero, StatsStrip, FeatureGrid, EarningsCalculator, Steps, FAQ
    NavBar.tsx
    StatusBadge.tsx
  data/
    mockOrders.ts # deterministic synthetic order generator
  pages/
    LandingPage.tsx
    DashboardPage.tsx
  utils/
    csv.ts        # client-side CSV export
    format.ts      # currency/date formatting
```

## Scope & disclaimer

This is a **frontend-only prototype**: there is no backend, no authentication, no real payment processing, and no persistence — all order data is generated client-side on load. It's meant to demonstrate UI/UX and frontend engineering, not to be a production payments system. See `PRD.md` for the full product spec (including what's explicitly out of scope) this prototype was scaffolded from.

## License

MIT — see [LICENSE](LICENSE).
