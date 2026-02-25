# Prebid GAM API

Automates full Prebid line item setup in Google Ad Manager (GAM) using OAuth and the GAM API.

## Features

- **Connect GAM** via Google OAuth (enter Network Code, grant access)
- **Configuration form**: Advertiser, Order, Line item base name, Creative name, Prebid keys (bidder code, KVP key, hb_adid, hb_format), CPM min/max and granularity, ad sizes, currency, priority, timezone, targeting type
- **CPM preview table**: See all line item price buckets before generating
- **Generate Setup**: Creates Advertiser → Order → Line items (per CPM bucket) → Prebid Universal Creative → attaches creative to each line item; applies KVP targeting
- **Dry run mode**: Preview what would be created without pushing to GAM (uses stub client)
- **Execution log**: View past runs; **Download CSV** summary
- **Bidder-agnostic**: No hardcoded bidders; works for any Prebid adapter (inmobi, appnexus, etc.)

## Tech stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS
- **Backend**: Next.js API routes (Node.js), Google OAuth2, GAM API (SOAP)
- **Database**: PostgreSQL (Prisma) — stores GAM connection tokens and execution logs

## Setup

### 1. Environment

```bash
cd monetization/prebid-gam-api
cp .env.example .env
```

Edit `.env`:

- **GOOGLE_CLIENT_ID** / **GOOGLE_CLIENT_SECRET**: Create OAuth 2.0 credentials in [Google Cloud Console](https://console.cloud.google.com/apis/credentials). Add authorized redirect URI: `http://localhost:3001/api/auth/gam/callback` (or your production URL).
- **NEXTAUTH_URL** / **BASE_URL**: e.g. `http://localhost:3001` for local.
- **DATABASE_URL**: PostgreSQL connection string, e.g. `postgresql://user:password@localhost:5432/prebid_gam`.

Enable the **Google Ad Manager API** (and optionally DFP scope) for your project.

### 2. Database

```bash
npm install
npx prisma generate
npx prisma db push
```

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

### 4. Link from portfolio (optional)

The main portfolio’s AdTech Control Center can add a tab **Prebid GAM API** that links to `http://localhost:3001` (or your deployed URL) so you open the tool from the same place as the Ad Tag tab.

## Usage

1. **Connect GAM**: Enter your GAM Network Code and click “Connect via Google OAuth”. Sign in and grant access.
2. **Configuration**: Fill Basic Info (Advertiser name, Order name, line item base name, creative name base), Prebid config (bidder code, KVP key name, hb keys, granularity, CPM min/max, ad sizes), and Advanced (currency, priority, timezone, targeting type).
3. **CPM preview**: Check the table to see how many line items will be created (e.g. 0.10 to 20.00 with 0.10 granularity = 200 items).
4. **Dry run** (optional): Check “Dry run” and click **Generate Setup** to simulate without creating anything in GAM.
5. **Generate Setup**: Click **Generate Setup** to create Advertiser, Order, Line items (one per CPM bucket), one Prebid Universal Creative, and attach the creative to each line item with KVP targeting.
6. **Logs**: View execution log and use **Download CSV** to export.

## GAM API (live mode)

The live GAM integration uses the **Google Ad Manager SOAP API**. The codebase includes:

- `src/lib/gam/client.ts`: Interface `IGamClient` and a **stub** implementation used for dry runs. A `GamSoapClient` skeleton is present; you need to wire it to the actual SOAP endpoints (e.g. CompanyService, OrderService, LineItemService, CreativeService) using the `soap` package and your OAuth access token. See [GAM API documentation](https://developers.google.com/ad-manager/api/start).

Until the SOAP client is fully implemented, use **Dry run** to validate config and CPM buckets; live runs will return an error indicating SOAP is not wired.

## Project structure

```
monetization/prebid-gam-api/
  src/
    app/            # App Router: layout, page, globals.css
    app/api/        # API routes: auth/gam (connect, callback), setup, logs, cpm-preview
    components/     # ConnectGam, ConfigForm, CpmPreview, LogViewer
    lib/            # db (Prisma), gam (types, client)
    services/       # setupEngine (runPrebidGamSetup)
    utils/          # cpmBuckets, universalCreative
    types/          # shared types and AD_SIZES
  prisma/
    schema.prisma   # GamConnection, ExecutionLog
```

## Performance

- Handles large CPM ranges (e.g. 500 line items). For very large runs, consider adding async job processing and a progress bar (optional v2).

## License

Same as parent project.
