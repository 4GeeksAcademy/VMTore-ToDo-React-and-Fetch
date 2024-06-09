import React, { useEffect, useState } from "react";

function Home() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  const addTask = (event) => {
    setTask(event.target.value);
  };

  //Completar tarea

  const taskCompletion = async (index, taskId, currentLabel, completed) => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${taskId}`, // /todos/{todo_id}
        {
          method: "PUT",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            label: currentLabel,
            is_done: !completed,
          }),
        }
      );

      const result = await response.json();
      console.log(result);
      await consultToDos();
    } catch (error) {
      console.log(error);
    }
  };

  //Ver la lista de tareas

  const consultToDos = async () => {
    try {
      console.log("consultToDo");
      const response = await fetch(
        "https://playground.4geeks.com/todo/users/VeroMT",
        {
          method: "GET",
          headers: { accept: "application/json" },
        }
      );

      const data = await response.json();
      console.log(data);
      setTaskList(data.todos);
    } catch (error) {
      console.log(error);
    }
  };

  //Llamar a crear usuario si no existe y llamar a la lista de tareas

  useEffect(() => {
    const initializeUser = async () => {
      await createUser();
      await consultToDos();
    };

    initializeUser();
  }, []);

  //Crear usuario para el useEffect

  //----------------------------------POST---------------------------------//

  const createUser = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/users/VeroMT",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_name: "VeroMT",
          }),
        }
      );

      if (response.ok) {
        console.log("User created");
      } else {
        console.error("The user already exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Añadir tarea

  //----------------------------------POST---------------------------------//

  const addToDo = async (event) => {
    event.preventDefault();
    try {
      if (task.length > 5 && task.length < 50) {
        const labelValue = task;
        const response = await fetch(
          "https://playground.4geeks.com/todo/todos/VeroMT", //  /todos/{user_name}
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              label: labelValue,
              is_done: false,
            }),
          }
        );
        const result = await response.json();

        await consultToDos();
        setTask(""); // Limpiar el campo de entrada después de añadir la tarea
      } else {
        alert("La tarea deber tener entre 5 y 50 caracteres");
        setTask("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Completar tarea

  //----------------------------------PUT----------------------------------//

  const markAsTrue = async (id, currentLabel) => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${id}`, // /todos/{todo_id}
        {
          method: "PUT",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            label: `${currentLabel}`, //poner text decoration tachar
            is_done: true,
          }),
        }
      );

      const result = await response.json();
      console.log(result);
      await consultToDos();
    } catch (error) {
      console.log(error);
    }
  };

  //Borrar tarea

  //--------------------------------DELETE--------------------------------//

  const markToDelete = async (id) => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${id}`,
        {
          method: "DELETE",
          headers: { accept: "application/json" },
        }
      );

      console.log(response);
      await consultToDos();
    } catch (error) {
      console.log(error);
    }
  };

  //Borrar todas las tareas

  //-----------------------------DELETE ALL-------------------------------//

  const deleteAllTasks = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/todos/VeroMT", // Endpoint para eliminar todas las tareas?
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("All tasks deleted");
        await consultToDos(); // Actualiza la lista de tareas después de eliminar todas
      } else {
        console.error("Failed to delete all tasks");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Número total de tareas pendientes

  const pendingTasksCount = taskList.filter((task) => !task.is_done).length;

  //Renderizado del componente

  return (
    <div className="text-center">
      <h1 className="mt-5">
        <strong>ToDo List </strong>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 24 24"
        >
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <g
              fill="none"
              strokeDasharray="10"
              strokeDashoffset="10"
              strokeWidth="2"
            >
              <path d="M3 5L5 7L9 3">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="0.2s"
                  values="10;0"
                />
              </path>
              <path d="M3 12L5 14L9 10">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.5s"
                  dur="0.2s"
                  values="10;0"
                />
              </path>
              <path d="M3 19L5 21L9 17">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="1s"
                  dur="0.2s"
                  values="10;0"
                />
              </path>
            </g>
            <g
              fill="currentColor"
              fillOpacity="0"
              strokeDasharray="22"
              strokeDashoffset="22"
            >
              <rect width="9" height="3" x="11.5" y="3.5" rx="1.5">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.2s"
                  dur="0.5s"
                  values="22;0"
                />
                <animate
                  fill="freeze"
                  attributeName="fill-opacity"
                  begin="1.7s"
                  dur="0.15s"
                  values="0;0.3"
                />
              </rect>
              <rect width="9" height="3" x="11.5" y="10.5" rx="1.5">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.7s"
                  dur="0.5s"
                  values="22;0"
                />
                <animate
                  fill="freeze"
                  attributeName="fill-opacity"
                  begin="1.9s"
                  dur="0.15s"
                  values="0;0.3"
                />
              </rect>
              <rect width="9" height="3" x="11.5" y="17.5" rx="1.5">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="1.2s"
                  dur="0.5s"
                  values="22;0"
                />
                <animate
                  fill="freeze"
                  attributeName="fill-opacity"
                  begin="2.1s"
                  dur="0.15s"
                  values="0;0.3"
                />
              </rect>
            </g>
          </g>
        </svg>
      </h1>
      <form className="mx-5 mt-3" onSubmit={addToDo}>
        <input
          type="text"
          onChange={addTask}
          className="form-control"
          id="floatingInputValue"
          placeholder="Add some task"
          value={task}
          name="taskTodo"
        />
        <button className="btn btn-warning mt-4 mx-1" type="submit">
          Add ToDo
        </button>
        <button
          className="btn btn-dark mt-4 mx-1"
          type="button"
          onClick={deleteAllTasks}
        >
          Delete All
        </button>
      </form>
      <ul className="list-group mt-4 mx-5">
        {taskList.map((task, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span
              style={{
                textDecoration: task.is_done ? "line-through" : "none",
              }}
              onClick={() =>
                taskCompletion(index, task.id, task.label, task.is_done)
              }
            >
              {task.label}
            </span>
            <div className="ml-auto">
              <button
                className="btn btn-success mx-1"
                onClick={() => markAsTrue(task.id, task.label)}
              >
                Done
              </button>
              <button
                className="btn btn-dark mx-1"
                onClick={() => markToDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p>Pending tasks {pendingTasksCount}</p>
      <p className="mb-0 sticky-bottom">
        <a
          className="navbar-brand"
          target="_blank"
          href="https://github.com/VMTore"
        >
          Made by ©VMTore <i class="fab fa-github"></i>
        </a>
      </p>
    </div>
  );
}

export default Home;
