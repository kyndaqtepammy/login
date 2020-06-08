import React, { Component } from 'react'

class Territories extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            territories: []
        };
    }


    async componentDidMount() {
        territories().then(res => {
            if (res) {
                //console.log(res);
                this.setState({
                    territories: res.members
                })
            }
        })
    }

    render() {
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
                                        <h5 className="hk-sec-title">Data Table</h5>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-12 col-lg-12">
                                                <div className="table-wrap">
                                                    <div id="datable_1_wrapper" className="dataTables_wrapper dt-bootstrap4">
                                                        <div className="row">
                                                            <div className="col-sm-12 col-md-6">
                                                                <div id="datable_1_filter" className="dataTables_filter"><label><input
                                                                    type="search" className="form-control form-control-sm"
                                                                    placeholder="Search" aria-controls="datable_1" /></label></div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <table id="datable_1"
                                                                    className="table table-hover w-100 display pb-30 dataTable dtr-inline"
                                                                    role="grid" aria-describedby="datable_1_info">
                                                                    <thead>
                                                                        <tr role="row">
                                                                            <th className="sorting_asc" tabindex="0" aria-controls="datable_1"
                                                                                rowspan="1" colspan="1" aria-sort="ascending"
                                                                                aria-label="Name: activate to sort column descending">Name
                                                    </th>
                                                                            <th className="sorting" tabindex="0" aria-controls="datable_1"
                                                                                rowspan="1" colspan="1"
                                                                                aria-label="Trade: activate to sort column ascending">
                                                                                Trade</th>
                                                                            <th className="sorting" tabindex="0" aria-controls="datable_1"
                                                                                rowspan="1" colspan="1"
                                                                                aria-label="Territory: activate to sort column ascending">
                                                                                Territory</th>
                                                                            <th className="sorting" tabindex="0" aria-controls="datable_1"
                                                                                rowspan="1" colspan="1"
                                                                                aria-label="Age: activate to sort column ascending">Age</th>
                                                                            <th className="sorting" tabindex="0" aria-controls="datable_1"
                                                                                rowspan="1" colspan="1"
                                                                                aria-label="Gender: activate to sort column ascending">
                                                                                Gender</th>
                                                                            <th className="sorting" tabindex="0" aria-controls="datable_1"
                                                                                rowspan="1" colspan="1"
                                                                                aria-label="Amount Paid: activate to sort column ascending">
                                                                                Amount Paid</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>

                                                                    </tbody>
                                                                    <tfoot>
                                                                        <tr>
                                                                            <th rowspan="1" colspan="1">Name</th>
                                                                            <th rowspan="1" colspan="1">Trade</th>
                                                                            <th rowspan="1" colspan="1">Territory</th>
                                                                            <th rowspan="1" colspan="1">Age</th>
                                                                            <th rowspan="1" colspan="1">Gender date</th>
                                                                            <th rowspan="1" colspan="1">Amount Paid</th>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Territories
