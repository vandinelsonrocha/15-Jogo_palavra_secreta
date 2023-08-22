//Componentes
import TelaInicial from './componentes/TelaInicial';
import Jogo from './componentes/Jogo';
import FimJogo from './componentes/FimJogo';

//CSS
import './App.css';

//Hooks
import { useState, useEffect, useCallback } from 'react';

//Dados
import { listaPalavras } from './dados/palavras';

//Estágios do jogo - são 3:
const estagios = [
  {id: 1, nome: "inicio"},  //estagio[0]
  {id: 2, nome: "jogo"},  //estagio[1]
  {id: 3, nome: "fim"},  //estagio[2]
]

const qtdeTentativas = 3

function App() {
  //Controlar o progresso no jogo através do useState:
  const [estagioJogo, setEstagioJogo] = useState(estagios[0].nome);
  const [palavras] = useState(listaPalavras);

  const [palavraEscolhida, setPalavraEscolhida] = useState("");
  const [categoriaEscolhida, setCategoriaEscolhida] = useState("");
  const [letras, setLetras] = useState([]); //É uma lista de letras, por isso deve ser um array

  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState([]);
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [tentativas, setTentativas] = useState(qtdeTentativas);
  const [pontuacao, setPontuacao] = useState(0);

  const escolherCategoriaEpalavra = useCallback(() =>  {
    const categorias = Object.keys(palavras) //pega todas as categorias da lista de palavras
    const categoria = categorias[Math.floor(Math.random() * Object.keys(categorias).length)]  //pegaa uma única categoria aleatória da lista
    //console.log(categoria)

    const palavra = palavras[categoria][Math.floor(Math.random() * palavras[categoria].length)]  //pega uma palavra aleatória de acordo com a categoria
    //console.log(palavra)

    //Desestruturar
    return { palavra, categoria }
  }, [palavras])

  //Mostra a lista de palavras no console:
  //console.log(palavras)

  /*Já se tem a 1ª tela do jogo (TelaInicial), falta criar mais duas telas
  (iniciarJogo e fimDoJogo) através dos componentes, elas são exibidas ao clicar num botão*/

  //Iniciar jogo
  const iniciarJogo = useCallback(() =>  {
    //O jogo reinicia com todos os estágios resetados:
    limparEstagios()

    //É preciso cumprir algumas condições antes de iniciar o jogo:
    //1 - escolher a palavra e  a categoria:
    const { palavra, categoria } = escolherCategoriaEpalavra()
    //console.log(palavra, categoria)

    //2 - Transformar a palavra em letras:
    let palavraParaLetras = palavra.split("")
    palavraParaLetras = palavraParaLetras.map((l) => l.toLowerCase())
    //console.log(palavraParaLetras)

    //3 - setar os states:
    setPalavraEscolhida(palavra)
    setCategoriaEscolhida(categoria)
    setLetras(palavraParaLetras)

    setEstagioJogo(estagios[1].nome)
  }, [escolherCategoriaEpalavra])

  //Processar a letra inserida:
  const verificarLetra = (letra) =>  {
    //Normalizar a letra para sempre minúscula:
    const letraNormalizada = letra.toLowerCase()

    //Verificar se a letra já foi utilizada:
    if(letrasAdivinhadas.includes(letraNormalizada) || letrasErradas.includes(letraNormalizada))  {
      return
    }

    //Imprimir a letra adivinhada:
    if(letras.includes(letraNormalizada))  {
      setLetrasAdivinhadas((atualLetrasAdivinhadas) => [
        ...atualLetrasAdivinhadas, letraNormalizada,
      ])
    } else  {
      setLetrasErradas((atualLetrasErradas) => [
        ...atualLetrasErradas, letraNormalizada
      ])
    
    //Diminuir uma tentativa caso não for adivinhada:
      setTentativas((atualTentativas) => atualTentativas -1)
    }
  }

  //Qd as 3 tentavivas esgotarem:
  const limparEstagios = () =>  {
    setLetrasAdivinhadas([])
    setLetrasErradas([])
  }

  useEffect(() =>  {
    if (tentativas <= 0)  {
      //Função que limpa todos os estágios para qd recomeçar o jogo esteja tudo normal:
      limparEstagios()

      setEstagioJogo(estagios[2].nome)
    }
  }, [tentativas])

  //console.log(letrasAdivinhadas)
  //console.log(letrasErradas)

  //Condição de vitória:
  useEffect(() =>  {
    //Se inserir uma letra e a palvra contiver mais do que 1 = a essa letra, todas devem ser preenchidas:
    const letrasUnicas = [...new Set(letras)] //cria um array de letras únicas/o Set evita caracteres repetidos

    if(letrasAdivinhadas.length === letrasUnicas.length)  {
      //A palavra foi adivinhada, aumentar a pontuação:
      setPontuacao((atualPontuacao) => (atualPontuacao += 100))

      //Jogar novamente:
      iniciarJogo()
    }
    //console.log(letrasUnicas)
  }, [letrasAdivinhadas, letras, iniciarJogo])

  //Reiniciar o jogo que envia de novo para a tela inicial
  const reiniciar = () =>  {
    setPontuacao(0)
    setTentativas(qtdeTentativas)
    setEstagioJogo(estagios[0].nome)
  }

  return (
    <div className="App">
      {estagioJogo === "inicio" && <TelaInicial iniciarJogo={iniciarJogo}/>}
      {estagioJogo === "jogo" && <Jogo verificarLetra={verificarLetra} palavraEscolhida={palavraEscolhida} categoriaEscolhida={categoriaEscolhida} letras={letras} letrasAdivinhadas={letrasAdivinhadas} letrasErradas={letrasErradas} tentativas={tentativas} pontuacao={pontuacao}/>}
      {estagioJogo === "fim" && <FimJogo reiniciar={reiniciar} pontuacao={pontuacao}/>}
    </div>
  );
}

export default App;
