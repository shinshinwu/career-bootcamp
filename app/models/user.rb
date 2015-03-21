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
  validates :password, length: { minimum: 6 }, allow_blank: true

  def submitted_answer?(question_id)
    !self.answers.find_by(question_id: question_id).nil?
  end
 # model to use has_secure_password

  def submitted_resource?(question_id)
    !self.resources.find_by(question_id: question_id).nil?
  end

end
