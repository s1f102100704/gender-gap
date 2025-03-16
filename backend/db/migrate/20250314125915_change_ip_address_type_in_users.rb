class ChangeIpAddressTypeInUsers < ActiveRecord::Migration[7.1]
  def change
    change_column :users, :ip_address, :string
  end
end
