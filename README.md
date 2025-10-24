# Offline learning progress tracker

This repo presents a working web app to track learning progress, supporting offline tracking with IndexedDB and syncing automatically when connected.

## Built with

### Frontend

- **React** with **MUI**
- **Zustand** for state management
- **Axios** for HTTP request
- **idb** wrapper for IndexedDB

### Backend

- Cloudflare workers with **Hono**
- Cloudflare **D1** Database

## Running locally

1. Clone this repo

```bash
git clone https://github.com/fira-pro/offline-learning-progress
cd offline-learning-progress
```

2. Installing dependencies

```bash
pnpm install
```

3. Migrate DB

```bash
pnpm wrangler d1 execute prod-d1-offline-learning-progress --local --file=./schema.sql
```

4. Run

```bash
pnpm preview
```

## Deploying to Cloudflare

#### One-click auto deploy

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/fira-pro/offline-learning-progress)

#### Manual deployment

```bash
pnpm deploy
```

### Any contributions are welcome

> [!NOTE] > _Check Cloudflare's official [docs](https://developers.cloudflare.com/workers/get-started/guide) to learn more about workers and D1 database_
