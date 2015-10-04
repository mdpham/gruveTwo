Player = React.createClass({
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
	changeVolume(up) {
		var current = soundManager.getSoundById("current");
		const delta = up ? 5 : -5;
		current.setVolume(current.volume+delta);
	},
	muteVolume() {
		var current = soundManager.getSoundById("current");
		current.toggleMute();
		const muteState = current.muted;
		this.setState({muted: muteState});
	},

	//RENDER//
	render() {
		const user = this.props.selectedUser;
		const track = this.props.selectedTrack;
		return (
			<div className="player-popup ui fluid popup">
				<div className="ui fluid grid">
				{ track ? 
					<div className="middle aligned row">
						<div className="three wide column">
							<div className="ui medium fluid image">
								<img src={track.artwork_url}></img>
							</div>
						</div>
						<div className="eleven wide column">
							{/* CURRENT TRACK INFO */}
							<div className="ui header">
								{track.title}
								<div className="sub header">{track.user.username}</div>

							</div>
							{/* PLAYER FUNCTIONS */}
							<div className="ui fluid grid">
								<div className="two wide column">
									<div className="ui fluid basic black icon button" onClick={this.togglePause}><i className={this.state.paused ? "play icon" : "pause icon"}></i></div>
								</div>
								<div className="six wide column segment">
									<div className="ui fluid icon buttons">
										<div className="ui inverted red button" onClick={this.changeVolume.bind(this, false)}><i className="volume down icon"></i></div>
										<div className="ui inverted yellow button" onClick={this.changeVolume.bind(this, true)}><i className="volume up icon"></i></div>
										<div className="ui inverted green button" onClick={this.muteVolume}><i className={(this.state.muted ? "red ":"")+"volume off icon"}></i></div>
									</div>
								</div>
							</div>
							<div className="ui header">
								<div className="sub header">Playing from: {user.name}</div>
							</div>
						</div>
						<div className="two wide column">2</div>
					</div>
					:
					<div className="sixteen wide column">No Tracks being played</div>
				}
				</div>
			</div>
		);
	}
});