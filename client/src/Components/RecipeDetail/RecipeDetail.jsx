import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipeByDetail, loading } from '../../Redux/Actions'


export default function RecipeDetail({ match }) {
    let { id } = match.params
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loading())
        dispatch(getRecipeByDetail(id))
    }, [dispatch])
    let detail = useSelector(state => state.recipeDetail)
    let load = useSelector(state => state.loading)
    console.log(detail)
    return (
        <>
            {!load ?
                <div>
                    <h3>{detail.title}</h3>
                    <p>{detail.healthScore}</p>
                    <img src={`${detail.img}`} alt="img" />
                    <div>
                        <h4>DISH TYPES</h4>
                        <ul>
                            {detail.dishTypes?.map(
                                (d, index) => <li key={index}>{d}</li>
                            )}
                        </ul>
                    </div>
                    <div>
                        <h4>DIETS</h4>
                        <ul>
                            {detail.diets?.map((e, index) =>
                                <li key={index}>{e}</li>
                            )}
                        </ul>
                    </div>
                    <div>
                        <h4>SUMMARY</h4>
                        <div dangerouslySetInnerHTML={{ __html: detail.summary }}></div>

                    </div>

                    <div>
                        <h4>STEPS</h4>
                        <ul>
                            {detail.steps?.map((s, index) =>

                                <li key={index}>{index + 1} - {s}</li>
                            )}
                        </ul>
                    </div>
                </div>
                :
                <div>
                    <h3>loading</h3>
                </div>
            }
        </>
    )
}

