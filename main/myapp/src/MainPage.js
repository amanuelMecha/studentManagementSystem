import React from 'react'
import Signin from './signIn'
import Students from './students'
import axios from 'axios'
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom'
import { Route } from 'react-router'
import Searchstudent from './searchStudentById'
import UpdateFields from './updateFirstName'
import AddNewStudent from './AddNewStudent'
import Signup from './signUp'
const cors = require('cors')


export default class Mainpage extends React.Component {
    state = { email: "", password: "", token: "" }

    onChangeEvent = (event) => {
        let name = event.target.name
        let value = event.target.value
        this.setState({ [name]: value })
    }
    signInFunction = () => {
        let object = {
            email: this.state.email, password: this.state.password
        }
        axios.post('http://localhost:5000/auth/login', object)
            .then(res => {
                console.log('aman', res.data)
                if (res.data.result) {
                    localStorage.setItem('token', res.data.result)
                    this.setState({ token: res.data.result })
                }
                alert(res.data.status)

            })
            .catch(err => {
                alert(err)
            })
    }
    signUpFunction = () => {
        let id = Math.floor(Math.random() * 999) + 100;
        let object = {
            email: this.state.email, fname: this.state.fname, lname: this.state.lname,
            id: id, major: this.state.major, password: this.state.password,
        }
        console.log('object', object)
        axios.post('http://localhost:5000/auth/signup', object)
            .then(res => {
                console.log('signUpPage', res.data.result)
                if (res.data.result) {
                    console.log('tokennnnn', res.data.result)
                    localStorage.setItem('token', res.data.result)
                    this.setState({ token: res.data.result })
                    alert(res.data.status)
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
                <div>
                    <p align='center'>
                        <Signin onChangeEvent={(event) => { this.onChangeEvent(event) }}
                            //emailValue={this.state.email}     firstNameValue={this.state.fname}
                            //firtsNameSignIn={(event) => { this.onChangeEvent(event) }}
                            functionSignin={this.signInFunction} />
                    </p>
                    <Signup onChangeEvent={(event) => { this.onChangeEvent(event) }} signupfunction={this.signUpFunction} />
                </div>
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
                            <Link to='/addNewStudent'>Add student</Link>

                        </li>

                    </ul>

                    <Switch>
                        <Route exact path='/students' component={Students}></Route>
                        <Route exact path='/Searchstudent' component={Searchstudent}></Route>
                        <Route exact path='/students/:id' component={UpdateFields}></Route>
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