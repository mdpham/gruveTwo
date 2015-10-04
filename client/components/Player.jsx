//Player
Player = React.createClass({
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

	renderTracks() {
		return (this.props.selectedUser.favorites.map((track) => {
			return (
				<Track track={track} key={track.id} updateSelectedTrack={this.props.updateSelectedTrack}/>
			);
		}))
	},

	//RENDER//
	render() {
		return (
			<div className="ui stackable padded grid">
					{this.renderTracks()}
			</div>
		);
	}
})