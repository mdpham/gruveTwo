//Tracks
Tracks = React.createClass({
	//For listing tracks
	renderAllTracks() {
		console.log(this.props);
		return (this.props.tracksToDisplay.map((track) => {
			return (
				<Track track={track} key={track.id} updateSelectedTrack={this.props.updateSelectedTrack}/>
			);
		}))
	},

	//RENDER//
	render() {
		const fixedStyle = {height: (window.innerHeight - $(".top.menu").outerHeight(true)), maxHeight: (window.innerHeight - $(".top.menu").outerHeight(true)), overflow: "scroll"};
		return (
				<div className="ui stackable padded grid" style={fixedStyle}>
						{this.renderAllTracks()}
				</div>
		);
	}
})