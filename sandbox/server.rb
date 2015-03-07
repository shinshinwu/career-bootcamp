require 'sinatra'

set :root, File.dirname(__FILE__)

get '/' do
  File.read('audio-test.html')
end