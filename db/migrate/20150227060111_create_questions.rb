class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.references :topic
      t.references :user
      t.string :title
      t.string :content
      t.integer :votes, default: 0

      t.timestamps null: false
    end
  end
end
