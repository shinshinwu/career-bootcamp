class Question < ActiveRecord::Base
  belongs_to :topic
  belongs_to :user
  has_many :answers
  has_many :resources

  def upvote
    self.votes += 1
    self.save
  end

  def downvote
    self.votes -= 1
    self.save
  end
end
