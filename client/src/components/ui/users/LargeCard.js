import React from 'react';

function LargeCard(props) {
    return(
        <React.Fragment>
        <div className="card card-lg">
            <h6 className="card-header">
                By Gender
            </h6>							
            <div className="card-body">
                <div className="user-activity">
                    <div className="media pb-0">
                        <div className="media-body">
                            <div className="col-md-6 form-group">
                                <label htmlFor="territory">Territory</label>
                                <select className="form-control custom-select d-block w-100" id="territory" name="territory" onChange={this.onChange}>
                                    <option value="">Select Territory...</option>

                                    {
                                        this.state.territories.map(territory=> (
                                            <option key={territory.territory} value={territory.territory}>
                                                {territory.territory}
                                            </option>
                                        ))
                                        
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
)
}

export default LargeCard;