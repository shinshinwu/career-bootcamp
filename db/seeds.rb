require 'faker'

job_titles = ["Front End Developer", "Ruby on Rails Engineer"]
interview_types = ["Onsite", "Phone", "Email/Online Challenge"]
front_end_topics = ["CSS", "HTML", "JavaScript", "SASS/Coffeescript", "jQuery", "CS Fundamentals"]
ror_topics = ["Ruby", "Rails", "Database", "Algorithm", "Data Structures", "CS Fundamentals"]

total_topics = (front_end_topics + ror_topics).uniq

total_topics.each do |topic|
  Topic.create(topic_name: topic)
end

20.times do
  User.create(username: Faker::Internet.user_name, email: Faker::Internet.safe_email, password: "password")
end

User.all.each do |user|
  2.times do
    Question.create(user_id: user.id, topic_id: rand(1..11), job_title: job_titles.sample, interview_type:interview_types.sample, title: Faker::Hacker.noun, content: Faker::Hacker.say_something_smart)
  end
end

Question.all.each do |question|
  Answer.create(question_id: question.id, user_id: rand(1..20), content: Faker::Hacker.say_something_smart)
  Resource.create(question_id: question.id, user_id: rand(1..20), title: Faker::Lorem.word, link: Faker::Internet.url_address, content: Faker::Lorem.sentence)
end
