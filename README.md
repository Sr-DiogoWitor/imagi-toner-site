# Imagi Toner

Protótipo institucional comercial para apresentação ao cliente. É uma landing page estática, sem e-commerce e sem backend de formulário.

## Executar localmente

Com Node.js:

```bash
node scripts/build-check.mjs
```

Para visualizar com um servidor estático:

```bash
python -m http.server 4173
```

Depois, acesse `http://localhost:4173` a partir desta pasta.

## Direção

“Oficina em movimento”: um sistema editorial inspirado em sinalização técnica, folhas e estações de impressão. O azul profundo comunica confiança, o papel off-white cria uma base limpa e o coral marca ação e continuidade.

O wordmark é provisório e está preparado para substituição por `public/assets/logo.svg`. A ilustração do hero, as cenas de equipamentos e a imagem da seção Sobre são sintéticas/conceituais; não representam a fachada nem fotografias reais da empresa.

## Antes de publicar

- Confirmar o telefone `(81) 3099-0465`.
- Substituir `public/assets/logo.svg` pelo logo oficial quando disponível.
- Substituir as cenas conceituais por fotografias ou imagens aprovadas, caso o cliente forneça assets.
- Trocar os placeholders de equipamentos por catálogo, modelos, categorias e CTAs validados.
- Conectar o formulário a um canal real de atendimento.
- Revisar e aprovar os textos provisórios.
