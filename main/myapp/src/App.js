import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Mainpage from './MainPage'
import Students from './students'
import React, { useState } from 'react';
import AddNewStudent from './AddNewStudent'
import CreateStudent from './createStudent'
import axios from 'axios';
import Search from './searchStudentById'
import UpdateFirstName from './updateFirstName'
import Signin from './signIn'
const cors = require('cors')



class App extends React.Component {
  // state = {
  //   id: "", fname: "", lname: "", email: "", major: "", searchId: "",
  //   token: "",
  //   students: [], show: true, count: 0, emailSignIn: "", firtsNameSignIn: ""
  // }

  // state = {
  //   id: "", fname: "", lname: "", email: "", major: "",
  //   students: [{ Id: 123, fname: "Bipin", "lname": "Regmi", "Major": "MSD", "email": "bregmi@gmail.com" },
  //   { Id: 456, fname: "Tahir", "lname": "Abafita", Major: "MSD", "email": "tahir@gmail.com" },
  //   { Id: 786, fname: "Kasahun", "lname": "Tehon", "Major": "MSD", "email": "kas@gmail.com" }], show: true, count: 0
  // }
  // fetchState = () => {
  //   let headers = { 'Authorization': this.props.tokenValue }
  //   axios.get('http://localhost:5000/api/v1/students', { headers: headers })
  //     .then(result => {
  //       console.log('chommmmmmmmm', result.data.result)
  //       if (result.data.status === 'success') {
  //         this.setState({ students: result.data.result })
  //       }
  //     })
  // }

  // componentDidMount() {
  //   // this.fetchState()
  // }

  // componentDidUpdate() {
  //   // this.fetchState()
  // }
  // fetch('http://localhost:5000/api/v1/students').then(result => {
  //   console.log(result)
  // })

  //this.setState({students:this.})
  //}

  // IdOChange = (event) => {
  //   this.setState({ id: event.target.value })
  // }
  // majorOChange = (event) => {
  //   this.setState({ major: event.target.value })
  // }
  // emailOChange = (event) => {
  //   this.setState({ email: event.target.value })
  // }

  // fnameOChange = (event) => {
  //   this.setState({ fname: event.target.value })
  // }
  // lnameOChange = (event) => {
  //   this.setState({ lname: event.target.value })
  // }

  // fnameUpdate = (event, id) => {
  //   console.log('inddex', id)
  //   // let result = [...this.state.students]

  //   // result[id].fname = event.target.value
  //   // this.setState({ students: result })
  // }

  // token = (event) => {
  //   this.setState({ token: event.target.value })
  // }
  // addNewStudentfun = () => {
  //   console.log('daveeeeeeeeeeeeeee', this.state.token)
  //   const object = {
  //     Id: this.state.id, fname: this.state.fname, lname: this.state.lname,
  //     major: this.state.major, email: this.state.email,
  //   }
  //   let headers = { 'Authorization': this.state.token }
  //   console.log('iddddddddddd', object)
  //   axios.post('http://localhost:5000/api/v1/students', object, {
  //     headers: headers
  //   })
  //     .then(res => {
  //       alert(res.data.status)
  //       this.fetchState()
  //     })
  //     .catch(err => { console.log(err) })

  // }

  // emailSignIn = (event) => {
  //   this.setState({ emailSignIn: event.target.value })
  // }
  // firtsNameSignIn = (event) => {
  //   this.setState({ firtsNameSignIn: event.target.value })
  // }


  // const[currentvalue, updatefunction] = useState({ show: true })
  // const showbutton = () => {
  //   //return current.show ? false : true
  //   updatefunction({ show: currentvalue.show ? false : true })
  //   console.log('shiw')
  // }
  // deleteFunction = (id) => {
  //   let result = this.state.students.filter(item => {
  //     return item.Id !== id
  //   })
  //   this.setState({ students: result })
  // }
  // deleteFunction = (id) => {
  //   axios.delete('http://localhost:5000/api/v1/students/' + id)
  //     .then(result => {
  //       //alert('one student removed from the db')
  //       console.log(result)
  //     })
  //   this.fetchState()
  // }

  // search = (event) => {
  //   console.log('search:', event.target.value)
  //   this.setState({ searchId: event.target.value })
  // }


  // FnameUpdate = () => {
  //   let id = this.state.id, fname = this.state.fname;

  //   axios.put('http://localhost:5000/api/v1/students/' + id, { fname: fname })
  //     .then(data => {
  //       console.log(data)
  //       this.fetchState()
  //     })

  // }

  //   incr = () => {
  //     let result = current.count
  //     updatefun({ count: result + 1 })
  //   }

  //   const updateMajor = () => {
  //     let result = [...current.students]
  //     result = result.map(item => { return { Id: item.Id, fname: item.fname, lname: item.lname, Major: "hisory", email: item.email } })
  //     updatefun({ students: result })
  //   }
  //     let x = null
  // if (currentvalue.show) {
  //   x = (< Students current={current.students} delet={deleteFunction} incr={incr} />)
  // }

  render() {
    return (
      <div>
        {/* <p align='center'>
          <Signin emailSignIn={(event) => { this.emailSignIn(event) }} emailValue={this.state.emailSignIn}
            firstNameValue={this.state.firtsNameSignIn} firtsNameSignIn={(event) => { this.firtsNameSignIn(event) }} />
        </p> */}
        <Router>
          
          <Mainpage />

        </Router>


        {/* <button onClick={this.showbutton}>show/hide</button>

        <button onClick={this.updateMajor}>update</button><br />
  count < input value={this.current.count} ></input >
        <button onClick={this.incr}>inc</button> */}


        {/* <table align='center' border='1px' width=''>


          < Students token={(event => { this.token(event) })} tokenValue={this.state.token} current={this.state.students} delete={this.deleteFunction} fnameUpdate={this.fnameUpdate}
          // incr={incr}
          />
        </table> */}
        {/* <CreateStudent IdOChange={(event) => { this.IdOChange(event) }} fnameOChange={(event) => { this.fnameOChange(event) }}
          lnameOChange={(event) => { this.lnameOChange(event) }} majorOChange={(event) => { this.majorOChange(event) }}
          emailOChange={(event) => { this.emailOChange(event) }}
          addNewStudentfun={this.addNewStudentfun} token={(event) => { this.token(event) }}
        // fname={this.state.fname}
        // lname={this.state.lname}
        /> */}
        {/* <Search tokenFunction={(event) => { this.token(event) }} tokenValue={this.state.token} search={(event) => { this.search(event) }} id={this.state.searchId} /><br /><br /> */}

        {/* <UpdateFirstName IdOChange={this.IdOChange} fnameOChange={this.fnameOChange} FnameUpdate={this.FnameUpdate} /> */}

      </div >


    )
  }
}

export default App;
