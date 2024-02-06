import React, { useState, useEffect } from "react";
import Aluno from "./componentes/Aluno";
import Cabesalho from "./componentes/Cabesalho";
import Titulo from "./componentes/Titulo";
import Button from "./componentes/Button";



function App() {
  const [aluno, setAluno] = React.useState({saida: []})
  const [style, setStyle] = React.useState({display: 'none'})
  const [styleButton, setStyleButton] = React.useState({display: 'block'})
  const [retunDados, setReturnDados] = React.useState(false)


  function change(){
      setStyleButton({display: 'none'})
  }
  function mudarStyle() {
    setStyle({height: 'auto'})
    console.log('Mudei o Style')
  } 

  const validacao = () => {
    
    if(retunDados == true){
      mudarStyle()
      change()
      
      
      const validar = aluno.saida.map(infos => {
  
          let media = (infos.P1 + infos.P2 + infos.P3) / 3
          let situacao;
          let aprovacao;
          
          if(media < 50){
            situacao = "Reprovado por nota" 
          }else if(media >= 50 && media <70){
  
            situacao = "Exame Final" 
          }else{
            situacao = "Aprovado"
          }
  
          let aula = 60
          let faltas = (infos.Faltas * 100) / aula
  
          if(faltas > 25){
            situacao = "Reprovado por falta"
          }
  
          if(situacao != "Exame Final"){
            aprovacao = 0
          }else{
            let mediaAprovacao = (media+aprovacao) / 2
  
            aprovacao = mediaAprovacao <= 5 ? "Reprovado": "Aprovado"
          }
  
  
  
          
          return { ...infos, Situação: situacao, AprovacaoFinal: aprovacao }
      
        })

        
      
      setAluno({ ...aluno, saida: validar })
      console.log('Situação atualizada')}

    
  }

  const fetchData = async () => {
    try {
      console.log('Conectando api...');
      const res = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=QQFDdD0AMXo9hKyIKthuA8fiLfqDl8ru926-OrmP3fUSzKrLLwbNlI7TZbYPpK7Y-HwOYo55ueYvilnoJPh0cZv79c0uGML3m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnAYE1H6McEVs7FuetSVJ-tdx0FjtiuL5UC2so8mARCZGjoJNgupy0unCVVzOMNo_snCz2NGOzwzJ3RB37XBQp16W6DXOMK33Zw&lib=MaujGmggYEsl3ZfoL6KIVgyZrDaw7s3jo');
      const json = await res.json();

      if (Array.isArray(json.saida)) {
        setAluno({ saida: json.saida });
        setReturnDados(true)
        console.log('Api conectada');
      } else {
        console.error('A resposta da API não é uma array:', json);
      }
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  const alunos = aluno.saida ? aluno.saida.map(infos => {
    return(
      <Aluno key={infos.Matricula} 
      {...infos}
      display={style}
      />
      )
  }
  
  ) : null;
  

  return(

    <>
    <div className="lista">
      <Titulo />
      <div className="linha"></div>
      <Button display={styleButton} click={validacao}/>  
      <Cabesalho display={style}/> 
      <div>{alunos}</div>
    </div>

    </>
  )
}

export default App;
