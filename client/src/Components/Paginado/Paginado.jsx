import React from "react";
import './paginado.css'

export default function Paginado({ cantAllRecipes, cantRecipePerPage, pages }) {
    const pageNumber = []

    for (let i = 1; i <= Math.ceil(cantAllRecipes / cantRecipePerPage); i++) {
        pageNumber.push(i)
    }

    return (

        <div className="div.paginado">
            <ul className="paginado">
                {pageNumber?.map(p =>
                    <li key={p}>
                        <button id={p} onClick={() => pages(p)}>{p}</button>
                    </li>
                )}
            </ul>
        </div >
    )
}