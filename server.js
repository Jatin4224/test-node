import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;
//const PORT = 4000 -> it will never work on production.

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(
      `server is running fine at ${PORT} in ${process.env.NODE_ENV} mode`,
    );
  });
};

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

start().catch((err) => {
  console.error("failed to start server", err);
  process.exit(1);
});
