class QuestionsController < ApplicationController

  def index
    @questions = Question.order(votes: :desc).limit(10)
    @resources = Resource.order(votes: :desc).limit(10)
  end

  def track
    @track = params[:track].gsub(/\d/, ' ')
    topic_ids = Question.where(job_title: @track).pluck(:topic_id).uniq
    @topics = []
    topic_ids.each {|id| @topics << Topic.find(id)}
  end

  def topic
    @track = params[:track].gsub(/\d/, ' ')
    # this repetitive part could be ajaxed and eliminated using another layout
    topic_ids = Question.where(job_title: @track).pluck(:topic_id).uniq
    @topics = []
    topic_ids.each {|id| @topics << Topic.find(id)}
    @topic = Topic.find(params[:topic])
    @questions = @topic.questions.order(created_at: :desc)
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

  def upvote
    @question = Question.find(params[:id])
    @question.upvote
    redirect_to :back
  end

  def downvote
    @question = Question.find(params[:id])
    @question.downvote
    redirect_to :back
  end

  private

  def question_params
    params.require(:question).permit(:topic, :user_id, :job_title, :interview_type, :title, :content)
  end

end
