class BookReservation < ApplicationRecord
  belongs_to :user
  belongs_to :book

  validates :user_id, uniqueness: {
    scope: :book_id,
    conditions: -> { where(returned_at: nil) },
    message: "already has an active reservation for this book"
  }

  before_create do
    self.borrowed_at = Time.current
    self.due_date = 2.weeks.from_now
  end
end
