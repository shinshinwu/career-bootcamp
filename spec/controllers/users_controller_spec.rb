require 'rails_helper'

describe UsersController do

  before :each do
    @user = FactoryGirl.create(:user)
  end

  describe "homepage loads" do
    it "return success status" do
      get :index
      expect(response).to have_http_status(200)
    end
  end

  # not sure why it's failing
  describe "valid signup information" do
    it "creates user in the database" do
      expect {
        post :create, user: { username: @user.username, email: @user.email, password: @user.password}
      }.to change{
        User.all.count
      }.by(1)
    end
  end

end
