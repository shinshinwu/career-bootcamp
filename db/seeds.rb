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

# 2 CSS Questions

Question.create(user_id: rand(1..20), topic_id: 1, job_title: "Front End Developer", interview_type:interview_types.sample, title: "Classes vs IDs", content: "What is the difference between classes and IDs in CSS?", votes: rand(50))

Resource.create(question_id: 1, user_id: rand(1..20), title: "Classes and IDs explained", link: "https://css-tricks.com/the-difference-between-id-and-class/", content: "Straightforward explainations with code examples", votes: rand(40))

Answer.create(question_id: 1, user_id: rand(1..20), external_solution_link: "http://jsfiddle.net/lingo/FQPQf/", content: "IDs are unique while classes are not.", votes: rand(20))

Question.create(user_id: rand(1..20), topic_id: 1, job_title: "Front End Developer", interview_type:interview_types.sample, title: "CSS positioning" , content: "Describe the different types of CSS positions and what each of them meant.", votes: rand(50))

Resource.create(question_id: 2, user_id: rand(1..20), title: "CSS positions - MDN", link: "https://developer.mozilla.org/en-US/docs/Web/CSS/position", content: "MDN manual on different types of CSS positions and what each meant.", votes: rand(50))

# 2 HTML Questions

Question.create(user_id: rand(1..20), topic_id: 2, job_title: "Front End Developer", interview_type:interview_types.sample, title: "Script tag placement", content: "Where should you place your script tags in the body of HTML? Explain your options and the pros and cons of each.", votes: rand(50))

Resource.create(question_id: 3, user_id: rand(1..20), title: "Top vs. Bottom", link: "http://stackoverflow.com/questions/436411/where-is-the-best-place-to-put-script-tags-in-html-markup", content: "A great stackoverflow post on such topic", votes: rand(50))

Question.create(user_id: rand(1..20), topic_id: 2, job_title: "Front End Developer", interview_type:interview_types.sample, title: "Multi-language support", content: "How do you serve a page with content in multiple languages?", votes: rand(50))

# 2 JS Questions

Question.create(user_id: rand(1..20), topic_id: 3, job_title: "Front End Developer", interview_type:interview_types.sample, title: "Event Delegation", content: "Explain what is event delegation in JavaScript and a code example of such application.", votes: rand(50))

Resource.create(question_id: 5, user_id: rand(1..20), title: "Blog post on JS event delegation", link: "http://davidwalsh.name/event-delegate", content: "Basically you can set up listener on the parent container", votes: rand(50))

Question.create(user_id: rand(1..20), topic_id: 3, job_title: "Front End Developer", interview_type:interview_types.sample, title: "What is closure in JS?", content: "What is closure and what are some typical usage of closure?", votes: rand(50))

