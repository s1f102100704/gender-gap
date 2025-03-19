class CreateRecommendedThreads < ActiveRecord::Migration[6.1]
  def change
    create_table :recommended_threads do |t|
      t.uuid :discussion_thread_id, null: false, unique: true
      t.datetime :recommended_at, null: false, default: -> { 'CURRENT_TIMESTAMP' }
      t.timestamps
    end

    add_foreign_key :recommended_threads, :discussion_threads, column: :discussion_thread_id, primary_key: :id
  end
end