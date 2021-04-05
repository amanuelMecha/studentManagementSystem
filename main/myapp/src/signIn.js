import React from 'react'
import axios from 'axios'

export default class Signin extends React.Component {
    state = { toke: undefined }
    // token = () => {
    //     let object = {
    //         email: this.props.emailValue, fname: this.props.firstNameValue
    //     }
    //     console.log('kasahun', object)

    //     axios.post('http://localhost:5000/auth/login', object)
    //         .then(res => {
    //             console.log(res.data)
    //             if (res.data.result) {
    //                 this.setState({ token: res.data.result })
    //             }
    //             alert(res.data.status)

    //         })
    //         .catch(err => {
    //             alert(err)
    //         })
    // }

    render() {
        // let token = null
        // if (this.state.token) {
        //     token = (
        //         <div>
        //             token <input value={this.state.token}></input>
        //         </div>
        //     )
        // }
        return (
            <div>
                <h4>signIn</h4>
                <input name='email' placeholder='email' onChange={this.props.onChangeEvent}></input>
                <input name='password' placeholder='password' onChange={this.props.onChangeEvent}></input><br />
                <button onClick={this.props.functionSignin}>Sign in</button>
                {/* {token} */}
            </div>
        )
    }
}