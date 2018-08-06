import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import TableBody from "@material-ui/core/TableBody"
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField'
import Cancel from '@material-ui/icons/Cancel'
import Check from '@material-ui/icons/Check'
import Delete from '@material-ui/icons/Delete'
import Grid from '@material-ui/core/Grid';
import Edit from "@material-ui/icons/Edit"
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            clicked: false,
            originalCount: '',
            count: '',
            id: '',
            name: '',
            country: '',
            assets: {}
        }
    }

    handleFormFieldChange = (e) => {
        let state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state)
    };
    handleFilterChange = (e) => {
        this.handleFormFieldChange(e);
        this.props.filterData(this.state.searchTerm)
    };
    submit = (values) => {
        // console.log(values)
        var inflection = require('inflection');
        var singularArray = values.assets.map(a => {
            let obj = {};
            obj['name'] = inflection.singularize(a.name);
            obj['count'] = a.count;
            return obj
        })
        this.props.addAssetDataCall(singularArray);
        this.closeModal()

    };

    componentDidMount() {
        this.props.assetDataCall()
    }

    afterOpenModal() {
        document.body.style.overflow = 'hidden';
    }

    closeModal = () => {
        document.body.style.overflow = 'scroll';
        this.props.toggleModal();
    }
    handleEdit = (n) => {
        this.setState({clicked: !this.state.clicked, id: n.id, name: n.name, count: n.count, originalCount: n.count})
    }
    handleAssetSubmit = (e) => {
        e.preventDefault()
        this.setState({clicked: !this.state.clicked});
        let data = {
            id: this.state.id,
            count: this.state.count,
            name: this.state.name
        };
        if (this.state.count === '') {
            data = {
                id: this.state.id,
                count: this.state.originalCount,
                name: this.state.name
            }
        }
        this.props.updateAssetDataCall(data)
    };

    handleDelete(n) {
        this.setState({clicked: !this.state.clicked});
        this.props.deleteAsset(n)
    }

    renderEditableCell(n) {
        return (<TableCell>
            <form onSubmit={(e) => this.handleAssetSubmit(e)}>
                <TextField autoFocus name='count' onChange={(e) => this.handleFormFieldChange(e)} type="text"
                           defaultValue={this.state.count}/>
                <Button type='submit'><Check/></Button>
                <Button onClick={(e) => {
                    e.preventDefault();
                    this.setState({clicked: !this.state.clicked})
                }}><Cancel/></Button>
                <Button onClick={() => {
                    this.handleDelete(n)
                }}><Delete/></Button>
            </form>
        </TableCell>)
    }

    renderUnEditableCell(n) {
        return (<TableCell>
            <TextField type="text" value={n.count} disabled/>
            <Button onClick={() => this.handleEdit(n)}><Edit/></Button>
        </TableCell>)
    }

    renderRemainingCell(n) {
        return (<TableCell>
            <TextField type="text" value={n.count} disabled/>
        </TableCell>)
    }

    renderTable() {
        let {asset_prop} = this.props;
        if (asset_prop !== undefined) {
            return (
                <TableBody>
                    {
                        asset_prop.map(asset => {
                            return (
                                <TableRow key={`${asset.name}`}>
                                    <TableCell>{asset.name}</TableCell>
                                    {
                                        ((this.state.clicked && asset.id === this.state.id) ? (this.renderEditableCell(asset)) : (this.state.clicked ? (this.renderRemainingCell(asset)) : (this.renderUnEditableCell(asset))))
                                    }
                                </TableRow>
                            );
                        })
                    }
                </TableBody>

            )
        }
        else {
            return <div/>
        }
    }

    render() {
        if (localStorage.getItem('hr_auth_token') === null) {
            return (<div>Access Denied</div>)
        }
        return (
            <div id='container'>
                <div>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton color="inherit" aria-label="Menu">
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="title" color="inherit">
                                HR Dashboard
                            </Typography>
                            <AccountCircle/>
                            <Menu
                                id="menu-appbar"
                                anchorEl='null'
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                <MenuItem onClick={this.handleClose}>My account</MenuItem>
                            </Menu>
                        </Toolbar>
                    </AppBar>
                </div>

                <div>
                    <Button variant="contained" color="default" onClick={this.props.toggleModal}>
                        Add Assets &nbsp;<CloudUploadIcon/>
                    </Button>
                </div>
                <div>
                    <div>
                        <TextField type="text" name='searchTerm' onChange={(e) => this.handleFilterChange(e)}
                                   label='Search Asset'/>
                    </div>
                    <Grid>
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
                </div>
            </div>
        )
    }
}

export default Dashboard