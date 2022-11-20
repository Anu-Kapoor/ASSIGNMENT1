import React, { useState, useEffect } from 'react';

import styles from "./dataList.module.css";

import ADD from './ADD';
import Edit from './Edit';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { dataSliceActions } from '../store/data-slice';


const DataList = () => {

  const [isAdding, setisAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.UserData.USERS);

  const selectedRow = useSelector((state) => state.UserData.selectedRows);
//   const [checkedState, setCheckedState] = useState(
//     new Array(users.length).fill(false)
//   );


  
const Edithandler = (id) => {
    dispatch(dataSliceActions.setSelectedUser(id));
    setIsEditing(true);
}

const Deletehandler = (id) => {
    dispatch(dataSliceActions.deleteUser(id));
}

const addForm=()=>
{
    setisAdding(true);
    console.log("ADDING");
}

const onCancel=()=>{
    setIsEditing(false);
    setisAdding(false);
}

const moveUp=()=>
{
    console.log("up");
    const Sortedrows=Array.from(selectedRow);
    Sortedrows.sort();
    console.log(Sortedrows);
    // console.log("state is:", checkedState);
  dispatch(dataSliceActions.shiftUP(Sortedrows));
  
}


const moveDown=()=>
{
    console.log("down");
    const Sortedrows=Array.from(selectedRow);
    Sortedrows.sort();
    console.log(Sortedrows);
    // console.log("state is:", checkedState);
  dispatch(dataSliceActions.shiftDOWN(Sortedrows));
}

// const selectrow =(id)=>
// {
//     setChecked(!checked)
//     console.log(id);
//     dispatch(dataSliceActions.setSelectedUser(id));
// }

const onCheck=(x)=>{
//     const updatedCheckedState = checkedState.map((item, index) =>
//     index === x ? !item : item  
// //   );

//  setCheckedState(updatedCheckedState);
    dispatch(dataSliceActions.selectCheckedRows(x));
    console.log(selectedRow);
    // console.log(checkedState);

}

return (
<React.Fragment>
      <Button variant="contained" onClick={addForm}>Add New Data</Button><br/>

        {(selectedRow.length > 0) &&  
        (<>
        <br/>
            <button  onClick={() => moveUp()} className={styles.button}>  UP    </button>
            <button onClick={() => moveDown()} className={styles.button}> DOWN  </button> 
        </>) }
      
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
    <TableHead>
    <TableRow>
        <TableCell align="center">Select</TableCell>
        <TableCell align="center">No.</TableCell>
        <TableCell align="center">ID</TableCell>
        <TableCell align="center"> NAME</TableCell>
        <TableCell align="center">USER ID</TableCell>           
        <TableCell align="center" colSpan={2} className="text-center">
            Actions </TableCell>
    </TableRow>
    </TableHead>

    <TableBody>
        {users.length > 0 ? (users.map((user, i) => (
            <tr key={user.id} className={`${styles['form-control']} ${user.checkedStatus && styles.invalid}`}>
                <td align="center">
                <input type="checkbox" 
                onClick={() => onCheck(i)} 
                checked={user.checkedStatus}
                 />
                </td>
                
                <td align="center">{i + 1}</td>
                <td align="center">{user.id}</td>
                <td align="center">{user.Uname}</td>
                <td align="center">{user.UID}</td>
                <td align="center">
                    <button  onClick={() => Edithandler(user.id)}>
                    EDIT </button>  </td>
                <td align="center">
                    <button onClick={() => Deletehandler(user.id)}>
                    DELETE </button> </td>
                       
            </tr>
        ))
        ) : (
            <tr>
                <td align="center" colSpan={6}>No data found!</td>
            </tr>
        )}
    </TableBody> 
    </Table>
    </TableContainer> 
        {isEditing && ( <Edit onCancel={onCancel}     />    )}
        {isAdding && (  <ADD  onCancel={onCancel}     />    )} 

</React.Fragment>
   
);
};

export default DataList;

