import express from 'express';
// import sharp from 'sharp';

const app = express();
const port = 3000;

// define route for default home page
app.get('/api', (req, res) => {
  res.send("We're getting started...");
});

// start the express server
app.listen(port, (): void => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
