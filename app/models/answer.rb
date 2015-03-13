class Answer < ActiveRecord::Base
  belongs_to :question
  belongs_to :user

  def new
    @question = Question.find(params[:id])
    @answer = Answer.new
  end

  def create
  end

  def upvote
    self.votes += 1
    self.save
  end

  def downvote
    self.votes -= 1
    self.save
  end
end
