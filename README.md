# Offline learning progress tracker

This repo presents a working web app to track learning progress, supporting offline tracking with IndexedDB and syncing automatically when connected.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/fira-pro/offline-learning-progress)

## Built with

### Frontend

- **React** with **MUI**
- **Zustand** for state management
- **Axios** for HTTP request
- **idb** wrapper for IndexedDB

### Backend

- Cloudflare Workers with **Hono**
- Cloudflare **D1** Database

## Running locally

1. Clone this repo

```bash
git clone https://github.com/fira-pro/offline-learning-progress
cd offline-learning-progress
```

2. Installing dependencies

```bash
npm install
```

3. Create a D1 database with name `prod-d1-offline-learning-progress`

```bash
npx wrangler d1 create prod-d1-offline-learning-progress
```

and update the `database_id` field in `wrangler.json` with the new database ID.

4. Run the database migrations locally

```bash
npm run db:migrate
```

5. Run

```bash
npm run dev
```

## Deploying to Cloudflare

#### One-click auto deploy

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/fira-pro/offline-learning-progress)

#### Manual deployment

Deploy to Cloudflare Workers

```bash
npm run deploy
```

Run the database migrations remotely

```bash
npm run db:migrate:remote
```

### Any contributions are welcome

> [!NOTE] > _Check Cloudflare's official [docs](https://developers.cloudflare.com/workers/get-started/guide) to learn more about workers and D1 database_
