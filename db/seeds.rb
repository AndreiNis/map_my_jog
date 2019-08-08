# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user1 = User.create(email:"user 1@user1.com", password:"stargate",gender: "Male", first_name:"user1", last_name:"one",dob: Date.new(2001, 02, 03))
user2 = User.create(email:"user2@user2.com", password:"stargate",gender: "Male", first_name:"user2", last_name:"one",dob: Date.new(2002, 03, 04))
user3 = User.create(email:"user3@user3.com", password:"stargate",gender: "Female", first_name:"user3", last_name:"one",dob: Date.new(2003, 04, 05))

route1 = Route.create(name:"route1", polyline:"40.752793,-74.001003,41.597417,-74.668077,40.776546,-73.976330", distance: 1, user_id: user1.id)
route2 = Route.create(name:"route2", polyline:"40.780305,-73.985891,40.783821,-73.983715,40.779793,-73.981995", distance: 0.7, user_id: user2.id)