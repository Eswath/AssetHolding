import React,{Component} from 'react'
import {Field,FieldArray,reduxForm} from 'redux-form'
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete'






const buttonStyle ={
    display:'block',
    margin: '0 auto',
    width:'105px',
    // border: '1px solid black'
}
const addButton = {
    marginTop:'20px'
}
const deleteButton = {
    marginBottom:'20px'
}


class HrAddAssetForm extends Component{

    checkFirstNum = (value) =>{
        let char = value.substring(0,1)
        let int = parseInt(char)
        console.log(int)
        if(int===NaN)return undefined
        if(int) return ("Must not begin with number")


    }
    checkAssets = (value) => {
        var inflection = require( 'inflection' );
        // console.log(this.props.assets)
        let assets_arr = Object.assign(this.props.assets)
        const result = assets_arr.find(a => a.name.toLowerCase() === value.toLowerCase())
        const result1 = assets_arr.find(a => inflection.pluralize(a.name.toLowerCase()) === value.toLowerCase())
        if (result !== undefined) return ("Already Exists")
        if(result1 !== undefined)return('Singular Entity Exists')
        return undefined
    }
    required = value => value ? undefined : 'Required'
    renderTextField1 = ({input, label, type,meta: { touched, error, warning }}) => (
        <div>
            <TextField
                label={label}
                type={type}
                {...input}
                fullWidth
            />
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    )

    renderTextField = ({input, label, type,meta: { touched, error, warning } }) => (
        <div>
            <TextField
                label={label}
                type={type}
                {...input}
                fullWidth
                autoFocus
            />
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    )


    renderAssets = ({fields}) => {
        return (
            <ul>
                {
                    fields.map((asset, index)=>(
                        <span key={index}>

                            <h3>Asset {index+1}</h3>
                    <div style={deleteButton}>
                    <Button variant="fab" mini color="secondary" onClick={()=>fields.remove(index)}>
                            <DeleteIcon />
                    </Button>
                    </div>

                            <Field
                                name={`${asset}.name`}
                                type="text"
                                component={this.renderTextField}
                                label='Asset Name'
                                validate={[this.required,this.checkAssets,this.checkFirstNum]}

                            />
                            <br/>
                    <Field
                        name={`${asset}.count`}
                        type="number"
                        component={this.renderTextField1}
                        label="Asset Count"
                        validate={this.required}

                    />

                </span>
                    ))
                }
                <div style={addButton}>
                    <Button onClick={()=>fields.push({})}  variant="fab" mini color="primary" aria-label="add" >
                        <AddIcon />
                    </Button>
                </div>
            </ul>
        )}

    render(){
    const { handleSubmit } = this.props;
    return(
        <form onSubmit={handleSubmit}>
            <FieldArray name="assets" component={this.renderAssets} />
            <div style={buttonStyle}>
            <Button variant="contained" color="default" type='submit' >
                <SaveIcon  />&nbsp;
                Save
            </Button>
            </div>
        </form>
    )
}
}




HrAddAssetForm = reduxForm({form:'add_asset'})(HrAddAssetForm)

export default HrAddAssetForm