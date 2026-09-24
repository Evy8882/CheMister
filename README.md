# CheMister 🧪⚡

> **Super APP de Química Interativo** — Ferramenta completa para auxílio no aprendizado, cálculo e simulação de conceitos químicos.

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Online-brightgreen?logo=vercel)](https://che-mister.vercel.app/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3-purple?logo=vite)](https://vitejs.dev/)

<p align="center">
  <img src="https://github.com/user-attachments/assets/537036e9-c26b-4a96-9c0f-b3c9911fc3fb" alt="CheMister Banner" height="300px"/>

</p>

🔗 **Acesse a aplicação online**: [https://che-mister.vercel.app/](https://che-mister.vercel.app/)

---

## 📌 Sobre o Projeto

O **CheMister** é uma plataforma web interativa desenvolvida com o objetivo de facilitar cálculos químicos. Com uma interface moderna, intuitiva e responsiva, o aplicativo reúne ferramentas essenciais para consulta de elementos, cálculos de massa molar, balanceamento de equações químicas, simulações de pH, análise de solubilidade e tutoriais guiados por analogias do dia a dia.

---

## ✨ Funcionalidades e Módulos

O aplicativo conta com os seguintes módulos principais:

### ⚛️ 1. Tabela Periódica Interativa (`/periodic-table`)
- **Consulta Completa**: Todos os 118 elementos químicos com dados detalhados (número atômico, massa atômica, grupo, período, categoria, estado físico e eletronegatividade).
- **Preview Dinâmico & Modais**: Exibição responsiva de detalhes ao clicar ou selecionar qualquer elemento.
- **Filtros e Busca**: Pesquisa instantânea por nome ou símbolo químico, além de filtros por grupos, blocos e estados de matéria.

### ⚖️ 2. Balanceador de Equações Químicas (`/equation-balancer`)
- Ajuste automático de coeficientes estequiométricos para reagentes e produtos.
- Validação instantânea da conservação de massa e átomos.

### 🧮 3. Calculadora de Massa Molar (`/molar-mass-calculator`)
- Cálculo automático da massa molar total de qualquer fórmula química (incluindo grupos funcionais com parênteses, ex: `Ca(NO₃)₂`, `H₂SO₄`).
- Detalhamento percentual da composição de massa por elemento químico.

### 💧 4. Calculadora de Solubilidade (`/solubility-calculator`)
- Cálculo da capacidade de dissolução de solutos em solventes aquosos.
- Identificação da saturação da solução e determinação de formação de precipitado / corpo de chão.

### 📊 5. Tabela de Solubilidade (`/tabela-solubilidade`)
- Matriz interativa de consulta rápida da solubilidade entre cátions e ânions em água à temperatura ambiente.
- Classificação por **Solúvel (S)**, **Pouco Solúvel (PS)** e **Insolúvel (I)**.
- Filtros por tipo de solubilidade e busca por nome ou fórmula de íons.

### 🧪 6. Simulador de pH (`/ph-simulator`)
- Escala de acidez/alcalinidade de 0 a 14 com feedback visual dinâmico.
- Simulação gráfica da concentração de íons $H^+$ e $OH^-$.

### 📖 7. Guia de Química para Iniciantes (`/informacoes`)
- Seção educativa para explicar a teoria por trás de cada ferramenta do CheMister usando analogias simples e acessíveis do cotidiano.

---

## 👥 Equipe & Colaboradores

O **CheMister** foi idealizado e construído de forma colaborativa por:

|<img src="https://github.com/Evy8882.png" width="80px"/><br/>**Everton Mancio**|<img src="https://github.com/GiovannaMomesso.png" width="80px"/><br/>**Giovanna Momesso**|<img src="https://github.com/Joao-Vic-Muniz.png" width="80px"/><br/>**João Victor**|<img src="https://github.com/Hihi1502.png" width="80px"/><br/>**Hillary Isabelle**|<img src="https://github.com/edudanisilva08.png" width="80px"/><br/>**Eduardo Dani**|
|:---:|:---:|:---:|:---:|:---:|
|**Idealizador & Dev Lead**|**Programadora Front-End**|**Programador Front-End**|**Apoiadora**|**Auxílio Criativo**|
|[@Evy8882](https://github.com/Evy8882)|[@GiovannaMomesso](https://github.com/GiovannaMomesso)|[@Joao-Vic-Muniz](https://github.com/Joao-Vic-Muniz)|[@Hihi1502](https://github.com/Hihi1502)|[@edudanisilva08](https://github.com/edudanisilva08)|

### 🏫 Apoio Institucional
- **Etec de Peruíbe** — *Centro Paula Souza*

---

## 📂 Estrutura de Pastas

```markdown
CheMister/
├── public/                 # Arquivos estáticos acessíveis diretamente
├── src/                    # Código-fonte principal da aplicação
│   ├── assets/             # Recursos estáticos (Logos, Mascotes e Imagens)
│   ├── components/         # Componentes reutilizáveis (Header, Footer, GetSelected)
│   ├── data/               # Dados químicos (Element Database, Íons, Tabelas)
│   ├── pages/              # Páginas e módulos do aplicativo
│   │   ├── Home.tsx                    # Landing Page principal
│   │   ├── PeriodicTable.tsx           # Tabela Periódica Interativa
│   │   ├── MolarMassCalc.tsx           # Calculadora de Massa Molar
│   │   ├── EquationBalancer.tsx        # Balanceador de Equações
│   │   ├── PhSimulator.tsx             # Simulador de pH
│   │   ├── CalculadoraSolubilidade.tsx # Calculadora de Solubilidade
│   │   ├── TabelaSolubilidade.tsx      # Tabela de Solubilidade
│   │   └── Informacoes.tsx             # Guia educativo para iniciantes
│   ├── styles/             # Arquivos CSS de estilização e temas
│   ├── App.tsx             # Gerenciamento de rotas com React Router
│   └── main.tsx            # Ponto de entrada da aplicação React
├── package.json            # Dependências e scripts do projeto
├── tsconfig.json           # Configurações do TypeScript
└── vite.config.ts          # Configuração do Vite
```

---

## 🛠️ Ferramentas e Tecnologias

- **[React](https://react.dev/)**: Biblioteca JavaScript para construção da interface de usuário.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática para maior segurança e facilidade de manutenção.
- **[Vite](https://vitejs.dev/)**: Ferramenta de build rápida e moderna para aplicações web.
- **[React Router DOM](https://reactrouter.com/)**: Gerenciamento de rotas e navegação SPA.
- **[FontAwesome](https://fontawesome.com/)**: Ícones vetoriais modernos.
- **[MathJS](https://mathjs.org/)**: Suporte a cálculos matemáticos e resolução estequiométrica.
- **[CSS Vanilla / Custom Styles](https://developer.mozilla.org/pt-BR/docs/Web/CSS)**: Estilização personalizada com suporte a temas escuros, gradients e efeito glassmorphism.
- **[Vercel](https://vercel.com/)**: Hospedagem e implantação contínua da aplicação.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Evy8882/CheMister.git
   ```

2. **Navegue até a pasta do projeto:**
   ```bash
   cd CheMister
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse no navegador:**
   Abra [http://localhost:5173](http://localhost:5173) no seu navegador.

---

## 📜 Licença e Direitos

Desenvolvido com ❤️ pela equipe **CheMister** com apoio institucional da **Etec de Peruíbe**.

