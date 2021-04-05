import Student from './student'
import React from 'react'
import axios from 'axios'
export default class Students extends React.Component {
    state = { students: undefined, student: {} }
    componentDidMount() {
        if (!this.state.students) {
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
    deleteFunction = (id) => {
        //let headers = { 'Authorization': this.props.tokenValue }
        let headers = { 'Authorization': localStorage.getItem('token') }
        console.log("header delete", id)
        axios.delete('http://localhost:5000/api/v1/students/' + id, { headers: headers })
            .then(result => {
                //alert('one student removed from the db')
                console.log(result)
                //this.setState({ students: result.data.result })
                this.fetchState()
            })

    }

    edit = (id) => {
        let headers = { 'Authorization': localStorage.getItem('token') }
        axios.get('http://localhost:5000/api/v1/students/' + id, { headers: headers })
            .then(result => {
                if (result.data.status === 'success') {
                    <input value={result.data.result.id}></input>
                    console.log('edit', result.data.result.id)
                    this.props.history.push('/students/' + id)
                    // this.setState({ student: result.data.result })
                }
            })
            .catch(err => { console.log({ status: err }) })

    }
    render() {
        let students = null
        if (this.state.students) {
            students = (
                this.state.students.map((item, index) => {
                    console.log('item delete', item)
                    return (<Student key={item.id} Id={item.id} fname={item.fname} lname={item.lname}
                        major={item.Major} email={item.email}
                        delete={() => { this.deleteFunction(item.id) }}
                        edit={() => { this.edit(item.id) }}
                    // fnameUpdate={(event, index) => { this.props.fnameUpdate(event, index) }}

                    />)
                })
            )

        }
        return (

            <div>
                <table align='center' border='1px' width=''>
                    <h4 align='center'>List of students</h4>
                    {/* <button onClick={this.fetchState}>Click</button> */}
                    {/* {this.fetchState} */}
                    {students}
                </table>

            </div>


        )
    }
}
