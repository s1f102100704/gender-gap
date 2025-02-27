class CreateThreadStats < ActiveRecord::Migration[7.0]
  def change
    create_table :thread_stats, id: false do |t|
      t.uuid :discussion_thread_id, null: false, primary_key: true
      t.integer :total_likes_m, default: 0, null: false
      t.integer :total_likes_f, default: 0, null: false
      t.timestamps
    end

    add_foreign_key :thread_stats, :discussion_threads, column: :discussion_thread_id
  end
end
