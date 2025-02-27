class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts, id: :uuid do |t|
      t.uuid :discussion_thread_id, null: false
      t.integer :gender, null: false
      t.text :content, null: false
      t.timestamps
    end

    add_foreign_key :posts, :discussion_threads
  end
end
