# User Registration System

This repository contains a full-stack user registration demo featuring a NestJS backend API and a React frontend built with Chakra UI, React Hook Form, and React Query.

## Project Structure

- `backend/` – NestJS API responsible for user registration and data persistence (MongoDB).
- `frontend/` – React single-page application providing registration and login screens.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm / npm / yarn
- MongoDB instance (local or hosted)

### Backend Setup

```bash
cd backend
cp .env.example .env
# update the environment file with your MongoDB connection string
npm install
npm run start:dev
```

The server listens on the port defined in `.env` (defaults to `3000`) and exposes REST endpoints under the prefix configured via `GLOBAL_PREFIX` (defaults to `/api`).

### Database helpers

Optional scripts exist under `backend/scripts/` to prep a MongoDB instance:

```bash
cd backend
npm run db:init   # creates the user collection + indexes
npm run db:seed   # inserts sample users (alice/bob/carol)
```

Both scripts read `MONGODB_URI` from `.env` (fallback: `mongodb://127.0.0.1:27017/awad`).

### Frontend Setup

```bash
cd frontend
cp .env.example .env
# ensure VITE_API_BASE_URL matches your backend URL (e.g. http://localhost:3000/api)
npm install
npm run dev
```

Open the application at the local address logged by Vite (defaults to `http://localhost:5173`).

## API Overview

- `POST /api/user/register` – Registers a new user by validating the payload, checking for duplicate emails, hashing the password, and returning the persisted user record without the password.

## Frontend Highlights

- Chakra UI components for an accessible, responsive layout.
- React Hook Form with Zod validation to provide clear, real-time form feedback.
- React Query mutation to handle registration requests and display loading / success / error states.
- Simulated login flow that demonstrates validation and success messaging without backend integration.

## Next Steps

- Add persistence-friendly Docker Compose for MongoDB.
- Implement real authentication (JWT-based login endpoint and guarded routes).
- Expand automated testing (unit tests for backend services and frontend component tests).
