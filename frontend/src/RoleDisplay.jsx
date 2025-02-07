import PropTypes from 'prop-types';

const RoleDisplay = ({ data }) => {
    const { notes, likelihood } = data;

    return (
        <>
            {data && <div className='d-flex flex-column mx-5'>
                <div className='h1'>{data && JSON.stringify(likelihood)}</div>
                <div>{data && JSON.stringify(notes)}</div>
            </div>}
        </>
    )
}

RoleDisplay.propTypes = {
    data: PropTypes.object
}

export default RoleDisplay;