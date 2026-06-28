import mongoose from "mongoose";

const conn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "todo_db" });
    console.log("Database connect Successfully");
  } catch (err) {
    console.log("Database connection error ", err);
  }
};

export default conn;
