require "rails_helper"

RSpec.describe "Api::V1::Auth::Sessions", type: :request do
  let(:user) { create(:user, password: "password123") }

  describe "POST /api/v1/auth/sign_in" do
    it "returns the user and a JWT token" do
      post "/api/v1/auth/sign_in", params: {
        user: { email: user.email, password: "password123" }
      }

      expect(response).to have_http_status(:ok)
      expect(response.headers["Authorization"]).to be_present
      expect(JSON.parse(response.body).dig("data", "id")).to eq(user.id.to_s)
    end
  end

  describe "DELETE /api/v1/auth/sign_out" do
    it "signs out and invalidates the token" do
      post "/api/v1/auth/sign_in", params: {
        user: { email: user.email, password: "password123" }
      }
      token = response.headers["Authorization"]

      delete "/api/v1/auth/sign_out", headers: { "Authorization" => token }

      expect(response).to have_http_status(:no_content)
    end
  end
end
