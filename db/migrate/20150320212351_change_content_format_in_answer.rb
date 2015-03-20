class ChangeContentFormatInAnswer < ActiveRecord::Migration
  def change
    remove_column :answers, :content, :string
    add_column :answers, :content, :text, array: true, default: []
  end
end
