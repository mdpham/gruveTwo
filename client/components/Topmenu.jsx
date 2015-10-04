Topmenu = React.createClass({
	componentDidMount(){
		$(".show-player").popup({
			context: ".top.menu", 
			popup: $(".player-popup"),
			on: "hover",
			hoverable: true,
			position: "bottom right"
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
			<div className="ui top menu" style={{marginBottom: 0}}>
				<div className="cursored item" onClick={this.toggleTopbar}>
					<div className="ui huge header">g2</div>
				</div>
				<div className="item">
					{ this.props.selectedUser ? <div className="ui header">{this.props.selectedUser.name}<div className="sub header"></div></div> : "" }
				</div>
				<div className="show-player cursored right item">
					<i className="big orange video play icon"></i>
				</div>
				<Player selectedUser={this.props.selectedUser} selectedTrack={this.props.selectedTrack}/>
			</div>
		)
	}
});