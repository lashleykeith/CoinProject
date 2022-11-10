import React, { useEffect, useState } from 'react';
import Nav from "../../components/admin/Nav";

const AdminLayout = (props) => {
    const [redirect, setRedirect] = useState(false);

    if (redirect) {

    }

    return (
        <div>
            <Nav />

            <div className="container-fluid">
                <div className="row">
                    {/* <Menu /> */}

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="table-responsive">
                            {props.children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;