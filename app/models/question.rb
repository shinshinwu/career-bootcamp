class Question < ActiveRecord::Base
  belongs_to :topic
  has_many :answers
  has_many :types

  def upvote
    self.votes += 1
    self.save
  end

  def downvote
    self.votes -= 1
    self.save
  end
end
