import React from 'react';
import AddOption from './AddOption';
import Action from './Action';
import Header from './Header';
import Options from './Options';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {

	constructor(){
		super();

		this.state = {
			options: [],
			selectedOption: undefined
		};

		this.totalOptions = []; // array with all the options from scratch
		this.count = 0; // this is the count that can be configurable. initial code has been written for count = 3

		this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
		this.handleClearSelectedOption = this.handleClearSelectedOption.bind(this);
		this.handleDeleteOption = this.handleDeleteOption.bind(this);
		this.handlePick = this.handlePick.bind(this);
		this.handleAddOption = this.handleAddOption.bind(this);
	}

	handleDeleteOptions(){
		this.count = 0;
		this.totalOptions = [];
		this.setState(() => ({ options: [] }));
	};

	handleClearSelectedOption(){
		this.setState(() => ({ selectedOption: undefined }));
	}

	handleDeleteOption(optionToRemove){
		let newOptions = [];
		
		for (let i = 0; i < this.state.options.length; i++){			
			if (this.state.options[i] === optionToRemove){
				// do nothing
			}
			else
			{
				newOptions.push(this.state.options[i]);
			}
		}

		this.setState(() => ({ options: newOptions }));
	};

	handlePick(){
		const randomNum = Math.floor(Math.random() * this.state.options.length);
		const option = this.state.options[randomNum];
		this.setState(() => ({
			selectedOption: option
		}));

		//this.optionPoint = randomNum;
	};
	
	handleAddOption(option) {
		this.setState({			
			options: this.state.options.concat(option)
		});
	};

	componentDidMount() {
	
		try {
			
			const json = localStorage.getItem('options');
			const options = JSON.parse(json);

			if (options) {
				this.setState(() => ({ options }));
			}
		} catch (e) {
			// Do nothing at all
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.options.length !== this.state.options.length) {
			const json = JSON.stringify(this.state.options);
			localStorage.setItem('options', json);
		}
	}
	componentWillUnmount() {
		console.log('componentWillUnmount');
	}

	/*
	handleDeleteOption(optionToRemove){
		let newOptions = [];
		for (let i = this.state.options.length; i > 0; i--){
			this.state.options.push(optionToRemove);
		}

		newOptions = this.state.options;
	};
	*/

	render() {
		const subtitle = 'Add your Tasks';

		let renderOptions = [];
		let displayCount = 3;

		for(let i = this.state.options.length - 1; i > -1; i--){
			renderOptions.push(this.state.options[i]);
			displayCount--;

			if (displayCount === 0){
				break;
			}
		}

		renderOptions.reverse();

		return (
			<div>
				<Header subtitle={subtitle} />
				<div className="container">
					<Action 
					hasOptions={this.state.options.length > 0}
					handlePick={this.handlePick}
				/>

				<div className="widget">
					<Options
					options={renderOptions}
					handleDeleteOptions={this.handleDeleteOptions}
					handleDeleteOption={this.handleDeleteOption}
					/>

					<AddOption
					handleAddOption={this.handleAddOption}
					/>

				</div>
			</div>

			<OptionModal
			selectedOption={this.state.selectedOption}
			handleClearSelectedOption={this.handleClearSelectedOption}
			/> 
			</div>
		);
	}
}
