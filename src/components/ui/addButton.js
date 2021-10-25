import {IoMdAdd} from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { modalsActions } from '../../Redux/modalsReducer';

const AddButton = () => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(modalsActions.show({name: 'Create Task'}));
    }

    return (
        <div className='add-button fadeInAnim' onClick={handleClick} >
            <IoMdAdd color="#fff"  transform="scale(1.5)" />
        </div>
    )
}

export default AddButton;
