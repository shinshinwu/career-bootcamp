require 'bcrypt'

class User < ActiveRecord::Base
  has_many :tracks
  has_many :questions, through: :tracks
  has_many :answers, through: :questions
  has_many :topics
  has_many :resources, through: :topics

  include BCrypt

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def self.authenticate(params)
    user = User.find_by(email: params[:email])
    (user && user.password == params[:password]) ? user : nil
  end
end
