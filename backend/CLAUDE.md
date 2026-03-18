# Project Guidelines

## Project Overview

This is a Ruby on Rails application that helps users to manage a library.

### Tech Stack

- Ruby 3.x
- Ruby on Rails 8.x
- Postgres database
- RSpec for testing

## Models Representation

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

## Authentication

- Use Devise for authentication
- Two roles: :librarian and :member (stored on User model)
- Use Pundit for authorization policies
- JWT tokens are handled entirely by devise-jwt, not a custom JsonWebToken class
- Authorization header format: Bearer <token>
- Devise controllers are under Api::V1::Auth namespace

## API Responses

- Use jsonapi-serializer for all JSON responses
- Never render ActiveRecord objects directly
- Always return proper HTTP status codes
- Serializer class naming: BookSerializer, UserSerializer, BorrowingSerializer
- Never use ActiveModel::Serializers
- Always serialize through a serializer class, never render model attributes directly

## Error Handling

- Use a shared ErrorHandler concern in ApplicationController
- rescue_from ActiveRecord::RecordNotFound → 404
- rescue_from Pundit::NotAuthorizedError → 403
- rescue_from ActiveRecord::RecordInvalid → 422
- Error response shape: { error: "message" } for single, { errors: [] } for multiple

## CORS

- Use rack-cors gem
- Configured in config/initializers/cors.rb
- Allow requests from the React frontend origin

## Frontend

- Rails runs in API-only mode
- Frontend is a separate React app in /frontend
- No ERB, SLIM, or view templates in the Rails app

## Seed Data

- Seed must include at least one librarian and one member with known credentials
- Document demo credentials in README

## Domain Rules

- Due date is always 2 weeks from borrowed_at
- A member cannot borrow the same book twice (while active)
- available_copies = total_copies - active borrowings count
- A borrowing is "active" when returned_at is NULL

## API Conventions

- All endpoints live under /api/v1
- Namespace controllers under Api::V1
- Exception: auth endpoints under Api::V1::Auth

## Development Workflow

### Running the application

- Use `bin/rails server` to start the development server
- Use `bin/rails console` to start the Rails console

### Database Operations

- Use `bin/rails db:migrate` to run pending migrations
- Use `bin/rails db:seed` to seed the database
- Use `bin/rails db:reset` to reset the database

### Running Tests

- Use `bin/rspec` to run all tests
- Use `bin/rspec [path]` for specific tests

## Coding Guidelines

### General

- Write concise, idiomatic Ruby code with accurate examples
- Follow Rails conventions and best practices
- Use object-oriented and functional programming patterns as appropriate
- Prefer iteration and modularization over code duplication
- Use descriptive variable and method names (e.g., user_signed_in?, calculate_total)
- Structure files according to Rails conventions (MVC, concerns, helpers, etc.)
- NEVER modify the Gemfile, Rails configuration or initializers, nor RSpec configuration or test support files. All instructions are intended to be implemented within the existing application configuration and dependencies. If something appears to be missing or misconfigured, stop.
- Use SOLID principles when building a class, method or function.

### Naming Conventions

- Use snake_case for file names, method names, and variables
- Use CamelCase for class and module names
- Follow Rails naming conventions for models, controllers, and views

### Ruby and Rails Usage

- Use Ruby 3.x features when appropriate (e.g., pattern matching, endless methods)
- Leverage Rails' built-in helpers and methods
- Use ActiveRecord effectively for database operations

### Syntax and Formatting

- Follow the Ruby Style Guide (https://rubystyle.guide/)
- Use Ruby's expressive syntax (e.g., unless, ||=, &.)
- Prefer double quotes for strings
- Always strip whitespace at the end of lines and ensure a blank line exists at the end of the file

### Controllers

- When adding new controllers or actions, don't forget to update the routes.rb
- Use `params.expect` syntax for strong parameters, never `params.require.permit`
- API mode has no CSRF protection — do not add it back
- Unless parameters are reused more than once, assign strong parameters to a local variable rather than a method
- When linking or redirecting to an action in the same controller, use `url_for(action: "the_action")` instead of path helpers

### Database Migrations

- Always create a migration using `bin/rails g migration <NAME>`. If a migration has been created in the current development feature branch, rollback the migration, edit it and then roll forward rather than creating a new migration.
- Use `text` for all string fields; never use `string` or `varchar`
- Use `datetime` instead of `timestamp`
- Assume that Boolean values should be nullable unless specified

### Testing

- Write tests using RSpec. It's ok to put multiple assertions in the same example
- Use factories (FactoryBot) for test data generation
- Prefer real objects over mocks unless there is an external dependency like a third party API call. Use `instance_double` if necessary; never `double`
- Don't test declarative configuration. For validations, only test that it's not valid when the validation is violated. `shoulda-matchers` is not used.
- Test controllers behaviorally: assert on status code and/or data changes
- Use Timecop for time traveling

## Performance Optimization

- Use database indexing effectively
- Implement caching strategies (HTTP caching, cache-control headers)
- Use eager loading to avoid N+1 queries
- Optimize database queries using includes, joins, or select
