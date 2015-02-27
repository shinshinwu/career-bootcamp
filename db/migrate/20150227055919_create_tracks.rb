class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :track_name
      t.references :user
      t.references :topic

      t.timestamps null: false
    end
  end
end
