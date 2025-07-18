const root = ReactDOM.createRoot(document.getElementById("root"));

// Task Manager App
const tasks = [
  {
    id: 1,
    task: "Task to do",
    date: "18.07.2025",
    info: "Info "
  },
];

const Task = ({ task, date, info, handleEditTask, handleDeleteTask, index }) => {
  const [isEdit, setIsEdit] = React.useState(false);

  const taskRef = React.useRef();
  const dateRef = React.useRef();
  const infoRef = React.useRef();

  const handleClickSave = () => {
    handleEditTask(index, taskRef.current.value, dateRef.current.value, infoRef.current.value);
    setIsEdit(false);
  };

  return isEdit ? (
    <div className="input-group">
      <input
        className="ms-3"
        ref={taskRef}
        type="text"
        defaultValue={task}
      />
      <input ref={dateRef} type="text" defaultValue={date} />
      <input ref={infoRef} type="text" defaultValue={info} />
      
      <button onClick={handleClickSave} className="btn btn-success">
        Save
      </button>
    </div>
  ) : (
    <>
      <p className="mt-3 ms-3">{task}</p>
      <p className="mt-3 ms-3">{date}</p>
      <p className="mt-3 ms-3">{info}</p>
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
  const handleEditTask = (index, newTask, newDate, newInfo) => {
    const copyListOfTasks = [...listOfTasks];

    copyListOfTasks[index].task = newTask;
    copyListOfTasks[index].date = newDate;
    copyListOfTasks[index].info = newInfo

    setListOfTasks(copyListOfTasks);
  };
  const handleDeleteTask = (index) => {
    setListOfTasks(listOfTasks.filter((_, ind) => ind != index));
  };
  const handleAddTask = () => {
    const newTask = {
      id: listOfTasks.length,
      task: "New Task",
      date: "New Date",
      info: "New Info",
    };
    setListOfTasks([...listOfTasks, newTask, newDate, newInfo]);
  };

  return (
    <>
      {listOfTasks.map(({ id, task, date, info }, index) => (
        <Task
          key={id}
          task={task}
          date={date}
          info={info}
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
