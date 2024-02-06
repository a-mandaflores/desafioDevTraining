import React from "react"


function Aluno({Matricula, Aluno, Faltas, P1, P2, P3, Situação, AprovacaoFinal, display}){
         
    const verificar = Situação == "" ? '-' : Situação;
    const verificarAprov = AprovacaoFinal == " " ? '-' : AprovacaoFinal;
    return(
        <div style={display} className="row">
        <div>{Matricula} </div>
        <div>{Aluno} </div>
        <div>{Faltas} </div>
        <div>{P1} </div>
        <div>{P3} </div>
        <div>{P2} </div>
        <div>{verificar}</div>
        <div>{verificarAprov} </div>
        </div>
    )
}

export default Aluno