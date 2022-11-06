import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, createRecipe } from "../../Redux/Actions";

export default function RecipeList() {
  var i = 0;
  useEffect(() => {
    dispatch(getDiets())
  }, [])

  let dispatch = useDispatch();
  const stateDiets = useSelector((state) => state.diets)

  const initialstateForm = {
    title: '',
    img: '',
    dishTypes: [],
    summary: '',
    healthScore: 0,
    diets: [],
    steps: []
  }
  const [steps, setSteps] = useState([])
  const [form, setForm] = useState(initialstateForm)
  const divSteps = useRef()
  // function handleOnChange(e) {
  //   setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  // }

  // function handleOnChangeDishTypes(e) {
  //   let types = e.target.value.split(',')
  //   setForm(prev => ({ ...prev, [e.target.name]: types }))
  // }

  // function handleSelectedDiets(e) {
  //   const opciones = e.target.options
  //   const seleccionadas = []
  //   for (let i = 0; i < opciones.length; i++) {
  //     if (opciones[i].selected) {
  //       seleccionadas.push(opciones[i].value)
  //     }
  //   }
  //   setForm(prev => ({ ...prev, [e.target.name]: seleccionadas }))
  // }

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(form)
    console.log(steps)
    // dispatch(createRecipe(form))
    // setForm(initialstateForm)

  }

  var pasos = []
  function handleOnChangeSteps(e) {
    let id = e.target.id
    pasos[id] = e.target.value
    setSteps(pasos)
  }

  function AddFields(e) {
    e.preventDefault(e);
    const field = document.createElement('Input')
    field.type = "text"
    field.id = i
    field.name = "steps"
    field.onchange = (e) => handleOnChangeSteps(e)
    divSteps.current.append(field)
    i++
  }


  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        {/* <label>Title</label>
        <input type='text' name="title" value={form.title} placeholder="Title..." onChange={handleOnChange}></input>
        <label>Image</label>
        <input type='text' name="img" value={form.img} placeholder="Image URL..." onChange={handleOnChange}></input>
        <label>Dish Types</label>
        <input type='text' name="dishTypes" placeholder="E.g., lunch,main dish,dinner,etc" onChange={handleOnChangeDishTypes}></input>

        <label>Diets</label>
        <select name='diets' multiple onChange={handleSelectedDiets}>
          {stateDiets.map((d, index) =>
            <option key={index} value={d.name} >{d.name}</option>
          )}
        </select>

        <label>Summary</label>
        <input type='text' name="summary" value={form.summary} placeholder="Tell us more..." onChange={handleOnChange}></input>
        <label>Health Score</label>
        <input type='number' name="healthScore" value={form.healthScore} placeholder="Raiting healthy, 0 to 100" onChange={handleOnChange}></input> */}
        <input type="submit" />
      </form>

      <div id='steps' ref={divSteps}>
        <button onClick={AddFields}>+</button>
      </div>
    </div>
  );
}

