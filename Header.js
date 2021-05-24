import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title, taskAdder, butt}) => {
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button color={butt ? 'red': 'green'} text ={butt ? 'Done': 'Add'} onClick={taskAdder} />
        </header>
    )
}

Header.defaultProps = {
    title: 'Appointment Manager',
}

Header.propTypes = {
    title: PropTypes.string,
}

export default Header
