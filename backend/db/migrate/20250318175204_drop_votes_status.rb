class DropVotesStatus < ActiveRecord::Migration[7.1]
  def change
    drop_table :votes_statuses
  end
end
