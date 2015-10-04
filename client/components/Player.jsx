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
	playNext() {
		console.log("play next", _.sample(this.props.selectedUser.favorites));
		const randomTrack = _.sample(this.props.selectedUser.favorites);
		this.props.updateSelectedTrack(randomTrack);
	},

	//RENDER//
	render() {
		const user = this.props.selectedUser;
		const track = this.props.selectedTrack;
		const playButtonClasses = "circular" + (this.state.paused ? " play " : " pause ") + "icon";
		return (
			<div className="player-popup ui fluid popup">
				<div className="ui fluid grid inverted segment">
				{ track ? 
					<div className="middle aligned row">
						<div className="three wide column">
							<div className="ui medium fluid image">
								<img src={track.artwork_url}></img>
							</div>
						</div>
						<div className="eleven wide column">
							{/* CURRENT TRACK INFO */}
							<div className="ui inverted header">
								{track.title}
								<div className="sub header">{track.user.username}</div>

							</div>
							{/* PLAYER FUNCTIONS */}
							<div className="ui fluid grid">
								<div className="two wide column">
									<div className="ui large fluid inverted green icon button" onClick={this.togglePause}>
										<i className={playButtonClasses}></i>
									</div>
								</div>
								<div className="six wide column segment">
									<div className="ui large fluid icon buttons">
										<div className="ui inverted yellow button" onClick={this.changeVolume.bind(this, false)}><i className="large volume down icon"></i></div>
										<div className="ui inverted yellow button" onClick={this.changeVolume.bind(this, true)}><i className="large volume up icon"></i></div>
										<div className="ui inverted yellow button" onClick={this.muteVolume}><i className={(this.state.muted ? "red ":"")+"large volume off icon"}></i></div>
									</div>
								</div>
								<div className="two wide column">
									<div className="ui large fluid inverted basic red icon button" onClick={this.playNext}>
										<i className="large circular icons">
											<i className="random icon"></i>
											<i className="corner inverted pink heart icon"></i>
										</i>
									</div>
								</div>
							</div>


							<div className="ui inverted header">
								<div className="sub header">Courtesy of:</div>
								{user.name}
							</div>
						</div>
						<div className="two wide column">2</div>
						<div className="sixteen wide column">16</div>
					</div>
					:
					<div className="sixteen wide column">No Tracks being played</div>
				}
				</div>
			</div>
		);
	}
});