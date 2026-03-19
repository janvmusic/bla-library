class BookReservationSerializer
  include JSONAPI::Serializer

  attributes :borrowed_at, :due_date, :returned_at

  attribute :book_title do |reservation|
    reservation.book.title
  end

  attribute :user_first_name do |reservation|
    reservation.user.first_name
  end

  attribute :user_last_name do |reservation|
    reservation.user.last_name
  end
end
