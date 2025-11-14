let tasks = [];

document.getElementById('addBtn').addEventListener('click', addTask);
document.getElementById('deleteAllBtn').addEventListener('click', deleteAllTasks);

function addTask() {
    const taskText = document.getElementById('taskInput').value;
    const taskDate = document.getElementById('dateInput').value;

    if (!taskText || !taskDate) return;

    tasks.push({ text: taskText, date: taskDate });

    document.getElementById('taskInput').value = '';
    document.getElementById('dateInput').value = '';

    renderTasks(); // Tampilkan langsung setelah ditambahkan
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function deleteAllTasks() {
    tasks = [];
    renderTasks();
}

function filterTasks(mode) {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    let filtered = [];

    if (mode === 'semua') {
        filtered = tasks;
    } else if (mode === 'hari-ini') {
        filtered = tasks.filter(task => task.date === today);
    } else if (mode === 'minggu-ini') {
        filtered = tasks.filter(task => {
            const taskDate = new Date(task.date);
            return taskDate >= startOfWeek && taskDate <= endOfWeek;
        });
    } else if (mode === 'bulan-ini') {
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        filtered = tasks.filter(task => {
            const taskDate = new Date(task.date);
            return taskDate.getMonth() === currentMonth && taskDate.getFullYear() === currentYear;
        });
    }

    renderTasks(filtered, true);
}

function renderTasks(list = tasks, isFiltered = false) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    list.forEach((task, index) => {
        const actualIndex = isFiltered ? tasks.indexOf(task) : index;

        const li = document.createElement('li');
        li.innerHTML = `
      <span>${task.text} - ${task.date}</span>
      <button onclick="deleteTask(${actualIndex})">Delete</button>
    `;
        taskList.appendChild(li);
    });
}
