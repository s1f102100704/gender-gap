class DiscussionThreadAdminRecommended < ApplicationRecord
  has_many :posts, dependent: :destroy, foreign_key: "discussion_thread_id"

  def self.fetch_recommended
    DiscussionThreadAdminRecommendedQuery.new.all
  end

  def self.bulk_delete(ids)
    DiscussionThread.where(id: ids).destroy_all
  end
  # def self.delete_admin(id)
  #   thread = DiscussionThread.find_by(id: id)
  #   if thread
  #     thread.destroy
  #     { message: "スレッドが削除されました。" }
  #   else
  #     { error: "スレッドが見つかりません。" }
  #   end
  # end
  # def self.update_title_admin(id, title)
  #   thread = DiscussionThread.find_by(id: id)
  #   if thread
  #     thread.update(thread_title: title)
  #     { message: "スレッドのタイトルが変更されました。" }
  #   else
  #     { error: "スレッドが見つかりません。" }
  #   end
  # end
end