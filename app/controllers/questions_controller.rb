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
    @user = current_user
    if Topic.exists?(topic_name: question_params[:topic])
      @topic = Topic.find_by(topic_name: question_params[:topic])
    else
      @topic = Topic.create(topic_name: question_params[:topic])
    end
    @question = Question.new(topic_id: @topic.id, user_id: @user.id, job_title: question_params[:job_title], interview_type: question_params[:interview_type], title: question_params[:title], content: question_params[:content])
    if @question.save
      redirect_to new_question_resource_path(@question.id)
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
    params.require(:question).permit(:topic, :user_id, :job_title, :interview_type, :title, :content)
  end

end
