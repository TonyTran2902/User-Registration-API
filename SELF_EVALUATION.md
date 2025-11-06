# Self-Evaluation: User Registration System

## Overview

Deployed a full-stack user registration system with a NestJS backend running on Render and a React (Vite) frontend hosted on Vercel. The solution uses MongoDB Atlas as the persistent data store and satisfies the rubric requirements outlined for the assignment.

## Requirement Checklist

| Criterion | Implementation & Evidence | Status |
| --- | --- | --- |
| **Backend – POST `/api/user/register` (2 pts)** | Implemented in `backend/src/user/user.controller.ts` with corresponding service (`user.service.ts`) and DTO validation. Endpoint is reachable at `<render-backend-url>/api/user/register`. | ✅ |
| **Backend – Error Handling (2 pts)** | Service throws `ConflictException` for duplicate emails, `ValidationPipe` enforces DTO constraints, and generic `InternalServerErrorException` covers DB errors. | ✅ |
| **Frontend – Routing (1 pt)** | `frontend/src/App.tsx` defines routes for Home (`/`), Login (`/login`), and Register (`/register`). | ✅ |
| **Frontend – Sign Up Page (2 pts)** | `RegisterPage.tsx` uses React Hook Form + Zod, integrates with React Query mutation hitting the backend, and surfaces loading/success/error feedback. | ✅ |
| **Frontend – Login Page (2 pts)** | `LoginPage.tsx` provides a styled Chakra UI form with validation and simulated auth feedback (per requirements). | ✅ |
| **Deployment – Public Hosting (1 pt)** | Backend deployed on Render; frontend on Vercel. Both publicly accessible and configured via environment variables. | ✅ |

Total: **10 / 10 points**

## Technical Highlights

- **Security**: Passwords are hashed with bcrypt before persistence; sensitive configuration is handled through environment variables.
- **Validation**: End-to-end validation via NestJS DTOs and React Hook Form with Zod ensures consistent error messaging.
- **UX**: Chakra UI provides accessible components, dark mode support, and responsive layouts.
- **API Integration**: React Query manages the registration mutation lifecycle, improving error handling and loading feedback.
- **Deployment**: Render build command `npm install && npm run build`, start command `npm run start`; Vercel environment variable `VITE_API_BASE_URL` targets the Render backend.

## Testing & Verification

- Manual testing through the deployed frontend and Postman against the Render API.
- Local end-to-end verification (`npm run start:dev` for backend, `npm run dev` for frontend) to ensure parity with production.

## Challenges & Resolutions

- **Hosting the backend**: Vercel’s serverless model was incompatible; resolved by moving to Render and configuring dynamic ports/CORS.
- **Dark mode contrast**: Tuning Chakra’s color tokens to avoid low-contrast foreground/background combinations.
- **Dependency install issues on remote hosts**: Ensured Node runtimes were auto-detected (Render/ Railway) and removed Dockerfile to rely on platform buildpacks.

## Next Steps (Optional Enhancements)

- Add `/auth/login` endpoint with JWT-based authentication and frontend integration.
- Implement automated tests (unit tests for Nest services, component tests via Vitest/React Testing Library).
- Introduce CI/CD and linting/formatting hooks for future contributions.

