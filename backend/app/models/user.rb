class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum :role, { librarian: 0, member: 1 }, default: :member

  validates :first_name, presence: true
  validates :last_name, presence: true
end
