import React, { Component } from 'react';

class Toggle extends Component {
	state = {
		toggle: true,
	};

	handleClick = () => {
		this.setState({
			toggle: !this.state.toggle,
		});
	};
	render() {
		const { toggle } = this.state;
		return (
			<div className="toggle">
				<button className="toggle-btn" onClick={this.handleClick}>
					{toggle ? 'Authors' : 'Books'}
				</button>
				{this.props.children({ toggle })}
			</div>
		);
	}
}

export default Toggle;
