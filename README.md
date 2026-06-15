# DocuMind AI

A powerful Retrieval-Augmented Generation (RAG) application that intelligently analyzes uploaded PDF and image documents, enabling specialized AI assistants to answer queries with context-aware responses.

## 🌟 Features

- **Multi-Format Document Support**: Upload and process both PDF and image documents
- **Intelligent Content Retrieval**: Automatically extracts and chunks relevant content from documents
- **Specialized AI Assistants**:
  - 🏥 **Medical Assistant** - For medical documents and health-related queries
  - 💰 **Financial Assistant** - For financial documents and investment analysis
  - ⚖️ **Legal Assistant** - For legal documents and contract analysis
  - 💻 **Coding Assistant** - For technical documentation and code-related queries
  - 🌐 **General Assistant** - For diverse document types and general queries
- **Context-Aware AI Responses**: LLM generates answers based on retrieved document chunks
- **User Authentication**: Secure login and registration system
- **Session Management**: Track and manage user sessions and chat history
- **Real-Time Chat Interface**: Interactive UI for seamless document querying
- **Dark Mode Support**: Theme toggle for user comfort

## 🛠️ Tech Stack

### Backend

- **Framework**: FastAPI (Python)
- **AI/ML**: LangChain, Google Generative AI
- **Vector Database**: FAISS (CPU)
- **Document Processing**: EasyOCR (for images), PyPDF2
- **Database**: PostgreSQL (Neon)
- **Authentication**: JWT-based authentication
- **Image Processing**: PIL, OpenCV

### Frontend

- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS, Radix UI
- **UI Components**: shadcn/ui, Lucide Icons, HugeIcons
- **Authentication**: React Context API
- **Markdown Rendering**: react-markdown with GFM support
- **File Upload**: react-dropzone
- **Animations**: Motion library, Tailwind animations

### Infrastructure

- **Backend Runtime**: Python 3.8+
- **Frontend Runtime**: Node.js 18+
- **Package Managers**: pip (Python), npm (Node.js)

## 📂 Project Structure

```
DocuMind-AI/
├── backend/                          # FastAPI backend application
│   ├── app/
│   │   ├── auth.py                   # Authentication logic
│   │   ├── config.py                 # Configuration settings
│   │   ├── database.py               # Database setup and ORM
│   │   ├── dependencies.py           # Dependency injection
│   │   ├── main.py                   # FastAPI app entry point
│   │   ├── models.py                 # Database models
│   │   ├── schemas.py                # Pydantic schemas for validation
│   │   ├── prompts/                  # AI prompt templates
│   │   ├── routes/                   # API endpoint routes
│   │   │   ├── auth.py               # Authentication routes
│   │   │   ├── chat.py               # Chat and query routes
│   │   │   └── upload.py             # Document upload routes
│   │   ├── services/                 # Business logic services
│   │   │   ├── chunk_service.py      # Document chunking
│   │   │   ├── embedding_service.py  # Vector embeddings
│   │   │   ├── image_service.py      # Image processing
│   │   │   ├── llm_service.py        # LLM interactions
│   │   │   ├── pdf_service.py        # PDF processing
│   │   │   ├── rag_service.py        # RAG pipeline
│   │   │   └── vector_service.py     # Vector search
│   │   └── storage/
│   │       └── session_store.py      # Session management
│   ├── uploads/                      # Uploaded document storage
│   └── requirements.txt              # Python dependencies
│
├── frontend/                         # Next.js frontend application
│   ├── app/
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Landing page
│   │   ├── globals.css               # Global styles
│   │   ├── auth/                     # Authentication pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── home/                     # Home/dashboard page
│   │   └── chat/                     # Chat interface pages
│   │       ├── coding-assistant/
│   │       ├── finance-assistant/
│   │       ├── general-assistant/
│   │       ├── legal-assistant/
│   │       └── medical-assistant/
│   ├── components/                   # React components
│   │   ├── chat/                     # Chat components
│   │   ├── home/                     # Home page components
│   │   ├── landing/                  # Landing page components
│   │   ├── providers/                # Context providers
│   │   ├── shadcn-space/             # Custom shadcn components
│   │   └── ui/                       # Reusable UI components
│   ├── lib/                          # Utility functions and hooks
│   ├── package.json                  # Node dependencies
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── next.config.ts                # Next.js configuration
│   └── tailwind.config.ts            # Tailwind CSS configuration
│
└── LICENSE                           # Project license
```

## 📋 Prerequisites

Before setting up DocuMind AI, ensure you have the following installed:

- **Recommended Python 3.10** (having issues in >3.10)
- **Node.js 18 or higher** (includes npm)
- **PostgreSQL** (or Neon for cloud-based PostgreSQL)
- **Git** (for cloning the repository)

You'll also need:

- **Google API Key** (for Google Generative AI access)
- **PostgreSQL Connection URL** (for database connection)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/DocuMind-AI.git
cd DocuMind-AI
```

### 2. Backend Setup

#### Step 2.1: Navigate to Backend Directory

```bash
cd backend
```

#### Step 2.2: Create Environment Variables File

Create a `.env` file in the `backend` directory with the following variables:

```bash
# Google API Configuration
GOOGLE_API_KEY=your_google_api_key_here

