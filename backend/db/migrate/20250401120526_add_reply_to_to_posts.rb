class AddReplyToToPosts < ActiveRecord::Migration[7.1]
  def change
    add_reference :posts, :reply_to, foreign_key: { to_table: :posts }, type: :uuid
  end
end
