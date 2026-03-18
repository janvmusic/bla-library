class CreateBookReservations < ActiveRecord::Migration[8.1]
  def change
    create_table :book_reservations do |t|
      t.references :user, null: false, foreign_key: true
      t.references :book, null: false, foreign_key: true
      t.datetime :borrowed_at
      t.datetime :due_date
      t.datetime :returned_at

      t.timestamps
    end
  end
end
