import PropTypes from 'prop-types';
import RoleDisplay from './RoleDisplay';
import { UncontrolledAlert } from 'reactstrap';

const ResultDisplay = ({ data }) => {
    const hiringManagerAssessment = data?.hiring_manager_assessment;
    const jobCoachAssessment = data?.job_coach_assessment;
    return (
        <>
            {!data.error && <div className='d-flex my-5'>
                <div>
                    <h2>Hiring Manager Assessment:</h2>
                    <RoleDisplay data={hiringManagerAssessment} /></div>
                <div>
                    <h2>Job Coach Assessment:</h2>
                    <RoleDisplay data={jobCoachAssessment} /></div>
            </div>}
            {data.error && <UncontrolledAlert color='danger'>{data.error}</UncontrolledAlert>}
        </>
    )
}

ResultDisplay.propTypes = {
    data: PropTypes.object
}

export default ResultDisplay;