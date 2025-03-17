# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!
class CreateDiscussionThreads < ActiveRecord::Migration[7.0]
    def change
      create_table :discussion_threads, id: :uuid do |t|
        t.string :title, null: false
        t.timestamps
      end
    end
  end
  