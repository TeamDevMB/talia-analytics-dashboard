# Talia Analytics Dashboard

Dashboard de qualificação de leads para o workflow Talia Inbound.

![Dashboard Preview](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![React](https://img.shields.io/badge/React-19.x-blue)
![Vite](https://img.shields.io/badge/Vite-7.x-purple)

---

## 📋 Sobre o Projeto

O Talia Analytics é um painel de visualização de métricas do funil de qualificação de leads, desenvolvido para a **Metrobyte**. Ele consome dados de uma API FastAPI e exibe informações em tempo real sobre o desempenho do chatbot Talia.

### Funcionalidades

- 📊 **KPI Cards** — Total de leads, pararam de responder, coletados e com dor identificada
- 📈 **Funil de Qualificação** — Visualização das 8 etapas do funil com barras animadas
- 🔄 **Filtro de Período** — 7, 30 ou 90 dias
- 🌙 **Dark/Light Mode** — Alternância de tema
- ✨ **Background Animado** — Partículas interativas com as cores Metrobyte

---

## 🚀 Tecnologias

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| React | 19.x | Biblioteca de UI |
| Vite | 7.x | Build tool |
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
| Laranja | `#F7941D` | Acentos, CTAs |
| Fundo Escuro | `#0F172A` | Background |

### Componentes

- **KPICard** — Card reutilizável para métricas
- **FunilChart** — Gráfico de barras horizontais
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

Acesse: **http://localhost:5173**

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
| `GET /funil?periodo=30` | Dados do funil completo |
| `GET /resumo?periodo=30` | KPIs resumidos |
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
│   │   ├── ParticlesBackground.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   └── Dashboard.css
│   ├── services/
│   │   └── api.js
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

## 🚀 Deploy

### Build de Produção
```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`.

### Hospedagem

O dashboard será publicado em:

**https://exp.metrobyte.com.br/relatorios-talia-inbound**

---

## 👥 Equipe

Desenvolvido por **Metrobyte**

- **Caíque Feitosa** — Desenvolvimento

---

## 📄 Licença

Este projeto é privado e de uso exclusivo da Metrobyte.