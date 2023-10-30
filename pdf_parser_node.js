const express = require("express");
const bodyParser = require("body-parser");
const PDFParser = require("pdf-parse");
const app = express();
const port = 5000;

app.use(bodyParser.raw({ type: "application/pdf", limit: "10mb" }));

app.post("/pdf", (req, res) => {
  const pdfBuffer = req.body;
  if (!pdfBuffer) {
    return res.status(400).json({ error: "No PDF file provided." });
  }

  // Use pdf-parse to extract text from the PDF
  PDFParser(pdfBuffer)
    .then((data) => {
      res.json({ text: data.text });
    })
    .catch((error) => {
      res.status(500).json({ error: "Error parsing the PDF file." });
    });
});

app.listen(port, () => {
  console.log(`PDF Parser server is running on port ${port}`);
});
