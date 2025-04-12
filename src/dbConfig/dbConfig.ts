import mongoose from "mongoose";
export async function connectDb() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected Successfully");
    });

    connection.on("error", (err) => {
      console.log("MongoDB connection error");
      console.log(err);
      process.exit();
    });
  } catch (error) {
    console.log("Something goes wrong");
    console.log(error);
  }
}
