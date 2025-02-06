import axios from "axios";
import { useState } from "react";

const TheBigForm = () => {

    const [jobDesc, setJobDesc] = useState('');
    const [resume, setResume] = useState('');
    const [loading, setLoading] = useState(false);
    const [display, setDisplay] = useState('');


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
            console.log(attemptTheImpossible);
            alert('Submitted');
            setDisplay(attemptTheImpossible.data.response)
        } catch (err) {
            console.log(err.message);
            alert('Failed.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit} method="post">
                <div>
                    <label htmlFor='jobDesc'>Job Description</label>
                    <textarea id='jobDesc' name="jobDesc" value={jobDesc} onChange={handleJobDescChange} />
                </div>
                <div>
                    <label htmlFor="resume">Resume</label>
                    <input type="file" id="resume" name="resume" onChange={handleResumeChange} />
                </div>
                <input type="submit" value='Submit' />
            </form>
            {loading && <>Loading...</>}
            {!loading && <>
                <div>
                    {display}
                </div>
            </>}
        </div>
    )
}

export default TheBigForm;