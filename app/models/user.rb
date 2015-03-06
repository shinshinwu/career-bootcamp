require 'bcrypt'

class User < ActiveRecord::Base
  has_many :questions
  has_many :answers
  has_many :resources

  validates :username, :presence => true,
                       :uniqueness => true,
                       :length: { maximum: 50 }
  validates :email,    :presence => true,
                       :uniqueness => true,
                       :format => { :with => /\w+@\w+\.\w+/ }
  validates :password_hash, :presence => true

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
