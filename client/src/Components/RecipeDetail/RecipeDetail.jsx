import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipeByDetail, loading } from '../../Redux/Actions'
import './recipeDetail.css'

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
                <div className='detailcontainer' >
                    <div className='detail'>
                        <h3>{detail.title}</h3>
                        <div className='healthScore'>
                            <p> Health Score: {detail.healthScore}</p>
                        </div>

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
                            <div className='summary' dangerouslySetInnerHTML={{ __html: detail.summary }}></div>

                        </div>
                        <div>
                            <h4>STEPS</h4>
                            <ul className='steps'>
                                {detail.steps?.map((s, index) =>

                                    <li key={index}><b>{index + 1} -</b> {s}</li>
                                )}
                            </ul>
                        </div>
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

