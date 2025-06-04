# FreelancerDash

A comprehensive earnings and client management platform designed to streamline freelance business operations.

## Features

- **Client Management** - Track client information and relationships
- **Project Tracking** - Manage projects with status updates (Active/Completed/Paused)
- **Invoice System** - Create, edit, and track invoices with automated numbering
- **Dashboard Analytics** - Real-time earnings statistics and monthly reports
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: TanStack Query
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd freelancer-dash
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
DATABASE_URL=your_postgresql_connection_string
```

4. Push database schema
```bash
npm run db:push
```

5. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

```
├── client/               # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Application pages
│   │   └── lib/         # Utilities and API client
├── server/              # Express backend
│   ├── routes.ts        # API routes
│   ├── storage.ts       # Database operations
│   └── db.ts           # Database configuration
├── shared/              # Shared types and schemas
│   └── schema.ts        # Drizzle database schema
```

## Database Schema

- **Clients**: Store client information (name, email, company)
- **Projects**: Track projects linked to clients with status management
- **Invoices**: Manage billing with client and project associations

## License

MIT License