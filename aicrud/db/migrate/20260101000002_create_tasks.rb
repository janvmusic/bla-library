class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks do |t|
      t.string     :title,       null: false, limit: 255
      t.text       :description
      t.integer    :status,      null: false, default: 0
      t.datetime   :due_date
      t.references :user,        null: false, foreign_key: true

      t.timestamps
    end
  end
end
