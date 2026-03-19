# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Users
User.find_or_create_by!(email: "librarian@example.com") do |user|
  user.first_name = "Winston"
  user.last_name = "Churchill"
  user.password = "password123"
  user.role = :librarian
end

member = User.find_or_create_by!(email: "member@example.com") do |user|
  user.first_name = "Mark"
  user.last_name = "Twain"
  user.password = "password123"
  user.role = :member
end

another_member = User.find_or_create_by!(email: "member2@example.com") do |user|
  user.first_name = "Emily"
  user.last_name = "Dickinson"
  user.password = "password123"
  user.role = :member
end

# Books
books_data = [
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", isbn: "9780743273565", total_copies: 3 },
  { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", isbn: "9780061935466", total_copies: 4 },
  { title: "1984", author: "George Orwell", genre: "Dystopian", isbn: "9780451524935", total_copies: 5 },
  { title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", isbn: "9780141439518", total_copies: 3 },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction", isbn: "9780316769174", total_copies: 2 },
  { title: "Brave New World", author: "Aldous Huxley", genre: "Dystopian", isbn: "9780060850524", total_copies: 4 },
  { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", isbn: "9780547928227", total_copies: 6 },
  { title: "Moby Dick", author: "Herman Melville", genre: "Adventure", isbn: "9781503280786", total_copies: 2 },
  { title: "War and Peace", author: "Leo Tolstoy", genre: "Historical Fiction", isbn: "9781400079988", total_copies: 3 },
  { title: "Crime and Punishment", author: "Fyodor Dostoevsky", genre: "Psychological Fiction", isbn: "9780486454115", total_copies: 4 },
  { title: "The Divine Comedy", author: "Dante Alighieri", genre: "Epic Poetry", isbn: "9780142437223", total_copies: 0 },
]

books = books_data.map do |attrs|
  Book.find_or_create_by!(isbn: attrs[:isbn]) do |book|
    book.title = attrs[:title]
    book.author = attrs[:author]
    book.genre = attrs[:genre]
    book.total_copies = attrs[:total_copies]
  end
end

# Reservations
# Active reservation for Mark Twain (borrowed 1 week ago, due in 1 week)
BookReservation.find_or_create_by!(user: member, book: books[0]) do |reservation|
  reservation.borrowed_at = 1.week.ago
  reservation.due_date = 1.week.from_now
  reservation.returned_at = nil
end

# Past due reservation for Mark Twain (borrowed 3 weeks ago, due 1 week ago)
BookReservation.find_or_create_by!(user: member, book: books[1]) do |reservation|
  reservation.borrowed_at = 3.weeks.ago
  reservation.due_date = 1.week.ago
  reservation.returned_at = nil
end

# Past due reservation for Emily Dickinson (borrowed 3 weeks ago, due 1 week ago)
BookReservation.find_or_create_by!(user: another_member, book: books[2]) do |reservation|
  reservation.borrowed_at = 3.weeks.ago
  reservation.due_date = 1.week.ago
  reservation.returned_at = nil
end

# Past due reservation for Emily Dickinson (borrowed 5 weeks ago, due 3 weeks ago)
BookReservation.find_or_create_by!(user: another_member, book: books[3]) do |reservation|
  reservation.borrowed_at = 5.weeks.ago
  reservation.due_date = 3.weeks.ago
  reservation.returned_at = nil
end
