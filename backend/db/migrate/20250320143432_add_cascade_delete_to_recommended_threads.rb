class AddCascadeDeleteToRecommendedThreads < ActiveRecord::Migration[7.1]
  def change
    remove_foreign_key :recommended_threads, :discussion_threads
    add_foreign_key :recommended_threads, :discussion_threads, on_delete: :cascade
  end
end