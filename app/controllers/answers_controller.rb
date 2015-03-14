class AnswersController < ApplicationController

  def new
    @question = Question.find(params[:question_id])
    @answer = Answer.new
  end

  def create
    @question = Question.find(params[:question_id])
    @user = current_user
    @answer = Answer.new(question_id: @question.id, user_id: @user.id, content: answer_params[:content])
    if @answer.save
      redirect_to @question
    else
      p 'something wrong with saving answer'
    end
  end

  def show
    @question = Question.find(params[:question_id])
    @answer = Answer.find(params[:id])
  end

  def upvote
    @answer = Answer.find(params[:answer_id])
    @answer.upvote
  end

  def downvote
    @answer = Answer.find(params[:answer_id])
    @answer.downvote
  end

  private

  def answer_params
    params.require(:answer).permit(:content)
  end
end
