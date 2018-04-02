import React from 'react'

export function Buttons({ clear, reload }) {
  return (
    <React.Fragment>
      <button onClick={clear}>
        Clear
      </button>
      <button onClick={reload}>
        Reload
      </button>
    </React.Fragment>
  )
}
