# Meu Burnout é Nosso Dado

**Uma plataforma de denúncia anônima que transforma a dor individual de trabalhadores em burnout em dados coletivos para pressão sistêmica.**

---

## 🎯 Visão Geral

Este projeto é um movimento social + aplicativo web que permite que trabalhadores denunciem anonimamente condições de trabalho tóxicas que levam ao burnout. Os dados coletados são agregados e publicados em um dashboard público para pressionar empresas e setores a mudarem suas políticas.

## 🏗️ Arquitetura

```
meu-burnout-app/
├── frontend/          # PWA Next.js (formulário + dashboard)
├── backend/           # API Serverless Node.js
├── cloudflare-worker/ # Proxy de anonimização
└── docs/              # Documentação técnica
```

## 🚀 Tecnologias

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, Recharts
- **Backend:** Node.js, Express, MongoDB, PostgreSQL
- **Infraestrutura:** Vercel, AWS Lambda, Cloudflare Workers
- **Segurança:** Zero-Knowledge Architecture, Differential Privacy

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- Node.js 20+ ([baixar aqui](https://nodejs.org/))
- Git ([baixar aqui](https://git-scm.com/))
- Uma conta no GitHub (gratuita)
- Uma conta no Vercel (gratuita)
- Uma conta no MongoDB Atlas (gratuita)
- Uma conta no Cloudflare (gratuita)

## 🛠️ Instalação e Configuração

### Passo 1: Clone o Repositório

```bash
git clone <seu-repositorio>
cd meu-burnout-app
```

### Passo 2: Configure o Backend

```bash
cd backend
npm install
cp .env.example .env
# Edite o arquivo .env com suas credenciais
npm run dev
```

### Passo 3: Configure o Frontend

```bash
cd ../frontend
npm install
cp .env.local.example .env.local
# Edite o arquivo .env.local com suas credenciais
npm run dev
```

### Passo 4: Configure o Cloudflare Worker

```bash
cd ../cloudflare-worker
npm install
npx wrangler login
npx wrangler deploy
```

## 📖 Documentação Completa

Consulte a pasta `docs/` para documentação detalhada:

- [Arquitetura de Segurança](docs/SECURITY.md)
- [API Documentation](docs/API.md)
- [Guia de Deploy](docs/DEPLOY.md)

## 🤝 Contribuindo

Este é um projeto de impacto social. Contribuições são bem-vindas!

## 📄 Licença

MIT License - Este projeto é open source para maximizar o impacto social.

## ⚠️ Aviso Legal

Este projeto foi desenvolvido para fins de transparência e accountability corporativa. Todos os dados são coletados de forma anônima e agregada, em conformidade com a LGPD.

---

**Desenvolvido com 🔥 para combater o burnout sistêmico.**
