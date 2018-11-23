import React, { Component } from "react";
import firebase from "../../Config/Firebase";
import { connect } from "react-redux";
import { updateUser } from "../../Config/Redux/Actions/authActions";
import { Button, Grid, TextField, List, ListItem, ListItemText, ListItemSecondaryAction } from "@material-ui/core";

const DB = firebase.database().ref('/')

class Todo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			todos: [],
			text: "",
			currentIndex: null
		}
		this.add = this.add.bind(this);
		this.updateText = this.updateText.bind(this);
		this.cancel = this.cancel.bind(this);
		this.updateTodo = this.updateTodo.bind(this);
		this.getTodos = this.getTodos.bind(this);

	}


	updateText(e) {
		this.setState({
			text: e.target.value
		});
	}

	add() {
		let { text, todos, user } = this.state;
		if (!todos) {
			todos = []
			todos.push(text);
		} else {
			todos.push(text);
		}
		if (text.length > 0) {
			this.setState({ todos, text: "" });
			DB.child(`todos/${user.uid}`).set(todos)
		} else {
			alert('PLease enter something')
		}
	}

	updateTodo() {
		let { todos, text, currentIndex, user } = this.state;
		todos[currentIndex] = text;
		this.setState({ todos, text: "", currentIndex: null });
		DB.child(`todos/${user.uid}`).set(todos)
	}

	edit(index) {
		let { todos } = this.state;
		this.setState({ text: todos[index], currentIndex: index });
	}

	delete(index) {
		let { todos, user } = this.state;
		todos.splice(index, 1);
		this.setState({ todos, currentIndex: null });
		DB.child(`todos/${user.uid}`).set(todos)
	}

	cancel() {
		this.setState({ text: "", currentIndex: null });
	}

	renderTodos() {
		let { todos } = this.state;
		return (
			<List>
				{todos && todos.map((item, index) => {
					return (
						<ListItem key={`${item}_${index}`} button>
							<ListItemText inset primary={item} />
							<ListItemSecondaryAction>
								<Button size="small" variant="contained" color="primary" onClick={this.edit.bind(this, index)}>Edit</Button>
								<Button size="small" variant="contained" color="secondary" onClick={this.delete.bind(this, index)}>Delete</Button>
							</ListItemSecondaryAction>
						</ListItem>

					);
				})}
			</List>
		);
	}

	getTodos() {
		let { user } = this.state
		DB.child(`todos/${user.uid}`).on("value", data => {
			// console.log(data.val());
			this.setState({ todos: data.val() })
		})
	}

	static getDerivedStateFromProps(props) {
		return { user: props.user }
	}

	componentDidMount() {
		this.getTodos()
	}


	render() {
		let { currentIndex } = this.state;
		return (
			<div>
				<div style={{ marginBottom: "50px" }}>

					<Grid
						container
						direction="row"
						justify="center"
						alignItems="center"
					>
						<Grid item xs={10} md={8}>
							<TextField
								style={{ margin: 8 }}
								fullWidth
								margin="normal"
								InputLabelProps={{
									shrink: true,
								}}
								placeholder="Enter something"
								autoFocus={true}
								onChange={this.updateText}
								value={this.state.text}
							/>
							{currentIndex == null ? (
								<Button size="large" variant="contained" color="primary" onClick={this.add}>Add</Button>
							) : (
									<span>
										<Button size="small" variant="contained" color="primary" onClick={this.updateTodo}>Update</Button>
										<Button size="small" variant="contained" color="secondary" onClick={this.cancel}>Cancel</Button>
									</span>
								)}
						</Grid>
					</Grid>


					{currentIndex != null && (
						<p>You are editing item # {currentIndex + 1} currently</p>
					)}
					<Grid
						container
						direction="row"
						justify="center"
						alignItems="center"
					>
						<Grid item xs={10} md={8}>
							{this.renderTodos()}
						</Grid>
					</Grid>
				</div>
			</div>
		)
	}
}

let mapStateToProps = state => {
	// console.log("state from component", state);
	return {
		user: state.authReducers.user
	};
};

let mapDispatchToProps = dispatch => {
	// console.log("dispatch from component", dispatch);
	return {
		updateUser: user => dispatch(updateUser(user))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);