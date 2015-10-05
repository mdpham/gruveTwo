Topbar = React.createClass({
	propTypes: {
		friends: React.PropTypes.array
	},
	//After initial rendering//
	componentDidMount() {
		// this.selectUser();
	},

	//METHODS//
	selectUser(friend) {
		var selected = friend ? friend : _.sample(this.props.friends);
		//Update parent/owner
		this.props.updateSelectedUser(selected);
		//Hide topbar
		$(".ui.top.sidebar").sidebar("hide");
	},

	//Buttons for selecting individual users//
	renderUserButtons() {
		// console.log(this.props.friends);
		// console.log(this);
		var elements = _.shuffle(this.props.friends).map((f, i) => {
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
			<div className="ui top sidebar">
				<div className="ui inverted segment">
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