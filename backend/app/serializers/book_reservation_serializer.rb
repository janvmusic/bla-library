class BookReservationSerializer
  include JSONAPI::Serializer

  attributes :borrowed_at, :due_date, :returned_at

  belongs_to :user
  belongs_to :book
end
