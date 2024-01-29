import React, { createContext, useState } from 'react'

export const closeModalContext = createContext()

function CloseModalContext({children}) {

  const [closeModal,setCloseModal] = useState(false)

  return (
    <closeModalContext.Provider value={{closeModal,setCloseModal}} >
        {children}
    </closeModalContext.Provider>
  )
}

export default CloseModalContext