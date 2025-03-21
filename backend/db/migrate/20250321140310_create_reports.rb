class CreateReports < ActiveRecord::Migration[7.0]
  def change
    create_table :reports, id: :uuid do |t|
      t.references :post, null: false, foreign_key: true, type: :uuid
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.string :reason_code, null: false

      t.timestamps
    end
  end
end