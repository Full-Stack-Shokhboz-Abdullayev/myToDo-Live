import React, { Component } from "react";
import ReactDOM from "react-dom";
import Buttons from "./components/item-status-filter/item-status-filter";
import CustomH1 from "./components/app-header/app-header";
import CustomInput from "./components/search-panel/search-panel";
import "./css/index.css";
import "./css/main.css";
import "./css/bootstrap.min.css";
import fav from "./favicon.ico";
import "./img/fontawesome/css/all.css";
import FetchTasks from "./components/fetcher/task-fetcher";
import Edit from "./components/forEdit/forEdit";

document.getElementById("icon").href = fav;

export default class App extends Component {
	maxId = 100;

	constructor(props) {
		super(props);
		this.state = {
			forALabel: [this.createToDoItem("Fetching...", "00:00")],
			term: "",
			set: "all",
			created: {
				label: "",
				important: false,
				done: false,
				id: null,
				time: "00:00",
			},
			editing: false,
		};

		this.fetchTasks();
	}

	fetchTasks = () => {
		new FetchTasks()
			.fetchAllTasks()
			.then((tasks) => {
				tasks.forEach((element) => {
					element.time = element.time.slice(0, 5);
				});

				return tasks;
			})
			.then((tasks) => {
				this.setState({ forALabel: tasks });
			});
	};

	createToDoItem(label, time = "00:00") {
		return {
			label,
			important: false,
			done: false,
			id: this.maxId++,
			time: time !== "" ? time : "00:00",
		};
	}
	deleteItem = (id) => {
		new FetchTasks().deleteTask(id).then(() => this.fetchTasks());
	};

	properties(arr, id, prName) {
		const item = arr.findIndex((e) => e.id === id);
		const oldItem = arr[item];
		const newItem = { ...oldItem, [prName]: !oldItem[prName] };

		const newArr = [...arr.slice(0, item), newItem, ...arr.slice(item + 1)];

		return newArr;
	}
	// Buni ham o'rgan -- .slice() ni ham
	onImp = (body) => {
		new FetchTasks().ness(body).then(() => this.fetchTasks());
	};
	// Yaxshilab o'rgan
	onDone = (body) => {
		new FetchTasks().strike(body).then(() => this.fetchTasks());
	};

	setTerm = (key) => {
		this.setState({
			term: key,
		});
	};
	onSearch(Items, keyWord) {
		if (keyWord.length === 0) {
			return Items;
		}
		return Items.filter((item) => {
			return item.label.toLowerCase().indexOf(keyWord.toLowerCase()) > -1;
		});
	}

	ButtClicked(Items, set) {
		switch (set) {
			case "done":
				return Items.filter((item) => {
					return item.done;
				});
			case "active":
				return Items.filter((item) => {
					return !item.done;
				});
			case "important":
				return Items.filter((item) => {
					return item.important;
				});
			case "all":
				return Items;
			default:
				return Items;
		}
	}

	onFilter = (key) => {
		this.setState({ set: key });
	};
	//tushunmaganding
	render() {
		const currentYear = new Date().getFullYear();
		const { forALabel, term, set } = this.state;

		let visibleItems = this.ButtClicked(
			this.onSearch(forALabel, term),
			set
		);
		const hello = "hello";
		const doneCount = forALabel.filter((data) => data.done).length;
		const toDoCount = forALabel.length - doneCount;

		return (
			<div className="myContainer">
				<div className="todo-app">
					<CustomH1 toDo={toDoCount} done={doneCount} />
					<div className="top-panel d-flex my-flex">
						<CustomInput onSearch={this.setTerm} />
						<Buttons onFilter={this.onFilter} filter={set} />
					</div>

					<Edit
						todos={visibleItems}
						onDeleted={this.deleteItem}
						onImportant={this.onImp}
						onDone={this.onDone}
						onReload={this.fetchTasks}
					/>
				</div>
				<div className="footer">
					<div>
						<p>Created by Shokhboz Abdullayev</p>
						<p id="copyright">
							&copy; Copyright{" "}
							<span id="year">{currentYear}</span>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("root"));
