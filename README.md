# Rangos
Esse é o repositório front end do projeto Rangos, que serve para criar cardápios online, podendo exibir os pratos, bebidas, alterando cores e estilo da página, também criando e recebendo pedidos, que são gerenciados através de um painel. Esse é um projeto full stack, então para testar as funcionalidade é necessário rodar o back end, pra isso disponibilizei um arquivo *Docker compose* na raiz do projeto, através dele é possível rodar uma instância do back end e do banco de dados, usando apenas o Docker, sem precisar instalar mais nada.

Ao final desse arquivo está o link do repositório do back end, case queira ver o código e alterar algo.

## Como usar

### Pré-requisitos

- **Docker** instalado na máquina - [Baixar Docker](https://www.docker.com/)
- **Node.js** instalado para rodar o frontend - [Baixar Node](https://nodejs.org/)

---

### Passo a passo para rodar o projeto

1. **Clonar o repositório:**

   > git clone https://github.com/ovittorhugomachado/rangos.git

   > cd rangos


2. **Instalar as dependências do frontend:**

   > npm install ou npm i


3. **Iniciar os containers do banco de dados e backend:**
   (O terminal precisa ser executado como administrador!)

   > docker-compose up -d


   **Portas padrão utilizadas:**
   - `3000`: Serviço backend (definido em `.env` e `docker-compose.yaml`)
   - `5432`: Banco de dados (definido em `docker-compose.yaml`)
   - `5173`: Frontend (definido em `vite.config.ts`)

   **IMPORTANTE:** Verifique se essas portas estão livres na sua máquina.  
   Não é recomendado alterar as portas no `docker-compose.yaml` ou `.env`.  
   Se precisar alterar, modifique apenas o primeiro valor do mapeamento, exemplo:  
   `3000:3000` → `5000:3000` (acessará pelo `localhost:5000`).

4. **Executar o frontend em modo desenvolvimento:**

   > npm run dev


5. **Acessar a aplicação:**
   - Depois do comando acima é esperado que o terminal apresente um link, através dele que estará rodando o front end 
   > Exemplo [http://localhost:5173]

---

## Comandos úteis

### Docker

- **Listar containers ativos:**

  > docker ps


- **Listar todos os containers (inclusive parados):**

  > docker ps -a


- **Listar imagens:**

  > docker images


- **Parar um container:**

  > docker stop [nome-ou-id-do-container]


- **Executar (iniciar) um container parado:**

  > docker start [nome-ou-id-do-container]


- **Verificar versão do Docker:**

  > docker --version


- **Remover um container:**

  > docker rm [nome-ou-id-do-container]


- **Parar todos os containers do Docker Compose:**
  
  > docker-compose down


- **Remover uma imagem:**

  > docker rmi [nome-ou-id-da-imagem]


- **Ver logs de um container:**

  > docker logs [nome-ou-id-do-container]


---

### Outros serviços

- **Verificar versão do Node.js:**

  > node --version


- **Verificar versão do npm:**

  > npm --version


- **Instalar dependências:**

  > npm install ou npm i


- **Rodar o frontend em modo desenvolvimento:**

  > npm run dev



## Observações

- Se tiver problemas, verifique se o Docker está rodando e se as portas estão livres.
- Para parar os containers, use:
  docker-compose

### Aplicação em produção
- https://rangos.onrender.com

### Imagem docker
- https://hub.docker.com/r/ovittormachado/rangos-server-app

### Repositório back end
- https://github.com/ovittorhugomachado/rangos-server.git
