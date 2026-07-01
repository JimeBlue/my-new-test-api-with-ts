import express from "express";

// Initialize the Express application instance
const app = express();

const port = process.env.PORT || 8080;

// app.get--> 2 arguments: where (location) and what (request and response)
app.get("/", (req, res) => {
  res.send("hello world");
});

// listen expects a port, which was declared at top, and a callback function
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});