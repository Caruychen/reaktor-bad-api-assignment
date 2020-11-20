const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express();

// Server static folder
app
  .use(express.static(__dirname + '/public'))
  .use(cors());


// Handle SPA
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname + '/public/index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));