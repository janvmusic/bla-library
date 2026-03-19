class User < ApplicationRecord
  has_many :tasks, dependent: :destroy

  validates :first_name, presence: true
  validates :last_name,  presence: true
end
