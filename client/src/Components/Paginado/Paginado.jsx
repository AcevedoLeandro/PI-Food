import React from "react";
import './paginado.css'

export default function Paginado({ cantAllRecipes, cantRecipePerPage, pages }) {
    const pageNumber = []

    for (let i = 1; i <= Math.ceil(cantAllRecipes / cantRecipePerPage); i++) {
        pageNumber.push(i)
    }

    return (

        <div>
            <ul className="paginado">
                {pageNumber?.map(p =>
                    <li key={p}>

                        <a href="#" onClick={() => pages(p)}>
                            {p}
                        </a>
                    </li>
                )}
            </ul>

        </div >
    )
}