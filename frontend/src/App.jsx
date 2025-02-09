import { Spinner } from 'reactstrap';
import './App.css'
import TheBigForm from './TheBigForm'
import ResultDisplay from './ResultDisplay';
import { useState } from 'react';
import axios from 'axios';


function App() {

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const processRequest = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('jobDesc', data.jobDesc);
    formData.append('resume', data.resume);

    try {
      const sendRequest = await axios.post(import.meta.env.VITE_BACKEND_URL, formData);
      const data = sendRequest.data.response;
      setResponse(data)
    } catch (err) {
      console.log('Error occurred:', err);
      setResponse({ "error": 'Failure!' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <TheBigForm onSubmit={processRequest} />
      {loading && <Spinner />}
      {(!loading && response) && <ResultDisplay data={response} />}
    </>
  )
}

export default App
