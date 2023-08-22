import './Jogo.css';

import { useState, useRef } from 'react';

const Jogo = ({verificarLetra, palavraEscolhida, categoriaEscolhida, letras, letrasAdivinhadas, letrasErradas, tentativas, pontuacao}) =>  {

    const [letra, setLetra] = useState("");
    const letraInputRef = useRef(null)  //Agora é possível usar está variável como se estivesse sido selecionada no DOM

    const handleSubmit = (e) =>  {
        e.preventDefault()
        verificarLetra(letra)
        setLetra("")

        //Visto que foi criado uma referência ao input, agora é possível fazer com que ele fica sempre focado para digitar a letra:
        letraInputRef.current.focus()
    }

    return (
        <div className="jogar">
            <p className="pontos">
                <span>Pontuação: {pontuacao}</span>
            </p>
            <h1>Adivinhe a palavra:</h1>
            <h3 className="dica">
                Dica sobre a palavra: <span>{categoriaEscolhida}</span>
            </h3>
            <p>Você ainda tem {tentativas} tentativa(s)!</p>
            <div className="palavraContainer">
                {/*Imprimir a letra se ela for adivinhada, senão mostrar um quadrado branco*/}
                {letras.map((letra, i) =>
                    letrasAdivinhadas.includes(letra) ?
                    (<span key={i} className='letra'>{letra}</span>) :
                    (<span key={i} className='quadradoBranco'></span>)
                )}
            </div>
            <div className="letraContainer">
                <p>Tente adivinhar uma letra da palavra</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="letra" maxLength="1" required onChange={(e) => setLetra(e.target.value)} value={letra} ref={letraInputRef} />
                    <button>Jogar</button>
                </form>
            </div>
            <div className="letrasUtilizadas">
                <p>Letras erradas utilizadas:</p>
                {/*Fazer um map que imprime as letras erradas utilizadas para não usar novamente*/}
                {letrasErradas.map((letra, i) => 
                    (<span key={i}>{letra}, </span>)
                )}
            </div>
        </div>
    )
}
export default Jogo;