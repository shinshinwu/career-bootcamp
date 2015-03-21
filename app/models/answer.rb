class Answer < ActiveRecord::Base
  belongs_to :question
  belongs_to :user

  def upvote
    self.votes += 1
    self.save
  end

  def downvote
    self.votes -= 1
    self.save
  end
end
