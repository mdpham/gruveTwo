Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
})

//To use Blaze UI component from accounts-ui package, wrap in a React component
AccountsUI = React.createClass({
	formValidationUpdate() {
		var _this = this;
		var validationRules = {
				username: {
					identifier: "username",
					rules: [ { type: "minLength[6]" } ]
				},
				password: {
					identifier: "password",
					rules: [ { type: _this.state.signUp ? "match[confirmPassword]" : "empty" }, { type: "minLength[6]" } ]
				}
			};
		if (_this.state.signUp) {
			validationRules.confirmPassword = {
					identifier: "confirmPassword",
					rules: [ { type: "match[password]" }, { type: "empty" } ]
				};
		};
		// console.log(validationRules);
		$(".accounts.form").form({fields: validationRules});
	},
	accountsErrorPopup(error) {
		var element;
		switch (error.reason) {
			case "Incorrect password":
				element = $("input[name='password']");
				break;
			default:
				element = $("input[name='username']");
		};
		element.popup({
			position: "left center",
			content: error.reason,
			onVisible: () => {
				//Remove the popup once user goes to change input
				$(window).on("mousemove", () => {
					element.popup("destroy")
				});
			},
		}).popup("show");
	},

	componentDidMount() {
		this.formValidationUpdate();
	},
	componentDidUpdate() {
		// console.log("updated");
		this.formValidationUpdate();
	},
	getInitialState() {
		return ({
			//true => sign up, false => sign in
			signUp: false
		});
	},

	//METHODS//
	//Change state to show sign in or sign up fields
	toggleRegister(up) {
		this.setState({signUp: up});
	},
	//Submit new user
	registerUser() {
		var form = $(".accounts.form");
		var _this = this;
		if (form.form("is valid")) {
			let fields = form.form("get values");
			Accounts.createUser({
				username: fields.username,
				password: fields.password,
				profile: {
					favorites: []
				}
			}, (error) => {
				if (error) {
					console.log("ERROR REGISTERING:", error);	
					this.accountsErrorPopup(error);
				} else {
					console.log("SUCCESS REGISTERING");
					$(".accounts.form").form("clear");
					_this.meteorSignIn(fields);
				};
			});
		} else {
			console.log("FAILURE REGISTERING");
		};
	},
	meteorSignIn(fields) {
		var _this = this;
		Meteor.loginWithPassword({username: fields.username}, fields.password, (error) => {
			if (error) {
				console.log("ERROR SIGNING IN:", error);
				this.accountsErrorPopup(error);
			} else{
				console.log("SUCCESS SIGNING IN:", Meteor.user());
				_this.props.updateLoggedIn(true);
			};
		});
	},
	//Attempt to sign user in
	signInUser() {
		var form = $(".accounts.form");
		var _this = this;
		if (form.form("is valid")) {
			//Get field values and log in
			let fields = form.form("get values");
			_this.meteorSignIn(fields);
		} else {
			//Reject
			console.log("FAILURE SIGNING IN");
		};
	},
	//Sign user out
	signOutUser() {
		Meteor.logout(() => {this.props.updateLoggedIn(false)});
		Meteor.logoutOtherClients();
	},


	//Render//
	render() {
		return (
			<div>
			{ 
				this.props.loggedIn ? <div className="ui small compact inverted red fluid button" onClick={this.signOutUser}>Sign Out</div>
				:
				<div className="accounts ui inverted form">
					<div className="field">
						<div className="ui small fluid input">
						<input name="username" type="text" placeholder="Username"></input>
						</div>
					</div>
					<div className="field">
						<div className="ui small fluid input">
						<input name="password" type="password" placeholder="Password"></input>
						</div>
					</div>
					{	this.state.signUp ?
						<div className="field">
							<div className="ui small fluid input">
							<input name="confirmPassword" type="password" placeholder="Confirm Password"></input>
							</div>
						</div>
						: ""
					}
					{ this.state.signUp ?
						<div className="ui two buttons">
							<div className="ui small compact basic inverted fluid icon button" onClick={this.toggleRegister.bind(this, false)}><i className="caret left icon"></i></div>
							<div className="ui small compact inverted green fluid button" onClick={this.registerUser}>Register</div>
						</div>
						: 
						<div className="ui two buttons">
							<div className="ui small compact inverted green fluid button" onClick={this.signInUser}>Sign In</div>
							<div className="ui small compact basic inverted fluid icon button" onClick={this.toggleRegister.bind(this, true)}><i className="add user icon"></i></div>
						</div>
					}
				</div>
			}
			</div>
		)
	}
});