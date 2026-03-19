class MemberDashboardPolicy < ApplicationPolicy
  def stats? = user.member?
end
