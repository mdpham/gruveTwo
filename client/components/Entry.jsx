Entry = React.createClass({
	//RENDER//
	render() {
		// const style = {height: window.innerHeight}
		return (
			<div className="ui segments" style={{marginTop: 0}}>
				<div className="ui segment">
					<div className="ui header">
						Click on the "g2" icon in the top left corner to open the menu and begin
					</div>
					<div className="ui header">
						Hover over the top right corner to open the player
					</div>
				</div>

				<div className="ui segment">
					<div className="ui fluid grid">
						<div className="one column row">
							<div className="ui header column">
							You can create an account to log in and favorite tracks.
							</div>
						</div>
						<div className="one column row">
							<div className="ui header column">
							These favorited tracks can be browsed and played.
							</div>
						</div>
						<div className="one column row">
							<div className="ui header column">
							Logging out while browsing your favorites will change the browsed tracks to a random user.
							</div>
						</div>
					</div>
				</div>

				{/* Player Features */}
				<div className="ui segment">
					<div className="ui fluid grid">
						<div className="one column row">
							<div className="ui big header column">Player</div>
						</div>
						<div className="two column row">
							<div className="ui header column">
								<i className="circular play icon"></i>
								<div className="content">Play
									<div className="sub header">Click to pause current track</div>
								</div>
							</div>
							<div className="ui header column">
								<i className="circular pause icon"></i>
								<div className="content">Pause
									<div className="sub header">Click to pause current track</div>
								</div>
							</div>
						</div>

						<div className="three column row">
							<div className="ui header column">
								<i className="circular volume down icon"></i>
								<div className="content">Volume Down
									<div className="sub header">-5%</div>
								</div>
							</div>
							<div className="ui header column">
								<i className="circular volume up icon"></i>
								<div className="content">Volume Up
									<div className="sub header">+5%</div>
								</div>
							</div>
							<div className="ui header column">
								<i className="circular volume off icon"></i>
								<div className="content">Mute
								</div>
							</div>
						</div>

						<div className="one column row">
							<div className="ui header column">
								<i className="circular random icon"></i>
								<div className="content">Play Another Track
									<div className="sub header">Plays a favorited track from the user you're currently browsing</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		);
	}
});