# Hospedar a aplicação PHP original da Pokédex

O repositório [neto750/Pok-dex](https://github.com/neto750/Pok-dex) usa PHP e MySQL. O GitHub Pages não executa PHP, por isso o projeto original precisa de um servidor compatível se você quiser que a versão PHP rode online. A demo `pokedex-demo.html` que acompanha o portfólio é uma alternativa estática para testes interativos.

## Requisitos do servidor

Escolha uma hospedagem que ofereça **PHP, MySQL/MariaDB e conexões HTTPS de saída para `pokeapi.co`**. Esse último requisito importa porque o código PHP original consulta a PokéAPI do lado do servidor. Antes de investir tempo configurando, verifique essa capacidade com o provedor.

## Passos gerais

1. Crie uma conta em um provedor compatível e crie um site/domínio ou subdomínio.
2. Crie um banco MySQL/MariaDB no painel do provedor. Anote o host, nome do banco, usuário e senha. Não coloque as credenciais reais em um repositório público.
3. Abra o gerenciador de banco (por exemplo, phpMyAdmin) e execute o conteúdo do arquivo `pokedex-database.sql` para criar a tabela `favoritos`.
4. Faça upload dos arquivos PHP e da pasta `assets` do repositório `neto750/Pok-dex` para a pasta pública do servidor. Não envie arquivos desnecessários que não sejam parte da aplicação.
5. No arquivo `conexao.php` **diretamente no servidor**, substitua `localhost`, `root`, a senha vazia e `pokedex` pelos dados reais fornecidos pelo provedor. Não envie essas credenciais de volta ao GitHub.
6. Abra o domínio no navegador e teste pesquisar Pokémon por nome e por ID, navegar entre Pokémon e adicionar/remover favoritos. Se a consulta falhar, verifique os logs e se a hospedagem permite chamadas HTTPS do PHP para a PokéAPI.
7. Só depois de confirmar que a aplicação está funcionando, copie o endereço público e coloque-o como link de demo no portfólio, caso queira apontar o botão para a versão PHP original em vez da demo estática.

## Estrutura do banco

A tabela abaixo atende às consultas presentes atualmente no projeto. Se a sua base local já tiver uma tabela `favoritos`, compare a estrutura antes de executar o SQL para evitar criar uma tabela duplicada.
