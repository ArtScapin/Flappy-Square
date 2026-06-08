# 🟥 Flappy Square

Um clone do clássico Flappy Bird feito com HTML, CSS e JavaScript puro — sem frameworks, sem dependências.

<img width="798" height="497" alt="image" src="https://github.com/user-attachments/assets/830ce012-7f73-4378-8bf0-1ea058b2f364" />

---

## 🎮 Como Jogar

1. Abra o arquivo `index.html` no navegador
2. Clique em **Play** para iniciar
3. Pressione **qualquer tecla** para fazer o quadrado pular
4. Desvie dos canos e sobreviva o máximo possível!

---

## 📁 Estrutura do Projeto

```
flappy-square/
├── index.html   # Estrutura da página e elementos do jogo
├── styles.css   # Estilo visual e layout
└── script.js    # Lógica do jogo (loop, física, colisões)
```

---

## ⚙️ Configurações

Clique em **Settings** antes de iniciar para personalizar a experiência:

| Configuração        | Descrição                                      | Padrão |
|---------------------|------------------------------------------------|--------|
| Game Area Width     | Largura da área de jogo (px)                   | 800    |
| Game Area Height    | Altura da área de jogo (px)                    | 500    |
| Square Size         | Tamanho do quadrado jogável (px)               | 30     |
| Square Distance     | Distância horizontal do quadrado               | 200    |
| Pipe Size           | Tamanho da abertura entre os canos             | 150    |
| Pipe Width          | Largura dos canos (px)                         | 70     |
| Pipe Distance       | Espaçamento entre os canos                     | 250    |
| Gravity Force       | Força da gravidade aplicada ao quadrado        | 0.04   |
| Lift Force          | Força do impulso ao pressionar uma tecla       | 40     |

---

## 🧠 Como Funciona

O jogo roda em um **game loop** via `requestAnimationFrame`, com as seguintes responsabilidades:

- **Física**: gravidade acumulativa faz o quadrado cair; cada tecla pressionada aplica um impulso para cima
- **Canos**: gerados dinamicamente com posição vertical aleatória e removidos ao sair da tela
- **Colisão**: detectada comparando a posição vertical do quadrado com as bordas do cano mais próximo
- **Pontuação**: incrementada toda vez que um cano é ultrapassado com sucesso

---

## 🛠️ Tecnologias

- HTML5
- CSS3
- JavaScript (Vanilla)
- Google Fonts — [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P)

---

## 🚀 Como Executar

Nenhuma instalação necessária. Basta abrir o `index.html` diretamente no navegador:

```bash
# Clone o repositório (ou baixe os arquivos)
git clone https://github.com/ArtScapin/Flappy-Square.git

# Abra no navegador
open index.html
```

> ✅ Compatível com qualquer navegador moderno (Chrome, Firefox, Edge, Safari)
