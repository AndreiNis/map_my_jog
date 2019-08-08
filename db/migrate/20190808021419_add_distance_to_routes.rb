class AddDistanceToRoutes < ActiveRecord::Migration[5.2]
  def change
    add_column :routes, :distance, :float, null: false
  end
end
