class BookReservationPolicy < ApplicationPolicy
  class Scope
    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      @user.librarian? ? @scope.all : @scope.where(user: @user)
    end
  end

  def index? = true
  def show? = user.librarian? || record.user_id == user.id
  def create? = user.librarian? || record.user_id == user.id
  def update? = user.librarian?
  def destroy? = user.librarian?
end
