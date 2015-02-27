class Resource < ActiveRecord::Base
  belongs_to :topic

  def upvote
    self.votes += 1
    self.save
  end

  def downvote
    self.votes -= 1
    self.save
  end
end
