class DiscussionThreadAdminRecommended < ApplicationRecord
  has_many :posts, dependent: :destroy, foreign_key: "discussion_thread_id"

  self.table_name = "recommended_threads"

  def self.fetch_recommended
    DiscussionThreadAdminRecommendedQuery.new.all
  end

  def self.bulk_add(thread_ids)
    ActiveRecord::Base.transaction do
      thread_ids.each do |thread_id|
        unless exists?(discussion_thread_id: thread_id)
          create!(discussion_thread_id: thread_id)
        end
      end
    end
  rescue ActiveRecord::RecordInvalid => e
    Rails.logger.error "❌ bulk_add エラー: #{e.message}"
    raise ActiveRecord::Rollback
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