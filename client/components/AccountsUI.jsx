Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
})

//To use Blaze UI component from accounts-ui package, wrap in a React component
AccountsUI = React.createClass({
	// componentDidMount() {
	// 	//Use Meteor Blaze to render login buttons
	// 	this.view = Blaze.render(Template.loginButtons,
	// 		React.findDOMNode(this.refs.container));
	// },

	// componentWillUnmount() {
	// 	//Clean up Blaze view
	// 	Blaze.remove(this.view);
	// },
	formValidationUpdate() {
		var _this = this;
		var validationRules = {
				username: {
					identifier: "username",
					rules: [
						{
							type: "minLength[6]"
						}
					]
				},
				password: {
					identifier: "password",
					rules: [
						{
							type: _this.state.signUp ? "match[confirmPassword]" : "empty"
						},
						{
							type: "minLength[6]"
						}
					]
				}
			}
		if (_this.state.signUp) {
			validationRules.confirmPassword = {
					identifier: "confirmPassword",
					rules: [
						{
							type: "match[password]"
						},
						{
							type: "empty"
						}
					]
				};
		};
		console.log(validationRules);
		$(".accounts.form").form({
			on: "submit",
			fields: validationRules,
			onSuccess: function(e,f) {
				console.log("validation success", e, f);
				if (_this.state.signUp) {
					_this.registerUser(f);	
				} else {
					_this.signInUser(f);
				};
				_this.setState({signUp: false});
			},
			onFailure: function(e,f) {
				console.log("validation failure", e, f);
			}
		});
	},

	componentDidMount() {
		this.formValidationUpdate();
	},
	componentDidUpdate() {
		console.log("updated");
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
	//Submit sign up
	registerUser(fields) {
		console.log("register", fields);
		Accounts.createUser({
			username: fields.username,
			password: fields.password,
			profile: {
				favorites: []
			}
		}, function(error){
			if (error) {
				alert(error.message);
			} else {
				$(".accounts.form").form("clear");
			}
		})
	},
	//Attempt to sign user in
	signInUser(fields) {
		console.log("signInUser", fields);
		var _this = this;
		Meteor.loginWithPassword({username: fields.username}, fields.password, function(error) {
			if (error) {

			} else {
				_this.props.updateLoggedIn(true);
			};
		});
	},
	signOutUser() {
		Meteor.logout(this.props.updateLoggedIn.bind(this, false));
		Meteor.logoutOtherClients();
	},


	//Render//
	render() {
		const toggleRegisterPrompt = this.state.signUp ? "Back" : "Sign Up";
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
							<div className="ui small compact basic inverted fluid button" onClick={this.toggleRegister.bind(this, false)}>Back</div>
							<div className="ui small compact inverted green fluid submit button">Submit</div>
						</div>
						: 
						<div className="ui two buttons">
							<div className="ui small compact inverted green fluid submit button">Sign In</div>
							<div className="ui small compact basic inverted fluid button" onClick={this.toggleRegister.bind(this, true)}>Sign Up</div>
						</div>
					}
				</div>
			}
			</div>
		)
	}
});