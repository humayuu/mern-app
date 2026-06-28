import {
  MDBInput,
  MDBTextArea,
  MDBBtn,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./utils/api.js";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/task/${id}`);
        const task = res.data.task; // backend responds with { status, task }
        setTitle(task.title);
        setDescription(task.description);
        setIsComplete(task.is_complete);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load task.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("All fields are required");
      return;
    }
    setError("");
    setSaving(true);
    try {
      await api.put(`/task/${id}`, {
        title,
        description,
        is_complete: isComplete,
      });
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 mx-auto mt-5">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center fw-bold text-primary">Task App</h1>
              <div className="d-flex justify-content-end">
                <Link to="/" className="btn btn-primary px-4 mb-3">
                  Back
                </Link>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              {loading ? (
                <p className="text-center text-muted">Loading...</p>
              ) : (
                <form onSubmit={handleSubmit}>
                  <MDBInput
                    className="mb-4"
                    type="text"
                    id="title"
                    label="Enter Title"
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <MDBTextArea
                    className="mb-4"
                    id="description"
                    label="Enter Description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <MDBCheckbox
                    className="mb-4"
                    id="is_complete"
                    label="Mark as completed"
                    checked={isComplete}
                    onChange={(e) => setIsComplete(e.target.checked)}
                  />
                  <MDBBtn type="submit" block disabled={saving}>
                    {saving ? "Updating..." : "Update"}
                  </MDBBtn>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
