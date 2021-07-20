import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';


function ProfileSideBar(propriedades) {
  //console.log(propriedades);
  return(
    <Box as = "aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px'}} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}

        </a>
      </p>
      <hr />



      <AlurakutProfileSidebarMenuDefault />

    </Box>
  )
}



function ProfileRelationsBox(propriedades) {
  //console.log(propriedades.items[0]);
  return (
    <ProfileRelationsBoxWrapper >
      <h2 className = "smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      
      
      { <ul>
        {propriedades.items.slice(0, 6).map((itemAtual) => {
          return(
            <li key = {itemAtual["login"]}>
              <a href = {`/users/${itemAtual["login"]}`} >
                <img src = {`https://github.com/${itemAtual["login"]}.png`} />
                <span>{itemAtual["login"]}</span>
              </a>
            </li>
          )
        })}
      </ul> } 


    </ProfileRelationsBoxWrapper>    
  )
}

















export default function Home() {

  

  const usuarioAleatorio = 'jperezjr';

  const [comunidades, setComunidades]  = React.useState([
  // {
  //   id: '12132352225552',
  //   title: 'Eu odeio acordar cedo',
  //   image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  // }
  ]);
   
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ];


  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function() {
    fetch('https://api.github.com/users/peas/followers')
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function (respostaCompleta) {
      setSeguidores(respostaCompleta);      
    })



    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': '581ae4742dcd47c384aa021266cff3',
      },
      body: JSON.stringify({
        query: "{ allCommunities {title, id, imageUrl, creatorSlug}}"
      
      }),
    }
    )
    .then(res => res.json())
    .then((res) => {
      //console.log(res.data)
      const comunidadesVindasDoDato = res.data.allCommunities;

      setComunidades(comunidadesVindasDoDato);

    })
    .catch((error) => {
      console.log(error);
    })

  
  }, [] );













  return (

    <> 
      <AlurakutMenu githubUser={usuarioAleatorio}/>

      <MainGrid>

        <div className = "profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={usuarioAleatorio} />
        </div>

        <div className = "welcomeArea" style={{ gridArea: 'welcomeArea' }}>  
          <Box>
            <h1 className = "title">
              Bem vindo
            </h1>

            <OrkutNostalgicIconSet />
            
          </Box>


          <Box>
            <h2 className = "subTitle">O que você deseja fazer?</h2>
            <form onSubmit = {function handleCriaComunidade(e) {
              e.preventDefault(); /*Previne a pagina de fazer o comportamento padrao... no caso, de atualizar */
              const dadosDoForm = new FormData(e.target);
              
              //console.log(e);
              //console.log('Campo title: ', dadosDoForm.get('title'));
              //console.log('Campo image: ', dadosDoForm.get('image'));

              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: usuarioAleatorio,
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',                
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);
              
              })












            }} >
              <div>
                <input 
                  placeholder = "Qual vai ser o nome da sua comunidade?"
                  name = "title" 
                  aria-label = "Qual vai ser o nome da sua comunidade?" 
                  type = "text"
                />
              </div>
              <div>
                <input 
                  placeholder = "Coloque uma URL para usarmos de capa"
                  name = "image" 
                  aria-label = "Coloque uma URL para usarmos de capa"                   
                />
              </div>

              <button>
                Criar comunidade
              </button>




            </form>
          </Box>
        </div>

        <div className = "profileRelationsArea" style = {{ gridArea: 'profileRelationsArea' }}>

            <ProfileRelationsBox title = "Seguidores" items = {seguidores} />





          <ProfileRelationsBoxWrapper>
            <h2 className = "smallTitle">
              Comunidades ({comunidades.length})
            </h2>

            <ul>
                  {comunidades.map((itemAtual) => {
                    return(
                      <li key = {itemAtual.id}>
                        <a href = {`/comunities/${itemAtual.id}`}>
                          <img src = {itemAtual.imageUrl} />
                          <span>{itemAtual.title}</span>
                        </a>
                      </li>
                    )
                  })}
            </ul>

          </ProfileRelationsBoxWrapper>




          <ProfileRelationsBoxWrapper >
            <h2 className = "smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>
            
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return(
                  <li key = {itemAtual}>
                    <a href = {`/users/${itemAtual}`} >
                      <img src = {`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>


          </ProfileRelationsBoxWrapper>

        </div>

      </MainGrid>

    </>
  )
}