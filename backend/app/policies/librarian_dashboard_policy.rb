class LibrarianDashboardPolicy < ApplicationPolicy
  def stats? = user.librarian?
end
