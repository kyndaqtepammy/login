import React, { Component } from 'react';
import { reports, deletemultiple } from '../../../functions/Users';
import ReactPaginate from 'react-paginate';
import ReactToExcel from 'react-html-table-to-excel'
import './usersStyles.css'
import axios from 'axios'
import SpinnerLoader from '../loaders/SpinnerLoader';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { deletemember } from '../../../functions/Users';
import { Link } from 'react-router-dom';
import GenericError from '../errorviews/GenericError';


const spanStyle = {
    padding: "4%"
}

var checkedIDs = [];

class AllMembers extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            members: [],
            offset: 0,
            data: [],
            perPage: 50,
            currentPage: 0,
            query: '',
            results: {},
            loading: false,
            dataLoading: true,
            message: '',
            search: '',
            query: '',
            idnumber: '',
            itemChecked: [],
            checked: false,
            buttonDisabled: true,
            noData: null
        };

        this.cancel = '';
        this.handlePageClick = this.handlePageClick.bind(this);
        this.exportExcel = this.exportExcel.bind(this);
        this.onUserDeleteClicked = this.onUserDeleteClicked.bind(this);
        this.deleteChecked = this.deleteChecked.bind(this);
    }

    deleteChecked=()=> {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to undo this action",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    let arrayOfInts = checkedIDs.map(v => Number(v))
                    const members = {
                        ids: arrayOfInts
                    }

                    deletemultiple(members).then(res => {
                        //console.log("RRRRR" + res);
                        if (res.error) {
                            swal("Something went wrong! Try again later", {
                                icon: "error",
                            });
                        } else {
                            window.location.reload(true);
                            swal("Member has been deleted!", {
                                icon: "success",
                            });
                        }
                    })
                        .catch(err => {
                            console.log(err);

                        })
                }
            })
    }

    onUserDeleteClicked=(e) =>{
        e.preventDefault();
        this.setState({ idnumber: e.target.id }, () =>
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to undo this action",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        const member = {
                            id_number: this.state.idnumber
                        }
                        console.log(this.state.idnumber);
                        

                        deletemember(member).then(res => {
                            if (res.error) {
                                swal("Something went wrong! Try again later", {
                                    icon: "error",
                                });
                            } else {
                                { window.location.reload(true) }
                                swal("Member has been deleted!", {
                                    icon: "success",
                                });
                            }

                        })
                    }
                })

        )
    }

    exportExcel = () => {
        axios.post('http://localhost/zciea/messaging/messaging.php', {
            members: this.getMembers()

        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    getMembers() {
        reports().then(res => {

            if (res) {
                this.setState({
                    members: res.members
                })
                //members.push(res.members);
            }
        })
        return this.state.members;
    }


    getAge(d2) {
        let date1 = new Date();
        let date2 = new Date(d2);
        let yearsDiff = date1.getFullYear() - date2.getFullYear();
        return yearsDiff;
    }

    onChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    receivedData() {
        reports().then(res => {
            if (res) {
                try{
                    this.setState({ dataLoading: false })
                    const data = res.members;
                    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                    const postData = slice.map(member =>
                        <tr role="row" class="odd" >
                            <td style={{ textTransform: "capitalize" }} tabindex="0" className="sorting_1">{member.name}</td>
                            <td style={{ textTransform: "capitalize" }}>{member.trade}</td>
                            <td>{member.territory}</td>
                            <td>{member.age}</td>
                            <td>{member.gender}</td>
                            <td>
                                <span style={spanStyle}>
                                    <Link to={{
                                        pathname: '/userid',
                                        search: `?userid=${member.id}`,
                                    }} style={{ textDecoration: "none !important" }}>
                                        View
                              </Link>
                                </span>
    
                                <span style={spanStyle}>
                                    <Link to={{
                                        pathname: '/edit-member',
                                        search: `?userid=${member.id}`,
                                    }} >
                                        <i className="glyphicon glyphicon-pencil"></i>
                                    </Link>
                                </span>
    
                                <span>
                                    <i className="glyphicon glyphicon-trash" style={{ color: "red", cursor: "pointer" }} onClick={this.onUserDeleteClicked} id={member.id}></i>
                                </span>
    
                                <span style={spanStyle}>
                                    <input type="checkbox" id={member.id} name="member" value={member.id} onChange={(e) => {
                                        if (e.target.checked) {
                                            checkedIDs.push(e.target.id);
                                            this.setState({
                                                buttonDisabled: false
                                            })
                                        } else {
                                            checkedIDs.pop(e.target.id);
                                            if (checkedIDs.length < 1) {
                                                this.setState({
                                                    buttonDisabled: true
                                                })
                                            }
                                        }
                                    }} />
                                </span>
                            </td>
                        </tr>
    
                    )
    
                    this.setState({
                        pageCount: Math.ceil(data.length / this.state.perPage), postData
                    })
                }catch(err) {
                    console.log(err);
                    this.setState({ noData: true });
                }
            }
        })
    }

    handleOnInputChange = (event) => {
        const query = event.target.value;
        this.setState({ query, loading: true, message: '' });
    };


    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });
    }

    componentDidMount() {
        this.receivedData();
    }

    render() {
        const { search } = this.state;

        if (this.state.noData) {
            return (
                <GenericError />
            )
        }


        if (search !== "") {
            const filteredList = this.getMembers().filter(country => {
                return country.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
            })

            return (
                <React.Fragment>
                    <div className="hk-wrapper hk-vertical-nav" style={{ marginTop: "10px", marginLeft: "240px" }}>
                        <div className="hk-pg-">
                            <nav className="hk-breadcrumb" aria-label="breadcrumb">
                                <ol className="breadcrumb breadcrumb-light bg-transparent">
                                    <li className="breadcrumb-item"><a href="#">Members</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">View Members</li>
                                </ol>
                            </nav>

                            <div className="container-fluid px-xxl-65 px-xl-20">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <section className="hk-sec-wrapper">
                                            <h5 className="hk-sec-title">Membership Table</h5>
                                            <div className="row">
                                                <div className="col-sm-12 col-md-12 col-lg-12">
                                                    <div className="table-wrap">
                                                        <div id="datable_1_wrapper" className="dataTables_wrapper dt-bootstrap4">
                                                            <div className="row">
                                                                <div className="col-sm-12 col-md-12">
                                                                    <div id="datable_1_filter" className="dataTables_filter" style={{ justifyContent: "space-between" }}>
                                                                        <ReactToExcel
                                                                            className="btn btn-success"
                                                                            table="datable_1"
                                                                            filename="zciea_membership"
                                                                            sheet="sheet 1"
                                                                            buttonText="Export to excel" />

                                                                        <label><input type="search" className="form-control form-control-sm" placeholder="Search" aria-controls="datable_1" onChange={this.onChange.bind(this)} /></label>
                                                                        <button className="btn btn-danger btn-md" style={{ float: "right" }} disabled={this.state.buttonDisabled} onClick={this.deleteChecked}>Delete Checked</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-sm-12">
                                                                    <table id="datable_1"
                                                                        className="table w-100 display pb-30 dataTable dtr-inline"
                                                                        role="grid" aria-describedby="datable_1_info">
                                                                        <thead>
                                                                            <tr role="row">
                                                                                <th className="sorting_asc" tabindex="0" aria-controls="datable_1"
                                                                                    rowspan="1" colSpan="1" aria-sort="ascending"
                                                                                    aria-label="Name: activate to sort column descending">Name
                                                    </th>
                                                                                <th className="sorting" tabindex="0" aria-controls="datable_1"
                                                                                    rowspan="1" colSpan="1"
                                                                                    aria-label="Trade: activate to sort column ascending">
                                                                                    Trade</th>
                                                                                <th className="sorting" tabindex="0" aria-controls="datable_1"
                                                                                    rowspan="1" colSpan="1"
                                                                                    aria-label="Territory: activate to sort column ascending">
                                                                                    Territory</th>
                                                                                <th className="sorting" tabindex="0" aria-controls="datable_1"
                                                                                    rowspan="1" colSpan="1"
                                                                                    aria-label="Age: activate to sort column ascending">Age</th>
                                                                                <th className="sorting" tabindex="0" aria-controls="datable_1"
                                                                                    rowspan="1" colSpan="1"
                                                                                    aria-label="Gender: activate to sort column ascending">
                                                                                    Gender</th>
                                                                                <th className="sorting" tabindex="0" aria-controls="datable_1"
                                                                                    rowspan="1" colSpan="1"
                                                                                    aria-label="Actions: activate to sort column ascending">
                                                                                    Actions</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>

                                                                            {
                                                                                filteredList.map(member =>
                                                                                    <tr role="row" class="odd" >
                                                                                        <td style={{ textTransform: "capitalize" }} tabindex="0" className="sorting_1">{member.name}</td>
                                                                                        <td style={{ textTransform: "capitalize" }}>{member.trade}</td>
                                                                                        <td>{member.territory}</td>
                                                                                        <td>{member.age}</td>
                                                                                        <td>{member.gender}</td>
                                                                                        <td>
                                                                                            <span style={spanStyle}>
                                                                                                <Link to={{
                                                                                                    pathname: '/userid',
                                                                                                    search: `?userid=${member.id}`,
                                                                                                }} style={{ textDecoration: "none !important" }}>
                                                                                                    View
                                                                                      </Link>
                                                                                            </span>

                                                                                            <span style={spanStyle}>
                                                                                                <Link to={{
                                                                                                    pathname: '/edit-member',
                                                                                                    search: `?userid=${member.id}`,
                                                                                                }} >
                                                                                                    <i className="glyphicon glyphicon-pencil"></i>
                                                                                                </Link>
                                                                                            </span>

                                                                                            <span>
                                                                                                <i className="glyphicon glyphicon-trash" style={{ color: "red", cursor: "pointer" }} onClick={this.onUserDeleteClicked} id={member.id}></i>
                                                                                            </span>

                                                                                            <span style={spanStyle}>
                                                                                                <input type="checkbox" id={member.id} name="member" value={member.id} onChange={(e) => {
                                                                                                    if (e.target.checked) {
                                                                                                        checkedIDs.push(e.target.id);
                                                                                                        this.setState({
                                                                                                            buttonDisabled: false
                                                                                                        })
                                                                                                    } else {
                                                                                                        checkedIDs.pop(e.target.id);
                                                                                                        if (checkedIDs.length < 1) {
                                                                                                            this.setState({
                                                                                                                buttonDisabled: true
                                                                                                            })
                                                                                                        }
                                                                                                    }
                                                                                                }} />
                                                                                            </span>
                                                                                        </td>
                                                                                    </tr>

                                                                                )
                                                                            }

                                                                        </tbody>
                                                                        <tfoot>
                                                                            <tr>
                                                                                <th rowspan="1" colSpan="1">Name</th>
                                                                                <th rowspan="1" colSpan="1">Trade</th>
                                                                                <th rowspan="1" colSpan="1">Territory</th>
                                                                                <th rowspan="1" colSpan="1">Age</th>
                                                                                <th rowspan="1" colSpan="1">Gender date</th>
                                                                                <th rowspan="1" colSpan="1">Actions</th>
                                                                            </tr>
                                                                        </tfoot>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        <ReactPaginate
                                            previousLabel={"prev"}
                                            nextLabel={"next"}
                                            breakLabel={"..."}
                                            breakClassName={"break-me"}
                                            pageCount={this.state.pageCount}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={this.handlePageClick}
                                            containerClassName={"pagination"}
                                            subContainerClassName={"pages pagination"}
                                            activeClassName={"active"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }

        if (this.state.dataLoading) {
            return (
                <SpinnerLoader />
            )
        }
        return (
            <React.Fragment>
                <div className="hk-wrapper hk-vertical-nav" style={{ marginTop: "10px", marginLeft: "240px" }}>
                    <div className="hk-pg-">
                        <nav className="hk-breadcrumb" aria-label="breadcrumb">
                            <ol className="breadcrumb breadcrumb-light bg-transparent">
                                <li className="breadcrumb-item"><a href="#">Members</a></li>
                                <li className="breadcrumb-item active" aria-current="page">View Members</li>
                            </ol>
                        </nav>

                        <div className="container-fluid px-xxl-65 px-xl-20">
                            <div className="row">
                                <div className="col-xl-12">
                                    <section className="hk-sec-wrapper">
                                        <h5 className="hk-sec-title">Membership Table</h5>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-12 col-lg-12">
                                                <div className="table-wrap">
                                                    <div id="datable_1_wrapper" className="dataTables_wrapper dt-bootstrap4">
                                                        <div className="row">
                                                            <div className="col-sm-12 col-md-12">
                                                                <div id="datable_1_filter" className="dataTables_filter" style={{ justifyContent: "space-between" }}>
                                                                    <ReactToExcel
                                                                        className="btn btn-success"
                                                                        table="datable_1"
                                                                        filename="zciea_membership"
                                                                        sheet="sheet 1"
                                                                        buttonText="Export to excel" />

                                                                    <label><input type="search" className="form-control form-control-sm" placeholder="Search" aria-controls="datable_1" onChange={this.onChange.bind(this)} /></label>
                                                                    <button className="btn btn-danger btn-md" style={{ float: "right" }} disabled={this.state.buttonDisabled} onClick={this.deleteChecked}>Delete Checked</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <table id="datable_1"
                                                                    className="table w-100 display pb-30 dataTable dtr-inline"
                                                                    role="grid" aria-describedby="datable_1_info">
                                                                    <thead>
                                                                        <tr role="row">
                                                                            <th className="sorting_asc" tabindex="0" aria-controls="datable_1"
                                                                                rowSpan="1" colSpan="1" aria-sort="ascending"
                                                                                aria-label="Name: activate to sort column descending">Name
                                                    </th>
                                                                            <th className="sorting" tabindex="0" aria-controls="datable_1"
                                                                                rowSpan="1" colSpan="1"
                                                                                aria-label="Trade: activate to sort column ascending">
                                                                                Trade</th>
                                                                            <th className="sorting" tabindex="0" aria-controls="datable_1"
                                                                                rowspan="1" colSpan="1"
                                                                                aria-label="Territory: activate to sort column ascending">
                                                                                Territory</th>
                                                                            <th className="sorting" tabindex="0" aria-controls="datable_1"
                                                                                rowspan="1" colSpan="1"
                                                                                aria-label="Age: activate to sort column ascending">Age</th>
                                                                            <th className="sorting" tabindex="0" aria-controls="datable_1"
                                                                                rowspan="1" colSpan="1"
                                                                                aria-label="Gender: activate to sort column ascending">
                                                                                Gender</th>
                                                                            <th className="sorting" tabindex="0" aria-controls="datable_1"
                                                                                rowspan="1" colSpan="1"
                                                                                aria-label="Actions: activate to sort column ascending">
                                                                                Actions</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>

                                                                        {this.state.postData}

                                                                    </tbody>
                                                                    <tfoot>
                                                                        <tr>
                                                                            <th rowspan="1" colSpan="1">Name</th>
                                                                            <th rowspan="1" colSpan="1">Trade</th>
                                                                            <th rowspan="1" colSpan="1">Territory</th>
                                                                            <th rowspan="1" colSpan="1">Age</th>
                                                                            <th rowspan="1" colSpan="1">Gender date</th>
                                                                            <th rowspan="1" colSpan="1">Actions</th>
                                                                        </tr>
                                                                    </tfoot>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <ReactPaginate
                                        previousLabel={"prev"}
                                        nextLabel={"next"}
                                        breakLabel={"..."}
                                        breakClassName={"break-me"}
                                        pageCount={this.state.pageCount}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={this.handlePageClick}
                                        containerClassName={"pagination"}
                                        subContainerClassName={"pages pagination"}
                                        activeClassName={"active"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

AllMembers.propTypes = {};
export default withRouter(AllMembers)
