Meteor.startup(function(){
	React.render(<App />, document.getElementById("render-target"));
})

//App component - whole app
App = React.createClass({

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
		    volume: 10
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
			selectedTrack: null
		});
	},

	//METHODS//
	handleSelectedUserUpdate(selected) {
		var _this = this;
		_this.setState({loadingSelected: true});
		// Resolve url with username
		HTTP.call("get", "http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/"+selected.username+"&client_id=d0188b58e48199057351dfe3a4971768", function(error,result){
			var user = result.data;
			// HTTP.call("get", "http://api.soundcloud.com/users/"+user.id+"/favorites?client_id=d0188b58e48199057351dfe3a4971768",{params: {limit: user.public_favorites_count}}, function(error, result){
			HTTP.call("get", "http://api.soundcloud.com/users/"+user.id+"/favorites?client_id=d0188b58e48199057351dfe3a4971768",{params: {limit: 10}}, function(error, result){
				var favorites = result.data.map((track) => {
					track.artwork_url = track.artwork_url ? track.artwork_url.replace("large", "t500x500") : track.user.avatar_url.replace("large", "t500x500");
					return track;
				});
				_this.setState({loadingSelected: false});
				//Pass track data to player
				let selected = {
					user: user,
					favorites: favorites
				};
				_this.setState({selectedUser: selected});
				//Hide user selection topbar
				$(".ui.top.sidebar").sidebar("hide");
			})
		});
	},
	handleSelectedTrackUpdate(track) {
		var _this = this;
		console.log("updating track:", track);
		_this.setState({selectedTrack: track});
	},

	//RENDER//
	render() {
		return (
			<div id="app">
				<Topbar updateSelected={this.handleSelectedUserUpdate} friends={this.props.friends} loadingSelected={this.state.loadingSelected}/>
				
				<div className="pusher">
				<Topmenu selectedTrack={this.state.selectedTrack}/>
				{ this.state.selectedUser ? <Tracks selectedUser={this.state.selectedUser} updateSelectedTrack={this.handleSelectedTrackUpdate}/> : <Entry /> }
				</div>

			</div>
		);
	}
})