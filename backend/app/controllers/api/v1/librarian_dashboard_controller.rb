module Api
  module V1
    class LibrarianDashboardController < ApplicationController
      def stats
        authorize :librarian_dashboard, :stats?

        render json: {
          total_members: User.member.count,
          total_books: Book.count,
          total_books_borrowed: BookReservation.where(returned_at: nil).count,
          total_books_overdue: BookReservation.where(returned_at: nil).where("due_date < ?", Time.current).count
        }
      end
    end
  end
end
