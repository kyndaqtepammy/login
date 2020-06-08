import React, { Component } from 'react'
import TerritoryTableRow from '../reports/TerritoryTableRow'
import { territories, deleteterritory, addterritory, editTerritory } from '../../../functions/Users';
import swal from 'sweetalert';
import SpinnerLoader from '../loaders/SpinnerLoader';
import {BrowserRouter as Router, withRouter } from 'react-router-dom';
import GenericError from '../errorviews/GenericError';


class Territories extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            territories: [],
            id: '',
            dataLoading: true,
            noData: null
        };
    }

    async componentDidMount() {
        territories().then(res => {
            if (res) {
                this.setState({ dataLoading: false })
                console.log(res.members);
                this.setState({
                    territories: res.members
                })
            } else {
                this.setState({
                    noData: true
                })
            }
        })
    }


    onDeleteClicked(e) {
        e.preventDefault();
        this.setState({ id: e.target.id }, () =>
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to undo this action",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        const territory = {
                            id: this.state.id
                        }
                        deleteterritory(territory).then(res => {
                            if (res.error) {
                                swal("Something went wrong! Try again later", {
                                    icon: "error",
                                });
                            } else {
                                swal("Territory has been deleted!", {
                                    icon: "success",
                                });
                                window.location.reload(true)
                            }

                        })
                    }
                })

        )
    }


    onEditClicked(e) {
        var id = e.target.id.split("_")[0];
        var name = e.target.id.split("_")[1];
        swal({
            content: {
                element: "input",
                attributes: {
                    type: "text",
                    value: name
                },
            },
        })
            .then(value => {
                const territory = {
                    name: value,
                    id: id
                }

                if (value == "") {
                    swal("Name cannot be empty!", {
                        icon: "error",
                    });
                } else {
                    editTerritory(territory)
                        .then(res => {
                            console.log(res);
                            window.location.reload(true) 
                        })
                        .catch(err => {
                            console.log(err);

                        })
                }

            })
            .catch(err => {
                console.log(err);
                swal("Something went wrong!", {
                    icon: "error",
                });
            })

    }



    addNew = (e) => {
        swal({
            content: {
                element: "input",
                attributes: {
                    placeholder: "Territory Name",
                    type: "text",
                },
            },
        })
            .then((value) => {
                if (value == "") {
                    swal("The territory name cannot be empty!", {
                        icon: "error",
                    });
                } else {
                    const territory = { name: value }
                    addterritory(territory)
                        .then(res => {
                            if (res.error) {
                                swal("Something went wrong!", {
                                    icon: "error",
                                });
                            } else {
                                swal(`Territory"${value}" added successfully`, {
                                    icon: "success",
                                });
                                window.location.reload(true)
                            }

                        })
                        .catch(err => {
                            console.log(err);
                            swal("Something went wrong!", {
                                icon: "error",
                            });
                        })
                }

            });
    }


    render() {
        if(this.state.noData) {
            return(
                <GenericError/>
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
                                        <h5 className="hk-sec-title">Data Table</h5>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-12 col-lg-12">
                                                <div className="table-wrap">
                                                    <div id="datable_1_wrapper" className="dataTables_wrapper dt-bootstrap4">
                                                        <div className="row">
                                                            <div className="col-sm-12 col-md-6">
                                                                <button className="btn btn-success btn-md" onClick={this.addNew.bind(this)}>Add New Territory</button>
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
                                                                                aria-label="Name: activate to sort column descending">Territory
                                                    </th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            this.state.territories.map((territory) => {

                                                                                return <TerritoryTableRow name={territory.name} id={territory.id + "_" + territory.name} onDeleteClicked={this.onDeleteClicked.bind(this)} onEditClicked={this.onEditClicked.bind(this)} />
                                                                            })

                                                                        }


                                                                    </tbody>
                                                                    <tfoot>
                                                                        <tr>
                                                                            <th rowspan="1" colspan="1">Territory</th>

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

Territories.propTypes = {};
export default withRouter(Territories);
