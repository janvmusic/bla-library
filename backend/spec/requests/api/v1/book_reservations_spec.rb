require "rails_helper"

RSpec.describe "Api::V1::BookReservations", type: :request do
  include Devise::Test::IntegrationHelpers

  let(:librarian) { create(:user, :librarian) }
  let(:member) { create(:user) }
  let(:book) { create(:book) }
  let(:reservation) { create(:book_reservation, user: member, book: book) }

  describe "as a librarian" do
    before { sign_in librarian }

    describe "GET /api/v1/book_reservations" do
      it "returns all reservations" do
        create(:book_reservation, user: member, book: book)
        create(:book_reservation, user: create(:user), book: create(:book))
        get "/api/v1/book_reservations"
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)["data"].length).to eq(2)
      end
    end

    describe "GET /api/v1/book_reservations/:id" do
      it "returns the reservation" do
        get "/api/v1/book_reservations/#{reservation.id}"
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)["data"]["id"]).to eq(reservation.id.to_s)
      end
    end

    describe "POST /api/v1/book_reservations" do
      it "creates a reservation" do
        post "/api/v1/book_reservations", params: {
          book_reservation: { user_id: member.id, book_id: book.id }
        }
        expect(response).to have_http_status(:created)
        expect(BookReservation.count).to eq(1)
      end
    end

    describe "PATCH /api/v1/book_reservations/:id" do
      it "updates the due_date" do
        new_due_date = 3.weeks.from_now
        patch "/api/v1/book_reservations/#{reservation.id}", params: {
          book_reservation: { due_date: new_due_date }
        }
        expect(response).to have_http_status(:ok)
        expect(reservation.reload.due_date).to be_within(1.second).of(new_due_date)
      end
    end

    describe "DELETE /api/v1/book_reservations/:id" do
      it "soft deletes the reservation by setting returned_at" do
        delete "/api/v1/book_reservations/#{reservation.id}"
        expect(response).to have_http_status(:no_content)
        expect(reservation.reload.returned_at).not_to be_nil
      end
    end
  end

  describe "as a member" do
    before { sign_in member }

    describe "GET /api/v1/book_reservations" do
      it "returns only their own reservations" do
        create(:book_reservation, user: member, book: book)
        create(:book_reservation, user: create(:user), book: create(:book))
        get "/api/v1/book_reservations"
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)["data"].length).to eq(1)
      end
    end

    describe "GET /api/v1/book_reservations/:id" do
      it "returns their own reservation" do
        get "/api/v1/book_reservations/#{reservation.id}"
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)["data"]["id"]).to eq(reservation.id.to_s)
      end
    end

    describe "POST /api/v1/book_reservations" do
      it "creates a reservation for themselves" do
        post "/api/v1/book_reservations", params: {
          book_reservation: { user_id: member.id, book_id: book.id }
        }
        expect(response).to have_http_status(:created)
        expect(BookReservation.count).to eq(1)
      end
    end
  end
end
