class BookSerializer
  include JSONAPI::Serializer

  attributes :title, :author, :genre, :isbn, :total_copies, :available_copies
end
