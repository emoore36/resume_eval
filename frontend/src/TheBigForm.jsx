import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import PropTypes from 'prop-types';

const TheBigForm = ({ onSubmit }) => {
    const [jobDesc, setJobDesc] = useState('');
    const [resume, setResume] = useState('');


    const handleJobDescChange = (e) => {
        setJobDesc(e.target.value);
    }

    const handleResumeChange = (e) => {
        setResume(e.target.files[0]);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!resume) return alert('Resume required.');
        if (!jobDesc) return alert('jobDesc required.');

        await onSubmit({ resume, jobDesc });
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
        </div>
    )
}

TheBigForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default TheBigForm;