class CreateLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes, id: :uuid do |t|
      t.uuid :post_id, null: false
      t.integer :gender, null: false
      t.timestamps
    end

    add_foreign_key :likes, :posts
  end
end
