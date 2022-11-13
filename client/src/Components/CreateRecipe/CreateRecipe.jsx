import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, getDiets } from "../../Redux/Actions";
import { useHistory } from "react-router-dom";
import './createRecipe.css'


export default function RecipeList() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiets())
  }, [])

  const stateDiets = useSelector((state) => state.diets)

  const i = useRef(0);
  const pasos = useRef([])

  const initialstateForm = {
    title: '',
    img: '',
    dishTypes: [],
    summary: '',
    healthScore: 0,
    diets: []
  }
  const [steps, setSteps] = useState([])
  const [form, setForm] = useState(initialstateForm)
  var newdiet = ''
  var newInputDiet = ''
  function handleOnChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleOnChangeDishTypes(e) {
    let types = e.target.value.split(',')
    setForm(prev => ({ ...prev, [e.target.name]: types }))
  }

  function handleSelectedDiets(e) {
    if (e.target.value !== 'Choose...') {
      newdiet = e.target.value
    }
    else newdiet = ''
  }
  function handleInputDiets(e) {

    newInputDiet = e.target.value
  }

  function addDiets(e) {
    e.preventDefault()
    if (newInputDiet.length !== 0)
      setForm(prev => ({ ...prev, diets: [...prev.diets, newInputDiet] }))
    if (newdiet.length !== 0)
      setForm(prev => ({ ...prev, diets: [...prev.diets, newdiet] }))
  }
  function removeDiets(e) {
    e.preventDefault()
    let diets = form.diets
    diets.pop()
    setForm(prev => ({ ...prev, diets: diets }))
  }


  function handleOnChangeSteps(e) {
    let id = e.target.id
    pasos.current[id] = e.target.value
    setSteps(pasos)
  }

  const divSteps = useRef()
  function AddFields(e) {
    e.preventDefault(e);
    let { current } = i
    const field = document.createElement('Input')
    field.type = "text"
    field.id = current
    field.name = "steps"
    field.onchange = (e) => handleOnChangeSteps(e)
    divSteps.current.append(field)
    i.current++
  }

  const history = useHistory()
  function handleOnSubmit(e) {
    e.preventDefault();
    let formulario = { ...form, steps: steps.current }
    dispatch(createRecipe(formulario))
    setForm(initialstateForm)
    setSteps([])
    dispatch(getDiets())
    history.push('/home')

  }

  return (
    <div className="createContainer">
      <div className='createinputs'>
        <form onSubmit={handleOnSubmit}>
          <div>
            <input type='text' name="title" value={form.title} placeholder="Title..." onChange={handleOnChange}></input>
          </div>
          <div>
            <input type='text' name="img" value={form.img} placeholder="Image URL..." onChange={handleOnChange}></input>
          </div>
          <div>
            <input type='text' name="dishTypes" placeholder="E.g., lunch , main dish , dinner , etc (comma-separated)" onChange={handleOnChangeDishTypes}></input>
          </div>
          <div>
            <input type='text' name="summary" value={form.summary} placeholder="Summary..." onChange={handleOnChange}></input>
          </div>
          <div>
            <input type='number' name="healthScore" value={form.healthScore} placeholder="Raiting healthy, 0 to 100" onChange={handleOnChange}></input>
          </div>
          <div id='diets'>
            <div id='dietsinput'>
              <label>Select or input Diets</label>
              <input type="text" onChange={handleInputDiets} />
              <select name='diets' onChange={handleSelectedDiets}>
                <option > Choose...</option>
                {stateDiets.map((d, index) =>
                  <option key={index} value={d.name} >{d.name}</option>
                )}
              </select>
            </div>
            <div>
              <button onClick={addDiets}>+</button>
              <button onClick={removeDiets}>-</button>
            </div>
            <ul>
              <div className="lista" >
                {form.diets.map((e, index) =>
                  <li key={index}>{e}</li>)}
              </div>
            </ul>
          </div>

          <div id='steps' ref={divSteps}>
            <label>ADD STEPS</label>
            <button onClick={AddFields}>+</button>
          </div>

          <input type="submit" />
        </form>
      </div>

    </div>
  );
}

