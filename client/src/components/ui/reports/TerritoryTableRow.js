import React, { Component } from 'react';

const spanStyle = {
    padding: "30%"
}


class TerritoryTableRow extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {};
    }


    render() {
        return (
            <React.Fragment>
                <tr role="row" className="odd">
                    <td style={{textTransform: "capitalize"}} tabindex="0" className="sorting_1">{this.props.name}</td>
                    <td style={{textTransform: "capitalize"}}>{this.props.trade}</td>
                    <td>{this.props.territory}</td>
                    <td>{this.props.age}</td>
                    <td>{this.props.gender}</td>
                    <td>
                        <span style={spanStyle}>
                            <i className="glyphicon glyphicon-pencil" name={this.props.name}  onClick={this.props.onEditClicked} id={this.props.id} style={{cursor: "pointer"}}></i>
                        </span>
                        <span>
                            <i className="glyphicon glyphicon-trash" style={{color:"red", cursor: "pointer"}} onClick={this.props.onDeleteClicked}  id={this.props.id}></i>
                        </span>
                    </td>
                </tr>
            </React.Fragment>
        );  
    }
}

export default TerritoryTableRow
