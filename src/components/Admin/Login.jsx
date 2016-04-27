import React from 'react';

class Login extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let props = this.props;
		
		return (
			<div className="container">
				<form className="form-signin">
					<h2 className="form-signin-heading">乐翻天户外管理系统</h2>
					<label for="inputEmail" className="sr-only">Email address</label>
					<input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus/>
					<label for="inputPassword" className="sr-only">Password</label>
					<input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
					<div className="checkbox">
						<label>
							<input type="checkbox" value="remember-me"/> 记住我
						</label>
					</div>
					<button className="btn btn-lg btn-primary btn-block" type="submit">请登录</button>
				</form>
			</div>
		);
	}
}

export default Login;



