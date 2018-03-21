class Counter extends React.Component {
	constructor(props) {
		super(props) {
		this.handleAddOne = this.handleAddOne.bind(this);
		this.handleMinusOne = this.handleMinusOne.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.state = {
			count: 0
		};
	}

	componentDidMount() {
		const stringCount = localStorage 
