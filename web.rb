require 'sinatra'
require 'haml'
require 'json'
require 'sequel'

DB = Sequel.connect(ENV['DATABASE_URL'] || 'postgres://localhost/blightstatus_waiting_room')

unless DB[:signups]
  DB.create_table :signups do
    primary_key :id
    String :email
    String :name
  end
end

get '/' do
  haml :index
end

get '/about' do
  haml :about
end

post '/signup' do
  begin
    DB[:signups].insert(:email => params[:email])
    {:success => true}.to_json
  rescue
    {:success => false}.to_json
  end
end

