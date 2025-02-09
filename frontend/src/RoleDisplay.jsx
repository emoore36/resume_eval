import PropTypes from 'prop-types';
import AttributeList from './AttributeList';

const RoleDisplay = ({ data }) => {
    const { notes, pros, cons, likelihood } = data;

    return (
        <>
            {data && <div className='d-flex flex-column mx-1 my-5'>
                <div>
                    <h5>Rating</h5>
                    <h5 className='h1'>{data && JSON.stringify(likelihood)}</h5>
                </div>
                <div className='d-flex'>
                    <AttributeList label={'Pros'} data={pros} />
                    <AttributeList label={'Cons'} data={cons} />
                </div>
                <div className='d-flex flex-column m-5'>
                    <h5>Notes</h5>
                    <p>{data && JSON.stringify(notes)}</p>
                </div>
            </div>}
        </>
    )
}

RoleDisplay.propTypes = {
    data: PropTypes.object
}

export default RoleDisplay;