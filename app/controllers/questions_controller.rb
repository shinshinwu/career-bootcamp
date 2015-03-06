class QuestionsController < ApplicationController

  def index
    @question = Question.new
    @questions = Question.all
  end

  def show
    @question = Question.find(params[:id])
    @answers = @question.answers.paginate(page: params[:page])
    @answer = Answer.new
  end

  def create
    @question = Question.new(question_params)
    if @question.save
      redirect_to @question
    else
      p "question failed to save"
    end
  end

  def edit
    @question = Question.find(params[:id])
  end

  def update
    @question = Question.find(params[:id])
    if @question.update_attributes(question_params)
      redirect_to @question
    else
      p "failed to update question"
    end
  end

  def upvote
    @question = Question.find(params[:id])
    @question.upvote
  end

  def downvote
    @question = Question.find(params[:id])
    @question.downvote
  end

  def destroy
    Question.find(params[:id]).destroy
    redirect_to 'index'
  end

  private

  def question_params
    params.require(:question).permit(:job_title, :interview_type, :title, :content)
  end

end
