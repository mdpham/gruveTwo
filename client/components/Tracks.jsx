//Tracks
Tracks = React.createClass({
	componentDidMount() {
		// console.log($(React.findDOMNode(this.refs.playerModal)));
		// $(React.findDOMNode(this.refs.playerModal)).modal("show");
		// console.log(this.props);
	},

	//METHODS//
	handleHover: {
		handleEnterr: function(e){

		},
		handleLeave: function(e){
		}
	},
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