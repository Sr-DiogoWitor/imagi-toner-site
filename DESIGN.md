# Imagi Toner — design system

## World

“Oficina em movimento”: uma identidade digital que mistura a precisão de uma sinalização técnica com a matéria de folhas, documentos e cartuchos. O sistema é editorial e comercial, com ritmo de pôster, mas conserva a clareza de uma empresa de suporte.

## Color strategy

Full palette, em campos amplos e alternados: azul profundo `#0D1830` como base de confiança e contraste; off-white `#F8F5EF` como substrato; coral `#F26869` como ação e ponto de energia; azul claro `#C6DEEA` como área de respiro; grafite/azul-escuro para texto e estrutura.

## Type

- Display: Space Grotesk, pesado e compacto, com títulos em grande escala e tracking negativo controlado.
- Body: DM Sans, legível e funcional para textos, labels e formulários.
- Títulos nunca usam gradiente; a ênfase vem de escala, peso e blocos de cor.

## Composition

Grid de conteúdo central com 80px de margem em telas grandes, reduzido para 38px no mobile. A página alterna campos azul, papel e azul-claro. O hero usa composição assimétrica com estação de impressão geométrica coral, folhas sobrepostas e detalhes de registro. Listas e timelines carregam a informação; cards idênticos não são a estrutura dominante.

## Components

- Header sticky com mudança de contraste e menu mobile real.
- Buttons com coral para ação primária e contorno claro para ação secundária.
- Linhas editoriais para serviços, proposta de valor e processo.
- Placeholders de equipamento com geometria vetorial e rótulo explícito.
- Formulário com labels, estados nativos, validação local e mensagem `role=status`.

## Motion

Um momento de movimento contínuo no ticker do hero e três famílias discretas de entrada em viewport: rise, slide e clip. A preferência `prefers-reduced-motion` desativa transições e animação. Imagens/ilustrações não fazem zoom no hover; o feedback fica em links e containers.

## Responsive rules

No mobile, o hero vira uma narrativa vertical; navegação vira menu; a proposta de valor vira lista em duas linhas; processo vira trilho vertical; equipamentos empilham; formulário vira uma coluna. A composição evita overflow horizontal e preserva a hierarquia dos CTAs.

## Content honesty

O wordmark, as cenas vetoriais e os equipamentos são provisórios/conceituais. O telefone aparece com aviso de confirmação. Não há depoimentos, clientes, cases, números de mercado ou marcas inventadas.
