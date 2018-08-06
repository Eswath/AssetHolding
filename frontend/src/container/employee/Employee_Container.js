import Employee from '../../component/Employee'
import { employee,toggleModal } from "../../action/common/Action";
import { connect } from 'react-redux'

const mapStatetoProps = (state) => {
    return{
        employee: state.toggle_reducer.employee,
        open: state.toggle_reducer.open

    }
}
const mapDispathtoProps = (dispatch) => {
    return{
        getEmployee : () => dispatch(employee()),
        toggleModal : () => dispatch(toggleModal())
    }
}

export default connect(mapStatetoProps,mapDispathtoProps)(Employee)