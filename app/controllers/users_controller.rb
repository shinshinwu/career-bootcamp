class UsersController < ApplicationController
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

  def edit
    # update password/username form?
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

  def update
    # update password or username?
  end

  def destroy
    # delete user
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end