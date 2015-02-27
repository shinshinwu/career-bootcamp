class Answer < ActiveRecord::Base
  belongs_to :question

  def upvote
    self.votes += 1
    self.save
  end

  def downvote
    self.votes -= 1
    self.save
  end
end
