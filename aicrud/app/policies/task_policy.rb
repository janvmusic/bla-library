class TaskPolicy < ApplicationPolicy
  # index? and create? guard the parent user record:
  # current_user may only list/create tasks that belong to themselves.
  def index?  = user.id == record.user_id
  def create? = user.id == record.user_id

  # update? and destroy? guard the task itself.
  def update?  = user.id == record.user_id
  def destroy? = user.id == record.user_id

  class Scope < ApplicationPolicy::Scope
    def resolve
      scope.where(user: user)
    end
  end
end
