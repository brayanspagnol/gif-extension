# Extensão de Busca de GIFs

Esta extensão permite que você busque e arraste GIFs diretamente do navegador para qualquer aplicativo que aceite imagens.

## Como Instalar a Extensão

1. Abra o Google Chrome e navegue até `chrome://extensions/`
   - Você também pode acessar esta página clicando no menu do Chrome (três pontos verticais) > Mais ferramentas > Extensões

2. Ative o "Modo do desenvolvedor"
   - No canto superior direito da página de extensões, você verá um toggle switch para "Modo do desenvolvedor"
   - Certifique-se de que está ativado (toggle deve estar azul/ligado)

3. Instale a extensão
   - Clique no botão "Carregar sem compactação" que aparece no topo da página
   - Navegue até a pasta onde você baixou/clonou este projeto
   - Selecione a pasta principal do projeto (que contém os arquivos `manifest.json`, `popup.html`, etc.)
   - Clique em "Selecionar pasta"

4. Pronto!
   - A extensão deve aparecer na sua lista de extensões
   - Um ícone da extensão será adicionado à barra de ferramentas do Chrome

## Como Usar

1. Clique no ícone da extensão na barra de ferramentas do Chrome
2. Digite o termo de busca na caixa de pesquisa
3. Pressione Enter ou clique no botão de busca
4. Arraste qualquer GIF diretamente para seu aplicativo ou documento

## Observações

- A extensão precisa estar no "Modo do desenvolvedor" pois é uma versão local/desenvolvimento
- Caso você atualize os arquivos da extensão, será necessário clicar no botão "Atualizar" na página de extensões
- Para remover a extensão, basta clicar em "Remover" na página de extensões

## Solução de Problemas

Se a extensão não aparecer:
- Verifique se todos os arquivos estão na pasta correta
- Certifique-se de que o `manifest.json` está presente e correto
- Tente recarregar a página de extensões
- Desative e reative o "Modo do desenvolvedor"
