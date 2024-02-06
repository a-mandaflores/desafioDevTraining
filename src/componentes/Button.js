import { click } from "@testing-library/user-event/dist/click"
import React from "react"

function Button(props){
    

    return(
    <div style={props.display} className="resultado" onClick={props.click}>Visualizar planilha</div>
    )
}

export default Button