const root = ReactDOM.createRoot(document.getElementById("root"));

// Task Manager App
const tasks = [
  {
    id: 1,
    task: "Task to do",
  },
];

const Task = ({ task, handleEditTask, handleDeleteTask, index }) => {
  const [isEdit, setIsEdit] = React.useState(false);

  const taskRef = React.useRef();

  const handleClickSave = () => {
    handleEditTask(index, taskRef.current.value);
    setIsEdit(false);
  };

  return isEdit ? (
    <div className="input-group">
      <input
        className="form-control ms-3"
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
      <p className="mt-3 ms-3">{task}</p>
      <button onClick={() => setIsEdit(true)} className="btn btn-warning ms-3">
        Edit
      </button>
      <button onClick={handleDeleteTask} className="btn btn-danger ms-3">
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
  };
  const handleDeleteTask = (index) => {
    setListOfTasks(listOfTasks.filter((_, ind) => ind != index));
  };
  const handleAddTask = () => {
    const newTask = {
      id: listOfTasks.length,
      task: "New Task",
    };
    setListOfTasks([...listOfTasks, newTask]);
  };

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
      <div>
        <button
          onClick={handleAddTask}
          className="btn btn-primary btn-lg mt-3 ms-3"
        >
          Add Task
        </button>
      </div>
    </>
  );
};

root.render(<TaskList />);
