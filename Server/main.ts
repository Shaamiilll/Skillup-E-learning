import { Request , Response } from "express";
import connectDB from "./configs/Connection";
import createServer from "./configs/Server";
import userRoute from "./routes/userRouter"
import courseRoute from "./routes/courseRouter";
import orderRoute from "./routes/OrderRoute";

const { app, server } = createServer();


app.get("/", (req: Request, res: Response) => {
  res.send("Allset until now");
});

app.use("/api/user" , userRoute)
app.use("/api/course", courseRoute);
app.use("/api/order", orderRoute);

// Start the server


const PORT = process.env.PORT || 8080; // Change port to 3000 or any other available port
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
