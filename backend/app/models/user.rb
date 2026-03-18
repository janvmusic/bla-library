class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :book_reservations

  enum :role, { librarian: 0, member: 1 }, default: :member

  validates :first_name, presence: true
  validates :last_name, presence: true
end
