class AddUserToVotes < ActiveRecord::Migration[7.1]
  def change
    add_reference :votes, :user, type: :uuid, foreign_key: true, null: true  # 最初はNULL許容

    # 既存の投票にデフォルトのユーザーを割り当てる
    default_user = User.find_or_create_by!(ip_address: "0.0.0.0")
    Vote.where(user_id: nil).update_all(user_id: default_user.id)
    # その後、NOT NULL 制約を追加
    change_column_null :votes, :user_id, false

    # `ip_address` カラムを削除（不要なら）
    remove_column :votes, :ip_address

    # ユーザーごとに1回しか投票できない制約を追加
    add_index :votes, [:post_id, :user_id], unique: true
  end
end
