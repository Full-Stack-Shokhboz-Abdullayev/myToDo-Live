export class CSRF {
	getCookie(name) {
		var cookieValue = null;
		if (document.cookie && document.cookie !== "") {
			var cookies = document.cookie.split(";");
			for (var i = 0; i < cookies.length; i++) {
				var cookie = cookies[i].trim();
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) === name + "=") {
					cookieValue = decodeURIComponent(
						cookie.substring(name.length + 1)
					);
					break;
				}
			}
		}
		return cookieValue;
	}
}

export default class FetcherTasks {
	_apiBase = "https://shokhboz-to-do-app.herokuapp.com/api";

	async fetchAllTasks() {
		const tasksUrl = await fetch(`${this._apiBase}/all-tasks/`);
		const tasks = await tasksUrl.json();
		return tasks;
	}
	csrf = new CSRF().getCookie("csrftoken");
	async postTask(body = {}, url, id) {
		
		await fetch(`${this._apiBase}/${url}/${id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": this.csrf,
			},
			body: JSON.stringify({
				id: id,
				label: body.label,
				time: body.time,
				important: body.important,
				done: body.done,
			}),
		});
	}

	async deleteTask(id) {
		await fetch(`${this._apiBase}/delete-task/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": this.csrf,
			},
		});
	}
	async strike(body) {
		await fetch(`${this._apiBase}/update-task/${body.id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": this.csrf,
			},
			body: JSON.stringify({
				label: body.label,
				important: body.important,
				done: !body.done,
				id: body.id,
				time: body.time,
			}),
		});
	}
	async ness(body) {
		await fetch(`${this._apiBase}/update-task/${body.id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": this.csrf,
			},
			body: JSON.stringify({
				label: body.label,
				important: !body.important,
				done: body.done,
				id: body.id,
				time: body.time,
			}),
		});
	}
}
