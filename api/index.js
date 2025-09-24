import serverless from "serverless-http";
import app from "../server.js";  // Import the app

export default serverless(app);
