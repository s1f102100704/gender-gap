class UpdateReportsAddCommentAndRemoveUserId < ActiveRecord::Migration[7.0]
  def change
    add_column :reports, :comment, :text

    remove_foreign_key :reports, :users

    remove_reference :reports, :user, type: :uuid, index: true
  end
end