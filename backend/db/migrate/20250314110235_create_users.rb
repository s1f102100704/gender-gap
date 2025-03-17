class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users, id: :uuid do |t|
      t.inet :ip_address, null: false
      t.timestamps
    end
    add_index :users, :ip_address, unique: true
  end
end
