Player = React.createClass({
	componentDidMount() {

	},

	getInitialState() {
		return ({
			paused: false,
			muted: false
		});
	},

	//METHOD//
	togglePause() {
		var current = soundManager.getSoundById("current");
		current.togglePause();
		const pauseState = current.paused;
		this.setState({paused: pauseState});
	},
	toggleStop() {
		var current = soundManager.getSoundById("current");
		current.stop();
		this.setState({paused: true});
	},
	changeVolume(up) {
		var current = soundManager.getSoundById("current");
		const volume = up ? Math.min(current.volume+5, 100) : Math.max(current.volume-5, 0);
		current.setVolume(volume);
	},
	muteVolume() {
		var current = soundManager.getSoundById("current");
		current.toggleMute();
		const muteState = current.muted;
		this.setState({muted: muteState});
	},
	playNext() {
		console.log("play next", _.sample(this.props.selectedUser.favorites));
		const randomTrack = _.sample(this.props.selectedUser.favorites);
		//Don't do anything if no track to browse (favorites is empty array)
		if (!randomTrack) {
			this.props.updateSelectedTrack(randomTrack);
			//Reset state
			this.setState({paused: false, muted: false});			
		};
	},
	//
	favoriteTrack(track) {
		var _this = this;
		//Favorited tracks keep track of which friend liked it
		track.courtesyOf = _this.props.playingFrom;
		Meteor.call("addTrackToProfile", Meteor.userId(), track, () => { _this.setState({}); });
	},

	//RENDER//
	render() {
		const user = this.props.selectedUser;
		const track = this.props.selectedTrack;
		//Styling
		const playButtonClasses = (this.state.paused ? "play " : "pause ") + "icon";
		const muteButtonClasses = (this.state.muted ? "red " : "") + "volume off icon";
		//For favoriting
		const loggedIn = this.props.loggedIn;
		var favoriteButtonClasses = "ui big fluid circular inverted pink icon button";
		console.log("loggedin?", loggedIn);
		if (loggedIn && track) {
			//Replace with mongo selector
			favoriteButtonClasses += (_.contains(_.pluck(Meteor.users.findOne({_id: Meteor.userId()}).profile.favorites, "id"), track.id)) ? " disabled" : "";
		};
		return (
			<div className="player-popup ui fluid popup">
				
				{ track ? 
					<div className="ui fluid grid inverted segment">
						<div className="middle aligned row">
							{/*ARTWORK*/}
							<div className="three wide column">
								<div className="ui segment">
									<div className="ui medium fluid fade reveal image">
										<img className="visible content fluid image" src={track.artwork_url}></img>
										<img className="hidden content fluid image" src={track.user.avatar_url}></img>
									</div>
									<div className="loading-progress ui inverted bottom attached progress">
										<div className="bar"></div>
									</div>
								</div>
							</div>
							{/*TRACK AND PLAYER INFO*/}
							<div className="eleven wide column">
								{/* CURRENT TRACK INFO */}
								<div className="ui inverted header">
									<div className="sub header"><a style={{color:"grey"}}href={track.user.permalink_url} target="_blank"><span>{track.user.username}</span></a></div>
									<a style={{color:"white"}} href={track.permalink_url} target="_blank"><span>{track.title}</span></a>
								</div>
								{/* PLAYER FUNCTIONS */}
								<div className="ui fluid middle aligned grid">
								<div className="row">
									<div className="two wide column">
										<div className="ui compact large fluid circular inverted basic green icon button" onClick={this.togglePause}>
											<i className={playButtonClasses}></i>
										</div>
									</div>
									<div className="two wide column">
										<div className="ui compact large fluid circular inverted basic yellow icon button" onClick={this.toggleStop}>
											<i className="stop icon"></i>
										</div>
									</div>
									<div className="two wide column">
										<div className="ui compact large fluid circular inverted basic red icon button" onClick={this.playNext}>
											<i className="circular icons">
												<i className="random icon"></i>
												<i className="corner inverted pink heart icon"></i>
											</i>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="six wide column">
										<div className="ui fluid icon buttons">
											<div className="ui compact circular inverted basic orange button" onClick={this.changeVolume.bind(this, false)}><i className="volume down icon"></i></div>
											<div className="ui compact circular inverted basic orange button" onClick={this.changeVolume.bind(this, true)}><i className="volume up icon"></i></div>
											<div className="ui compact circular inverted basic orange button" onClick={this.muteVolume}><i className={muteButtonClasses}></i></div>
										</div>
									</div>
								</div>
								</div>
								<div className="ui inverted header">
									<div className="sub header">Courtesy of:</div>
									{	track.courtesyOf ?
										<a style={{color:"white"}} href={track.courtesyOf.link} target="_blank">{track.courtesyOf.name}</a>
										:
										<a style={{color:"white"}} href={this.props.playingFrom.link} target="_blank">{this.props.playingFrom.name}</a>
									}
								</div>
							</div>
							{/*USER FAVORITING*/}
							<div className="two wide column">
								{	loggedIn ? <div className={favoriteButtonClasses} onClick={this.favoriteTrack.bind(this, track)}><i className="heart icon"></i></div> : "" }
							</div>
						</div>
						<div className="middle aligned row">
							<div className="sixteen wide column">
								<div className="current-track-progress ui progress" style={{backgroundColor: 'grey'}}>
									<div className="bar" style={{backgroundColor: "white"}}>
										<div className="progress" style={{color: "black"}}><span className="position-duration"></span></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					:
					<div className="ui fluid grid inverted segment">
						<div className="middle aligned row">
							<div className="sixteen wide column"><h2 className="ui centered inverted header">Select a Track to Play</h2></div>
						</div>
					</div>
				}
			</div>
		);
	}
});