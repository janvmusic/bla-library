class Task < ApplicationRecord
  belongs_to :user

  enum :status, { todo: 0, in_progress: 1, in_review: 2, done: 3 }, default: :todo

  validates :title, presence: true, length: { maximum: 255 }
  validate  :due_date_not_in_past

  private

  def due_date_not_in_past
    return if due_date.blank?

    errors.add(:due_date, "must not be in the past") if due_date < Time.current
  end
end
