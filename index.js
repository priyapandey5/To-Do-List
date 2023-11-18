window.addEventListener('load', () => {
    const taskInput = document.getElementById('task-input');
    const priorityInput = document.getElementById('priority-input');
    const dateInput = document.getElementById('date-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    if (!taskInput || !priorityInput || !dateInput || !addTaskBtn || !taskList) {
        console.error('One or more elements not found. Check the element IDs.');
        return;
    }

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="checkbox-container">
                    <input type="checkbox" id="task-${index}" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                    <label class="checkbox-label" for="task-${index}">
                        ${task.description} - Priority: ${task.priority}, Date: ${task.date}
                    </label>
                </div>
                <div class="actions-container">
                    <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(listItem);
        });

        // Save tasks to local storage
        saveTasks();
    }

    // Add new task
    function addTask() {
        try {
            if (!taskInput || !priorityInput || !dateInput) {
                throw new Error('One or more input elements not found. Check the element IDs.');
            }

            const description = taskInput.value.trim();
            const priority = priorityInput.value.trim();
            const date = dateInput.value.trim();

            if (description !== '') {
                const newTask = {
                    description,
                    priority,
                    date,
                    completed: false
                };
                tasks.push(newTask);
                taskInput.value = '';
                priorityInput.value = '';
                dateInput.value = '';
                renderTasks();
            } else {
                throw new Error('Task description cannot be empty!');
            }
        } catch (error) {
            console.error('An error occurred while adding a task:', error.message);
        }
    }

    // Edit task
    window.editTask = function (index) {
        const newDescription = prompt('Enter the new task description:', tasks[index].description);
        if (newDescription !== null) {
            tasks[index].description = newDescription.trim();
            renderTasks();
        }
    };

    // Delete task
    window.deleteTask = function (index) {
        const confirmDelete = confirm('Are you sure you want to delete this task?');
        if (confirmDelete) {
            tasks.splice(index, 1);
            renderTasks();
        }
    };

    // Toggle task completion
    taskList.addEventListener('change', (e) => {
        const checkbox = e.target;
        const index = checkbox.id.split('-')[1];
        tasks[index].completed = checkbox.checked;
        renderTasks();
    });

    // Add task button click event
    addTaskBtn.addEventListener('click', addTask);

    // Initial render
    renderTasks();

    // Save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
