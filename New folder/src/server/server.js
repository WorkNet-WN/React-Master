// const express = require('express');
// const { exec } = require('child_process');
// const path = require('path');

// const app = express();
// app.use(express.json());

// // Enable CORS
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// app.post('/process', (req, res) => {
//   const inputData = req.body.textData;

//   // Execute Python script
//   const scriptPath = path.join(__dirname, 'your_script.py');
//   exec(`python "${scriptPath}" "${inputData}"`, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error executing Python script: ${error.message}`);
//       res.status(500).json({ error: 'Internal Server Error' });
//       return;
//     }

//     if (stderr) {
//       console.error(`Python script error: ${stderr}`);
//       res.status(400).json({ error: 'Invalid input' });
//       return;
//     }

//     const result = stdout.trim();
//     res.json({ result });
//   });
// });

// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });


const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/process', (req, res) => {
  // Handle the POST request from HomePage.js
  const inputData = req.body.textData;

  // Execute the Python script and send back the result
  const scriptPath = path.join(__dirname, 'your_script.py');
  exec(`python "${scriptPath}" "${inputData}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (stderr) {
      console.error(`Python script error: ${stderr}`);
      res.status(400).json({ error: 'Invalid input' });
      return;
    }

    const result = stdout.trim();
    res.json({ result });
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
