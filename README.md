
# Vue Knowledge

Este projeto tem como objetivo demonstrar os principais conhecimentos em Vue 3, apresentando um painel administrativo base que utiliza componentes dinâmicos construídos do zero. Além disso, o projeto faz uso do Tailwind CSS e segue as melhores práticas de desenvolvimento.

## Rodando local com container  

> Requisitos: Docker e leitor de makefiles.  

Para rodar o ambiente de desenvolvimento , pela primeira vez execute:  

```shell
make setup
```  

Para rodar o ambiente em modo background:  

```shell
make start
```

Na primeira vez que esse comando é executado ele pode demorar a executar o front. Se pode observar os logs do comando utilizando o modo interativo ou o comando:  

```shell
make logs
```  

Para rodar o ambiente em modo interativo:  

```shell
make start_no_detach
```
 
Para acessar o terminal interativo do container, rode:  

```shell
make shell
```

O make shell é recomendado para termos mais controle da aplicação. Dentro dele se pode executar diretamente o comando `npm run serve` e instalar libs necessárias.  

> O storybook roda juntamente do container da aplicação
> ### Porta exposta pelo container: 8080 e storybook 6006

#  

## Rodando local com npm  

> Requisitos: Node maior ou igual ao 18.  

Para rodar o ambiente de desenvolvimento, pela primeira vez execute:  

```shell
npm install
```  

Compilar e rodar o servidor de desenvolvimento:  

```bash
npm run dev
```

## Rodando o Storybook

```shell
npm run storybook
``` 
