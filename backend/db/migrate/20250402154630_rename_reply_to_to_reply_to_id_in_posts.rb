class RenameReplyToToReplyToIdInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :reply_to, :reply_to_id

    # 外部キー制約を追加（任意だけどおすすめ）
    add_foreign_key :posts, :posts, column: :reply_to_id
    add_index :posts, :reply_to_id
  end
end
