const express = require("express");

const app = express();

// Handle production
if (process.env.NODE_ENV === 'production') {
  // Server static folder
  app.use(express.static(__dirname + '/public'));

  // Handle SPA
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname + '/public/index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));