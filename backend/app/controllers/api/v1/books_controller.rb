module Api
  module V1
    class BooksController < ApplicationController
      before_action :set_book, only: [:show, :update, :destroy]

      def index
        authorize Book

        render json: BookSerializer.new(Book.all).serializable_hash
      end

      def show
        authorize @book

        render json: BookSerializer.new(@book).serializable_hash
      end

      def create
        book = Book.new(book_params)
        authorize book
        book.save!

        render json: BookSerializer.new(book).serializable_hash, status: :created
      end

      def update
        authorize @book
        @book.update!(book_params)

        render json: BookSerializer.new(@book).serializable_hash
      end

      def destroy
        authorize @book
        @book.destroy!

        head :no_content
      end

      private

      def set_book
        @book = Book.find(params[:id])
      end

      def book_params
        params.expect(book: [:title, :author, :genre, :isbn, :total_copies])
      end
    end
  end
end
