import React from 'react'

export function Buttons({ clear, reload }) {
  return (

    <div style={{display: "inlineBlock", width: "150", margin:"0", paddingBottom:"10px"}} >
      <button onClick={clear} style={{"background": "#19004c", fontSize: "15px",color: "#ADDDE1", borderColor:"red"}}>
        Clear
      </button>
    </div>
  )
}
