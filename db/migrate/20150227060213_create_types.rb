class CreateTypes < ActiveRecord::Migration
  def change
    create_table :types do |t|
      t.belongs_to :question
      t.string :interview_type

      t.timestamps null: false
    end
  end
end
