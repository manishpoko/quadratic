# Quadratic — Issue Tracking Made Simple

**Quadratic** is a full-stack issue tracking application inspired by Linear. It allows users to manage their issues through a clean, responsive dashboard with authentication, status and priority management, filtering, and sorting.

**Live Demo:** https://quadratic-khaki.vercel.app/

**Source Code:** https://github.com/manishpoko/quadratic

## Features

- **Authentication:** User registration, sign-in, and sign-out.
- **Session Management:** Secure server-managed sessions using HTTP-only cookies.
- **Issue Management:** Create, view, edit, and delete issues.
- **Status Management:** Track issues through Pending, In Process, Delayed, and Completed.
- **Priority Management:** Categorize issues by Light, Moderate, Urgent, and High Priority.
- **Filtering:** Filter issues by status and priority, including combined filters.
- **Sorting:** Sort by creation date and issue priority.
- **Authorization:** Users can only access and manage their own issues.
- **Responsive UI:** Dashboard designed for desktop and mobile screens.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Full-stack framework |
| React 19 | UI development |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| PostgreSQL | Relational database |
| Node.js | Server-side runtime |
| Argon2 | Password hashing |
| pg | PostgreSQL client |
| Vercel | Application deployment |
| Neon | Managed production PostgreSQL |

## Architecture

Quadratic uses Next.js App Router for both the frontend and backend.

- **Frontend:** React components and Next.js pages.
- **Backend:** Next.js Route Handlers expose REST API endpoints.
- **Database:** PostgreSQL stores users, sessions, and issues.
- **Authentication:** Passwords are hashed with Argon2. Random session tokens are stored as SHA-256 hashes in the database, with the raw tokens held in HTTP-only cookies.
- **Authorization:** API endpoints verify the authenticated user and enforce issue ownership.

## Application Routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/features` | Features page |
| `/pricing` | Pricing page |
| `/faq` | Frequently asked questions |
| `/signup` | User registration |
| `/signin` | User sign-in |
| `/dashboard` | Protected issue dashboard |
| `/api/auth/signup` | Registration endpoint |
| `/api/auth/signin` | Sign-in endpoint |
| `/api/auth/signout` | Sign-out endpoint |
| `/api/issues` | List and create issues |
| `/api/issues/[id]` | Retrieve, update, and delete an issue |

## Database Schema

The application uses PostgreSQL with three primary tables:

- **users:** Stores user accounts and password hashes.
- **sessions:** Stores hashed session tokens and expiration timestamps.
- **issues:** Stores issue details, status, priority, and ownership.

PostgreSQL enums are used for issue status and priority.

## Getting Started

### Prerequisites

- Node.js
- pnpm
- PostgreSQL

### 1. Clone the repository

```bash
git clone https://github.com/manishpoko/quadratic.git
cd quadratic
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
DATABASE_URL="your_postgresql_connection_string"
```

Use your own PostgreSQL connection string. For local development, this can point to a local PostgreSQL database.

Never commit `.env.local` or expose database credentials.

### 4. Set up the database

Create a PostgreSQL database, then run:

```bash
psql -U YOUR_DB_USER -d YOUR_DB_NAME -f db/schema.sql
```

This creates the required tables and enum types.

### 5. Start the development server

```bash
pnpm dev
```

Open http://localhost:3000.

### 6. Create a production build

```bash
pnpm build
pnpm start
```

## Deployment

The application is deployed using Vercel.

- Frontend and API: Vercel
- Production database: Neon PostgreSQL
- Environment configuration: `DATABASE_URL` configured in Vercel

## Security

- Passwords are hashed using Argon2.
- Session tokens are generated using cryptographically secure randomness.
- Only SHA-256 hashes of session tokens are stored in the database.
- Session cookies use HTTP-only protection.
- Expired sessions are rejected during authentication.
- API routes enforce authentication and user-specific issue ownership.

## Future Improvements

- Team collaboration and shared workspaces.
- Issue comments and activity history.
- Labels and project organization.
- Real-time updates.
- Notifications.

## Author

**Manish Pokhrel**

GitHub: https://github.com/manishpoko
