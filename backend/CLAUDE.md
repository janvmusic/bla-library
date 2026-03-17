# Project Guidelines

## Project Overview

This is a Ruby on Rails application that helps users to manage a library. The application uses:

### Tech Stack

- Ruby 3.x
- Ruby on Rails 8.x
- Postgres database
- RSpec for testing

## Authentication

- Use Devise for authentication
- JWT tokens via devise-jwt gem
- Two roles: :librarian and :member (stored on User model)
- Use Pundit for authorization policies

## API Responses

- Use jsonapi-serializer for all JSON responses
- Never render ActiveRecord objects directly
- Always return proper HTTP status codes

## Frontend

- Rails runs in API-only mode
- Frontend is a separate React app in /frontend
- No ERB, SLIM, or view templates in the Rails app

## Seed Data

- Seed must include at least one librarian and one member with known credentials
- Document demo credentials in README

## Project structure

WIP

## Domain Rules

- Due date is always 2 weeks from borrowed_at
- A member cannot borrow the same book twice (while active)
- available_copies = total_copies - active borrowings count
- A borrowing is "active" when returned_at is NULL

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

### Common Patterns

- If a form url or controller redirect is to an action in the same controller, use a hash with the action name as the key e.g. `{ action: :new }`
- When making migrations, use `text` for all string fields; never use `string` or `varchar`

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
- Use `expect` syntax instead of `require`/`allow` for strong parameters:

  ```ruby
  # Good
  params.expect(user: [:name, :favorite_pie])

  # Bad
  params.require(:user).permit(:name, :favorite_pie)
  ```

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
- Implement caching strategies (fragment caching, Russian Doll caching)
- Use eager loading to avoid N+1 queries
- Optimize database queries using includes, joins, or select
