class AddImageKeyToDiscussionThreads < ActiveRecord::Migration[7.1]
  def change
    add_column :discussion_threads, :image_key, :string
  end
end
