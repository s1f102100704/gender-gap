class AddUserToPosts < ActiveRecord::Migration[7.1]
  def change
    add_reference :posts, :user, type: :uuid, foreign_key: true, null: true  # 最初はNULL許容

    # 既存の投稿にデフォルトのユーザーを割り当てる
    default_user = User.find_or_create_by!(ip_address: "0.0.0.0")  
    Post.where(user_id: nil).update_all(user_id: default_user.id)

    # その後、NOT NULL 制約を追加
    change_column_null :posts, :user_id, false

    # `ip_address` カラムを削除（不要なら）
    remove_column :posts, :ip_address
  end
end
