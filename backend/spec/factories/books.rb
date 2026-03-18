FactoryBot.define do
  factory :book do
    title { "The Great Gatsby" }
    author { "F. Scott Fitzgerald" }
    genre { "Fiction" }
    sequence(:isbn) { |n| "978-000000#{n.to_s.rjust(4, "0")}" }
    total_copies { 3 }
  end
end
