const handleChange = (e, id, setForm) => {
  setForm((prevForm) => {
    return {
      ...prevForm,
      [id]: e.target.value,
    }
  })
}

export default handleChange