Resource.create(question_id: 6, user_id: rand(1..20), title: "Official MDN guide on the topic", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures", content: "It allows you to access variable outside of your internal scope.", votes: rand(50))

# 2 jQuery questions

Question.create(user_id: rand(1..20), topic_id: 5, job_title: "Front End Developer", interview_type:interview_types.sample, title: "Explain jQuery $.ajax method", content: "Explain what is AJAX and how you can use it in jQuery.", votes: rand(50))

Resource.create(question_id: 7, user_id: rand(1..20), title: "Code examples of using jQuery AJAX", link: "http://www.tutorialspoint.com/jquery/jquery-ajax.htm", content: "The resource explains the syntax and gave some usage example.", votes: rand(50))

Answer.create(question_id: 7, user_id: rand(1..20),  content: "Reading the jQuery documentation on ajax methods will help alot. Basically the AJAX method will allow you to update the DOM elements asynchronously. It's a developers dream because it increase the page loading speed by far since it no longer requires a page refresh.", votes: rand(50))

Question.create(user_id: rand(1..20), topic_id: 5, job_title: "Front End Developer", interview_type:interview_types.sample, title: "Explain following jQuery code", content: "Explain this piece of code: $( 'div#first, div.first, ol#items > [name$='first']' )", votes: rand(50))

Resource.create(question_id: 8, user_id: rand(1..20), title: "jQuery Interview Questions", link: "http://www.toptal.com/jquery/interview-questions", content: "Answer explained in above post!", votes: rand(50))

# 2 CS related questions

Question.create(user_id: rand(1..20), topic_id: 6, job_title: job_titles.sample, interview_type:interview_types.sample, title: "What is HTTP?", content: "What does HTTP stand for and what are some its characteristics?", votes: rand(50))

Resource.create(question_id: 9, user_id: rand(1..20), title: "HTTP - HyperText Transfer Protocol", link: "http://www.webopedia.com/TERM/H/HTTP.html", content: "A Straightforward Wiki Provides definition and some common status codes.", votes: rand(50))

Question.create(user_id: rand(1..20), topic_id: 6, job_title: job_titles.sample, interview_type:interview_types.sample, title: "Explain what happened when you type an URL into a browser", content: "Explain in details what is the process and what stacks it goes through when you enter URL such as google.com into your favourite browser.", votes: rand(50))

# 2 ruby questions

Question.create(user_id: rand(1..20), topic_id: 7, job_title: "Ruby on Rails Engineer", interview_type:interview_types.sample, title: "Class vs. Module", content: "Explain the differences of classes and modules and how to you use them together.", votes: rand(50))

Resource.create(question_id: 11, user_id: rand(1..20), title: "Ruby Constructs: Class, Module and Mixin", link: "http://matt.aimonetti.net/posts/2012/07/30/ruby-class-module-mixins/", content: "Great code samples to clearly explain the concept.", votes: rand(50))

Question.create(user_id: rand(1..20), topic_id: 7, job_title: "Ruby on Rails Engineer", interview_type:interview_types.sample, title: "Proc vs. Lambda", content: "What are procs and lambdas? Are there times you would use one but not the other?", votes: rand(50))

Resource.create(question_id: 12, user_id: rand(1..20), title: "Understanding Ruby Blocks, Procs and Lambdas", link: "http://www.reactive.io/tips/2008/12/21/understanding-ruby-blocks-procs-and-lambdas/", content: "Blog posts explaining the origin of blocks and how procs and lambdas uses it.", votes: rand(50))

# 2 rails questions

Question.create(user_id: rand(1..20), topic_id: 8, job_title: "Ruby on Rails Engineer", interview_type:interview_types.sample, title: "Rails caching", content: "What are some different ways rails utilize caching?", votes: rand(50))

Resource.create(question_id: 13, user_id: rand(1..20), title: "Caching with Rails: An overview", link: "http://guides.rubyonrails.org/caching_with_rails.html", content: "The best resource for any rails related questions: Rails Guides", votes: rand(50))

Question.create(user_id: rand(1..20), topic_id: 8, job_title: "Ruby on Rails Engineer", interview_type:interview_types.sample, title: "Eager Loading", content: "What is eager loading and how does Active Record achieves it?", votes: rand(50))

Resource.create(question_id: 14, user_id: rand(1..20), title: "3 ways to do eager loading (preloading) in Rails 3 & 4", link: "http://blog.arkency.com/2013/12/rails4-preloading/", content: "Compare the output of 3 statements to accomplish eager loading in rails", votes: rand(50))

# database question
Question.create(user_id: rand(1..20), topic_id: 9, job_title: "Ruby on Rails Engineer", interview_type: interview_types.sample, title: "Inner Join vs. Outter Join", content: "What is inner join and outter join in SQL database?", votes: rand(50))

# algorithm question
Question.create(user_id: rand(1..20), topic_id: 10, job_title: "Ruby on Rails Engineer", interview_type: interview_types.sample, title: "Tree Traversel", content: "Explain what are the ways you could traverse a tree structure.", votes: rand(50))

# data structure questions
Question.create(user_id: rand(1..20), topic_id: 11, job_title: "Ruby on Rails Engineer", interview_type: interview_types.sample, title: "Search methods run time", content: "What are some sort algorithms and what are the average case run time of them?", votes: rand(50))

# User.all.each do |user|
#   2.times do
#     Question.create(user_id: user.id, topic_id: rand(1..11), job_title: job_titles.sample, interview_type:interview_types.sample, title: Faker::Hacker.noun, content: Faker::Hacker.say_something_smart)
#   end
# end

# Question.all.each do |question|
#   Answer.create(question_id: question.id, user_id: rand(1..20), content: Faker::Hacker.say_something_smart)
#   Resource.create(question_id: question.id, user_id: rand(1..20), title: Faker::Lorem.word, link: Faker::Internet.url_address, content: Faker::Lorem.sentence)
# end
