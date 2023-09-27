import React from 'react';
import SideBar from '../Utility/SideNav';
import TopNav from '../Utility/TopNav';

export default function UpdateProfile() {

    return (
        <div class="container-scroller">
            <TopNav />
            <div class="container-fluid page-body-wrapper">
                <SideBar />
                <div class="main-panel">
                    <div class="content-wrapper">
                        <div class="col-md-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div className="row">
                                        <h4 class="card-title">Profile</h4>
                                        <div class=" col-md-12 d-flex justify-content-end mb-2">
                                            <button type="submit" class="btn btn-outline-success border mr-2">SAVE</button>
                                        </div>
                                    </div>
                                    <form class="forms-sample">
                                        <div class="form-group row" >
                                            <label  class="col-sm-3 col-form-label">Employee ID</label>
                                            <div class="col-sm-9">
                                                <input type="text" class="form-control" id="exampleInputUsername2" placeholder="Employee ID" />
                                            </div>
                                        </div>
                                        <div class="form-group row" style={{ marginTop: '-20px' }}>
                                            <label  class="col-sm-3 col-form-label">Username</label>
                                            <div class="col-sm-9">
                                                <input type="text" class="form-control" id="exampleInputEmail2" placeholder="Username" />
                                            </div>
                                        </div>
                                        <div class="form-group row" style={{ marginTop: '-20px' }}>
                                            <label  class="col-sm-3 col-form-label">Email</label>
                                            <div class="col-sm-9">
                                                <input type="email" class="form-control" id="exampleInputMobile" placeholder="Email" />
                                            </div>
                                        </div>
                                        <div class="form-group row" style={{ marginTop: '-20px' }}>
                                            <label  class="col-sm-3 col-form-label">Designation</label>
                                            <div class="col-sm-9">
                                                <input type="text" class="form-control" id="exampleInputMobile" placeholder="Designation" />
                                            </div>
                                        </div>
                                        <div class="form-group row" style={{ marginTop: '-20px' }}>
                                            <label  class="col-sm-3 col-form-label">Team</label>
                                            <div class="col-sm-9">
                                                <input type="text" class="form-control" id="exampleInputMobile" placeholder="Mobile number" />
                                            </div>
                                        </div>
                                        <div class="form-group row" style={{ marginTop: '-20px' }}>
                                            <label  class="col-sm-3 col-form-label">Mobile</label>
                                            <div class="col-sm-9">
                                                <input type="text" class="form-control" id="exampleInputMobile" placeholder="Mobile" />
                                            </div>
                                        </div>
                                        <div class="form-group row" style={{ marginTop: '-20px' }}>
                                            <label  class="col-sm-3 col-form-label">Role</label>
                                            <div class="col-sm-9">
                                                <input type="text" class="form-control" id="exampleInputMobile" placeholder="Role" />
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}