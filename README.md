# Talia Analytics Dashboard

Dashboard de qualificação de leads para o workflow Talia Inbound.

![Dashboard Preview](https://img.shields.io/badge/Status-Em%20Produção-green)
![React](https://img.shields.io/badge/React-19.x-blue)
![Vite](https://img.shields.io/badge/Vite-7.x-purple)

---

## 📋 Sobre o Projeto

O Talia Analytics é um painel de visualização de métricas do funil de qualificação de leads, desenvolvido para a **Metrobyte**. Ele consome dados de uma API FastAPI e exibe informações em tempo real sobre o desempenho do chatbot Talia.

### Funcionalidades

- 🔐 **Autenticação SSO** — Login com Microsoft 365 (restrito a @metrobyte.com.br)
- 📊 **KPI Cards** — Total de leads, abandonos, leads ativos e com dor identificada
- 📈 **Funil de Qualificação** — Visualização das 9 etapas do funil com barras animadas e clicáveis
- 🚪 **Funil de Abandono** — Análise detalhada de onde os leads abandonam o processo
- 📉 **Métricas de Performance** — Taxa de conversão, horários de pico, dias da semana
- 🔄 **Filtro de Período** — 7, 30 ou 90 dias
- 🌙 **Dark/Light Mode** — Alternância de tema
- ✨ **Background Animado** — Partículas interativas com as cores Metrobyte
- 💬 **Modal de Leads** — Visualização detalhada dos leads ao clicar nas barras do funil
- ℹ️ **Tooltips** — Descrição explicativa em cada etapa do funil

---

## 🚀 Tecnologias

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| React | 19.x | Biblioteca de UI |
| Vite | 7.x | Build tool |
| Supabase | 2.x | Autenticação SSO |
| Phosphor Icons | 2.x | Ícones duotone |
| tsparticles | 3.x | Background animado |
| Plus Jakarta Sans | - | Tipografia (Google Fonts) |

---

## 🎨 Design

### Paleta de Cores (Metrobyte)

| Cor | Hex | Uso |
|-----|-----|-----|
| Azul Primário | `#1E4785` | Elementos principais |
| Azul Claro | `#3B6BC7` | Hover, destaques |
| Laranja | `#F7941D` | Acentos, CTAs, Modal de Leads |
| Vermelho | `#F87171` | Funil de Abandono |
| Verde | `#34D399` | Sucesso, leads qualificados |
| Fundo Escuro | `#0F172A` | Background |

### Componentes

- **KPICard** — Card reutilizável para métricas (suporta números e texto)
- **FunilChart** — Gráfico de barras horizontais do funil de qualificação
- **AbandonoChart** — Gráfico de barras do funil de abandono
- **LeadsModal** — Modal com lista de leads (tema laranja Metrobyte)
- **TabNavigation** — Navegação por abas (Qualificação, Abandono, Performance)
- **ParticlesBackground** — Background com partículas animadas

---

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Passos
```bash
# Clone o repositório
git clone https://github.com/TeamDevMB/talia-analytics-dashboard.git

# Entre na pasta
cd talia-analytics-dashboard

# Instale as dependências
npm install

# Rode em desenvolvimento
npm run dev
```

Acesse: **http://localhost:5173/relatorios-talia-inbound/**

> **Nota:** Em desenvolvimento, o login é bypassed automaticamente. Em produção, é necessário autenticar com conta @metrobyte.com.br.

---

## 🔧 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run preview` | Visualiza build de produção |

---

## 🌐 API

O dashboard consome a API:

**Produção:** `https://talia-analytics-api-production.up.railway.app`

### Endpoints utilizados

| Endpoint | Descrição |
|----------|-----------|
| `GET /funil?periodo=30` | Dados do funil de qualificação |
| `GET /abandono?periodo=30` | Dados do funil de abandono |
| `GET /performance?periodo=30` | Métricas de performance |
| `GET /leads?etapa=X&periodo=30` | Lista de leads por etapa |
| `GET /health` | Status da API |

---

## 📁 Estrutura de Pastas
```
frontend/
├── public/
│   └── favicon.png
├── src/
│   ├── components/
│   │   ├── KPICard.jsx
│   │   ├── KPICard.css
│   │   ├── FunilChart.jsx
│   │   ├── FunilChart.css
│   │   ├── AbandonoChart.jsx
│   │   ├── AbandonoChart.css
│   │   ├── LeadsModal.jsx
│   │   ├── LeadsModal.css
│   │   ├── TabNavigation.jsx
│   │   ├── TabNavigation.css
│   │   └── ParticlesBackground.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── login.jsx
│   │   └── login.css
│   ├── services/
│   │   ├── api.js
│   │   └── supabase.js
│   ├── styles/
│   │   ├── index.css
│   │   └── App.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🔐 Autenticação

O sistema utiliza **Microsoft 365 SSO** via Supabase Auth, restrito a emails @metrobyte.com.br.

### Configurações necessárias

1. **Azure AD** — App registration configurado (Single tenant)
2. **Supabase** — Provider Azure habilitado com credenciais

### Fluxo de autenticação

1. Usuário acessa o dashboard
2. Se não autenticado, exibe tela de login
3. Clica em "Entrar com Microsoft 365"
4. Redireciona para login da Microsoft
5. Após autenticação, valida se email é @metrobyte.com.br
6. Se válido, acessa o dashboard; se não, exibe erro

---

## 🚀 Deploy

### Build de Produção
```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`.

### Hospedagem

O dashboard está publicado em:

**https://exp.metrobyte.com.br/relatorios-talia-inbound/**

---

## 👥 Equipe

Desenvolvido por **Metrobyte**

- **Caíque Feitosa** — Desenvolvimento

---

## 📄 Licença

Este projeto é privado e de uso exclusivo da Metrobyte.