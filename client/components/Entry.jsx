Entry = React.createClass({
	//RENDER//
	render() {
		// const style = {height: window.innerHeight}
		return (
			<div className="ui segments">
				<div className="ui segment">
					<div className="ui header">
						<div className="content">
							gruvetwo
							<div className="sub header">Click on the "g2" icon in the top left corner to open the menu and begin</div>
						</div>
					</div>
					<div className="ui horizontal divider"></div>
				</div>

				<div className="ui segment">
					<div className="ui fluid grid">
						<div className="one column row">
							<div className="ui big header column">
								Player
							</div>
						</div>
						<div className="two column row">
							<div className="ui header column">
								<i className="circular play icon"></i>
								<div className="content">
									Play
									<div className="sub header">Click to pause current track</div>
								</div>
							</div>
							<div className="ui header column">
								<i className="circular pause icon"></i>
								<div className="content">
									Pause
									<div className="sub header">Click to pause current track</div>
								</div>
							</div>
						</div>

						<div className="three column row">
							<div className="ui header column">
								<i className="circular volume down icon"></i>
								<div className="content">
									Volume Down
									<div className="sub header">-5%</div>
								</div>
							</div>
							<div className="ui header column">
								<i className="circular volume up icon"></i>
								<div className="content">
									Volume Up
									<div className="sub header">+5%</div>
								</div>
							</div>
							<div className="ui header column">
								<i className="circular volume off icon"></i>
								<div className="content">
									Mute
								</div>
							</div>
						</div>



					</div>
				</div>
			</div>
		);
	}
});