import Task from "../models/taskModel.js";
import mongoose from "mongoose";

// For Get all Task
const getAllTask = async (req, res) => {
  try {
    const allTask = await Task.find();

    return res.status(200).send({
      status: true,
      data: allTask,
    });
  } catch (err) {
    console.log("Something went wrong ", err);
    return res.status(500).send({
      status: false,
      message: "Internal Server Error",
    });
  }
};

// For Get Task by id
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(422).send({
        status: false,
        message: "Invalid id",
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).send({
        status: false,
        message: "Task not Found",
      });
    }

    return res.status(200).send({
      status: true,
      task: task,
    });
  } catch (err) {
    console.log("Something went wrong ", err);
    return res.status(500).send({
      status: false,
      message: "Internal Server Error",
    });
  }
};

// For create Task
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body || {};

    if (!title || !description) {
      return res.status(422).send({
        status: false,
        message: "All fields are required",
      });
    }

    const newTask = await Task.create({ title, description });

    return res.status(201).send({
      status: true,
      message: "Task Created Successfully",
      task: newTask,
    });
  } catch (err) {
    console.log("Something went wrong ", err);
    return res.status(500).send({
      status: false,
      message: "Internal Server Error",
    });
  }
};

// For updated Task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, is_complete } = req.body || {};

    if (!mongoose.isValidObjectId(id)) {
      return res.status(422).send({
        status: false,
        message: "Invalid id",
      });
    }

    if (
      title === undefined &&
      description === undefined &&
      is_complete === undefined
    ) {
      return res.status(422).send({
        status: false,
        message: "No fields provided to update",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, is_complete },
      { new: true, runValidators: true },
    );

    if (!updatedTask) {
      return res.status(404).send({
        status: false,
        message: "Task not Found",
      });
    }

    return res.status(200).send({
      status: true,
      message: "Task Updated Successfully",
      task: updatedTask,
    });
  } catch (err) {
    console.log("Something went wrong ", err);
    return res.status(500).send({
      status: false,
      message: "Internal Server Error",
    });
  }
};

// For delete Task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(422).send({
        status: false,
        message: "Invalid id",
      });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).send({
        status: false,
        message: "Task not Found",
      });
    }

    return res.status(200).send({
      status: true,
      message: "Task Deleted Successfully",
    });
  } catch (err) {
    console.log("Something went wrong ", err);
    return res.status(500).send({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export { getAllTask, getTaskById, createTask, updateTask, deleteTask };
