# Resume Evaluator
A little app that allows me to ask ChatGPT if he recommends the prospective candidate apply a job given the job description and candidate's resume.

## Technological Requirements
- an [OpenAI API account](https://platform.openai.com/)
- Node v20.10.0
- npm 10.2.5

## Installation
- Create an [OpenAI API account](https://platform.openai.com/)
- fork/clone this repository to your local machine
- create a `backend/.env` file:
  - add `OPENAI_API_KEY=<my_api_key>` to the file
  - The API key in question comes from creating a project on your OpenAI account.

## Running locally
To run the backend server:
- `cd backend`
- `npm i`
- `npm run dev`

To run the frontend client:
- `cd frontend`
- `npm i`
- `npm run dev`

Then open your favorite web browser to http://localhost:5173/.

## Using the features

### Prerequisite resources
- a **PDF** resume in your local drive
- (Optional) The text of a job description from [LinkedIn](https://www.linkedin.com/jobs/) or [Indeed](https://www.indeed.com/browsejobs), for example.

### Steps
- Go to http://localhost:5173/ if you haven't already.
- Paste the job description text into the "Job Description" textarea.
- Click the "Choose File" button.
- Select your **PDF** resume from your local machine.
- Click the "Submit" button.
- Wait a few seconds for the response to come in.
- See what ChatGPT has to say about the candidate's fit for the role (and visa versa)

## Troubleshooting

### I put in my resume and job description and it merely failed.
 - Ensure you've started up the backend server.
   - Open a separate browser and go to http://localhost:5000/.
   - If you don't get a JSON response, the server isn't running.
   - See above for running the server.

### I tried to start the client/server and it failed to run.
  - Ensure you've installed the necessary dependencies.
    - Open a command terminal, navigate to the folder of the client/server, and run `npm i`.

### I tried to install the dependencies and it failed.
 - ~~Sounds like a skill issue, tbh. :p~~
 - Please open an [issue](https://github.com/emoore36/resume_eval/issues/new?template=Blank+issue) and explain the situation in as much detail as you can. Copy/paste those ridiculously long stacktraces. There's gotta be something good in there.