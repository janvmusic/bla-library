require "rails_helper"

RSpec.describe Task, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:user) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_length_of(:title).is_at_most(255) }

    it "is valid with a future due_date" do
      task = build(:task, due_date: 1.day.from_now)
      expect(task).to be_valid
    end

    it "is valid when due_date is nil" do
      task = build(:task, due_date: nil)
      expect(task).to be_valid
    end

    it "is invalid with a past due_date" do
      task = build(:task, due_date: 1.second.ago)
      expect(task).not_to be_valid
      expect(task.errors[:due_date]).to include("must not be in the past")
    end
  end

  describe "enums" do
    it do
      is_expected.to define_enum_for(:status)
        .with_values(todo: 0, in_progress: 1, in_review: 2, done: 3)
    end
  end
end
