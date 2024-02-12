import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const ContactCard = (props) => {
    const { actions } = useContext(Context);

    const handleDelete = async () => {
        await actions.deleteContact(props.id);
        window.location.reload();
    };

    return (
        <div className="container">
            <div className="card mb-3" style={{ maxWidth: "540px" }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="https://img.freepik.com/free-vector/get-touch-concept-illustration_114360-2646.jpg?w=740&t=st=1707751395~exp=1707751995~hmac=1ddfe31c7642fabd60c6bba87da761dd3d1041ed405b5f67e9d80f831c975dcf" className="img-fluid rounded-start" alt="contact" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{props.name}</h5>
                            <p className="card-text">{props.email}</p>
                            <p className="card-text">{props.address}</p>
                            <p className="card-text">{props.phone}</p>
                            <Link to={"/update/" + props.id}>
                                <button className="btn btn-info">Update</button>
                            </Link>
                            <button className="btn btn-dark" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
