import React from 'react'
import axios from 'axios'

export default class UpdateFields extends React.Component {
    state = { student: { id: "tahir", fname: "", lname: "", major: "", email: "" } }

    onChangeEventHandler = (event) => {
        // let name = event.target.name
        let value = event.target.value
        let statevalues = { ...this.state.student }
        statevalues[event.target.name] = value
        console.log('onchanegs', statevalues)
        this.setState({ student: statevalues })
    }
    fetchState = () => {
        // let headers = { 'Authorization': this.state.token }
        let headers = { 'Authorization': localStorage.getItem('token') }
        console.log('headers', headers)
        // { headers: headers }
        axios.get('http://localhost:5000/api/v1/students', { headers: headers })
            .then(result => {
                if (result.data.status === 'success') {
                    this.setState({ students: result.data.result })
                }
            })
            .catch(err => { console.log({ status: err }) })
    }
    componentDidMount() {
        // let headers = { 'Authorization': this.state.token }
        let headers = { 'Authorization': localStorage.getItem('token') }
        let id = parseInt(this.props.match.params.id)
        axios.get('http://localhost:5000/api/v1/students/' + id, { headers: headers })
            .then(result => {
                if (result.data.status === 'success') {
                    this.setState({ student: result.data.result })
                }
            })
            .catch(err => { console.log({ status: err }) })
    }


    updateFunction = () => {
        let id = this.state.student.id
        // let fname = this.state.student.fname
        console.log('onchanegs inside function', this.state.student)
        //let value = { ...this.state.student }
        axios.put('http://localhost:5000/api/v1/students/' + id, this.state.student, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(res => {
                console.log('updated', res.data.status)
                alert(res.data.status)
                this.fetchState()
            })
            .catch(err => {
                alert(err)
            })

    }
    render() {
        return (
            <div class='Info' >
                <h4>Update</h4>
           Id: <input name='id' value={this.state.student.id} onChange={(event) => { this.onChangeEventHandler(event) }}></input >
            First Name:<input name='fname' value={this.state.student.fname} onChange={(event) => { this.onChangeEventHandler(event) }}></input>
            Last Name: <input name='lname' value={this.state.student.lname} onChange={(event) => { this.onChangeEventHandler(event) }}></input >
            Major: <input name='major' value={this.state.student.major} onChange={(event) => { this.onChangeEventHandler(event) }}></input >
            Email: <input name='email' value={this.state.student.email} onChange={(event) => { this.onChangeEventHandler(event) }}></input >

                <button onClick={this.updateFunction}>update</button>
            </div >
        )
    }
}