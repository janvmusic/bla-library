module Api
  module V1
    class MemberDashboardController < ApplicationController
      def stats
        authorize :member_dashboard, :stats?

        reservations = BookReservation.where(user: current_user, returned_at: nil)

        render json: {
          books_reserved: reservations.count,
          books_overdue: reservations.where("due_date < ?", Time.current).count
        }
      end
    end
  end
end
