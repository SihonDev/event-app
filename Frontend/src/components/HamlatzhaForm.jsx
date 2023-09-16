import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createHamlatzha } from '../features/hamlatzot/hamlatzhaSlice'
import { useNavigate } from 'react-router-dom'

function HamlatzhaForm() {
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const { user } = useSelector((state) => state.auth)
 
  const navigate = useNavigate()

  const dispatch = useDispatch()

  useEffect(() => {
    setName(user.name)
  }, [user])
  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      text: text,
      name: user.name,
    }
    dispatch(createHamlatzha(userData))
    setText('')
    navigate('/home')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div  >
          <p>הוסף המלצה</p>
          <div className='form-group'>
          <input
              type='text'
              name='name'
              id='name'
              value={name}
              onChange={(e) => setText(e.target.value)}></input>
            <textarea
              type='text'
              name='text'
              id='text'
              rows="5"
              cols="50"
              value={text}
              onChange={(e) => setText(e.target.value)}></textarea>
          </div>
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            הוסף
          </button>
        </div>
      </form>
    </section>
  )
}

export default HamlatzhaForm
