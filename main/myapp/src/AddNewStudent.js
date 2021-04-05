import React from "react";
import axios from 'axios'

export default class AddNewStudent extends React.Component {
    state = { id: "", major: "", email: "", fname: "", lname: "", password: "" }

    onChangEvent = (event) => {
        let name = event.target.name
        let value = event.target.value
        this.setState({ [name]: value })
    }
    addNewStudentfun = () => {
        let id = Math.floor(Math.random() * 999) + 100;
        const object = {
            id: id, fname: this.state.fname, lname: this.state.lname,
            major: this.state.major, email: this.state.email, password: this.state.password
        }
       
        // let headers = { 'Authorization': this.state.token }
        let headers = { 'Authorization': localStorage.getItem('token') }
        // axios.post('http://localhost:5000/api/v1/students', object, {
        //     headers: headers
        // })
        axios.post('http://localhost:5000/api/v1/students', object, { headers: headers })
            .then(res => {
                console.log(res)
                alert(res.data.status)
                // this.fetchState()
            })
            .catch(err => { console.log({ status: err }) })

    }


    render() {
        return (<div>


            <input name="fname" onChange={(event) => { this.onChangEvent(event) }} placeholder="first name"></input>
            <input name="lname" onChange={(event) => { this.onChangEvent(event) }} placeholder=" last name"></input>
            <input name="major" onChange={(event) => { this.onChangEvent(event) }} placeholder="major"></input>
            <input name="email" onChange={(event) => { this.onChangEvent(event) }} placeholder="email"></input>
            <input name="password" onChange={(event) => { this.onChangEvent(event) }} placeholder="password" ></input>
            <button onClick={this.addNewStudentfun} > addNewStudent</button>
        </div>
        )
    }
}