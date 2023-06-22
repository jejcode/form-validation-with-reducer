import React, {useReducer} from 'react'

const initialState = {
  firstName: {
    value: "",
    error: null
  },
  lastName: {
    value: "",
    error: null
  },
  email: {
    value: "",
    error: null
  }
}

const reducer = (state, action) => {
  const options = {
    SET_FIRSTNAME_VALUE: () => {
      return {
        ...state,
        firstName: {
          ...state.firstName,
          value: action.payload
        }
      }
    },
    SET_FIRSTNAME_ERROR: () => {
      return {
        ...state,
        firstName: {
          ...state.firstName,
          error: action.payload
        }
      }
    },
    SET_LASTNAME_VALUE: () => {
      return {
        ...state,
        lastName: {
          ...state.lastName,
          value: action.payload
        }
      }
    },
    SET_LASTNAME_ERROR: () => {
      return {
        ...state,
        lastName: {
          ...state.lastName,
          error: action.payload
        }
      }
    },
    SET_EMAIL_VALUE: () => {
      return {
        ...state,
        email: {
          ...state.email,
          value: action.payload
        }
      }
    },
    SET_EMAIL_ERROR: () => {
      return {
        ...state,
        email: {
          ...state.email,
          error: action.payload
        }
      }
    },
  }

  return options[action.type]() || options.default()
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleFirstNameChange = (e) => {
    if(e.target.value.length < 2) {
      dispatch({
        type: "SET_FIRSTNAME_ERROR",
        payload: "First name must be at least 2 characters."
      })
    } else {
      dispatch({
        type: "SET_FIRSTNAME_ERROR",
        payload: null
      })
    }
    dispatch({
      type: 'SET_FIRSTNAME_VALUE',
      payload: e.target.value
    })
  }
  const handleLastNameChange = (e) => {
    if(e.target.value.length < 2) {
      dispatch({
        type: "SET_LASTNAME_ERROR",
        payload: "Last name must be at least 2 characters."
      })
    } else {
      dispatch({
        type: "SET_LASTNAME_ERROR",
        payload: null
      })
    }
    dispatch({
      type: 'SET_LASTNAME_VALUE',
      payload: e.target.value
    })
  }
  const handleEmailChange = (e) => {
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(e.target.value.match(mailFormat)) {
      dispatch({
        type: "SET_EMAIL_ERROR",
        payload: null
      })
    } else {
      dispatch({
        type: "SET_EMAIL_ERROR",
        payload: "Email must be a valid email address."
      })
    }
    dispatch({
      type: 'SET_EMAIL_VALUE',
      payload: e.target.value
    })
  }
  const submitHandler = (e) => {
    e.preventDefault()
    for( let i = 0; i < 3; i++) {
      console.log(e.target[i].value)
    }
  }
  return (
    <div>
      <h1>{JSON.stringify(state)}</h1>
      <form onSubmit={(e) => {submitHandler(e)}}>
        <div>
          <label htmlFor="firstName">First name:</label>
          <input type="text" name="firstName" id="firstName" value={state.firstName.value} onChange={(e) => handleFirstNameChange(e)}/>
          {state.firstName.error !== null && <p>{state.firstName.error}</p>}
        </div>
        <div>
          <label htmlFor="lastName">Last name:</label>
          <input type="text" name="lastName" id="lastName" value={state.lastName.value} onChange={(e) => handleLastNameChange(e)}/>
          {state.lastName.error !== null && <p>{state.lastName.error}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" name="email" id="email" value={state.email.value} onChange={(e) => handleEmailChange(e)}/>
          {state.email.error !== null && <p>{state.email.error}</p>}
        </div>
        {state.firstName.error || state.lastName.error || state.email.error ?
          <button type="button">Submit</button>  
          :
        <input type="submit" value="Submit" />
      }
      </form>
    </div>
  );
}

export default App;
