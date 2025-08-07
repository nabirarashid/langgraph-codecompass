# 🧠 codecompass - ai-powered tech stack recommender

**get personalized tech stack recommendations with detailed analysis, cost estimates, and learning resources for your next project.**

![codecompass demo](https://img.shields.io/badge/Status-Live-green) ![Next.js](https://img.shields.io/badge/Next.js-15+-black) ![Python](https://img.shields.io/badge/Python-3.11+-blue) ![FastAPI](https://img.shields.io/badge/FastAPI-Latest-teal)

🌐 **live demo**: [codecompass.vercel.app](https://codecompass-rho.vercel.app)  
🚀 **api**: [railway backend](https://langgraph-agent-production-90ab.up.railway.app)

---

## ✨ what codecompass does

describe your project in natural language and get:
- 📋 **complete tech stack recommendations** (2-3 options from simple to advanced)
- 🔍 **detailed component analysis** with pros, cons, and learning curves
- 💰 **cost estimates** and team size recommendations
- 📚 **learning resources** and best practices
- 🎯 **industry-specific insights** powered by real-time web research

### example queries:
- *"e-commerce website for small business with mobile-first design"*
- *"real-time chat application for 100k+ users"*
- *"ai-powered analytics dashboard for startup"*
- *"simple portfolio website for freelancer"*

---

## 🏗️ architecture

### backend (python + langgraph)
```
🧠 ai workflow pipeline
├── 📝 analyze requirements    # extract project needs from natural language
├── 🔍 research stacks        # real-time web research via firecrawl
└── 🎯 generate recommendations # ai-powered stack suggestions
```

**tech stack:**
- **langgraph**: multi-step ai workflow orchestration
- **deepseek ai**: natural language processing and analysis
- **fastapi**: restful api server with automatic docs
- **firecrawl**: real-time web scraping and research
- **pydantic**: type-safe data validation and serialization

### frontend (react + next.js)
```
🎨 modern react architecture
├── 🔍 search interface       # natural language project input
├── 📱 interactive cards      # expandable tech stack displays
├── 🎭 component breakdown    # detailed technology analysis
└── 📊 visual analysis        # ai insights and recommendations
```

**tech stack:**
- **next.js 15**: react framework with app router
- **typescript**: full type safety throughout
- **tailwind css v4**: modern utility-first styling
- **lucide icons**: beautiful iconography
- **responsive design**: mobile-first approach

---

## 🚀 quick start

### option 1: use the live demo
visit [codecompass.vercel.app](https://codecompass-rho.vercel.app) and start describing your project!

### option 2: run locally

#### prerequisites
- **node.js 18+** (for frontend)
- **python 3.11+** (for backend)
- **api keys**: deepseek ai + firecrawl (see setup below)

#### backend setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # on windows: venv\Scripts\activate
pip install -r requirements.txt

# create .env file
echo "DEEPSEEK_API_KEY=your_deepseek_key" > .env
echo "FIRECRAWL_API_KEY=your_firecrawl_key" >> .env

# start the server
uvicorn api_server:app --reload --port 8000
```

#### frontend setup
```bash
cd frontend
npm install
npm run dev
```

visit `http://localhost:3000` 🎉

---

## 🔧 api keys setup

### 1. deepseek ai
1. visit [platform.deepseek.com](https://platform.deepseek.com)
2. create account and get api key
3. add to `.env`: `DEEPSEEK_API_KEY=sk-...`

### 2. firecrawl
1. visit [firecrawl.dev](https://firecrawl.dev)
2. sign up and get api key
3. add to `.env`: `FIRECRAWL_API_KEY=fc-...`

---

## 📡 api documentation

### POST `/api/search`
generate tech stack recommendations for a project description.

**request:**
```json
{
  "query": "mobile fitness tracking app for small team"
}
```

**response:**
```json
{
  "stacks": [
    {
      "name": "React Native + Firebase Stack",
      "description": "Cross-platform mobile development with real-time backend",
      "components": [
        {
          "name": "React Native",
          "category": "Frontend",
          "description": "Cross-platform mobile framework",
          "pros": ["Write once, run anywhere", "Large community"],
          "cons": ["Performance limitations for complex apps"],
          "learning_curve": "Medium",
          "popularity": "High",
          "cost": "Free"
        }
      ],
      "complexity": "Moderate",
      "time_to_market": "Fast",
      "scalability": "Medium",
      "cost_estimate": "$50-200/month",
      "team_size_fit": "Small",
      "best_for": ["MVPs", "Cross-platform apps"],
      "learning_resources": ["React Native docs", "Firebase tutorials"]
    }
  ],
  "analysis": "For a fitness tracking app, React Native provides excellent cross-platform capabilities..."
}
```

### GET `/api/health`
health check endpoint.

---

## 🎨 component architecture

### frontend structure
```
src/app/
├── layout.tsx              # root layout with fonts & metadata
├── page.tsx               # main app component with state management
├── globals.css            # tailwind css configuration
└── components/
    ├── layout/            # header, footer, animatedbackground
    ├── search/            # searchsection, searchinput, suggestedqueries
    ├── results/           # stacksgrid, stackcard, componentcard, analysiscard
    └── shared/            # types, constants, utilities
```

### key components
- **stackcard**: expandable cards showing complete tech stacks
- **componentcard**: detailed breakdown of individual technologies
- **analysiscard**: ai-powered insights and recommendations
- **searchsection**: natural language input with suggestions

---

## 🔄 langgraph workflow

```python
# three-step ai pipeline
def analyze_requirements(query: str) -> ProjectRequirements:
    """extract structured requirements from natural language"""
    
def research_stacks(requirements: ProjectRequirements) -> SearchResults:
    """real-time web research for relevant technologies"""
    
def generate_recommendations(requirements, research) -> List[TechStack]:
    """ai-powered stack generation with detailed analysis"""
```

**data models:**
- `ProjectRequirements`: extracted project needs (type, scale, budget, etc.)
- `TechStack`: complete stack with components and metadata
- `TechStackComponent`: individual technology analysis

---

## 🚢 deployment

### automatic deployment
- **backend**: auto-deploys to railway on `git push`
- **frontend**: auto-deploys to vercel on `git push`
- **environment variables**: configured in railway/vercel dashboards

### manual deployment

#### railway (backend)
```bash
# railway cli
railway login
railway link
railway up
```

#### vercel (frontend)
```bash
# vercel cli
vercel login
vercel --prod
```

---

## 🛠️ development

### project structure
```
langgraph-agent/
├── backend/               # python fastapi + langgraph
│   ├── src/
│   │   ├── models.py     # pydantic data models
│   │   ├── workflow.py   # langgraph ai pipeline
│   │   ├── prompts.py    # ai prompt templates
│   │   └── firecrawl.py  # web research service
│   ├── api_server.py     # fastapi application
│   └── requirements.txt  # python dependencies
├── frontend/             # next.js + typescript
│   ├── src/app/         # app router structure
│   ├── package.json     # node dependencies
│   └── tailwind.config.js # styling configuration
└── README.md            # this file
```

### environment variables

**backend (.env):**
```env
DEEPSEEK_API_KEY=sk-your-deepseek-key
FIRECRAWL_API_KEY=fc-your-firecrawl-key
PORT=8000
```

**frontend (vercel/local):**
```env
NEXT_PUBLIC_API_URL=https://your-railway-url
```

---

## 🤝 contributing

1. **fork the repository**
2. **create a feature branch**: `git checkout -b feature/amazing-feature`
3. **commit changes**: `git commit -m 'add amazing feature'`
4. **push to branch**: `git push origin feature/amazing-feature`
5. **open a pull request**

### development guidelines
- follow typescript strict mode
- use tailwind for all styling
- add proper error handling
- write descriptive commit messages
- test both frontend and backend changes

---

## 📄 license

this project is licensed under the mit license - see the [LICENSE](LICENSE) file for details.

---

## 🙏 acknowledgments

- **deepseek ai** for powerful language models
- **firecrawl** for real-time web research capabilities
- **langgraph** for workflow orchestration
- **vercel** and **railway** for seamless deployment

---

## 📞 support

- 🐛 **bug reports**: [github issues](https://github.com/nabirarashid/langgraph-agent/issues)
- 💬 **questions**: [github discussions](https://github.com/nabirarashid/langgraph-agent/discussions)
- 📧 **contact**: [your email]

---

**built with ❤️ using langgraph, next.js, and ai**