class CreateResources < ActiveRecord::Migration
  def change
    create_table :resources do |t|
      t.references :user
      t.references :topic
      t.integer :votes, default: 0
      t.string :title
      t.string :link
      t.string :content

      t.timestamps null: false
    end
  end
end
