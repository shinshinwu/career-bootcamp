class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.references :question
      t.references :user
      t.integer :votes, default: 0
      t.string :content

      t.timestamps null: false
    end
  end
end
