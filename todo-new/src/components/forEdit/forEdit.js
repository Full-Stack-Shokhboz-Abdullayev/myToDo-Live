import React, { Component } from "react";
import FetchTasks from "../fetcher/task-fetcher";
import "./list-items.css";
import "./add-item.css";
import "./todo-list.css";

export default class TodoListEdited extends Component {
	state = {
		label: "",
		important: false,
		done: false,
		id: 0,
		time: "00:00",
		editing: false,
	};
	constructor(props) {
		super(props);
		this.addItem = this.addItem.bind(this);
	}

	classN = "btn custom";

	onEdit(task) {
		this.setState({
			...task,
			editing: true,
        });
	}
	onAdded1 = (eve) => {
		const inpValue = eve.target.value;

		this.setState({
			label: inpValue,
		});
	};

	onTimeAdded = (eve) => {
		const inpValue = eve.target.value;

		this.setState({
			time: inpValue,
		});
	};

	addItem = (e) => {
		e.preventDefault();
        let { editing, ...task } = this.state;
		let url = "create-task";
		let id = "";
		if (this.state.editing === true) {
			url = "update-task";
			id = task.id;
			this.setState({
				editing: false,
			});
		}
		new FetchTasks()
			.postTask({ ...task }, url, id)
			.then((res) => {
				this.props.onReload();
				document.getElementById("clearing").reset();
				this.setState({
					label: "",
					important: false,
					done: false,
					id: null,
					time: "00:00",
				});
			});
	};

	render() {
		const { todos, onDeleted, onImportant, onDone } = this.props;

		const inputOwn = (
			<input
				placeholder="Add-To-Do"
				className="form-control search-input"
				onChange={this.onAdded1}
				contentEditable="true"
				value={this.state.label}
			/>
		);
		const timeInput = (
			<input
				placeholder="Add-Time"
				className="form-control search-input-time"
				onChange={this.onTimeAdded}
				type="time"
				value={this.state.time}
			/>
		);
		const elementsLi = todos.map((item) => {
			const { important, done } = item;
			let spClass = "todo-list-item-label label-color";
			let tClass = "time";
			if (done) {
				spClass += " done";
				tClass += " done";
			}

			if (important) {
				spClass += " important";
			}
			const { id } = item;
			return (
				<li key={id} className="list-group-item">
					
					<span className="todo-list-item">
						<span className={tClass}>{item.time}</span>
						<span onClick={() => onDone(item)} className={spClass}>
							{item.label}
						</span>

						<button
							className="btn btn-sm btn-outline-success float-right"
							onClick={() => onImportant(item)}
						>
							<i className="far fa-exclamation" />
						</button>

						<button
							className="btn btn-sm btn-outline-info float-right"
							onClick={() => this.onEdit(item)}
						>
							<i className="far fa-pen" />
						</button>

						<button
							className="btn-sm btn-outline-danger btn float-right"
							onClick={() => onDeleted(id)}
						>
							<i className="far fa-trash" aria-hidden="true"></i>
						</button>
					</span>
				</li>
			);
		});

		return (
			<div>
				<ul className="list-group todo-list">{elementsLi}</ul>
				<form
					className="hey btn-group"
					id="clearing"
					onSubmit={this.addItem}
				>
					{inputOwn}
					{timeInput}
					<button className={this.classN}>Add</button>
				</form>
			</div>
		);
	}
}
