import { MDBInput, MDBTextArea, MDBBtn } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "./utils/api.js";

const Create = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("All fields are required");
      return;
    }
    setError("");
    setSaving(true);
    try {
      await api.post("/task", { title, description });
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
                <MDBBtn type="submit" block disabled={saving}>
                  {saving ? "Creating..." : "Create"}
                </MDBBtn>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
