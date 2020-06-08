import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { user } from '../../../functions/Users';
import swal from 'sweetalert';
import { deletemember } from '../../../functions/Users';
import PrintJob from 'print-job';
import './printStyles.css';


const IMAGES_URL = "https://api.portal.zciea.trade/uploads/";
//const IMAGES_URL = "http://localhost:5000/uploads/";

const divStyle = {
    display: 'flex',
    textTransform: 'uppercase',
    justifyContent:'space-between',
  };


  const avatar = {
      border: '5px solid green',
      width:'25vh',
      height: '25vh', 
      margin: 'auto'
  }



class UserID extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            name: '',
            idnumber: '',
            gender: '',
            territory: '',
            gender: '',
            profile: ''
        };

        this.imageNotFound = this.imageNotFound.bind(this);
        this.printID = this.printID.bind(this);
        this.onDeleteMember = this.onDeleteMember.bind(this);

    }

    componentDidMount() {
        var querystr = this.props.location.search;
        var idstr = querystr.split("=")[1];
        const u = { userid: idstr }

        user(u).then(res => {
            if (res.error) {
                console.log("something went wrong");
            } else {
                console.log("RES: "+JSON.stringify(res) );

                let userDetails = res.results[0];
                this.setState({
                    name: userDetails.name,
                    idnumber: userDetails.id_number,
                    gender: userDetails.gender,
                    territory: userDetails.territory,
                    profile: userDetails.image,
                })
            }
        })

        //console.log(IMAGES_URL);

    }

    //  printID() {
    //     var yourDOCTYpe = "<!DOCTYPE html>";
    //     var printPreview = window.open('', 'print_preview');
    //     var printDocument = printPreview.document;
    //     printDocument.open();

    //     var head = "<head>" + "<style> .to-print{height: 279mm; width: 80mm;} </style>" + "</head>";
    //     printDocument.write(yourDOCTYpe +
    //         "<html>" + head + "<body>" + "<div class='to-print'>" + document.getElementById('print') + "</div>" +"</body>" +"</html>" );
    //         printPreview.print();
    //         printPreview.close();
    // }


    imageNotFound() {
        this.setState({
            profile: 'placeholder.png'
        })
    }


    printID() {
       PrintJob.print("#print");
    }


    onDeleteMember() {
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

                deletemember(member).then(res => {
                    console.log(res);
                    
                })

              swal("Member has been deleted!", {
                icon: "success",
              });

              this.props.history.push('/view-members') 
            } 
          });
    }


    render() {
        return (
            <React.Fragment>
                <div className="hk-wrapper hk-vertical-nav" style={{ marginTop: "12px", marginLeft: "240px" }}>
                    <div className="hk-wrapper"></div>
                    <div className="container-fluid px-xxl-65 px-xl-20">
                        <div className="hk-pg-header">
                            <h4 className="hk-pg-title"><span className="pg-title-icon"><span className="feather-icon"><i data-feather="layers"></i></span></span></h4>
                        </div>

                        <div className="row">
                            <div className="col-xl-12">
                                <section className="hk-sec-wrapper">
                                    <h5 className="hk-sec-title">ZCIEA Membership ID</h5>

                                    <div className="row">
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="row">
                                                <div className="col-lg-3 col-sm-4 col-xs-12">
                                                    <div className="card w-260p w-sm-290p" id="print">
                                                        <div style={{borderTop:"8px solid green", width:"50%", position:"absolute"}}></div>
                                                        <div style={{borderTop:"8px solid #c7e03b", width:"100%", float:"right"}}></div>
                                                        <div style={{justifyContent: "center", padding: "15% 5%", margin: "auto"}}>
                                                            <div>
                                                                <img src={IMAGES_URL + this.state.profile} style={{ width:"50%",  height:"50%"}}alt="user" style={avatar} onError={this.imageNotFound} />
                                                            </div>
                                                        </div>

                                                        <div className="card-body">
                                                            <div style={divStyle}>
                                                                <p>NAME:</p>
                                                                <p> {this.state.name}</p>
                                                            </div>

                                                            <div style={divStyle}>
                                                                <p className="text-muted">ID NUMBER:</p>
                                                                <p> {this.state.idnumber} </p>
                                                            </div>

                                                            <div style={divStyle}>
                                                                <p className="text-muted">TERRITORY:</p>
                                                                <p> {this.state.territory}</p> 
                                                            </div>

                                                            <div style={divStyle}>
                                                                <p className="text-muted">GENDER: </p>
                                                                <p>{this.state.gender}</p> 
                                                            </div>
                                                        </div>

                                                        <div className="card-body">
                                                            <a href="" className="card-link" style={{ float: "left" }}>ZCIEA</a>
                                                            <a href="" className="card-link" style={{ float: "right" }}>MEMBER</a>
                                                        </div>
                                                        <div style={{borderBottom:"8px solid #c7e03b", width:"50%"}}></div>
                                                        <div style={{borderBottom:"8px solid green", width:"50%", }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-md-6 col-lg-6" style={{padding: "5%"}}>
                                            <button className="btn btn-danger btn-lg" onClick={this.onDeleteMember}>Delete Member</button>
                                        </div>

                                        
                                    </div>
                                    
                                    <button className="btn btn-success" style={{ textAlign: "center" }} onClick={this.printID}>Print ID</button>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

UserID.propTypes = {};
export default withRouter(UserID)
