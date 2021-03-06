// Meteor.subscribe("users");

Meteor.startup(function(){
	React.render(<App />, document.getElementById("render-target"));
})

//App component - whole app
App = React.createClass({
	//MIXINS
	// mixins: [ReactMeteorData],

	//After initial rendering
	componentDidMount() {
		SC.initialize({
			client_id: "d0188b58e48199057351dfe3a4971768",
			redirect_uri: ""
		});
		soundManager.setup({
		  url: "",
		  flashVersion: 9,
		  preferFlash: false, // prefer 100% HTML5 mode, where both supported
		  onready: function() {
		    console.log('SM2 ready!');
		  },
		  ontimeout: function() {
		    console.log('SM2 init failed!');
		  },
		  defaultOptions: {
		    // set global default volume for all sound objects
		    volume: 50
		  }
		});
	},

	//For using the SC API to get favourites. Eventually try and move this to server-side.
	getDefaultProps() {
		return ({
			//Users
			friends : [
				{	name: "Martin",
					username:"phamartin"},
				{ name: "Kate",
					username: "kateviloria"},
				{ name: "Satish",
					username: "get2rich"},
				{ name: "Eva",
					username: "eva-joo"},
				{ name: "Devansh",
					username: "devansh-malik"},
				{ name: "Juan",
					username: "36rex36"},
				{ name: "Sudeep",
					username: "s-palepu"}
			]//leeemichael, rfeng-2
		})
	},
	//For loading
	getInitialState() {
		return ({
			loadingSelected: false,
			selectedUser: null,
			selectedTrack: null,
			playingFrom: null,

			loggedIn: null,
			//Array of tracks to display
			tracksToDisplay: null,
			//For Meteor users
			displayingUserFavorites: null,
		});
	},

	//METHODS//
	handleSelectedUserUpdate(selected) {
		console.log(selected);
		var _this = this;
		_this.setState({loadingSelected: true});
		// Resolve url with username
		SC.get("http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/"+selected.username+"&client_id=d0188b58e48199057351dfe3a4971768", function(data){
			console.log("data", data);
			var user = data;
			SC.get("http://api.soundcloud.com/users/"+user.id+"/favorites?client_id=d0188b58e48199057351dfe3a4971768",{limit: user.public_favorites_count}, function(data){
			// HTTP.call("get", "http://api.soundcloud.com/users/"+user.id+"/favorites?client_id=d0188b58e48199057351dfe3a4971768",{params: {limit: 10}}, function(error, result){
				console.log("data", data);
				var favorites = data.map((track) => {
					track.user.avatar_url = track.user.avatar_url ? track.user.avatar_url.replace("large", "t500x500") : "https://i1.sndcdn.com/avatars-000062332227-4nq69b-t500x500.jpg";
					track.artwork_url = track.artwork_url ? track.artwork_url.replace("large", "t500x500") : track.user.avatar_url;
					return track;
				});
				_this.setState({loadingSelected: false});
				console.log(selected);
				//Pass track data to player
				let newSelected = {
					user: user,
					name: selected.name,
					favorites: favorites
				};
				_this.setState({selectedUser: newSelected, tracksToDisplay: favorites, displayingUserFavorites: false});
				//Hide user selection topbar
				$(".ui.top.sidebar").sidebar("hide");
			})
		});
	},
	displayUserFavorites() {
		var favorites = Meteor.users.findOne({_id: Meteor.userId()}).profile.favorites;
		favorites.reverse();
		let newSelected = {
			//this is gross
			user: null,
			name: Meteor.user().username,
			favorites
		};
		console.log("displayUserFavorites:", newSelected);
		this.setState({tracksToDisplay: favorites, displayingUserFavorites: true, selectedUser: newSelected});
	},

	changeCurrentSound(track) {
		var _this = this;
		var current = soundManager.getSoundById("current");
		// var volume = current ? current.volume : 50;
		soundManager.destroySound("current");
		soundManager.createSound({
			autoLoad: true,
			autoPlay: true,
			id: "current",
			volume: current ? current.volume : 50,
			url: track.stream_url+"?client_id=d0188b58e48199057351dfe3a4971768",
			whileloading(){
				$(".loading-progress .bar").width((10 + (90*this.bytesLoaded/this.bytesTotal))+"%");
			},
			whileplaying(){
				//Update duration tracker
				$(".current-track-progress .bar").width((10 + (90*this.position/this.duration))+"%");
				$("span.position-duration").text(moment.utc(this.position).format("m:ss")+"/"+moment.utc(this.duration).format("m:ss"));
				//Volume
				$("span.volume-indicator").text(Math.max(Math.min(this.volume, 100), 0));
			},
			onstop(){
				$(".current-track-progress .bar").width("10%"); //min is 10
				$(".current-track-progress .bar .progress .position-duration").text(moment.utc(0).format("m:ss")+"/"+moment.utc(this.duration).format("m:ss"));
			},
			onfinish(){
				var randomTrack = _.sample(_this.state.tracksToDisplay);
				_this.handleSelectedTrackUpdate(randomTrack);
			}
		});
	},
	handleSelectedTrackUpdate(track) {
		console.log("trackUpdate", this.state.selectedUser);
		var _this = this;
		//Update who you're playing from. Track will never be updated from a set not from selectedUser
		_this.setState({playingFrom: {
			name: this.state.selectedUser.name, 
			link: this.state.selectedUser.user ? this.state.selectedUser.user.permalink_url : ""}
		});
		_this.changeCurrentSound(track);
		console.log("updating track:", track);
		_this.setState({selectedTrack: track});
	},

	handleLoggedInUpdate(loggedIn) {
		var _this = this;
		_this.setState({"loggedIn": loggedIn});
		if (!loggedIn) {
			_this.handleSelectedUserUpdate(_.sample(this.props.friends));
			Meteor.logout(() => {Meteor.logoutOtherClients();});
		};
	},

	//RENDER//
	render() {
		return (
			<div id="app">
				<Topbar updateSelectedUser={this.handleSelectedUserUpdate} friends={this.props.friends} loadingSelected={this.state.loadingSelected} updateLoggedIn={this.handleLoggedInUpdate} loggedIn={this.state.loggedIn}/>
				
				<div className="pusher">
				<Topmenu 
					selectedUser={this.state.selectedUser} 
					selectedTrack={this.state.selectedTrack} updateSelectedTrack={this.handleSelectedTrackUpdate} playingFrom={this.state.playingFrom}
					loggedIn={this.state.loggedIn} displayUserFavorites={this.displayUserFavorites} displayingUserFavorites={this.state.displayingUserFavorites}/>
				{ this.state.tracksToDisplay ? 
						<Tracks selectedUser={this.state.selectedUser} updateSelectedTrack={this.handleSelectedTrackUpdate} selectedTrack={this.state.selectedTrack} tracksToDisplay={this.state.tracksToDisplay}/> : 
						<Entry /> }
				</div>
			</div>
		);
	}
})