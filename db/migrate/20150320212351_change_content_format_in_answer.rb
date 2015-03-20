class ChangeContentFormatInAnswer < ActiveRecord::Migration
  def change
    # def up
    #   change_column :answers, :content, "varchar[] USING (string_to_array(content, ','))"
    # end

    # def down
    #   change_column :answers, :content, :string
    # end
    # remove_column :answers, :content, :string
    add_column :answers, :content, :text, array: true, default: []
    
  end
end
