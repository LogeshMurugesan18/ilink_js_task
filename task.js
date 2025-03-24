class Task{
  constructor(name,description,status='Pending',dueDate) {
    this.name=name;
    this.description=description;
    this.status=status;
    this.dueDate=dueDate; 
  }
}
let tasks=JSON.parse(localStorage.getItem('tasks')) || [];
const displayTasks=(filter='All')=>{
  const tasksTable=document.getElementById('tasks');
  tasksTable.innerHTML='';
  tasks.forEach((task,index)=>{
    if(filter==='All'||task.status===filter){
      const row=document.createElement('tr');
      row.innerHTML=`<td>${task.name}</td>
      <td>${task.description}</td>
      <td>${task.status}</td>
      <td>${task.dueDate}</td>
      <td>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
        <button onclick="changeStatus(${index})">Change Status</button>
      </td>
    `; tasksTable.appendChild(row);
    }
  })
};
//filter function
const filterTasks=()=>{
  const filterValue=document.getElementById('filter').value;
  displayTasks(filterValue);
}
//add function
const addTask = (event) => {
  const name=document.getElementById('taskname').value.trim();
  const description=document.getElementById('taskdesc').value.trim();
  const status=document.getElementById('taskstatus').value;
  const dueDate=document.getElementById('duedate').value; 

  const newTask=new Task(name,description,status,dueDate);
  tasks.push(newTask);//push the new data into array
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();
  document.querySelector('form').reset(); //Clear form fields
};
//delete function
const deleteTask=(index)=>{
  tasks.splice(index,1); //removes task
  localStorage.setItem('tasks',JSON.stringify(tasks));
  displayTasks();
};
window.onload=displayTasks;//loads data when page is refreshed
//status function
const changeStatus=(index)=>{
  const task=tasks[index];
  task.status=task.status==='Pending' ? 'Completed' : 'Pending';
  localStorage.setItem('tasks',JSON.stringify(tasks));
  displayTasks();
}
//edit function
const editTask = (index) => {
  const task = tasks[index];
  const newName = prompt('Enter new Task Name:',task.name);
  const newDescription = prompt('Enter new Task Description:',task.description);
  const newDueDate = prompt('Enter new Due Date:',task.dueDate);

  task.name=newName.trim();
  task.description=newDescription.trim();
  task.dueDate=newDueDate; 
  localStorage.setItem('tasks',JSON.stringify(tasks)); 
  displayTasks();
};

