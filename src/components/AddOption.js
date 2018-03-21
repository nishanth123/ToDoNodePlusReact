import React from 'react';

export default class AddOption extends React.Component {
	constructor(){
		super();
		
		// this line has been added by Lokesh
		this.handleAddOption = this.handleAddOption.bind(this);
		
		this.state = {
			error: undefined,
			tempOption: undefined
		};
	}	
	
	handleAddOption(e) {
		
		e.preventDefault();
		const option = e.target.elements.option.value.trim();
		const error = this.props.handleAddOption(option);

		this.setState(() => ({ error }));

		if (!error) {
			e.target.elements.option.value = '';
		}
	};
	
	render() {
		
		return (

			<div>
				{this.state.error && <p className="add-option-error">{this.state.error}</p>}
				<form className="add-option" onSubmit={this.handleAddOption}>
					<input placeholder="Add your todo here" className="add-option__input" type="text" name="option"  />
					<button className="button">Add ToDo</button>
				</form>
			</div>
		);
	}
}
