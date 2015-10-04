Track = React.createClass({
	

	//mouseEnter and mouseLeave handlers
	//	Passed the track.id since it is the reference for the current Track component
	changeTrackBackground: function(trackID){
		// console.log("enter", e, React.findDOMNode(this.refs[e]));
		React.findDOMNode(this.refs[trackID]).style.backgroundColor = randomColor({luminosity: "light"});
		React.findDOMNode(this.refs["artwork"+trackID]).style.opacity = 0.1;
	},
	revertTrackBackground: function(trackID){
		// console.log("leave", e);
		React.findDOMNode(this.refs[trackID]).style.backgroundColor = "white";
		React.findDOMNode(this.refs["artwork"+trackID]).style.opacity = 1;
	},
	//Click handler for playing track
	clickTrack: function(track){
		this.props.updateSelectedTrack(track);
	},

	//RENDER//
	render() {
		const track = this.props.track;
		const style = {
			backgroundImage: "url("+track.waveform_url+")",
			backgroundSize: "cover"
		}
		return (
			<div
				onClick={this.clickTrack.bind(this, track)}
				onMouseEnter={this.changeTrackBackground.bind(this, track.id)} onMouseLeave={this.revertTrackBackground.bind(this,track.id)}
				className="cursored ui eight wide column middle aligned stackable row" key={track.id} ref={track.id}
				style={style}>
					<div className="four wide column">
						<div className="ui fluid medium image" ref={"artwork"+track.id}><img src={track.artwork_url}/></div>
					</div>
			    <div className="twelve wide column">
			      <div className="ui header">{track.title}<div className="sub header">{track.user.username}</div></div>
			    </div>
			</div>
		)
	}
});