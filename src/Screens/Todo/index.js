import React, { Component } from "react";
import firebase from "../../Config/Firebase";
const DB = firebase.database().ref('/')

export default class Todo extends Component {
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
		const { text, todos } = this.state;
		todos.push(text);
		this.setState({ todos, text: "" });
		DB.child('todos').set(todos)
	}

	updateTodo() {
		const { todos, text, currentIndex } = this.state;
		todos[currentIndex] = text;
		this.setState({ todos, text: "", currentIndex: null });
		DB.child('todos').set(todos)
	}

	edit(index) {
		const { todos } = this.state;
		this.setState({ text: todos[index], currentIndex: index });
	}

	delete(index) {
		const { todos } = this.state;
		todos.splice(index, 1);
		this.setState({ todos, currentIndex: null });
		DB.child('todos').set(todos)
	}

	cancel() {
		this.setState({ text: "", currentIndex: null });
	}

	renderTodos() {
		const { todos } = this.state;
		return (
			<ol>
				{todos.map((item, index) => {
					return (
						<li key={`${item}_${index}`}>
							{item}
							<button onClick={this.edit.bind(this, index)}>Edit</button>
							<button onClick={this.delete.bind(this, index)}>Delete</button>
						</li>
					);
				})}
			</ol>
		);
	}

	getTodos() {
		DB.child('todos').on("value", data => {
			console.log(data.val());
			this.setState({ todos: data.val() })
		})
	}

	componentDidMount() {
		this.getTodos()
	}


	render() {
		const { currentIndex } = this.state;
		return (
			<div>
				<div style={{ marginBottom: "50px" }}>
					<hr />
					<input
						type="text"
						placeholder="Enter something"
						onChange={this.updateText}
						value={this.state.text}
					/>
					{currentIndex == null ? (
						<button onClick={this.add}>Add</button>
					) : (
							<span>
								<button onClick={this.updateTodo}>Update</button>
								<button onClick={this.cancel}>Cancel</button>
							</span>
						)}
					<hr />
					{currentIndex != null && (
						<p>You are editing item # {currentIndex + 1} currently</p>
					)}
					{this.renderTodos()}
				</div>
			</div>
		)
	}
}