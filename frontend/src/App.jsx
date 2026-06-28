import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./utils/api.js";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const allTask = async () => {
    try {
      const res = await api.get("/task");
      setTasks(res.data.data); // backend responds with { status, data: [...] }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    // allTask sets state only after an awaited fetch, so no cascading render
    // eslint-disable-next-line react-hooks/set-state-in-effect
    allTask();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/task/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-10 mt-5 mx-auto">
          <div className="card">
            <h1 className="text-center fw-bold text-primary">Task App</h1>
            <div className="d-flex justify-content-end">
              <Link to="/create" className="btn btn-primary">
                Create Task
              </Link>
            </div>
            <div className="card-body">
              <MDBTable>
                <MDBTableHead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Handle</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {tasks.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center text-muted">
                        No tasks yet. Create one to get started.
                      </td>
                    </tr>
                  ) : (
                    tasks.map((task, index) => (
                      <tr key={task._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>
                          <span
                            className={`badge ${
                              task.is_complete ? "bg-success" : "bg-secondary"
                            }`}
                          >
                            {task.is_complete ? "Completed" : "Pending"}
                          </span>
                        </td>
                        <td>
                          <Link
                            to={`/edit/${task._id}`}
                            className="btn btn-sm btn-warning me-2"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(task._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </MDBTableBody>
              </MDBTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
