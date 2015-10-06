// //Register a publication named "users" for Meteor.subscribe
// Meteor.publish("users", function(){
// 	console.log("this", this);
// 	return Users.find({
// 		_id: this.userId
// 	});
// })