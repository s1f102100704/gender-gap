class CreateVotes < ActiveRecord::Migration[7.1]
  def change
    create_table :votes, id: :uuid do |t|
      t.uuid :post_id, null: false
      t.inet :ip_address, null: false
      t.integer :vote_type, null: false
      t.timestamps
    end

    add_foreign_key :votes, :posts
    add_index :votes, [:post_id, :ip_address], unique: true  # 同じIPからの重複投票を防ぐ
  end
end
