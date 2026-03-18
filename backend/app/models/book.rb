class Book < ApplicationRecord
  has_many :book_reservations

  validates :title, :author, :isbn, :total_copies, presence: true
  validates :isbn, uniqueness: true
  validates :total_copies, numericality: { greater_than_or_equal_to: 1 }

  def available_copies
    total_copies - book_reservations.where(returned_at: nil).count
  end
end
