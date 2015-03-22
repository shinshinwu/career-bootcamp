class AnswersController < ApplicationController
  helper AnswersHelper

  def new
    @question = Question.find(params[:question_id])
    @answer = Answer.new
  end

  def create
    AnswersHelper.aws_upload(params[:audio_file])
    @question = Question.find(params[:question_id])
    @answer = Answer.new(question: @question, user_id: current_user.id, content: JSON.parse(answer_params[:content]), s3_audio_key: params[:audio_file].original_filename, external_solution_link: answer_params[:external_solution_link])
    p @answer.content
    if @answer.save
      p @answer.id
      redirect_to @answer
    else
      p 'something wrong with saving answer'
    end
  end

  def show
    @question = Question.find(params[:question_id])
    @answer = Answer.find(params[:id])
    p @answer.content
    @answer
  end

  def upvote
    @answer = Answer.find(params[:answer_id])
    @answer.upvote
    redirect_to :back
  end

  def downvote
    @answer = Answer.find(params[:answer_id])
    @answer.downvote
    redirect_to :back
  end

  private

  def answer_params
    params.require(:answer).permit(:content, :external_solution_link)
  end
end
