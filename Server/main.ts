import connectDB from "./configs/Connection";
import createServer from "./configs/Server";

const { app, server } = createServer();

// Start the server
const PORT = process.env.PORT || 8080; // Change port to 3000 or any other available port
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
