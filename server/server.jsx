// //Register a publication named "users" for Meteor.subscribe
// Meteor.publish("users", function(){
// 	console.log("this", this);
// 	return Users.find({
// 		_id: this.userId
// 	});
// })

Meteor.methods({
	addTrackToProfile: (userId, track) => {
		console.log("Adding track ", track, "to user with id ", userId);
		const a = new Date;
		Meteor.users.update({_id: userId}, {
			 $addToSet: {'profile.favorites': track}
		})
	}
});