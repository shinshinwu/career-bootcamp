class ResourcesController < ApplicationController

  def new
    @question = Question.find(params[:question_id])
    @resource = Resource.new
  end

  def create
    @question = Question.find(params[:question_id])
    @user = current_user
    @resource = Resource.new(question_id: @question.id, user_id: @user.id, title: resource_params[:title], link: resource_params[:link], content: resource_params[:content])
    if @resource.save
      redirect_to @question
    else
      p "something wrong with saving resource"
    end
  end

  def upvote
    @resource = Resource.find(params[:resource_id])
    @resource.upvote
  end

  def downvote
    @resource = Resource.find(params[:resource_id])
    @resource.downvote
  end

  private

  def resource_params
    params.require(:resource).permit(:title, :link, :content)
  end
end
