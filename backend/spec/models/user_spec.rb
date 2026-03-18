require "rails_helper"

RSpec.describe User, type: :model do
  describe "validations" do
    it "is valid with all required attributes" do
      expect(build(:user)).to be_valid
    end

    it "is not valid without a first_name" do
      expect(build(:user, first_name: "")).not_to be_valid
    end

    it "is not valid without a last_name" do
      expect(build(:user, last_name: "")).not_to be_valid
    end

    it "is not valid without an email" do
      expect(build(:user, email: "")).not_to be_valid
    end

    it "is not valid with a duplicate email" do
      create(:user, email: "taken@example.com")
      expect(build(:user, email: "taken@example.com")).not_to be_valid
    end

    it "is not valid without a password" do
      expect(build(:user, password: "")).not_to be_valid
    end
  end

  describe "associations" do
    it "has many book_reservations" do
      user = create(:user)
      create_list(:book_reservation, 2, user: user)
      expect(user.book_reservations.count).to eq(2)
    end
  end

  describe "roles" do
    it "defaults to member" do
      expect(User.new.role).to eq("member")
    end

    it "can be assigned librarian role" do
      expect(build(:user, :librarian)).to be_librarian
    end
  end
end
