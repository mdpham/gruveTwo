//Tracks
Tracks = React.createClass({
	//For listing tracks
	renderAllTracks() {
		return (this.props.selectedUser.favorites.map((track) => {
			return (
				<Track track={track} key={track.id} updateSelectedTrack={this.props.updateSelectedTrack}/>
			);
		}))
	},

	//RENDER//
	render() {
		const fixedStyle = {maxHeight: (window.innerHeight - $(".top.menu").outerHeight(true)), overflow: "scroll"};
		return (
				<div className="ui stackable padded grid" style={fixedStyle}>
						{this.renderAllTracks()}
				</div>
		);
	}
})