module AnswersHelper
  extend self

  def aws_upload(file)
    credentials = Aws::Credentials.new(ENV["AWSAccessKeyId"], ENV["AWSSecretKey"])
    s3 = Aws::S3::Resource.new(credentials: credentials, region: "us-west-1")
    bucket = s3.bucket("careerbootcamp-audio")

    bucket.objects.each do |obj|
      puts "#{obj.key} => #{obj.etag}"
    end
    options = {
      key: file.original_filename,
      content_type: file.content_type,
      body: file.tempfile
    }


    object = bucket.put_object(options)
    p object.key
    
  end



end

