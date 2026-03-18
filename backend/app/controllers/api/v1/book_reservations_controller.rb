module Api
  module V1
    class BookReservationsController < ApplicationController
      before_action :set_book_reservation, only: [:show, :update, :destroy]

      def index
        reservations = policy_scope(BookReservation).includes(:user, :book)

        render json: BookReservationSerializer.new(reservations).serializable_hash
      end

      def show
        authorize @book_reservation

        render json: BookReservationSerializer.new(@book_reservation).serializable_hash
      end

      def create
        reservation = BookReservation.new(create_params)
        authorize reservation
        reservation.save!

        render json: BookReservationSerializer.new(reservation).serializable_hash, status: :created
      end

      def update
        authorize @book_reservation
        @book_reservation.update!(update_params)

        render json: BookReservationSerializer.new(@book_reservation).serializable_hash
      end

      def destroy
        authorize @book_reservation
        @book_reservation.update!(returned_at: Time.current)

        head :no_content
      end

      private

      def set_book_reservation
        @book_reservation = BookReservation.find(params[:id])
      end

      def create_params
        params.expect(book_reservation: [:user_id, :book_id])
      end

      def update_params
        params.expect(book_reservation: :due_date)
      end
    end
  end
end
