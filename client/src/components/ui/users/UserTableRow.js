import React, { Component } from 'react'
import { Link } from 'react-router-dom';

const spanStyle = {
    padding: "4%"
}

const tableRowStyle = {
    pointerEvents: "none"
}

class UserTableRow extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {};
    }


    render() {
        return (
            <React.Fragment>
                <tr role="row" class="odd" >
                    <td style={{textTransform: "capitalize"}} tabindex="0" className="sorting_1">{this.props.name}</td>
                    <td style={{textTransform: "capitalize"}}>{this.props.trade}</td>
                    <td>{this.props.territory}</td>
                    <td>{this.props.age}</td>
                    <td>{this.props.gender}</td>
                    <td>
                        <span style={spanStyle}>
                         <Link to={{
                                pathname: '/userid',
                                search: `?userid=${this.props.id}`,
                            }} style={{textDecoration:"none !important"}}>
                            View
                          </Link>  
                        </span>
                        
                        <span style={spanStyle}>
                        <Link to={{
                                pathname: '/edit-member',
                                search: `?userid=${this.props.id}`,
                            }} >
                                <i className="glyphicon glyphicon-pencil"></i>
                            </Link>
                        </span>
                       
                        <span>
                            <i className="glyphicon glyphicon-trash" style={{color:"red"}} onClick={this.props.onUserDeleteClicked} id={this.props.id}></i>
                        </span>

                        <span style={spanStyle}>
                            <input type="checkbox" id={this.props.id} name={this.props.id} value={this.props.id} onChange={e => this.props.onToggleCheckbox} />
                        </span>
                    </td>
                </tr>
            </React.Fragment>
        );
    }
}

export default UserTableRow
