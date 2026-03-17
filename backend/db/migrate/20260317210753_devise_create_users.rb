# frozen_string_literal: true

class DeviseCreateUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :users do |t|
      ## Custom fields
      t.text :first_name, null: false
      t.text :last_name,  null: false
      t.integer :role, null: false, default: 1

      ## Database authenticatable
      t.text :email,              null: false, default: ""
      t.text :encrypted_password, null: false, default: ""

      ## Recoverable
      t.text     :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      t.timestamps null: false
    end

    add_index :users, :email,                unique: true
    add_index :users, :reset_password_token, unique: true
  end
end
