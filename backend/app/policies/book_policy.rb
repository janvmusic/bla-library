class BookPolicy < ApplicationPolicy
  def index? = user.librarian?
  def show? = user.librarian?
  def create? = user.librarian?
  def update? = user.librarian?
  def destroy? = user.librarian?
end
