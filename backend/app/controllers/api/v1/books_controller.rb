module Api
  module V1
    class BooksController < ApplicationController
      def index
        authorize Book
        books = Book.all
        render json: BookSerializer.new(books).serializable_hash
      end

      def show
        book = Book.find(params[:id])
        authorize book
        render json: BookSerializer.new(book).serializable_hash
      end

      def create
        book = Book.new(book_params)
        authorize book
        book.save!
        render json: BookSerializer.new(book).serializable_hash, status: :created
      end

      def update
        book = Book.find(params[:id])
        authorize book
        book.update!(book_params)
        render json: BookSerializer.new(book).serializable_hash
      end

      def destroy
        book = Book.find(params[:id])
        authorize book
        book.destroy!
        head :no_content
      end

      private

      def book_params
        params.expect(book: [:title, :author, :genre, :isbn, :total_copies])
      end
    end
  end
end
