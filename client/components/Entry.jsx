Entry = React.createClass({
	propTypes: {
		friends: React.PropTypes.array
	},
	//After initial rendering//
	componentDidMount() {
		this.selectUser();
	},

	//METHODS//
	selectUser(friend) {
		var Entry = this;
		var selected = friend ? friend : _.sample(Entry.props.friends);
		console.log(selected);
		//Update parent/owner
		this.props.updateSelected(selected);
	},
	//For showing/hiding entry into (i.e. selectin user etc)
	toggleEntry() {
		$(".entry-content").transition("fade down");
	},

	//Buttons for selecting individual users//
	renderUserButtons() {
		// console.log(this.props.friends);
		// console.log(this);
		var elements = this.props.friends.map((f, i) => {
			// console.log(this);
			return <div className="ui button" onClick={this.selectUser.bind(this, f)} data-friend={f} key={i}>{f.name}</div>;
		});
		// console.log(elements);
		return (
			<div className="ui vertical fluid buttons">
				{elements}
			</div>
		);
	},

	//RENDER//
	render() {
		const loadingClassName = "ui dimmer " + (this.props.loadingSelected ? "active": "");
		return (
			<div className="ui segments" style={{marginBottom: 0}}>
				<div className="ui clearing inverted compact segment">
						<div className="ui left floated huge header">
							<a onClick={this.toggleEntry}><i className="play icon"></i></a>
						</div>
						<div className="ui left floated huge header">gruvetwo</div>
				</div>
				<div className="entry-content ui fixed inverted segment">
  				<div className={loadingClassName}><div className="ui text loader">Fetching...</div></div>
					<div className="ui grid container">
						<div className="five wide column">
								{ this.renderUserButtons() }
						</div>
						<div className="eleven wide column">
							{/*Button for random selection*/}
							<div 
								className="ui fluid button" 
								onClick={this.selectUser.bind(this, null)}>
								Random
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});