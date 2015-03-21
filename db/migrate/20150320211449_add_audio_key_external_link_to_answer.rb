class AddAudioKeyExternalLinkToAnswer < ActiveRecord::Migration
  def change
    add_column :answers, :s3_audio_key, :string
    add_column :answers, :external_solution_link, :string
  end
end
