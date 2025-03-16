class AddIpAddressToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :ip_address, :inet, default: "0.0.0.0", null: false
  end
end
