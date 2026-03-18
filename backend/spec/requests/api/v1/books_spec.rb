require "rails_helper"

RSpec.describe "Api::V1::Books", type: :request do
  include Devise::Test::IntegrationHelpers

  let(:librarian) { create(:user, :librarian) }
  let(:book) { create(:book) }

  before { sign_in librarian }

  describe "GET /api/v1/books" do
    it "returns all books" do
      create_list(:book, 3)
      get "/api/v1/books"
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["data"].length).to eq(3)
    end
  end

  describe "GET /api/v1/books/:id" do
    it "returns the book" do
      get "/api/v1/books/#{book.id}"
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["data"]["id"]).to eq(book.id.to_s)
    end
  end

  describe "POST /api/v1/books" do
    it "creates a book" do
      post "/api/v1/books", params: {
        book: { title: "New Book", author: "Author", isbn: "978-1234567890", total_copies: 5 }
      }
      expect(response).to have_http_status(:created)
      expect(Book.count).to eq(1)
    end
  end

  describe "PATCH /api/v1/books/:id" do
    it "updates the book" do
      patch "/api/v1/books/#{book.id}", params: { book: { title: "Updated Title" } }
      expect(response).to have_http_status(:ok)
      expect(book.reload.title).to eq("Updated Title")
    end
  end

  describe "DELETE /api/v1/books/:id" do
    it "deletes the book" do
      book
      delete "/api/v1/books/#{book.id}"
      expect(response).to have_http_status(:no_content)
      expect(Book.count).to eq(0)
    end
  end
end
