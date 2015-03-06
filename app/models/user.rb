class User < ActiveRecord::Base
  before_save {self.email = email.downcase}
  has_many :questions
  has_many :answers
  has_many :resources

  validates :username, :presence => true,
                       :uniqueness => true
  validates :email,    :presence => true,
                       :uniqueness => true,
                       :format => { :with => /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i }
  has_secure_password
  validates :password, length: { minimum: 6 }

  # def password
  #   @password ||= Password.new(password_hash)
  # end

  # def password=(new_password)
  #   @password = Password.create(new_password)
  #   self.password_hash = @password
  # end

  # def self.authenticate(params)
  #   user = User.find_by(email: params[:email])
  #   (user && user.password == params[:password]) ? user : nil
  # end
>>>>>>> wrote simple user controller action and added sessions
end
