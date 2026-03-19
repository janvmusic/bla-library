# Project Guidelines

## Project Overview

This is a React + TypeScript + StyledComponents application that helps users to manage a library.

## Database Models Representation

### User

| Field      | Type                     |
| ---------- | ------------------------ |
| id         | integer (PK)             |
| first_name | text                     |
| last_name  | text                     |
| email      | text                     |
| password   | text                     |
| role       | text (librarian, member) |

### Book

| Field        | Type         |
| ------------ | ------------ |
| id           | integer (PK) |
| title        | text         |
| author       | text         |
| genre        | text         |
| ISBN         | text         |
| total_copies | integer      |

### BookReservation

| Field       | Type                |
| ----------- | ------------------- |
| id          | integer (PK)        |
| user_id     | integer (FK → User) |
| book_id     | integer (FK → Book) |
| borrow_date | datetime            |
| due_date    | datetime            |
| returned_at | datetime            |

## Associations

- A **User** can have many **BookReservations**
- A **Book** can have many **BookReservations**
- A **BookReservation** belongs to one **User** and one **Book**

## Roles

- **Member** — can reserve and return books
- **Librarian** — can add, edit, and delete books

## Tech Stack

- React 18
- TypeScript 5.x
- Styled Components 6.x
- React Router DOM for routing
- Axios for API calls
- Vite as build tool

## Project Structure

- src/pages/ ← top level route components
- src/components/ ← reusable UI components
- src/services/ ← axios API calls, one file per resource
- src/types/ ← shared TypeScript interfaces
- src/styles/ ← global styles and theme
- src/context/ ← React context providers
- src/hooks/ ← custom hooks

## Authentication

- JWT token is stored in localStorage under the key 'auth_token'
- Every axios request must include: Authorization: Bearer <token>
- On 401 response, clear token and redirect to /login
- Axios instance lives in src/services/api.ts with interceptors configured

## Routing

- Use React Router DOM v6
- Public routes: /login
- Protected routes: everything else
- Redirect to /login if unauthenticated
- Librarian sees /dashboard/librarian
- Member sees /dashboard/member

## API Conventions

- All endpoints live under /api/v1
- Auth endpoints live under /api/v1/auth
- Base URL: http://localhost:3000/api/v1

## Backend

- The backend is build using Ruby on Rails 8.x
- It uses a PostgresDB version 16.x

## Domain Rules

- A book Due date is always 2 weeks from borrowed_at
- A member cannot borrow the same book twice (while active)
- available_copies = total_copies - active borrowings count
- A borrowing is "active" when returned_at is NULL

## API Responses

- Backend uses jsonapi-serializer format
- Success responses include a `data` key
- Error responses shape: { error: "message" } or { errors: [] }
- Always handle loading, success, and error states in components

## Development Workflow

- Use `npm run dev` to start the development server (port 5173)
- Backend runs on port 3000
- Axios base URL: http://localhost:3000

## Coding Guidelines

### General

- Write concise, idiomatic React code with accurate examples
- Follow React conventions and best practices
- Use object-oriented and functional programming patterns as appropriate
- Prefer iteration and modularization over code duplication
- Use descriptive variable and method names (e.g., isUserLoggedIn, calculateTotal)
- Structure files according to React conventions
- NEVER modify the Package.json or Package.json.lock. All instructions are intended to be implemented within the existing application configuration and dependencies. If something appears to be missing or misconfigured, stop.
- Use SOLID principles when building a class, method or function.

### Naming Conventions

- Use kebab-case for file names
- Use camelCase for method names, and variables
- Use CamelCase for class and module names
- Follow React naming conventions for components, hooks, and context
- Follow TypeScript conventions

### Syntax and Formatting

- Follow the React Style Guide (https://react.dev/learn/writing-markup-with-jsx)
- Follow the TypeScript Style Guide (https://ts.dev/style/)
- Follow the StyledComponents Style Guide (https://styled-components.com/docs/basics#styling-any-component)
- Prefer single quote for strings
- Always strip whitespace at the end of lines and ensure a blank line exists at the end of the file
- In Javascript code, add semi-colon at the end
- When creating pages, use the following structure
  - For the folder name use the component name in kebab-style
  - Component name use CamelCase
  - Create styles.ts, all styles go here
  - Create types.ts, all typing goes here

### Styled Components Conventions

- All styled components live in a colocated styles.ts file next to the component
- Never use inline styles
- Never use plain CSS classes
- Theme is defined in src/styles/theme.ts and provided via ThemeProvider
- Use props for conditional styling, never create duplicate components
