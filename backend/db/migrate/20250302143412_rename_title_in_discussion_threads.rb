class RenameTitleInDiscussionThreads < ActiveRecord::Migration[7.1]
  def change
    rename_column :discussion_threads, :title, :thread_title
  end
end