# Database Configuration
POSTGRES_URL=postgresql://user:password@host:port/database?sslmode=require&channel_binding=require
```

**Getting Your Credentials:**

- **GOOGLE_API_KEY**:
  1. Go to [Google AI Studio](https://aistudio.google.com/app/apikeys)
  2. Click "Get API Key"
  3. Create a new API key or use an existing one
  4. Copy and paste it in your `.env` file

- **POSTGRES_URL**:
  - If using Neon (recommended for easy setup):
    1. Go to [Neon Console](https://console.neon.tech)
    2. Create a new project
    3. Copy the connection string
    4. Add it to your `.env` file
  - If using local PostgreSQL: `postgresql://postgres:password@localhost:5432/documind_ai`

#### Step 2.3: Install Python Dependencies

##### create a virtual environment first

```bash
python -m venv .venv
```

##### activate it (windows)

```bash
.venv\Scripts\Activate.ps1
```

##### activate it (linux / mac)

```bash
source .venv/bin/activate
```

##### install dependencies

```bash
pip install -r requirements.txt
```

#### Step 2.4: Run the Backend Server

```bash
uvicorn app.main:app --reload
```

The backend will be available at `http://localhost:8000`

**API Documentation**: Visit `http://localhost:8000/docs` for interactive API documentation (Swagger UI)

### 3. Frontend Setup

#### Step 3.1: Navigate to Frontend Directory

```bash
cd frontend
```

#### Step 3.2: Install Node Dependencies

```bash
npm install
```

#### Step 3.3: Run the Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 📖 Usage

### 1. Create an Account

- Visit the frontend application
- Click "Sign Up" or "Register"
- Enter your email and password
- Verify your account (if required)

### 2. Login

- Use your credentials to login
- You'll be redirected to the dashboard

### 3. Choose an Assistant

- Select the appropriate AI assistant based on your document type:
  - **Medical Assistant** for healthcare documents
  - **Financial Assistant** for financial reports and documents
  - **Legal Assistant** for contracts and legal documents
  - **Coding Assistant** for technical documentation
  - **General Assistant** for other document types

### 4. Upload Documents

- Click the upload area or drag and drop your files
- Supported formats:
  - PDF files (.pdf)
  - Image files (.jpg, .jpeg, .png, .gif)

### 5. Ask Questions

- Type your question about the uploaded documents
- The assistant will retrieve relevant content chunks and generate an answer
- View the response with source attribution

### 6. Chat History

- Your conversation history is automatically saved
- You can reference previous answers and continue the conversation

## 🧠 AI Assistants

Each assistant is specialized for specific document types and uses domain-specific prompts:

| Assistant           | Specialization              | Best For                                                   |
| ------------------- | --------------------------- | ---------------------------------------------------------- |
| Medical Assistant   | Healthcare & Medical Domain | Medical reports, patient records, health documentation     |
| Financial Assistant | Finance & Economics         | Financial statements, investment reports, tax documents    |
| Legal Assistant     | Legal & Contracts           | Contracts, legal agreements, court documents               |
| Coding Assistant    | Technical & Programming     | Code documentation, technical specifications, README files |
| General Assistant   | Multiple Domains            | General documents, mixed content, diverse queries          |

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt password encryption
- **CORS Protection**: Cross-Origin Resource Sharing configuration
- **Database Security**: Secure PostgreSQL connections with SSL
- **Environment Variables**: Sensitive data stored in `.env` files

## 🛠️ Development

### Backend Development

**Run in Development Mode:**

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Development

**Run in Development Mode:**

```bash
npm run dev
```

**Build for Production:**

```bash
npm run build
npm start
```

**Lint the Code:**

```bash
npm run lint
```

## 📦 Dependencies

### Backend Key Dependencies

- **FastAPI**: Modern web framework
- **LangChain**: LLM orchestration and RAG framework
- **google-genai**: Google Generative AI integration
- **FAISS**: Vector similarity search
- **EasyOCR**: Optical character recognition
- **SQLAlchemy**: ORM for database operations
- **Pydantic**: Data validation

### Frontend Key Dependencies

- **Next.js**: React framework for production
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible components
- **react-markdown**: Markdown rendering
- **react-dropzone**: File upload handling

## 🐛 Troubleshooting

### Backend Issues

**Issue**: `ModuleNotFoundError: No module named 'app'`

- **Solution**: Ensure you're in the `backend` directory and have activated your virtual environment

**Issue**: `PostgreSQL connection error`

- **Solution**: Verify your `POSTGRES_URL` in the `.env` file is correct and the database is running

**Issue**: `Google API Key error`

- **Solution**: Ensure your `GOOGLE_API_KEY` is correct and enabled in Google AI Studio

### Frontend Issues

**Issue**: `Error connecting to backend`

- **Solution**: Verify the backend is running and the API URL in your environment is correct

**Issue**: `Module not found errors`

- **Solution**: Run `npm install` and ensure all dependencies are installed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact & Support

For questions, issues, or suggestions, please open an issue on the GitHub repository.

---

**Built with ❤️ using FastAPI, Next.js, and LangChain**
