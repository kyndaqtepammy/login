import React from 'react'
import {Link,  withRouter } from "react-router-dom";

const Pending = ({}) => (
    <React.Fragment>
    <div class="hk-wrapper">
        <div class="hk-pg-wrapper hk-auth-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-12 pa-0">
                        <div class="auth-form-wrap pt-xl-0 pt-70">
                            <div class="auth-form w-xl-30 w-lg-65 w-sm-85 w-100 card pa-25 shadow-lg">
                                <form>
                                    <h1 class="display-4 mb-10 text-center">Request pending approval</h1>
                                    <p class="mb-30 text-center">
                                        Your request is awaiting approval. You will be notified via SMS once approved.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </React.Fragment> 
);

Pending.propTypes = {};
export default withRouter(Pending)