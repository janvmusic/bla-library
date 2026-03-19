require "rails_helper"

RSpec.describe "Api::V1::LibrarianDashboard", type: :request do
  include Devise::Test::IntegrationHelpers

  let(:librarian) { create(:user, :librarian) }
  let(:member) { create(:user) }

  describe "GET /api/v1/librarian_dashboard/stats" do
    context "as a librarian" do
      before { sign_in librarian }

      it "returns dashboard stats" do
        create_list(:user, 2)
        create_list(:book, 3)
        create(:book_reservation, user: member, book: create(:book))
        Timecop.freeze(3.weeks.ago) do
          create(:book_reservation, user: create(:user), book: create(:book))
        end

        get "/api/v1/librarian_dashboard/stats"

        expect(response).to have_http_status(:ok)
        body = JSON.parse(response.body)
        expect(body["total_members"]).to eq(4)
        expect(body["total_books"]).to eq(5)
        expect(body["total_books_borrowed"]).to eq(2)
        expect(body["total_books_overdue"]).to eq(1)
      end
    end

    context "as a member" do
      before { sign_in member }

      it "returns 403" do
        get "/api/v1/librarian_dashboard/stats"
        expect(response).to have_http_status(:forbidden)
      end
    end
  end
end
