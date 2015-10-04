Topmenu = React.createClass({
	//METHODS//
	toggleTopbar() {
		$(".ui.top.sidebar").sidebar({
			context: $("#app"),
			transition: "overlay"
		}).sidebar("toggle");
	},

	//RENDER//
	render() {
		const trackTitle = this.props.selectedTrack ? this.props.selectedTrack.title : "";
		const trackArtist = this.props.selectedTrack ? this.props.selectedTrack.user.usename : "";
		return (
			<div className="ui top text menu">
				<div className="cursored item" onClick={this.toggleTopbar}>
					<div className="ui huge header">g2</div>
				</div>
				<div className="item">
					{ this.props.selectedTrack ? <div className="ui header">{trackTitle}<div className="sub header"></div></div> : "" }

					
				</div>
				<div className="item">
					
				</div>				
			</div>
		)
	}
});