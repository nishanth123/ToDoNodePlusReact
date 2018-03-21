import React from 'react';

export default class IndecisionApp extends React.Component {

	constructor(){
		super();

		this.handleTodoOfGuest = this.handleTodoOfGuest.bind(this);
		this.handleMessageofGuest = this.handleMessageofGuest.bind(this);
		
		this.state = {
      TodoOfGuest: "",
      MessageofGuest: "",
    };
	}

	handleTodoOfGuest(){
		this.setState({ TodoOfGuest: event.target.value });
	};

	handleMessageofGuest(){
		this.setState({ MessageofGuest: event.target.value });
	};

	// addToGuestBook = event => {
  //   event.preventDefault();
  //   this.setState({
  //     TodoOfGuest: event.target.value,
  //     MessageofGuest: event.target.value,
	// });

	componentDidMount() {

	}

	componentDidUpdate(prevProps, prevState) {

	}

	componentWillUnmount() {
		console.log('componentWillUnmount');
	}

	render() {
		const subtitle = 'Add your Tasks';
		return (
			<div>
				<div>
					<input
						onChange={this.handleTodoOfGuest}
						name="TodoOfGuest"
						value={this.state.TodoOfGuest}
						placeholder="Enter your todo"
					/>
					<textarea
						onChange={this.handleMessageofGuest}
						name="MessageofGuest"
						value={this.state.MessageofGuest}
						placeholder="Type a message"
					/>
				</div>

				<div>
					<button
							className="submitbuttonguestbook"
							type="submit"
							onClick={this.addToGuestBook}
								>
							Submit to Todosbook<i className="GuestBookButton2" aria-hidden="true" />
					</button>
				</div>
			</div>
		);
	}
}
