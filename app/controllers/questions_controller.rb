class QuestionsController < ApplicationController

  def index
    @questions = Question.order(created_at: :desc).limit(10)
    @resources = Resource.order(created_at: :desc).limit(10)
  end

  def show
    @question = Question.find(params[:id])
    @resources = @question.resources.order(created_at: :desc)
    # if current user have submitted answers to the question, then will show the answers list to the question
    @user = current_user
    @answers = @question.answers.order(created_at: :desc)
  end

  def new
    @question = Question.new
  end

  # after user created a new question, they won't be directed to submit new answer. When user click yes to add resource, it will append new input box on page to input resources
  def create
    @question = Question.new(question_params)
    if @question.save && params[:resource] == 'yes' && params[:answer] == 'yes'
      # need to make some sort of mark that the user will submit both resources and answers
      redirect_to new_question_resource_path(@question.id, :both => params[:resource])
    elsif @question.save && params[:resource] == 'yes' && params[:answer] != 'yes'
      redirect_to new_question_resource_path(@question.id)
    elsif @question.save && params[:resource] != 'yes' && params[:answer] == 'yes'
      redirect_to new_question_answer_path(@question.id)
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
    params.require(:question).permit(:topic_id, :user_id, :job_title, :interview_type, :title, :content)
  end

end
