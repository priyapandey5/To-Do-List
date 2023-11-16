window.addEventListener('load', () => {
    const form = document.querySelector("#task-form");
    const input = document.querySelector("#task-input");
    const list_el = document.querySelector("#tasks");

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
	function renderTasks() {
		list_el.innerHTML = '';
	
		tasks.forEach((task) => {
			const task_el = document.createElement('div');
			task_el.classList.add('task');
	
			const task_content_el = document.createElement('div');
			task_content_el.classList.add('content');
	
			const task_details_el = document.createElement('div');
			task_details_el.classList.add('details');
	
			// Ensure task has properties and they are not null
			const priority = task && task.priority !== undefined ? task.priority : '';
			const dueDate = task && task.dueDate !== undefined ? task.dueDate : '';
	
			task_details_el.innerHTML = `Priority: ${priority}, Due Date: ${dueDate}`;
	
			task_el.appendChild(task_content_el);
			task_el.appendChild(task_details_el);
	
			const task_input_el = document.createElement('input');
			task_input_el.classList.add('text');
			task_input_el.type = 'text';
			task_input_el.value = task && task.task ? task.task : '';
			task_input_el.setAttribute('readonly', 'readonly');
	
			task_content_el.appendChild(task_input_el);
	
			const task_actions_el = document.createElement('div');
			task_actions_el.classList.add('actions');
	
			const task_edit_el = document.createElement('button');
			task_edit_el.classList.add('edit');
			task_edit_el.innerText = 'Edit';
	
			const task_delete_el = document.createElement('button');
			task_delete_el.classList.add('delete');
			task_delete_el.innerText = 'Delete';
	
			task_actions_el.appendChild(task_edit_el);
			task_actions_el.appendChild(task_delete_el);
	
			task_el.appendChild(task_actions_el);
	
			list_el.appendChild(task_el);
	
			task_edit_el.addEventListener('click', () => {
				if (task_edit_el.innerText.toLowerCase() == "edit") {
					task_edit_el.innerText = "Save";
					task_input_el.removeAttribute("readonly");
					task_input_el.focus();
				} else {
					task_edit_el.innerText = "Edit";
					task_input_el.setAttribute("readonly", "readonly");
				}
			});
	
			task_delete_el.addEventListener('click', () => {
				// Remove task from tasks array
				const index = tasks.indexOf(task);
				if (index !== -1) {
					tasks.splice(index, 1);
					// Save tasks to local storage after removal
					saveTasksToLocalStorage();
				}
				// Remove task from the DOM
				list_el.removeChild(task_el);
			});
		});
	}

    // Function to save tasks to local storage
    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        try {
            const task = input.value;
            const priority = document.querySelector("#task-priority").value;
            const dueDate = document.querySelector("#task-due-date").value;

            if (task !== "") {
                const taskObj = {
                    task,
                    priority: priority || '', // ensure priority is defined
                    dueDate: dueDate || '' // ensure dueDate is defined
                };

                tasks.push(taskObj);

                input.value = '';
                document.querySelector("#task-priority").value = '';
                document.querySelector("#task-due-date").value = '';

                renderTasks();

                // Save tasks to local storage
                saveTasksToLocalStorage();
            } else {
                throw new Error("Task cannot be empty. Please enter a valid task.");
            }
        } catch (error) {
            alert("An error occurred: " + error.message);
        }
    });

    // Load tasks from local storage and render them on page load
    renderTasks();
});
