let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text: text, completed: false });
        updateTaskList();
        taskInput.value = ''; 
    }
};

const updateTaskList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            tasks[index].completed = checkbox.checked;
            updateTaskList(); 
        });

      
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        if (task.completed) {
            taskText.style.textDecoration = 'line-through';
        }

      
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            updateTaskList();
        });

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });

   
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = document.getElementById('progress');
    const numbers = document.getElementById('numbers');
    
    if (totalTasks > 0) {
        const progressPercentage = (completedTasks / totalTasks) * 100;
        progress.style.width = `${progressPercentage}%`;
        numbers.textContent = `${completedTasks}/${totalTasks}`;
    } else {
        progress.style.width = '0%';
        numbers.textContent = '0/0';
    }
};


document.getElementById('taskForm').addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
});
