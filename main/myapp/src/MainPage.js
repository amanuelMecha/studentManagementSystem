import React from 'react'
import Signin from './signIn'
import Students from './students'
import axios from 'axios'
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom'
import { Route } from 'react-router'
import Searchstudent from './searchStudentById'
import UpdateFirstName from './updateFirstName'
import AddNewStudent from './AddNewStudent'


export default class Mainpage extends React.Component {
    state = { emailSignIn: "", firtsNameSignIn: "", token: "" }

    emailSignIn = (event) => {
        this.setState({ emailSignIn: event.target.value })
    }
    firtsNameSignIn = (event) => {
        this.setState({ firtsNameSignIn: event.target.value })
    }
    token = () => {
        let object = {
            email: this.state.emailSignIn, fname: this.state.firtsNameSignIn
        }


        axios.post('http://localhost:5000/auth/login', object)
            .then(res => {
                console.log(res.data)
                if (res.data.result) {
                    this.setState({ token: res.data.result })
                }
                alert(res.data.status)

            })
            .catch(err => {
                alert(err)
            })
    }

    render() {
        let tokenNew = null
        let signin = null
        if (this.state.token === "") {
            signin = (
                <p align='center'>
                    <Signin emailSignIn={(event) => { this.emailSignIn(event) }} emailValue={this.state.emailSignIn}
                        firstNameValue={this.state.firtsNameSignIn} firtsNameSignIn={(event) => { this.firtsNameSignIn(event) }}
                        functionSignin={this.token} />
                </p>
            )
        }
        if (this.state.token) {
            tokenNew = (
                < div >
                    <h3>Things you can do on this page</h3>
                    <ul>
                        <li>
                            <Link to='/students'>list of students and delete student </Link><br />
                        </li>
                        <li>
                            <Link to='/Searchstudent'>get student by id</Link>
                        </li>
                        <li>
                            <Link to='/UpdateFirstName'>Update First Name</Link>

                        </li>
                        <li>
                            <Link to='/addNewStudent'>Add student</Link>

                        </li>

                    </ul>

                    <Switch>
                        <Route exact path='/students' component={Students}></Route>
                        <Route exact path='/Searchstudent' component={Searchstudent}></Route>
                        <Route exact path='/UpdateFirstName' component={UpdateFirstName}></Route>
                        <Route exact path='/addNewStudent' component={AddNewStudent}></Route>

                    </Switch>

                </div >
            )
        }

        return (
            <div >
                <h4 align='center'>Welcome to student management system</h4>

                {signin}


                {tokenNew}
                {/* <Route path='/signin' component={Signin} /> */}

                {/* <table align='center' border='1px' width=''>
                    < Students token={(event => { this.token(event) })} tokenValue={this.state.token} current={this.state.students} delete={this.deleteFunction} fnameUpdate={this.fnameUpdate}
                    // incr={incr}
                    />
                </table> */}

            </div >
        )
    }
}