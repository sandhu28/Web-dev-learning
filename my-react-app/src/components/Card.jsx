import React from "react";
import Avatar from "./Avatar";
import Detail from "./Paragraph";

function Card(props) {
    return (
        <div className="card">
            <div className="top">
                <p >{props.key}</p>
                <h2 className="name">{props.name}</h2>
                <Avatar img={props.img} />
            </div>
            <div className="bottom">
                <Detail
                    tel={props.tel}
                    email={props.email}
                />
            </div>
        </div>
    );
}

export default Card;
