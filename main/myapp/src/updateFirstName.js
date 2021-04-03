import React from 'react'
import axios from 'axios'

export default class UpdateFirstName extends React.Component {
    state = { id: "", fname: "" }
    IdOChange = (event) => {
        this.setState({ id: event.target.value })
    }
    fnameOChange = (event) => {
        this.setState({ fname: event.target.value })
    }
    FnameUpdate = () => {
        let id = this.state.id, fname = this.state.fname;

        axios.put('http://localhost:5000/api/v1/students/' + id, { fname: fname })
            .then(res => {
                console.log('updated', res.data.status)
                alert(res.data.status)
                //this.fetchState()
            })

    }


    render() {
        return (
            <div class='Info' >
                <h4>Update first name</h4>
           Id: <input onChange={this.IdOChange}></input >
            First Name:<input onChange={this.fnameOChange}></input>
                <button onClick={this.FnameUpdate}>update</button>
            </div >
        )
    }
}