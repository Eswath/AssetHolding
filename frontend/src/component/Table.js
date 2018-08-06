import React from "react";
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import TableBody from "@material-ui/core/TableBody"
import Paper from "@material-ui/core/Paper";
import { getFormValues } from "redux-form";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Edit from "@material-ui/icons/Edit"
const SimpleTable = ({ values = { assets: [] } }) => (
    <Paper>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell><b>ASSETS</b></TableCell>
                    <TableCell><b>COUNT</b></TableCell>
                    <TableCell><b>UPDATE</b></TableCell>

                </TableRow>
            </TableHead>
            <TableBody>
                {values.assets.map(n => {
                    return (
                        <TableRow key={`${n.name}`}>
                            <TableCell>{n.name}</TableCell>
                            <TableCell>{n.count}</TableCell>
                            <TableCell><Button><Edit></Edit></Button></TableCell>

                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    </Paper>
);

export default connect(state => ({
    values: getFormValues("add_asset")(state)
}))(SimpleTable);