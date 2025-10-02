# DBT Learning Portal

A comprehensive Direct Benefit Transfer (DBT) learning platform with interactive features and feedback system.

## 🚀 Features

- **Interactive Stories** - Learn through engaging narratives
- **Knowledge Quiz** - Test your understanding
- **Video Learning** - Animated explanations
- **Feedback System** - Submit and manage feedback
- **Admin Dashboard** - Manage responses and analytics
- **DBT Verification** - Check your DBT status

## 🛠️ Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mothishraghavendra/DBT.git
   cd DBT
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open in browser:**
   - Main Dashboard: http://localhost:3000/
   - Admin Panel: http://localhost:3000/admin
   - Feedback Form: http://localhost:3000/form

## 🌐 Vercel Deployment

This app is configured for Vercel deployment with serverless functions.

### Deploy with Vercel CLI:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts and your app will be live!
```

### Deploy from GitHub:
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Connect your GitHub repository
4. Vercel will automatically deploy

## 📁 Project Structure

```
├── server.js           # Express server (serverless function)
├── dashboard.html      # Main landing page
├── form.html          # Feedback form
├── admin.html         # Admin dashboard
├── story.html         # Interactive stories
├── quiz.html          # Knowledge quiz
├── video.html         # Video content
├── chat.html          # Chatbot
├── verify.html        # DBT verification
├── steps.html         # Step-by-step guide
├── uploads/           # Static assets
├── package.json       # Dependencies
├── vercel.json        # Vercel configuration
└── responses.json     # Data storage
```

## 🔧 API Endpoints

- `GET /api/responses` - Get all feedback responses
- `POST /api/submit-form` - Submit new feedback
- `DELETE /api/responses/:id` - Delete specific response
- `DELETE /api/clear-responses` - Clear all responses

## 🎯 Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Node.js, Express.js
- **Styling:** Azure Design System, Font Awesome
- **Deployment:** Vercel (Serverless)
- **Data:** JSON file storage

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🔒 Data Privacy

- Form responses are stored securely
- No personal data is shared with third parties
- Admin access is protected

## 📞 Support

For issues or questions, please create an issue on GitHub or contact the development team.

---
*Made with ❤️ for Digital India Initiative*