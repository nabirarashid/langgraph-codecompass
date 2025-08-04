# developer tools research agent

a smart research agent that helps developers discover and compare tools, platforms, and services. built with langgraph and powered by deepseek ai.

## what it does

- searches the web for developer tools and alternatives
- extracts key information like pricing, tech stack, and features
- provides intelligent recommendations based on your needs
- supports any developer tool category (cloud platforms, databases, frameworks, etc.)

## features

- **smart extraction**: automatically finds tools from web articles and comparisons
- **detailed analysis**: pricing models, open source status, api availability, language support
- **ai recommendations**: personalized suggestions based on your query
- **web scraping**: uses firecrawl to gather real-time information
- **structured output**: clean, organized results with emojis and formatting

## setup

### prerequisites

- python 3.9+
- deepseek api key
- firecrawl api key

### installation

```bash
# clone the repo
git clone https://github.com/nabirarashid/langgraph-agent.git
cd langgraph-agent/backend

# create virtual environment
python3 -m venv venv
source venv/bin/activate

# install dependencies
pip install -r requirements.txt
```

### environment variables

create a `.env` file in the backend directory:

```env
DEEPSEEK_API_KEY=your_deepseek_api_key_here
FIRECRAWL_API_KEY=your_firecrawl_api_key_here
```

## usage

```bash
# activate virtual environment
source venv/bin/activate

# run the agent
python main.py
```

### example queries

- "google cloud"
- "javascript frameworks"
- "database solutions"
- "ci/cd tools"
- "monitoring platforms"
- "authentication services"

## example output

```
Developer Tools Query: google cloud
Finding articles about: google cloud
Extracted tools: Google Cloud, AWS, Microsoft Azure
Researching specific tools: Google Cloud, AWS, Microsoft Azure

Research Results for 'google cloud':
============================================================

1. 🏢 Google Cloud
   🌐 Website: https://cloud.google.com/pricing
   💰 Pricing: Pay-as-you-go
   📖 Open Source: None
   🔌 API: ✅ Available
   📝 Description: Google Cloud offers transparent pricing...

Developer Recommendations:
----------------------------------------
For general cloud needs, Google Cloud is best for its transparent
pricing and generous free credits...
```

## architecture

the agent uses a langgraph workflow with three main steps:

1. **extract_tools**: searches web articles and extracts tool names
2. **research**: gathers detailed information about each tool
3. **analyze**: generates recommendations based on findings

### key components

- `workflow.py` - main langgraph workflow orchestration
- `firecrawl.py` - web scraping and search functionality
- `models.py` - pydantic models for structured data
- `prompts.py` - ai prompts for different analysis tasks
- `main.py` - cli interface

## dependencies

- **langgraph** - workflow orchestration
- **langchain-openai** - deepseek ai integration
- **firecrawl-py** - web scraping and search
- **pydantic** - data validation and models
- **python-dotenv** - environment variable management

## customization

### adding new analysis fields

1. update the `CompanyAnalysis` model in `models.py`
2. modify the analysis prompt in `workflow.py`
3. update the output formatting in `main.py`

### changing ai models

update the model configuration in `workflow.py`:

```python
self.llm = ChatOpenAI(
    model="your-preferred-model",
    base_url="your-api-endpoint",
    api_key=os.getenv("YOUR_API_KEY")
)
```

## limitations

- requires active internet connection for web scraping
- firecrawl api has rate limits
- results depend on availability of web content
- some tools might not have comprehensive online documentation

## contributing

1. fork the repository
2. create a feature branch
3. make your changes
4. test thoroughly
5. submit a pull request

## license

mit license - see license file for details

## support

if you encounter issues:

1. check your api keys are valid
2. ensure internet connection is stable
3. verify firecrawl service is accessible
4. check the console output for error messages

for bugs or feature requests, please open an issue on github.

---

built with ❤️ for the developer community
