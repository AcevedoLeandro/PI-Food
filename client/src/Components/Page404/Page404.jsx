import React from "react";
import { Link } from "react-router-dom";

export default function Page404() {
    return (
        <div>
            <h1>Nothing to see..</h1>
            <h3>PAGE NOT FOUND</h3>
            <Link to="/">Back</Link>
        </div>
    );
}
