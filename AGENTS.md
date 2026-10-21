# Electronix — Backend

Electronics e-commerce backend. Express + TypeScript + MongoDB (Mongoose). Serves two clients:
- `/admin` — server-side rendered admin panel (EJS views, session auth) → `src/router-admin.ts`
- `/` — JSON API for the React SPA (`../electronix-react`) → `src/router.ts`

## Commands
- `npm run start:dev` — dev server (nodemon + ts-node)
- `npm run build` — compile with `tsc` to `dist/`
- No test suite exists; verify with `npm run build` and by hitting endpoints.

## Structure
- `src/server.ts` — DB connect + listen; `src/app.ts` — middleware, sessions, views, routers
- `src/controllers/*.controller.ts` — request handling (object of handlers typed `T`)
- `src/models/*.service.ts` — business logic / DB access (classes)
- `src/schema/*.model.ts` — Mongoose schemas
- `src/libs/types`, `src/libs/enums` — shared types/enums (mirrored in the frontend `src/libs`)
- `src/libs/Errors.ts` — `Errors` class with `HttpCode` + `Message` enums
- `src/libs/utils/` — multer uploader, sharp image processing; uploads go to `./uploads`
- `src/views/` (EJS) + `src/public/` (admin CSS/JS)
- `src/train.ts`, `src/Learning.ts` — practice files, not part of the app

## Conventions
- Flow: router → controller → service → schema. Keep DB logic in services.
- Controllers: `try/catch`, on error `res.status(err.code ?? Errors.standard.code).json(err)` style using `Errors`.
- Add new error messages to the `Message` enum, not inline strings.
- When changing a type/enum here, update the matching file in `../electronix-react/src/libs`.
- Env vars: `PORT`, `MONGO_URL`, `SESSION_SECRET` in `.env` (never commit or print it).
- Commit messages: `feat: ...` / `fix: ...`.
