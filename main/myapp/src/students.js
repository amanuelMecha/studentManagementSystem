import Student from './student'
import React from 'react'
import axios from 'axios'
export default class Students extends React.Component {
    state = { students: [], token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…1NDZ9.R_5IoiELBYqgKpTy1Wf4ay-LdS44P4YyB0aezgNjlGs" }
    //token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…1NDZ9.R_5IoiELBYqgKpTy1Wf4ay-LdS44P4YyB0aezgNjlGs

    fetchState = () => {
        let headers = { 'Authorization': this.state.token }
        console.log('headers', headers)
        // { headers: headers }
        axios.get('http://localhost:5000/api/v1/students')
            .then(result => {
                console.log('Frey', result.data.result)
                if (result.data.status === 'success') {
                    this.setState({ students: result.data.result })
                }
            })
            .catch(err => { console.log({ status: err }) })
    }
    deleteFunction = (id) => {
        let headers = { 'Authorization': this.props.tokenValue }
        axios.delete('http://localhost:5000/api/v1/students/' + id, { headers: headers })
            .then(result => {
                //alert('one student removed from the db')
                console.log(result)
            })
        this.fetchState()
    }
    render() {
        let students = null
        if (this.state.students) {
            students = (
                this.state.students.map((item, index) => {
                    return (<Student key={item.Id} Id={item.Id} fname={item.fname} lname={item.lname}
                        major={item.Major} email={item.email} delete={() => {
                            this.deleteFunction(item.Id)
                        }} fnameUpdate={(event, index) => { this.props.fnameUpdate(event, index) }}

                    />)
                })
            )

        }
        return (

            <div>
                <table align='center' border='1px' width=''>
                    <h4 align='center'>List of students</h4>
                    {/* <button onClick={this.fetchState}>Click</button> */}
                    {this.fetchState()}
                    {students}
                </table>

            </div>


        )
    }
}
