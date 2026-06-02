# Conceited-Wears 👟

A modern e-commerce platform for selling premium footwear with integrated M-Pesa payment processing. Built with React on the frontend and Django on the backend.

## 🚀 Features

- **Product Management** - Browse and filter shoe collections
- **Shopping Cart** - Add/remove items with persistent cart state
- **M-Pesa Integration** - Secure payment processing via Safaricom's Daraja API
- **Responsive Design** - Beautiful UI built with Tailwind CSS
- **RESTful API** - Django REST Framework backend
- **CORS Enabled** - Frontend and backend communication ready

## 📁 Project Structure

```
Conceited-Wears/
├── Backend/                    # Django REST API
│   ├── manage.py
│   ├── api/                   # Main app
│   │   ├── models.py          # Product model
│   │   ├── views.py           # API endpoints & M-Pesa integration
│   │   ├── serializers.py     # DRF serializers
│   │   ├── urls.py            # API routes
│   │   ├── admin.py           # Django admin config
│   │   └── migrations/
│   ├── backend/               # Django settings
│   │   ├── settings.py        # Configuration
│   │   ├── urls.py            # Project URLs
│   │   └── wsgi.py
│   └── db.sqlite3             # Database
│
├── Frontend/                   # React + Vite
│   ├── src/
│   │   ├── App.jsx            # Main component
│   │   ├── main.jsx           # Entry point
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   └── Cart.jsx
│   │   ├── components/        # Reusable components
│   │   │   └── Navbar.jsx
│   │   ├── context/           # React Context
│   │   │   └── CartContext.jsx
│   │   ├── services/          # API client
│   │   │   └── api.js
│   │   └── index.css          # Tailwind styles
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🛠️ Prerequisites

- Python 3.8+ (Backend)
- Node.js 14+ (Frontend)
- npm or yarn
- Git

## ⚙️ Setup Instructions

### Backend Setup

1. **Navigate to Backend folder:**
   ```bash
   cd Backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Install Pillow for image handling:**
   ```bash
   pip install Pillow
   ```

5. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

6. **Create superuser (for admin):**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start Django server:**
   ```bash
   python manage.py runserver
   ```
   Server runs at `http://127.0.0.1:8000/`

### Frontend Setup

1. **Navigate to Frontend folder:**
   ```bash
   cd Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Frontend runs at `http://localhost:5173`

## 🔑 M-Pesa Configuration

### For Development (Mock Mode)

By default, the system uses **mock M-Pesa** for testing. No real transactions occur.

In [Backend/api/views.py](Backend/api/views.py):
```python
MOCK_MPESA_MODE = True  # Set to False for real payments
```

### For Production (Real Payments)

1. **Get Daraja Credentials:**
   - Visit [https://developer.safaricom.co.ke](https://developer.safaricom.co.ke)
   - Create an account and app
   - Copy Consumer Key and Secret

2. **Update [Backend/backend/settings.py](Backend/backend/settings.py):**
   ```python
   MPESA_CONSUMER_KEY = "your-key-here"
   MPESA_CONSUMER_SECRET = "your-secret-here"
   MPESA_PASSKEY = "your-passkey"
   MPESA_SHORTCODE = "your-shortcode"
   MPESA_CALLBACK_URL = "https://your-domain/api/mpesa/callback/"
   ```

3. **Enable real M-Pesa in [Backend/api/views.py](Backend/api/views.py):**
   ```python
   MOCK_MPESA_MODE = False
   ```

4. **For local testing with real M-Pesa, use ngrok:**
   ```bash
   ngrok http 8000
   # Update MPESA_CALLBACK_URL with ngrok URL
   ```

## 📚 API Endpoints

### Products
- `GET /api/products/` - Get all products
- `GET /api/products/{id}/` - Get single product
- `POST /api/products/` - Create product (admin)
- `PUT /api/products/{id}/` - Update product (admin)
- `DELETE /api/products/{id}/` - Delete product (admin)

### Payments
- `POST /api/stk-push/` - Initiate M-Pesa payment
  - Request: `{"phone": "07xxxxxxxxx", "amount": 100}`
  - Response: M-Pesa checkout details

## 🧪 Testing

### Test Backend API
```bash
curl -X POST http://127.0.0.1:8000/api/stk-push/ \
  -H "Content-Type: application/json" \
  -d '{"phone": "0795992498", "amount": 100}'
```

### Run Django Tests
```bash
python manage.py test api
```

## 🎨 Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Axios (HTTP client)
- React Router

**Backend:**
- Django 4.2
- Django REST Framework
- Pillow (image processing)
- Requests (HTTP library)
- SQLite (database)

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway)
```bash
pip freeze > requirements.txt
# Deploy with Procfile
```

## 📝 Database Models

### Product
```python
- id: AutoField
- name: CharField (200)
- price: DecimalField (10, 2)
- description: TextField
- image: ImageField (upload_to='shoes/')
- category: CharField (100)
- stock: IntegerField (default=15)
- featured: BooleanField (default=False)
- created_at: DateTimeField (auto_now_add=True)
```

## 🔐 Security Notes

- ✅ CORS enabled for frontend domain
- ✅ DEBUG mode should be False in production
- ✅ Use environment variables for sensitive data
- ✅ Keep M-Pesa credentials secure
- ✅ Use HTTPS in production

## 📖 Common Issues

### 500 Error on /api/stk-push/
- Check M-Pesa credentials in settings.py
- Verify MOCK_MPESA_MODE setting
- Check internet connectivity

### Tailwind CSS Not Working
- Ensure postcss.config.js exists
- Run `npm install` in Frontend
- Restart dev server

### CORS Errors
- Verify Frontend URL in CORS_ALLOWED_ORIGINS
- Default: `http://localhost:5173`

### Database Issues
- Run migrations: `python manage.py migrate`
- Create superuser: `python manage.py createsuperuser`

## 📞 Support

For issues or questions:
1. Check Django logs: `python manage.py runserver`
2. Check Frontend console: Browser DevTools
3. Verify API connectivity: Use curl or Postman

## 📄 License

Private project - All rights reserved

## 👨‍💻 Author

Built with ❤️ for Conceited Wears
