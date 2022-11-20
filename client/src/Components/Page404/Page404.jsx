import React from "react";
import { Link } from "react-router-dom";

export default function Page404() {
    return (
        <div>
            <h1>Nothing to see..</h1>
            <h3>PAGE NOT FOUND</h3>
            <img src='https://img.freepik.com/vector-premium/error-404-linda-mascota-cono-waffle_152558-83041.jpg' alt='PAGE 404'></img>
            <Link to="/">Back</Link>
        </div>
    );
}