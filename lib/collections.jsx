// Users = new Mongo.Collection("users");
Meteor.users.allow({
	insert: (userId, doc) => {return false;},
	remove: (userId, doc) => {return false;},
	update: (userId, doc, fieldNames, modifier) => {
		console.log("allow update?", userId, doc);
		return (userId == doc._id);
	}
})