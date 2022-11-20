import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, getDiets } from "../../Redux/Actions";
import { Link } from "react-router-dom";
import './createRecipe.css'


export default function RecipeList() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiets())
    validateSteps()
  }, [dispatch])

  const stateDiets = useSelector((state) => state.diets)
  const payloadstate = useSelector(state => state.payload)
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
  const [error, setError] = useState({ img: false, title: false, dishTypes: false, summary: false, steps: true, healthScore: false })
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
    field.className = 'stepbystep'
    field.onchange = (e) => handleOnChangeSteps(e)
    divSteps.current.append(field)
    i.current++
    validateSteps()
  }

  function eliminarSteps() {
    let inputsToErase = document.getElementsByClassName('stepbystep')
    let inputs = Array.from(inputsToErase)
    for (let j = 0; j < inputs.length; j++) {
      inputs[j].remove()
    }
    setError(prev => ({ ...prev, steps: true }))
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    let formulario = { ...form, steps: steps.current }
    dispatch(createRecipe(formulario))
    setForm(initialstateForm)
    setSteps([])
    eliminarSteps()
    dispatch(getDiets())
  }


  function validate(e) {
    switch (e.target.name) {
      case 'title':
        return !(/^[A-Za-z ]+$/).test(e.target.value) ?
          setError(prev => ({ ...prev, title: 'Solo letras sin numeros ni caracteres especiales.' })) : setError(prev => ({ ...prev, title: false }))

      case 'img':
        return !(/https?:\/\/.*\.(?:png|jpg)/g).test(e.target.value) ?
          setError(prev => ({ ...prev, img: 'No es una url Valida' })) : setError(prev => ({ ...prev, img: false }))

      case 'dishTypes':
        return (/^[A-Za-z0-9 ]+(,[A-Za-z0-9 ]+)*$/).test(e.target.value) || e.target.value.length === 0 ?
          setError(prev => ({ ...prev, dishTypes: false })) : setError(prev => ({ ...prev, dishTypes: 'Solo palabras o frases separadas por coma.' }))

      case 'healthScore':
        return e.target.value < 0 || e.target.value > 100 ?
          setError(prev => ({ ...prev, healthScore: 'Numero invalido. Solo entre 0 y 100' })) : setError(prev => ({ ...prev, healthScore: false }))

      case 'summary':
        return e.target.value.length > 0 ?
          setError(prev => ({ ...prev, summary: false })) : setError(prev => ({ ...prev, summary: 'Este campo no puede estar vacio' }))

      default:
        break;
    }
  }

  function validateSteps() {
    i.current === 0 ?
      setError(prev => ({ ...prev, steps: 'Ingresar al menos 1 paso.' })) : setError(prev => ({ ...prev, steps: false }))
  }

  return (

    < div className="createContainer" >
      <div className='createinputs'>
        {payloadstate ? <h3>Receta creada Correctamente. ID: <Link to={`/home/detail/${payloadstate}`}>{payloadstate}</Link> </h3>
          : false}

        <form onSubmit={handleOnSubmit} >
          <div>
            <input type='text' name="title" value={form.title} placeholder="Title..." onChange={handleOnChange} onBlur={(e) => validate(e)} className={error.title ? 'warning' : undefined}></input><br />
            {error.title ? <span>{error.title}</span> : false}
          </div>
          <div>
            <input type='text' name="img" value={form.img} placeholder="Image URL..." onChange={handleOnChange} onBlur={(e) => validate(e)} className={error.img ? 'warning' : undefined}></input><br />
            {error.img ? <span>{error.img}</span> : false}
          </div>
          <div>
            <input type='text' name="dishTypes" placeholder="E.g., lunch , main dish , dinner , etc (comma-separated)" onChange={handleOnChangeDishTypes} onBlur={(e) => validate(e)} className={error.dishTypes ? 'warning' : undefined} ></input><br />
            {error.dishTypes ? <span>{error.dishTypes}</span> : false}
          </div>
          <div>
            <input type='text' name="summary" value={form.summary} placeholder="Summary..." onChange={handleOnChange} onBlur={(e) => validate(e)} className={error.summary ? 'warning' : undefined} ></input><br />
            {error.summary ? <span>{error.summary}</span> : false}
          </div>
          <div className="healthscore">
            <label>Health Score</label>
            <input type='number' name="healthScore" value={form.healthScore} onChange={handleOnChange} onBlur={(e) => validate(e)} className={error.healthScore ? 'warning' : undefined}></input><br />
            {error.healthScore ? <span>{error.healthScore}</span> : false}
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
            {error.steps ? <span>{error.steps}</span> : false}
            <button onClick={AddFields} className={error.steps ? 'warning' : undefined}>+</button>
          </div>

          <input id='enviar' type="submit" disabled={(error.title || error.summary || error.steps) ? true : false} />

        </form>
      </div>
    </div >

  );

}

