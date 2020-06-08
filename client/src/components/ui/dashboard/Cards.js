import React from 'react'

function Cards(props) {
    return(
        <React.Fragment>
             <div>
                <div className="card border-success" style={{textAlign: "center"}}>
                    <div className="card-header"></div>
                    <div className="card-body text-warning">
                        <h5 className="card-title text-warnings">{props.title}</h5>
                        <p className="card-text" ><i className={props.iconClass}  style={{fontSize: "64px"}}></i></p>
                    </div>
                </div>
            </div>           
        </React.Fragment>
    )
}

export default Cards