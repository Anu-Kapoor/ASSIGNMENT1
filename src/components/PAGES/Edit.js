import React from 'react'
import FORM from './FORM';

import { useSelector } from 'react-redux';


function Edit(props) {


    const selectedUser = useSelector((state) => state.UserData.selectedUser);

    return (
        <div>
            {/* <BasicModal selectedUser={selectedUser} onCancel={props.onCancel} /> */}
            <FORM selectedUser={selectedUser} onCancel={props.onCancel}></FORM>
        </div>
    );
}

export default Edit