class UsersController < ApplicationController
  before_action :logged_in_user, only: [:edit, :update]
  before_action :correct_user, only: [:edit, :update]

  def index
    #greeting page
  end

  def show
    #user profile page that shows questions, resources and answers mapped to user
    @user = User.find(params[:id])
  end

  def new
    #sign up form
    @user = User.new
  end

  def create
    # create new user in database
    @user = User.new(user_params)
    if @user.save
      log_in @user
      flash[:success] = "Welcome to Career Bootcamp!"
      redirect_to @user
    else
      render 'new'
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

  def logged_in_user
    unless logged_in?
      flash[:danger] = "Please log in"
      redirect_to login_url
    end
  end

  def correct_user
    @user = User.find(params[:id])
    redirect_to(root_url) unless current_user?(@user)
  end
end