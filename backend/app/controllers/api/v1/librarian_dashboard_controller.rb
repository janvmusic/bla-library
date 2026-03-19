module Api
  module V1
    class LibrarianDashboardController < ApplicationController
      def stats
        authorize :librarian_dashboard, :stats?

        stats = LibrarianDashboardStats.new(
          total_members: User.member.count,
          total_books: Book.count,
          total_books_borrowed: BookReservation.where(returned_at: nil).count,
          total_books_overdue: BookReservation.where(returned_at: nil).where("due_date < ?", Time.current).count
        )

        render json: LibrarianDashboardStatsSerializer.new(stats).serializable_hash
      end
    end
  end
end
