class Add < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :first_name, :string, null: false
    add_column :users, :last_name, :string, null: false
    add_column :users, :dob, :date, null: false
    add_index :users, :email
    remove_column :users, :username
  end
end
