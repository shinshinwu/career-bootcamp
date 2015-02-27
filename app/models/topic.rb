class Topic < ActiveRecord::Base
  has_many :tracks
  has_many :questions
  has_many :resources
end
