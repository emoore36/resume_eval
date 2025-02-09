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

  let response = await getHisInput(jobDesc, resume);

  response = response.substring(7, response.length - 4);
  response = JSON.parse(response);

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
          How likely are you (on a scale of 1 to 10) to hire this candidate for this position compared to the average likely candidate? Explain your reasoning.
          Now assume the role of a job coach.
          How likely are you (on a scale of 1 to 10) to recommend that this candidate apply for this position compared to other positions?
          What relevant advice would you give this candidate?
          For each of these roles, provide "pros" and "cons" for both the candidate's suitability for the position (as a hiring manager) and the position's suitability for the candidate (as a job coach).
          Provide your responses as JSON objects in a format such as this:
          """
          {
            "hiring_manager_assessment": {
                "likelihood": "integer between 1 and 10",
                "pros": ["pro 1", "pro 2", ...],
                "cons": ["con 1", "con 2", ...],
                "notes": "further text detailing reasons for given likelihood_to_hire."
            },
            "job_coach_assessment": {
                "likelihood": "integer between 1 and 10",
                "pros": ["pro 1", "pro 2", ...],
                "cons": ["con 1", "con 2", ...],
                "notes": "further text detailing reasons for given likelihood_to_hire."
            }
        }
          """
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
    ]
  });
  const result = completion.choices[0].message?.content;
  return result;
}

module.exports = router;
