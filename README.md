## Sobre

Projeto para teste prático: Construção de um sistema de gerenciamento de estabelecimentos - Frontend.

## Outras partes que compõem a aplicação
[BACKEND](https://github.com/jp-cordeiro/fortbrasil-backend)
[MOBILE](https://github.com/jp-cordeiro/fortbrasil-mobile)

## Como usar

### :rotating_light: Aviso!

- Para o correto funcionamento é necessário usar um Token da API do [Mapbox](https://www.mapbox.com/). Após criar a conta e logar, seu token estará nos dads da sua conta na opção Account.

### Instalação local

```bash

# Instalar dependências
$ yarn install

# Crie um arquivo .env com base no .env-example (preecha as informações corretamente).
$ cp .env-example .env

# Executa a aplicação
$ yarn start
```

### Utilizando [docker](https://www.docker.com/).

```bash
# Crie um arquivo .env com base no .env-example (preecha as informações corretamente).
$ cp .env.example .env

# Subir a aplicação
$ docker-compose up -d
```
