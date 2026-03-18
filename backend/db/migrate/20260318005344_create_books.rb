class CreateBooks < ActiveRecord::Migration[8.1]
  def change
    create_table :books do |t|
      t.text :title
      t.text :author
      t.text :genre
      t.text :isbn
      t.integer :total_copies

      t.timestamps
    end
  end
end
