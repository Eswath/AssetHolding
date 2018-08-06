import React,{Component} from 'react';
import SimpleMediaCard from './LoginCard'
import {SubmissionError} from 'redux-form'

const backGround ={
    backgroundColor:'black'
}
const divStyle = {
    position: 'absolute',
    top: '50%',
    left:' 50%',
    transform: 'translateX(-50%) translateY(-50%)',
    border: '1px solid black',
}

    class Login extends Component{
    componentWillMount(){
            if(localStorage.getItem('hr_auth_token')){
                this.props.pushToHr()
            }
        }
        submit = (values) => {

            this.props.apiCall(values);
            console.log(localStorage.getItem('hr_auth_token'))
            if(localStorage.getItem('hr_auth_token')===null){
                    throw new SubmissionError({
                        _error:'Invalid Username or Password'
                    })
            }

        }
        render(){

            return(
                <div style={backGround}>
                    <div style={divStyle}>
                    <SimpleMediaCard handleSubmit={this.submit}/>
                    </div>
                </div>
            )
        }
    }
    export default Login