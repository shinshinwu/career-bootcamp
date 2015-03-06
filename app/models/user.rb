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
  has_secure_password
  validates :password, length: { minimum: 6 }

end
