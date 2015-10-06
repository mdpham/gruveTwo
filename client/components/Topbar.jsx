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
			<div className="ui vertical compact basic inverted fluid buttons">
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
					<h1 className="ui center aligned inverted header">gruvetwo</h1>
					<div className="ui grid container">
						<div className="three wide column">
							<h6 className="ui small inverted horizontal divider">People</h6>
							{ this.renderUserButtons() }
						</div>
						<div className="ten wide column">
							<h3 className="ui inverted header">
								<span>
								This is my <a href="https://github.com/mdpham/gruveTwo" target="_blank">first attempt</a> at a Soundcloud app built on React and Meteor after some frustration with Angular.
								I haven't really figured out if React's states lend themselves better to making use of the Soundcloud API + SoundManager2 than Angular's dependency injections, but I quite like both.
								</span>
								<br></br>
								<span>
								Click any of the Soundcloud users to the right to browse and play their favourite tracks. Still waiting on <a href="https://soundcloud.com/leeemichael" target="_blank">this guy</a> and even <a href="https://soundcloud.com/rfeng-2" target="_blank">this guy</a> to start liking tracks.
								</span>
							</h3>
							{/*Button for random selection*/}
							<div 
								className="ui compact basic inverted fluid button" 
								onClick={this.selectUser.bind(this, null)}>
								Random
							</div>
						</div>
						<div className="three wide column">
							<h6 className="ui small inverted horizontal divider">Account</h6>
							<AccountsUI updateLoggedIn={this.props.updateLoggedIn} loggedIn={this.props.loggedIn}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
});