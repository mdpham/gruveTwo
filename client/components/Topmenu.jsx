Topmenu = React.createClass({
	componentDidMount(){
		$(".show-player").popup({
			context: ".top.menu", 
			popup: $(".player-popup"),
			on: "hover",
			hoverable: true,
			position: "bottom right",
			delay: {
				show: 250,
				hide: 500
			}
		});
	},

	//METHODS//
	toggleTopbar() {
		$(".ui.top.sidebar").sidebar({
			context: $("#app"),
			transition: "scale down"
		}).sidebar("toggle");
	},

	//RENDER//
	render() {
		const trackTitle = this.props.selectedTrack ? this.props.selectedTrack.title : "";
		const trackArtist = this.props.selectedTrack ? this.props.selectedTrack.user.usename : "";
		// console.log("selectedUser", this.props.selectedUser);
		return (
			<div className="ui top borderless menu" style={{marginBottom: 0}}>
				<div className="cursored item" onClick={this.toggleTopbar}>
					<div className="ui header"><i className="circular icon">g2</i></div>
				</div>
				{ this.props.selectedUser ? 
					<div className="item">
						<div className="ui header">
							<div className="sub header">browsing</div>
							<a target="_blank" href={this.props.selectedUser.user.permalink_url}><span>{this.props.selectedUser.name}</span></a>
						</div>
					</div>
					:
					"" }
				<div className="right menu">
				<div className="item">
					{ this.props.selectedTrack ?
						<div className="ui right aligned small header">
							<div className="sub header">
								<span>{this.props.selectedTrack.user.username}</span>
							</div>
							<a href={this.props.selectedTrack.permalink_url} target="_blank"><span>{this.props.selectedTrack.title}</span></a>
						</div>
						: "" }
				</div>
				<div className="show-player cursored item">
				{ this.props.selectedTrack ? 
					<div className="ui right aligned header">
					<div className="sub header">
						<span className="position-duration"></span>
					</div>
					<div className="sub header">
						<span className="volume-indicator"></span><i className="volume up icon"></i>
					</div>
					</div>
					:
					<div className="ui right aligned header">
					<div className="sub header">
						powered by
					</div>
					<div className="sub header">
						<i className="big orange soundcloud icon"></i>
					</div>
					</div> }
				</div>
				</div>
				<Player selectedUser={this.props.selectedUser} selectedTrack={this.props.selectedTrack} updateSelectedTrack={this.props.updateSelectedTrack} playingFrom={this.props.playingFrom}/>
			</div>
		)
	}
});