FactoryBot.define do
  factory :book_reservation do
    association :user
    association :book
    borrowed_at { Time.current }
    due_date { 2.weeks.from_now }
    returned_at { nil }

    trait :returned do
      returned_at { Time.current }
    end
  end
end
