class CreateVotesStatus < ActiveRecord::Migration[7.1]
  def change
    create_table :votes_statuses do |t|
      t.references :post, null: false,type: :uuid, foreign_key: true
      t.integer :goodvotes_count
      t.integer :badvotes_count
      t.timestamps
    end
  end
end
