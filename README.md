# User Management Web Application

## Project Overview

A comprehensive web application for user management built with modern web technologies.

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Shadcn/UI
- Zustand (State Management)
- Axios
- React Query
- React Hook Form
- Zod (Validation)

## Features

- User Registration
- User Authentication
- Password Recovery
- User Listing
- Responsive Design
- Accessible Components

## Prerequisites

- Node.js (v18+)
- npm or yarn

## Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/user-management-app.git
cd user-management-app
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env.local` file with the following:

```
NODE_ENV=development
JWT_SECRET=your_jwt_secret
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

## Project Structure

```
src/
├── app/           # Next.js app router
├── components/    # Reusable UI components
├── lib/           # Utility functions and libraries
├── providers/     # Context and state providers
├── services/      # API service layers
├── stores/        # Global state stores
└── types/         # TypeScript type definitions
```

## Authentication Flow

- User registration with form validation
- Login with JWT authentication
- Password recovery mechanism
- Protected routes

## State Management

Uses Zustand for global state management with a focus on authentication state.

## License

Distributed under the MIT License.
