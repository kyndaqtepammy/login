import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { systemusers } from '../functions/Users';
import SpinnerLoader from './ui/loaders/SpinnerLoader';
import UserTableRow from './ui/users/UserTableRow';
import GenericError from './ui/errorviews/GenericError';

class Users extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            members: [],
            offset: 0,
            data: [],
            perPage: 10,
            currentPage: 0,
            query: '',
            results: {},
            loading: false,
            dataLoading: true,
            message: '',
            noData: null
        };
        this.handlePageClick = this.handlePageClick.bind(this);
    }


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


    receivedData() {
        systemusers().then(res => {
            if (res) {
                this.setState({ dataLoading: false })
                const data = res.members;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const postData = slice.map(user =>
                    <UserTableRow name={user.first_name} trade={user.last_name} territory={user.email} age={""} />
                )
                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage), postData
                })
            } else {
                this.setState({ noData: true });
            }
        })
    }



    async componentDidMount() {
        this.receivedData()
    }

    render() {
        if (this.state.noData) {
            return (
                <GenericError />
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
                                                            <div className="col-sm-12">
                                                                <table id="datable_1"
                                                                    className="table table-hover w-100 display pb-30 dataTable dtr-inline"
                                                                    role="grid" aria-describedby="datable_1_info">
                                                                    <thead>
                                                                        <tr role="row">
                                                                            <th className="sorting_asc" tabindex="0" aria-controls="datable_1"
                                                                                rowspan="1" colspan="1" aria-sort="ascending"
                                                                                aria-label="Name: activate to sort column descending">First Name
                                        </th>
                                                                            <th className="sorting" tabindex="0" aria-controls="datable_1"
                                                                                rowspan="1" colspan="1"
                                                                                aria-label="Trade: activate to sort column ascending">
                                                                                Last Name</th>
                                                                            <th className="sorting" tabindex="0" aria-controls="datable_1"
                                                                                rowspan="1" colspan="1"
                                                                                aria-label="Territory: activate to sort column ascending">
                                                                                Email</th>
                                                                            <th className="sorting" tabindex="0" aria-controls="datable_1"
                                                                                rowspan="1" colspan="1"
                                                                                aria-label="Age: activate to sort column ascending">Last login</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>

                                                                        {this.state.postData}

                                                                    </tbody>
                                                                    <tfoot>
                                                                        <tr>
                                                                            <th rowspan="1" colspan="1">First Name</th>
                                                                            <th rowspan="1" colspan="1">Last Name</th>
                                                                            <th rowspan="1" colspan="1">Email</th>
                                                                            <th rowspan="1" colspan="1">Last login</th>
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

export default Users
