import axios from "axios";
import { useState } from "react";
import ResultDisplay from "./ResultDisplay";
import { Button, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';

const TheBigForm = () => {
    const [jobDesc, setJobDesc] = useState('');
    const [resume, setResume] = useState('');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    const handleJobDescChange = (e) => {
        setJobDesc(e.target.value);
    }

    const handleResumeChange = (e) => {
        setResume(e.target.files[0]);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!resume) return alert('Resume required.');
        if (!jobDesc) return alert('jobDesc required.');

        const formData = new FormData();
        formData.append('jobDesc', jobDesc);
        formData.append('resume', resume);

        try {
            const attemptTheImpossible = await axios.post('http://localhost:3000', formData);
            const data = attemptTheImpossible.data.response;
            setResponse(data)
        } catch (err) {
            console.log('Error occurred:', err);
            setResponse({ "error": 'Failure!' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Form onSubmit={handleFormSubmit} method="post">
                <FormGroup>
                    <Label htmlFor='jobDesc'>Job Description</Label>
                    <Input type='textarea' id='jobDesc' name="jobDesc" value={jobDesc} onChange={handleJobDescChange} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="resume">Resume</Label>
                    <Input type="file" id="resume" name="resume" onChange={handleResumeChange} />
                </FormGroup>
                <Button color="primary">Submit</Button>
            </Form>
            {loading && <Spinner />}
            {!loading && <ResultDisplay data={response} />}
        </div>
    )
}

export default TheBigForm;