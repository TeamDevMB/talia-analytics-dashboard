# Talia Analytics Dashboard

Dashboard de qualificação de leads para o workflow Talia Inbound.

---

## Sobre o Projeto

O Talia Analytics é um painel de visualização de métricas do funil de qualificação de leads, desenvolvido para a Metrobyte. Ele consome dados de uma API FastAPI e exibe informações em tempo real sobre o desempenho do chatbot Talia.

### Funcionalidades

- **Autenticação SSO** — Login com Microsoft 365 (restrito a @metrobyte.com.br)
- **KPI Cards** — Total de leads, abandonos, leads ativos e com dor identificada
- **Funil de Qualificação** — Visualização das 9 etapas do funil com barras animadas e clicáveis
- **Funil de Abandono** — Análise detalhada de onde os leads abandonam o processo
- **Métricas de Performance** — Taxa de conversão, horários de pico, dias da semana
- **Filtro de Período** — 7, 30 ou 90 dias
- **Dark/Light Mode** — Alternância de tema
- **Background Animado** — Partículas interativas com as cores Metrobyte
- **Modal de Leads** — Visualização detalhada dos leads ao clicar nas barras do funil
- **Tooltips** — Descrição explicativa em cada etapa do funil

---

## Tecnologias

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| React | 19.x | Biblioteca de UI |
| Vite | 7.x | Build tool |
| Supabase | 2.x | Autenticação SSO |
| Phosphor Icons | 2.x | Biblioteca de ícones |
| tsparticles | 3.x | Background animado |
| Plus Jakarta Sans | - | Tipografia |

---

## Design System

### Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Azul Primário | `#1E4785` | Elementos principais |
| Azul Claro | `#3B6BC7` | Hover, destaques |
| Laranja | `#F7941D` | Acentos, CTAs |
| Vermelho | `#F87171` | Alertas, abandono |
| Verde | `#34D399` | Sucesso, qualificados |
| Fundo Escuro | `#0F172A` | Background |

### Componentes

| Componente | Descrição |
|------------|-----------|
| KPICard | Card reutilizável para métricas (suporta números e texto) |
| FunilChart | Gráfico de barras horizontais do funil de qualificação |
| AbandonoChart | Gráfico de barras do funil de abandono |
| LeadsModal | Modal com lista de leads |
| TabNavigation | Navegação por abas |
| ParticlesBackground | Background com partículas animadas |

---

## Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Setup
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

Acesse: `http://localhost:5173/relatorios-talia-inbound/`

**Nota:** Em desenvolvimento, a autenticação é bypassed. Em produção, é necessário autenticar com conta @metrobyte.com.br.

---

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |

---

## API

**URL de Produção:** `https://talia-analytics-api-production.up.railway.app`

### Endpoints

| Endpoint | Descrição |
|----------|-----------|
| `GET /funil?periodo=30` | Dados do funil de qualificação |
| `GET /abandono?periodo=30` | Dados do funil de abandono |
| `GET /performance?periodo=30` | Métricas de performance |
| `GET /leads?etapa=X&periodo=30` | Lista de leads por etapa |
| `GET /health` | Status da API |

---

## Estrutura do Projeto
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

## Autenticação

O sistema utiliza Microsoft 365 SSO via Supabase Auth, restrito a emails @metrobyte.com.br.

### Requisitos

1. **Azure AD** — App registration configurado (Single tenant)
2. **Supabase** — Provider Azure habilitado com credenciais

### Fluxo

1. Usuário acessa o dashboard
2. Se não autenticado, exibe tela de login
3. Clica em "Entrar com Microsoft 365"
4. Redireciona para login da Microsoft
5. Após autenticação, valida domínio do email
6. Se @metrobyte.com.br, acessa o dashboard
7. Caso contrário, exibe mensagem de acesso negado

---

## Deploy

### Build
```bash
npm run build
```

Os arquivos são gerados na pasta `dist/`.

### URL de Produção
```
https://exp.metrobyte.com.br/relatorios-talia-inbound/
```

---

## Equipe

Desenvolvido por Metrobyte

| Nome | Função |
|------|--------|
| Caíque Feitosa | Desenvolvimento |

---

## Licença

Projeto privado de uso exclusivo da Metrobyte.