class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :book_reservations

  enum :role, { librarian: 0, member: 1 }, default: :member

  validates :first_name, presence: true
  validates :last_name, presence: true
end
