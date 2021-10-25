import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RequestsContext } from "../../context/requestContext";
import { modalsActions } from "../../Redux/modalsReducer";
import { taskDelete, taskUpdate } from "../../Redux/tasksReducer";
import EmptyList from "../ui/emptyList";
import MiniLoader from "../ui/miniLoader";
import Pagination from "../ui/pagination";

const TaskList = ({ tasks,loading,handleMore,search,isMore }) => {

  const dispatch = useDispatch();

  const handleUpdate = (task) => {
      dispatch(modalsActions.show({name: 'Update Task',data: task}));
  }

  const handleDelete = async (task) => {
      dispatch(taskDelete(task));
  }

  const handleCompleted = (task) => {
      dispatch(taskUpdate(task,{completed: !task.completed}));
  }

  return (
    <main className="home-content">
      {tasks.length === 0 && <EmptyList />}
      {tasks && tasks.length > 0 && tasks.map((task) => {
        return (
          <div className="tasks" key={task._id}>
            <div className="task-completion-box">
              <p className="task-heading"> {task.task} </p>
              <section
                className="task-completion"
                onClick={handleCompleted.bind(null,task)}
              >
                {task.completed === true && (
                  <FontAwesomeIcon icon={faCheck} className="completed-icon" />
                )}
              </section>
            </div>
            <div className="task-buttons">
              <button
                type="button"
                className="task-update"
                onClick={handleUpdate.bind(null,task)}
              >
                Update
              </button>
              <button
                type="button"
                className="task-remove"
                onClick={handleDelete.bind(null,task)}
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
      {loading && <MiniLoader />}
      {!search && isMore && <Pagination handleMore={handleMore} />}
    </main>
  );
};

export default TaskList;
