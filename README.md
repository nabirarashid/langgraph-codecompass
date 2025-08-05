# 🧭 codecompass

> ai-powered developer tool discovery with langgraph & deepseek ai ✨

codecompass helps developers find the perfect tools for their projects through intelligent ai recommendations, real-time web scraping, and beautiful comparisons.

## 🌟 features

- 🔍 **smart search** - natural language queries like "best database for startups"
- 🤖 **ai recommendations** - powered by deepseek ai for intelligent analysis
- 📊 **detailed comparisons** - pricing, features, tech stack, and more
- 🌐 **real-time data** - live web scraping with firecrawl
- 🎨 **beautiful ui** - modern design with tailwind css
- ⚡ **fast api** - fastapi backend with automatic openapi docs
- 🚀 **fully deployed** - live on vercel + railway

## 🎯 live demo

🌍 **frontend**: https://codecompass-rho.vercel.app  
🔗 **backend api**: https://langgraph-agent-production-90ab.up.railway.app

try searching for:
- "javascript frameworks"
- "cloud platforms" 
- "database solutions"
- "ci/cd tools"

## 🏗️ tech stack

### frontend
- ⚛️ **next.js 15** - react framework
- 🎨 **tailwind css v4** - styling
- 📱 **responsive design** - mobile-first
- 🌙 **dark theme** - beautiful gradients

### backend  
- 🐍 **python 3.11** - runtime
- ⚡ **fastapi** - web framework
- 🤖 **langgraph** - ai workflow orchestration
- 🧠 **deepseek ai** - llm for analysis
- 🌐 **firecrawl** - web scraping
- 📋 **pydantic** - data validation

### deployment
- 🚀 **vercel** - frontend hosting
- 🚂 **railway** - backend hosting
- 🐳 **docker ready** - containerized setup

## 🚀 quick start

### prerequisites
- node.js 18+
- python 3.11+
- deepseek api key ([get here](https://platform.deepseek.com/))
- firecrawl api key ([get here](https://firecrawl.dev/))

### 1. clone & setup
```bash
git clone https://github.com/nabirarashid/langgraph-agent.git
cd langgraph-agent
```

### 2. backend setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # windows: venv\Scripts\activate
pip install -r requirements.txt

# create .env file
cp .env.example .env
# add your api keys to .env

# start backend
python api_server.py
```

### 3. frontend setup
```bash
cd frontend
npm install
npm run dev
```

visit http://localhost:3000 and start discovering tools! 🎉

## 📁 project structure

```
📦 codecompass
├── 🖥️ frontend/
│   ├── src/app/
│   │   ├── components/
│   │   │   ├── layout/     # header, footer, background
│   │   │   ├── search/     # search input, suggestions
│   │   │   ├── results/    # tool cards, recommendations
│   │   │   └── shared/     # types, constants
│   │   ├── globals.css     # tailwind styles
│   │   └── page.tsx        # main app component
│   └── package.json
├── 🔧 backend/
│   ├── src/
│   │   ├── workflow.py     # langgraph workflow
│   │   ├── firecrawl.py    # web scraping service
│   │   └── models.py       # pydantic models
│   ├── api_server.py       # fastapi app
│   └── requirements.txt
└── 📚 readme.md
```

## 🎨 component architecture

the frontend is beautifully organized into reusable components:

- 🏠 **layout components** - header, footer, animated background
- 🔍 **search components** - input, status, suggested queries
- 📊 **results components** - tool cards, grid, recommendations
- 🔧 **shared** - types, constants, utilities

## 🤖 how it works

1. **user searches** for developer tools using natural language
2. **langgraph workflow** orchestrates the ai pipeline:
   - 🌐 searches web for relevant articles
   - 📄 extracts tool information from content
   - 🔍 researches specific tools in detail
   - 🧠 generates ai-powered recommendations
3. **results displayed** with beautiful comparisons and insights

## 🌍 deployment

### deploy your own instance

#### frontend (vercel)
1. fork this repo
2. connect to vercel
3. set root directory to `frontend`
4. deploy! 🚀

#### backend (railway)
1. connect railway to your repo
2. set root directory to `backend`
3. add environment variables:
   - `DEEPSEEK_API_KEY`
   - `FIRECRAWL_API_KEY`
4. deploy! 🚂

## 🛠️ development

### adding new features
- components go in `frontend/src/app/components/`
- backend logic in `backend/src/`
- follow the existing patterns

### api endpoints
- `POST /api/search` - search for tools
- `GET /api/health` - health check

### environment variables
```bash
# backend/.env
DEEPSEEK_API_KEY=your_key_here
FIRECRAWL_API_KEY=your_key_here
```

## 🤝 contributing

1. fork the repo
2. create feature branch (`git checkout -b feature/amazing-feature`)
3. commit changes (`git commit -m 'add amazing feature'`)
4. push branch (`git push origin feature/amazing-feature`)
5. open pull request

## 📄 license

mit license - see [license](license) for details

## 💝 acknowledgments

- 🤖 **deepseek ai** - for the powerful llm
- 🌐 **firecrawl** - for web scraping capabilities  
- 🎨 **tailwind css** - for beautiful styling
- ⚛️ **next.js team** - for the amazing framework

---

**built with ❤️ for the developer community**  
*find the perfect tools, faster than ever* ✨

[![deploy with vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nabirarashid/langgraph-agent&root-directory=frontend)
[![deploy on railway](https://railway.app/button.svg)](https://railway.app/template/github/nabirarashid/langgraph-agent?referralcode=codecompass)
