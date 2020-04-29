import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import TablePagination from "@material-ui/core/TablePagination";

import "./Content.css";

function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  return (
    <div style={{ display: "flex", marginLeft: "125px" }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        Previous
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        Next
      </IconButton>
    </div>
  );
}

export class Content extends Component {
  state = {
    page: 0,
    rowsPerPage: 5,
  };

  emptyRows = () => {
    return (
      this.state.rowsPerPage -
      Math.min(
        this.state.rowsPerPage,
        this.props.EmployeeDetails.length -
          this.state.page * this.state.rowsPerPage
      )
    );
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      ...this.state,
      page: newPage,
    });
  };

  render() {
    return (
      <div className="Menu">
        <TableContainer component={Paper}>
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Date Of Birth</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Salary (₹)</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Date of Joining</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(this.state.rowsPerPage > 0
                ? this.props.EmployeeDetails.slice(
                    this.state.page * this.state.rowsPerPage,
                    this.state.page * this.state.rowsPerPage +
                      this.state.rowsPerPage
                  )
                : this.props.EmployeeDetails
              ).map((row) => (
                <TableRow key={row.employeeId}>
                  <TableCell>{row.employeeId}</TableCell>
                  <TableCell scope="row">{row.name}</TableCell>
                  <TableCell scope="row">{row.address}</TableCell>
                  <TableCell scope="row">{row.gender}</TableCell>
                  <TableCell>
                    {new Date(row.dateOfBirth).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{row.designation}</TableCell>
                  <TableCell>{row.salary}</TableCell>
                  <TableCell scope="row">{row.projectName}</TableCell>
                  <TableCell scope="row">
                    {new Date(row.dateOfJoining).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}

              {this.emptyRows > 0 && (
                <TableRow style={{ height: 53 * this.emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          colSpan={3}
          count={this.props.EmployeeDetails.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          ActionsComponent={TablePaginationActions}
        />
      </div>
    );
  }
}

export default Content;
