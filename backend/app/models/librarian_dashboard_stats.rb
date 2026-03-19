LibrarianDashboardStats = Struct.new(
  :total_members,
  :total_books,
  :total_books_borrowed,
  :total_books_overdue,
  keyword_init: true
) do
  # Just add a default value since this is not an actual active record model
  def id = 1
end
