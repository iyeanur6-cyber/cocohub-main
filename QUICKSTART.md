# Cocohub — Local Development Quickstart

Get the full stack running locally in ~5 minutes.

---

## 1. Prerequisites

- Node.js ≥ 18
- Docker Desktop (for PostgreSQL + Redis)
- [Expo Go](https://expo.dev/go) on your phone **or** a browser

---

## 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

---

## 3. Start the frontend (web)

```bash
npx expo start --web
```

Open **http://localhost:8081** in your browser.

> The app runs in web mode with graceful stubs for native features (camera, maps, biometrics).  
> API calls will fail until the backend is running (Step 4).

---

## 4. Start the backend (full stack)

```bash
# Start PostgreSQL + Redis + backend API
docker-compose up
```

This starts:
| Service  | URL                          |
|----------|------------------------------|
| Backend  | http://localhost:3000        |
| Postgres | localhost:5432               |
| Redis    | localhost:6379               |

Wait ~30 seconds for the database healthcheck to pass, then:

```bash
# Run database migrations
npm run migrate

# Seed with development data (5 owners, 10 pets, records, appointments, medications)
npm run seed:dev
```

### Test credentials (after seeding)

```
Email:    owner1@example.com
Password: Password123!
```

---

## 5. Run on phone (Expo Go)

```bash
npx expo start
```

Scan the QR code with Expo Go. Ensure your phone and computer are on the same Wi-Fi network.

---

## 6. Run tests

```bash
npm test              # unit tests
npm run typecheck     # TypeScript check
npm run lint          # ESLint
```

---

## Environment variables

The `.env.development` file is pre-configured for local dev. Key values:

| Variable            | Value                  | Notes                          |
|---------------------|------------------------|--------------------------------|
| `API_BASE_URL`      | http://localhost:3000/api | Points to local backend      |
| `JWT_SECRET`        | dev_jwt_secret_change_me | Matches docker backend        |
| `TOTP_ENCRYPTION_KEY` | 000...000 (64 zeros) | Dev-only placeholder          |

---

## Troubleshooting

**White screen / bundle error**  
Run `npx expo start --clear --web` to clear the Metro cache.

**API errors in console**  
Expected if the backend isn't running. Start it with `docker-compose up`.

**`Cannot connect to database`**  
Run `docker-compose up` and wait for the postgres healthcheck to pass before running migrations.

**`Migration failed: duplicate key`**  
Run `npm run migrate` — migrations are idempotent and safe to re-run.

**Port 3000 already in use**  
Stop any other local server or change `PORT` in `.env.docker`.
