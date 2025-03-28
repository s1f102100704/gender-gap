class AddGenderToVotes < ActiveRecord::Migration[6.1]
  def change
    add_column :votes, :gender, :integer
  end
end