// JavaScript Document
use mongo_practice
db.createCollection("movies")
db.movies.insertMany([
{
title : "Fight CLub",
writer : "Chuck Palahniuko",
year : 1999,
actors : [
		  "Brad Pitt",
		  "Edward Norton"
		 ]
},
{
title : "Pulp Fiction",
writer : "Quentin Tarantino",
year : 1994,
actors : [
		  "John Travalto",
	      "Uma Thurman"
		 ]
},
{
title : "Inglorious Basterds",
writer : "Quentin Tarantino",
year : 2009,
actors : [
		  "Brad Pitt",
		  "Diane Kruger",
		  "Eli Roth"
		 ]
},
{
title : "The Hobbit:An Unexpected Journey",
writer : "J.R.R.Tolkein",
year : 2012,
franchise : "The Hobbit"
},
{
title : "The Hobbit:The Desolation of Smaug",
writer : "J.R.R.Tolkein",
year : 2013,
franchise : "The Hobbit"
},
{
title : "The Hobbit:The Battle of Five Armies",
writer : "J.R.R.Tolkein",
year : 2012,
franchise : "The Hobbit",
synopsis : "Bilbo and Company are forced to engage in a war against an array of combatants and keep the lonely mountain from falling into the hands of a rising darkness."
},
{
title : "Pee Wee Herman's Big Adventure"
},
{
title : "Avatar"
}
])

Query/Find Documents

db.movies.find().pretty()
db.movies.find({writer : "Quentin Tarantino"}).pretty()
db.movies.find({actors : "Brad Pitt"}).pretty()
db.movies.find({franchise : "The Hobbit"}).pretty()
db.movies.find({year: {$gt:1900, $lt:2000}})
db.movies.find({"$or":[{year: {$lt:2000}},{year:{$gt:2010}}]})

Update Documents Queries

db.movies.updateOne({title:"The Hobbit:An Unexpected Journey"}, {$set: { synopsis: "A reluctant hobbit,Bilbo Baggins sets out to the Lonely Mountains with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug"}})

db.movies.updateOne({title: "The Hobbit:The Desolation of Smaug"}, {$set: {synopsis: "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor,their homeland, from Smaug. Bilbo Baggins is in possession of mysterious and magical ring"}})

db.movies.updateOne({title:"Pulp Fiction"}, {$set: {acactor: "Samuel L. Jackson"}})

Text Search Queries

db.movies.createIndex({synopsis:"synopsis_word"})

db.movies.find({$text:{$search:"Bilbo"}}).pretty()
db.movies.find({$text:{$search:"Gandalf"}}).pretty()
db.movies.find({$text:{$search:"Bilbo -Gandalf"}}).pretty()

Delete Queries
 db.movies.deleteOne({title: "Pee Wee Herman's Big Adventure" } )
 db.movies.deleteOne( { title: "Avatar"})

Relationships

db.createCollection("users")
db.users.insertMany([
{
	username:"GoodGuyGreg",
	firstname: "GoodGuy",
	lastname: "Greg"
},
{
	username:"ScumbagSteve",
	full_name:
	{
	  first: "GoodGuy",
	  last: "Greg"
	}
}])
db.createCollection("posts")
db.posts.insertMany([
{
	username:"GoodGuyGreg",
	title: "Passess out at party",
	body: "Wakes up early and cleans house"
},
{
	username:"GoodGuyGreg",
	title: "Steals your identity",
	body: "Raises your credit score"
},
{
	username:"GoodGuyGreg",
	title: "Reports a bug in your code",
	body: "Sends you a Pull Request"
},
{
	username:"ScumbagSteve",
	title: "Borrows something",
	body: "Sells it"
},
{
	username:"ScumbagSteve",
	title: "Borrows everything",
	body: "The end"
},
{
	username:"ScumbagSteve",
	title: "Forks your repo on github",
	body: "Sets to private"
}
])
db.createCollection("comments")

insertedIds: {
    '0': ObjectId("624aee16176a8eec31abdc09"),
    '1': ObjectId("624aee16176a8eec31abdc0a"),
    '2': ObjectId("624aee16176a8eec31abdc0b"),
    '3': ObjectId("624aee16176a8eec31abdc0c"),
    '4': ObjectId("624aee16176a8eec31abdc0d"),
    '5': ObjectId("624aee16176a8eec31abdc0e")
  }

db.createCollection("comments")
db.comments.insertMany([
{
	username:"GoodGuyGreg",
	comment: "Hope you got a good deal!",
	post:["624aee16176a8eec31abdc0c"]
},
{
	username:"GoodGuyGreg",
	comment: "What's mine is yours!",
	post:["624aee16176a8eec31abdc0d"]
},
{
	username:"GoodGuyGreg",
	comment: "Don't violate the licensing agreement!",
	post:["624aee16176a8eec31abdc0e"]
},
{
	username:"ScumbagSteve",
	comment: "It still isn't clean",
	post: ["624aee16176a8eec31abdc09"]
},
{
	username:"ScumbagSteve",
	comment: "Denied your PR cause I found a hack",
	post: ["624aee16176a8eec31abdc0b"]
}
])


//Querying related collections
db.users.find().pretty()
db.posts.find().pretty()
db.posts.find({username:"GoodGuyGreg"})
db.posts.find({username:"ScumbagSteve"})
db.comments.find().pretty()
db.comments.find({username:"GoodGuyGreg"})
db.comments.find({username:"ScumbagSteve"})
db.comments.find({post:"624aee16176a8eec31abdc0b"})
