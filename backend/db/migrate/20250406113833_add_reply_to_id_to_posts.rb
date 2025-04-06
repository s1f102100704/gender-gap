class AddReplyToIdToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :reply_to_id, :uuid
    add_foreign_key :posts, :posts, column: :reply_to_id
    add_index :posts, :reply_to_id
  end
end
  