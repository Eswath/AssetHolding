import React, {Component} from 'react'
import Modal from 'react-modal'
import HrAddAssetForm from './HrAddAssetForm'
import './Hr.css'
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import TableBody from "@material-ui/core/TableBody"
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import Tooltip from '@material-ui/core/Tooltip'
import TextField from '@material-ui/core/TextField'
import Cancel from '@material-ui/icons/Cancel'
import Check from '@material-ui/icons/Check'
import Delete from '@material-ui/icons/Delete'
// import CustomPaginationActionsTable from './Pagination_Table'
// import axios from 'axios';
// import FilterSearch from './Autosuggest'
// import CenteredGrid from './Grid.js';
import Grid from '@material-ui/core/Grid';
import MenuAppBar from './Header'
// import {emptyState} from "../action/Action";
import Edit from "@material-ui/icons/Edit"

const divBody = {
    marginTop:' 20px'
}
const center = {
    display:'block',
    margin: '0 auto',
    width: '160px',
    // border: '1px solid red',
    marginTop:'30px'

}

const closeModalButton = {
    position:'relative',
    left:'0px'
}
const customStyles = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '500px', // <-- This sets the height
        width:'400px'
        // overflow: 'scroll' // <-- This tells the modal to scrol
    }
}

Modal.setAppElement('#root')
class Hr extends Component{
    constructor(props){
        super(props)
        this.state={
            searchTerm:'',
            clicked:false,
            originalCount:'',
            count:'',
            id:'',
            name:'',
            country:'',
            assets:{}
            // countries:[]
        }
    }
    handleFormFieldChange =(e)=>{
        let state= this.state
        state[e.target.name]=e.target.value
        this.setState(state)
    }
    handleFilterChange=(e)=>{
        this.handleFormFieldChange(e)
        this.props.filterData(this.state.searchTerm)
    }
    handleCountryApiCall =(e)=> {
        this.handleFormFieldChange(e)
        this.props.getCountry(this.state.country)

    }
    submit = (values) => {
        // console.log(values)
        var inflection = require( 'inflection' );
        var singularArray = values.assets.map(a=>{
            let obj={}
            obj['name']=inflection.singularize(a.name)
            obj['count']=a.count
            return obj
        })
        // console.log(singularArray)
        this.props.addAssetDataCall(singularArray)
        this.closeModal()

        // this.props.assetDataCall()

    }
    componentDidMount() {
        this.props.assetDataCall()
    }
    afterOpenModal(){
        document.body.style.overflow = 'hidden';
    }
    closeModal = () =>{
        document.body.style.overflow = 'scroll';
        this.props.toggleModal();
    }
    handleEdit=(n) =>{
        this.setState({clicked:!this.state.clicked,id:n.id,name:n.name,count:n.count,originalCount:n.count})
    }
    handleAssetSubmit=(e)=>{
        e.preventDefault()
        this.setState({clicked:!this.state.clicked})
        let data={
            id:this.state.id,
            count:this.state.count,
            name:this.state.name
        }
        if(this.state.count===''){
            data={
                id:this.state.id,
                count:this.state.originalCount,
                name:this.state.name
            }
        }
        this.props.updateAssetDataCall(data)
    }
    handleDelete(n){
        // console.log(n)
        this.setState({clicked:!this.state.clicked})
        this.props.deleteAsset(n)
    }

    renderEditableCell(n){
        return(<TableCell>
            <form onSubmit={(e)=>this.handleAssetSubmit(e)}>
                <TextField autoFocus name='count' onChange={(e)=>this.handleFormFieldChange(e)} type="text" defaultValue={this.state.count} />
                <Button type='submit' ><Check/></Button>
                <Button onClick={(e)=>{e.preventDefault();this.setState({clicked:!this.state.clicked})}}><Cancel/></Button>
                <Button onClick={()=>{this.handleDelete(n)}}><Delete/></Button>
            </form>
        </TableCell>)
    }
    renderUnEditableCell(n){
        return(<TableCell>
            {/*<Tooltip id="tooltip-icon" title="Edit" placement="right">*/}

                    <TextField type="text" value={n.count} disabled />
                    <Button  onClick={()=>this.handleEdit(n)}><Edit/></Button>

            {/*</Tooltip>*/}
        </TableCell>)
    }
    renderRemainingCell(n){
        return(<TableCell>
            <TextField type="text" value={n.count} disabled/>
        </TableCell>)
    }
    renderTable()  {

        let { asset_prop } = this.props;
        // let arrOfObj = Object.values(obj)
        // console.log(arrOfObj)
        if(asset_prop!==undefined){
        return(
                <TableBody>
                    {
                        asset_prop.map(n => {
                            return (
                                <TableRow key={`${n.name}`}>
                                    <TableCell>{n.name}</TableCell>
                                    {
                                        ((this.state.clicked && n.id === this.state.id) ? (this.renderEditableCell(n)) : (this.state.clicked ? (this.renderRemainingCell(n)) : (this.renderUnEditableCell(n))))
                                    }
                                </TableRow>
                            );
                        })
                    }
                </TableBody>

        )
    }
    else{
            return <div></div>
        }
    }
    render(){
        if(localStorage.getItem('hr_auth_token')===null){
            return(<div>Access Denied</div>)
        }
        return(
            <div id='container'>
                <div>
                <MenuAppBar goHome={this.props.pushToHome} emptyState={this.props.emptyState}/>
                </div>

                <div style = {center}>
                    <Button variant="contained" color="default" onClick={this.props.toggleModal} >
                        Add Assets &nbsp;<CloudUploadIcon  />
                    </Button>
                </div>
                <div style={divBody}>
                    <Modal
                        isOpen={this.props.open}
                        onAfterOpen={this.afterOpenModal}
                        // onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                        // className="Modal"
                    >
                        <div style={closeModalButton}>
                        <button onClick={this.closeModal}>X</button>
                        </div>
                        <HrAddAssetForm onSubmit={this.submit} assets={this.props.asset_prop}/>

                    </Modal>

                    {/*<div style={{'marginBottom':'50px'}}>*/}
                        {/*<TextField type="text" name='country' onChange={(e)=>this.handleCountryApiCall(e)} label='Search Country'/>*/}
                    {/*</div>*/}

                        {/*<ul>*/}
                            {/*{*/}
                                {/*(this.props.error)?(<div>No Country Found</div>):((this.props.fetching)?(<div>Loading</div>):(this.props.countries.map((n,i)=>{return(<li key={i}>{n.name}</li>)})))*/}
                            {/*}*/}
                        {/*</ul>*/}


                    <div style={{'marginBottom':'50px'}}>
                        <TextField type="text" name='searchTerm'onChange={(e)=>this.handleFilterChange(e)} label='Search Asset'/>
                    </div>
                <Grid >
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>ASSETS</b></TableCell>
                                    <TableCell><b>COUNT</b></TableCell>
                                </TableRow>
                            </TableHead>
                            {this.renderTable()}
                        </Table>
                    </Paper>
                </Grid>
                    {/*<CustomPaginationActionsTable assets={this.props.asset_prop}/>*/}
                </div>

                {/*<CenteredGrid/>*/}

            </div>
        )
    }
}
export default Hr