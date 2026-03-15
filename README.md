# Ritesh Portfolio Monorepo

Full-stack developer portfolio built with React, Spring Boot, and MySQL. The public site renders profile, skills, and projects from the backend API. The admin dashboard supports JWT-based login, project CRUD, and paginated contact-message review.

## Stack

- Frontend: React, Vite, React Router, Axios, CSS
- Backend: Java 17, Spring Boot, Spring Web, Spring Data JPA, Spring Security, Lombok
- Database: MySQL
- Deployment targets: Netlify (frontend), Railway (backend and MySQL)

## Project Structure

```text
frontend/  React application
backend/   Spring Boot REST API
docs/      Screenshot placeholders
```

## Environment Variables

### Backend

See [backend/.env.example](/C:/Users/ritesh/OneDrive/Documents/Playground/backend/.env.example).

- `JWT_SECRET`
- `DATABASE_URL`
- `DATABASE_USERNAME`
- `DATABASE_PASSWORD`
- `FRONTEND_URL`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

### Frontend

See [frontend/.env.example](/C:/Users/ritesh/OneDrive/Documents/Playground/frontend/.env.example).

- `VITE_API_BASE_URL`

## Local Development

### Backend

1. Configure MySQL and backend env vars.
2. Run:

```bash
cd backend
mvn spring-boot:run
```

The API starts on `http://localhost:8080`.

### Frontend

1. Configure `VITE_API_BASE_URL`.
2. Run:

```bash
cd frontend
npm install
npm run dev
```

The app starts on `http://localhost:5173`.

## Seed Data

On first backend startup, the app seeds:

- Ritesh Kumar profile data
- skills grouped by Languages, Frontend, Backend, Database, and Tools
- three placeholder portfolio projects
- one admin user

Default admin fallback credentials:

- username: `admin`
- password: `Admin@123`

Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` in production so the fallback is never used.

## API Summary

### Public

- `GET /api/profile`
- `GET /api/skills`
- `GET /api/projects`
- `POST /api/contact`

### Admin

- `POST /api/admin/auth/login`
- `GET /api/admin/projects`
- `POST /api/admin/projects`
- `PUT /api/admin/projects/{id}`
- `DELETE /api/admin/projects/{id}`
- `GET /api/admin/messages?page=0&size=10`

## Deployment

### Frontend on Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Add `VITE_API_BASE_URL` pointing to the deployed backend

### Backend on Railway

- Deploy the `backend/` service
- Set `JWT_SECRET`, `DATABASE_URL`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, and `FRONTEND_URL`
- Use Railway MySQL or another hosted MySQL provider

## Screenshots

Add screenshots to [docs/screenshots](/C:/Users/ritesh/OneDrive/Documents/Playground/docs/screenshots) after deployment:

- home page
- projects page
- contact page
- admin projects page
- admin messages page
