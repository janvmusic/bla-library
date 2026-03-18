require "rails_helper"

RSpec.describe BookReservation, type: :model do
  describe "validations" do
    it "is valid with all required attributes" do
      expect(build(:book_reservation)).to be_valid
    end

    it "is not valid without a user" do
      expect(build(:book_reservation, user: nil)).not_to be_valid
    end

    it "is not valid without a book" do
      expect(build(:book_reservation, book: nil)).not_to be_valid
    end
  end

  describe "active reservations" do
    it "is active when returned_at is nil" do
      reservation = build(:book_reservation, returned_at: nil)
      expect(reservation.returned_at).to be_nil
    end

    it "is not active when returned_at is set" do
      reservation = build(:book_reservation, :returned)
      expect(reservation.returned_at).not_to be_nil
    end
  end
end
