require "rails_helper"

RSpec.describe Book, type: :model do
  describe "validations" do
    it "is valid with all required attributes" do
      expect(build(:book)).to be_valid
    end

    it "is not valid without a title" do
      expect(build(:book, title: nil)).not_to be_valid
    end

    it "is not valid without an author" do
      expect(build(:book, author: nil)).not_to be_valid
    end

    it "is not valid without an isbn" do
      expect(build(:book, isbn: nil)).not_to be_valid
    end

    it "is not valid with a duplicate isbn" do
      create(:book, isbn: "978-0000000001")
      expect(build(:book, isbn: "978-0000000001")).not_to be_valid
    end

    it "is not valid without total_copies" do
      expect(build(:book, total_copies: nil)).not_to be_valid
    end

    it "is not valid with total_copies less than 1" do
      expect(build(:book, total_copies: 0)).not_to be_valid
    end
  end

  describe "#available_copies" do
    it "returns total_copies when there are no active reservations" do
      book = create(:book, total_copies: 3)
      expect(book.available_copies).to eq(3)
    end

    it "subtracts active reservations from total_copies" do
      book = create(:book, total_copies: 3)
      create_list(:book_reservation, 2, book: book, returned_at: nil)
      expect(book.available_copies).to eq(1)
    end

    it "does not count returned reservations" do
      book = create(:book, total_copies: 3)
      create(:book_reservation, :returned, book: book)
      expect(book.available_copies).to eq(3)
    end
  end
end
