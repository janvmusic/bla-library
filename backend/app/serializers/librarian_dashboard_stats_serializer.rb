class LibrarianDashboardStatsSerializer
  include JSONAPI::Serializer

  attributes :total_members, :total_books, :total_books_borrowed, :total_books_overdue
end
