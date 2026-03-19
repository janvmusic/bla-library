FactoryBot.define do
  factory :task do
    sequence(:title) { |n| "Task #{n}" }
    description { nil }
    status      { :todo }
    due_date    { 1.day.from_now }
    association :user
  end
end
