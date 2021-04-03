import React from "react";
import axios from 'axios'

export default class AddNewStudent extends React.Component {
    state = { id: "", major: "", email: "", fname: "", lname: "" }

    IdOChange = (event) => {
        console.log("id", event.target.value)
        this.setState({ id: event.target.value })
    }
    majorOChange = (event) => {
        this.setState({ major: event.target.value })
    }
    emailOChange = (event) => {
        this.setState({ email: event.target.value })
    }

    fnameOChange = (event) => {
        this.setState({ fname: event.target.value })
    }
    lnameOChange = (event) => {
        this.setState({ lname: event.target.value })
    }
    addNewStudentfun = () => {
        console.log('daveeeeeeeeeeeeeee', this.state.token)
        const object = {
            Id: this.state.id, fname: this.state.fname, lname: this.state.lname,
            major: this.state.major, email: this.state.email,
        }
        // let headers = { 'Authorization': this.state.token }
        console.log('create function', object)
        // axios.post('http://localhost:5000/api/v1/students', object, {
        //     headers: headers
        // })
        axios.post('http://localhost:5000/api/v1/students', object)
            .then(res => {
                alert(res.data.status)
                // this.fetchState()
            })
            .catch(err => { console.log({ status: err }) })

    }


    render() {
        return (<div>

            <input onChange={(event) => { this.IdOChange(event) }} placeholder="id" ></input>
            <input onChange={(event) => { this.fnameOChange(event) }} placeholder="first name"></input>
            <input onChange={(event) => { this.lnameOChange(event) }} placeholder=" last name"></input>
            <input onChange={(event) => { this.majorOChange(event) }} placeholder="major"></input>
            <input onChange={(event) => { this.emailOChange(event) }} placeholder="email"></input>

            <button onClick={this.addNewStudentfun} > addNewStudent</button>
        </div>
        )
    }
}