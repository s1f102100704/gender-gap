class DiscussionThreadAdmin < ApplicationRecord
  has_many :posts, dependent: :destroy, foreign_key: "discussion_thread_id"

  # 管理画面からのスレッド取得
  def self.fetch_admin
    DiscussionThreadAdminQuery.new.all
  end
  def self.delete_admin(id)
    thread = DiscussionThread.find_by(id: id)
    if thread
      thread.destroy
      { message: "スレッドが削除されました。" }
    else
      { error: "スレッドが見つかりません。" }
    end
  end
  def self.update_title_admin(id)
    thread = DiscussionThread.find_by(id: id)
    if thread
      thread.update(thread_title: "タイトルが変更されました。")
      { message: "スレッドのタイトルが変更されました。" }
    else
      { error: "スレッドが見つかりません。" }
    end
  end
end