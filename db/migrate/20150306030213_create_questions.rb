class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.references :topic
      t.references :user
      t.integer :votes, default: 0
      t.string :job_title
      t.string :interview_type
      t.string :title
      t.string :content

      t.timestamps null: false
    end
  end
end
