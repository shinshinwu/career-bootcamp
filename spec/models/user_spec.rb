require 'rails_helper'

RSpec.describe User, type: :model do

  describe "user model validation works" do
    it "username should present" do
      expect(FactoryGirl.build(:user, username: nil)).to_not be_valid
    end

    it "username should be unique" do
      user1_name = FactoryGirl.create(:user).username
      expect(FactoryGirl.build(:user, username: user1_name)).to_not be_valid
    end

    it "email should present" do
      expect(FactoryGirl.build(:user, email: nil)).to_not be_valid
    end

    it "email should be unique" do
      user1_email = FactoryGirl.create(:user).email
      expect(FactoryGirl.build(:user, email: user1_email)).to_not be_valid
    end

    it "password needs to be 6 characters long" do
      expect(FactoryGirl.build(:user, password: "123")).to_not be_valid
    end

    it "pass validation with valid data" do
      expect(FactoryGirl.create(:user)).to be_valid
    end
  end

end
