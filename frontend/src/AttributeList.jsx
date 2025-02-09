import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';

const AttributeList = ({ label, data }) => {
    return (
        <div className='d-flex flex-column mx-1 my-5 w-100'>{data && <>
            <h5>{label}</h5>
            <ListGroup>{data.map((attr, i) =>
                <ListGroupItem key={i}>{attr}</ListGroupItem>
            )}</ListGroup>
        </>}</div>
    );
}

AttributeList.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
}

export default AttributeList;