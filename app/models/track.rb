class Track < ActiveRecord::Base
  has_many :users
  has_many :topics
  has_many :questions, through: :topics
  has_many :resources, through: :topics
end
