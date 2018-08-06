import Login from '../component/Login'
import { apiCall,pushToHr } from "../action/Action";
import { connect } from 'react-redux'

const mapStatetoProps = (state) => {
    return{
        login: state.toggle_reducer.login,
        errorMessage: state.toggle_reducer.errorMessage
    }
}
const mapDispathtoProps = (dispatch) => {
    return{
        apiCall: (user) => dispatch(apiCall(user)),
        pushToHr: ()=> dispatch(pushToHr())
    }
}

export default connect(mapStatetoProps,mapDispathtoProps)(Login)