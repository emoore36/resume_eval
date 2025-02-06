var express = require('express');
const multer = require('multer');
const OpenAI = require("openai");
const fs = require("fs");
const pdfParse = require('pdf-parse');
var router = express.Router();


const upload = multer({ dest: 'uploads/' });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ page: 'index', title: 'Express' });
});

router.post('/', upload.single('resume'), async (req, res, next) => {
  const { jobDesc } = req.body;
  const resume = req.file;

  if (!jobDesc) return res.status(400).json({ 'error': 'jobDesc is required.' });
  if (!resume) return res.status(400).json({ 'error': 'resume is required.' });

  const response = await getHisInput(jobDesc, resume);

  return res.json({ response });
});

const getHisInput = async (jobDesc, resume) => {
  const openai = new OpenAI();

  // Read and parse the PDF
  const pdfBuffer = fs.readFileSync(resume.path);
  const data = await pdfParse(pdfBuffer);
  const extractedText = data.text;

  // Cleanup - remove file after processing
  fs.unlinkSync(resume.path);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
          Assume the role of a hiring manager.
          Provided by the user is the job description of a company position and the content of a resume from a prospective candidate.
          How likely are you (on a scale of 1 to 10) to hire this candidate for this position? Explain your reasoning.
          Now assume the role of a job coach.
          How likely are you (on a scale of 1 to 10) to recommend that this candidate apply for this position?
          What relevant advice would you give this candidate?
          `
      },
      {
        role: "user",
        content: `Job Description: ${jobDesc}`,
      },
      {
        role: "user",
        content: `Resume: ${extractedText}`,
      },
    ],
    store: true,
  });
  const result = completion.choices[0].message?.content;
  return result;
}

module.exports = router;
