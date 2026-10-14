# Portfólio — Nelson Allein Neto

Portfólio pessoal responsivo feito com HTML, CSS e JavaScript, com animações de entrada, brilho que acompanha o cursor e layout para celular e desktop. Inclui uma demo interativa da Pokédex que funciona em hospedagem estática.

## Arquivos

- `index.html`: página principal do portfólio.
- `style.css`: identidade visual, layout responsivo e animações do portfólio.
- `script.js`: dados pessoais, links e interações da página principal.
- `pokedex-demo.html`, `pokedex-demo.css`, `pokedex-demo.js`: demo interativa da Pokédex, consultando a PokéAPI diretamente pelo navegador.
- `POKEDEX-HOSTING.md`: observações sobre hospedar a aplicação PHP original.
- `pokedex-database.sql`: estrutura básica para a tabela de favoritos usada no projeto PHP original.

## Contato

O botão **Enviar e-mail** abre uma nova janela de composição no Gmail. O botão **Copiar e-mail** copia o endereço para a área de transferência, oferecendo uma alternativa caso o visitante não tenha um aplicativo de e-mail configurado.

## Demo da Pokédex

A opção **Demo interativa** abre `pokedex-demo.html`. Esta é uma versão estática de demonstração: consulta os dados da PokéAPI usando JavaScript no navegador e guarda os favoritos no `localStorage` do navegador atual. Ela foi criada para funcionar no GitHub Pages. A aplicação PHP original continua no repositório [neto750/Pok-dex](https://github.com/neto750/Pok-dex). Para colocar a versão PHP/MySQL original em um servidor, leia `POKEDEX-HOSTING.md`.

## Atualizar os dados pessoais

No início de `script.js`, edite o objeto `PORTFOLIO` para alterar nome, GitHub, LinkedIn, e-mail e os links dos projetos. A demo é referenciada por `pokedexDemo: "pokedex-demo.html"`.

## Testar localmente

1. Extraia os arquivos para uma pasta.
2. Abra essa pasta no VS Code.
3. Para testar a demo da Pokédex, use uma extensão como Live Server ou acesse o site depois de publicá-lo: requisições para a PokéAPI normalmente não funcionam ao abrir a página diretamente pelo protocolo `file://`.
4. Teste tanto a busca por nome quanto por ID, a navegação anterior/próximo, o botão de favoritos e os links de contato.

## Publicar no GitHub Pages

1. Envie **todos** os arquivos HTML, CSS e JavaScript para a raiz do repositório `Portfolio`.
2. No GitHub, abra **Settings → Pages**.
3. Selecione **Deploy from a branch**, branch `main` e pasta `/ (root)`, e salve.
4. O site principal estará no endereço mostrado pelo GitHub Pages. A demo estará em `/Portfolio/pokedex-demo.html` (respeitando maiúsculas/minúsculas do nome do repositório).
5. Depois de cada alteração local, faça `git add .`, `git commit -m "Atualiza portfólio e demo da Pokedex"` e `git push`.

**Importante:** GitHub Pages não executa PHP. A demo estática permite testar as funções básicas no navegador, mas não executa o código PHP, nem usa o banco de dados da aplicação original.
