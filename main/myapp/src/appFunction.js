import logo from './logo.svg';
import './App.css';
import Students from './students'
import React, { useState } from 'react';
import AddNewStudent from './AddNewStudent'
import CreateStudent from './createStudent'

function App() {
    const [current, updatefun] = useState({
        students: [{ Id: 123, fname: "Bipin", "lname": "Regmi", "Major": "MSD", "email": "bregmi@gmail.com" },
        { Id: 456, fname: "Tahir", "lname": "Abafita", "Major": "MSD", "email": "tahir@gmail.com" },
        { Id: 786, fname: "Kasahun", "lname": "Tehon", "Major": "MSD", "email": "kas@gmail.com" }], show: true, count: 0
    })
    const [currentCreate, updatecreate] = useState({ fname: "", lname: "" });

    const fnameOChange = (event) => {
        updatecreate({ fname: event.target.value, lname: currentCreate.lname })
    }
    const lnameOChange = (event) => {
        updatecreate({ fname: currentCreate.fname, lname: event.target.value })
    }
    const addNewStudentfun = () => {
        console.log('daveeeeeeeeeeeeeee')
        const object = [...current.students]
        object.push(currentCreate)

        updatefun({ students: object })

    }



    const [currentvalue, updatefunction] = useState({ show: true })
    const showbutton = () => {
        //return current.show ? false : true
        updatefunction({ show: currentvalue.show ? false : true })
        console.log('shiw')
    }
    const deleteFunction = (id) => {
        let result = current.students.filter(item => {
            return item.Id !== id
        })
        updatefun({ students: result })
    }

    const incr = () => {
        let result = current.count
        updatefun({ count: result + 1 })
    }

    const updateMajor = () => {
        let result = [...current.students]
        result = result.map(item => { return { Id: item.Id, fname: item.fname, lname: item.lname, Major: "hisory", email: item.email } })
        updatefun({ students: result })
    }
    let x = null
    if (currentvalue.show) {
        x = (< Students current={current.students} delet={deleteFunction} incr={incr} />)
    }

    return (
        <div>
            <button onClick={showbutton}>show/hide</button>

            <button onClick={updateMajor}>update</button><br />
      count <input value={current.count}></input>
            <button onClick={incr}>inc</button>
            <CreateStudent fnameOChange={(event) => { fnameOChange(event) }} lnameOChange={(event) => { lnameOChange(event) }}
                addNewStudentfun={addNewStudentfun} fname={currentCreate.fname} lname={currentCreate.lname} />

            {x}


        </div>


    )
}

export default App;
