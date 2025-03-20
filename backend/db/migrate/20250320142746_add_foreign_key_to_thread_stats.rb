class AddForeignKeyToThreadStats < ActiveRecord::Migration[7.1]
  def change
    remove_foreign_key :thread_stats, :discussion_threads if foreign_key_exists?(:thread_stats, :discussion_threads)

    add_foreign_key :thread_stats, :discussion_threads, column: :discussion_thread_id, primary_key: :id, on_delete: :cascade
  end
end