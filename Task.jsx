const root = ReactDOM.createRoot(document.getElementById("root"));

// Task Manager App
const tasks = [
  {
    id: 1,
    task: "Task to do",
  },
  {
    id: 2,
    task: "Task to do",
  },
];

const Task = ({ task, handleEditTask, handleDeleteTask, index }) => {
  const [isEdit, setIsEdit] = React.useState(false);
  
  const taskRef = React.useRef();

  const handleClickSave = () => {
    handleEditTask(index, taskRef.current.value);
    setIsEdit(false);
  }

  return isEdit ? (
    <div className="input-group">
      <input
        className="form-control"
        ref={taskRef}
        type="text"
        defaultValue={task}
      />
      <button onClick={handleClickSave} className="btn btn-success">
        Save
      </button>
    </div>
  ) : (
    <>
      <p>{task}</p>
      <button onClick={() => setIsEdit(true)} className="btn btn-warning">
        Edit
      </button>
      <button onClick={handleDeleteTask} className="btn btn-danger">
        Delete
      </button>
    </>
  );
};

const TaskList = () => {
  const [listOfTasks, setListOfTasks] = React.useState(tasks);
  const handleEditTask = (index, newTask) => {
    const copyListOfTasks = [...listOfTasks];


    copyListOfTasks[index].task = newTask;
   
    setListOfTasks(copyListOfTasks);
  }
  const handleDeleteTask = (index) => {
    setListOfTasks(listOfTasks.filter((_, ind) => ind != index));
  }

  return (
    <>
      {listOfTasks.map(({ id, task }, index) => (
        <Task
          key={id}
          task={task}
          handleEditTask={handleEditTask}
          handleDeleteTask={() => handleDeleteTask(index)}
          index={index}
        />
      ))}
    </>
  )
}

root.render(<TaskList/>);
