import React, { Component } from 'react'
import axios from 'axios'
import SpinnerLoader from '../loaders/SpinnerLoader';
import swal from 'sweetalert'

class ImportExcel extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            loading: false,
            file: null
        };
        this.importData = this.importData.bind(this)
      
    }

    handleFileChange = (e)=> {
        //console.log(e.target.files[0]);
       this.setState({file: e.target.files[0]})
    }

    importData = (e) => {
        e.preventDefault()
        let comp = this;
        let file = this.state.file;
        let formData = new FormData();

        formData.append("image", file);
       
        this.setState({
            loading: true
        })

        axios.post('https://zciea.trade/zciea/importcsv.php', formData, {

        })
            .then(function (response) {
                let res = response.data;
                console.log(response.data);
                
                if(res.error) {
                    swal(res.message, {
                        title: "Import Failed!",
                        icon: "error",
                      });
                }else {
                    swal(res.message, {
                        title: "Success!",
                        icon: "success",
                      });
                }
                // handle success
                // this.setState({
                //     loading: false
                // })
                console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                
                console.log(error);
            });

            comp.setState({loading: false})
    }

    render() {
        if(this.state.loading) {
            return (
                <SpinnerLoader/>
            )
        }
        return (
            <React.Fragment>
                <div className="hk-wrapper hk-vertical-nav" style={{ marginTop: "12vh", marginLeft: "35vh" }}>
                    <div className="hk-wrapper">
                        <nav className="hk-breadcrumb" aria-label="breadcrumb">
                            <ol className="breadcrumb breadcrumb-light bg-transparent">
                                <li className="breadcrumb-item"><a href="javascript:void(0)">Import</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Import members to database</li>
                            </ol>
                        </nav>

                        <div className="container-fluid px-xxl-65 px-xl-20">
                            <div className="hk-pg-header">
                                <h4 className="hk-pg-title"><span className="pg-title-icon"><span className="feather-icon"><i data-feather="align-left"></i></span></span>Add New Member</h4>
                            </div>

                            <div className="row">
                                <div className="col-xl-12">
                                    <section className="hk-sec-wrapper">
                                        
                                    <form noValidate>
                                        <div className="form-group" style={{marginBottom:"10vh"}}>
                                            <div className="fileinput">
                                                <input type="file" name="excel" value={this.state.value} onChange={this.handleFileChange.bind(this)} />
                                           
                                            </div>
                                        </div>
                                        <button className="btn btn-success btn-block" type="submit" onClick={this.importData}>Import</button>
                                    </form>

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

ImportExcel.propTypes = {};
export default ImportExcel;
