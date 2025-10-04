# Contributing to DBT Portal 🤝

Thank you for considering contributing to the DBT Portal! This document provides guidelines and information for contributors.

## 🚀 Quick Start

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a new branch for your feature/fix
4. **Make** your changes
5. **Test** thoroughly
6. **Submit** a pull request

## 🛠️ Development Setup

### Prerequisites
- Node.js 14 or higher
- Modern web browser
- Git

### Local Development
```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/DBT.git
cd DBT

# Install dependencies  
npm install

# Start development server
npm start

# Open browser to http://localhost:3000
```

## 📋 Contribution Guidelines

### Code Style
- Use **semantic HTML5** elements
- Follow **Azure Design System** principles
- Write **clean, readable CSS** with custom properties
- Use **modern JavaScript** (ES6+) features
- Ensure **mobile-first responsive** design

### Commit Messages
Use conventional commit format:
```
feat: add new verification step
fix: resolve mobile layout issue  
docs: update README with new features
style: improve button hover effects
refactor: optimize API calls
test: add unit tests for form validation
```

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes  
- `docs/description` - Documentation updates
- `style/description` - UI/styling improvements

## 🎯 Areas for Contribution

### 🐛 Bug Fixes
- Cross-browser compatibility issues
- Mobile responsiveness problems
- Accessibility improvements
- Performance optimizations

### ✨ New Features  
- Additional verification steps
- Enhanced interactive elements
- New educational content modules
- Improved admin dashboard features

### 📚 Documentation
- Code comments and documentation
- User guides and tutorials  
- API documentation improvements
- README enhancements

### 🎨 Design & UX
- Azure design system improvements
- Animation and micro-interactions
- Accessibility enhancements
- Mobile experience optimization

## 🧪 Testing Guidelines

### Manual Testing
- Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- Verify mobile responsiveness on different screen sizes
- Check accessibility with screen readers
- Test form submissions and data flow

### Cross-Platform Testing
- **Desktop**: Windows, macOS, Linux
- **Mobile**: iOS Safari, Chrome Mobile, Firefox Mobile
- **Tablets**: iPad, Android tablets

## 📝 Pull Request Process

1. **Create descriptive PR title**
   ```
   feat: add email verification to feedback system
   fix: resolve dashboard card alignment on mobile
   ```

2. **Include comprehensive description**
   - What changes were made
   - Why these changes were necessary  
   - Any breaking changes
   - Screenshots for UI changes

3. **Reference related issues**
   ```
   Closes #123
   Fixes #456
   Related to #789
   ```

4. **Ensure all checks pass**
   - No console errors
   - Responsive design verified
   - Accessibility guidelines followed
   - Cross-browser compatibility confirmed

## 🎨 Design Guidelines

### Colors (Azure Theme)
```css
--azure-blue: #0078d4;
--azure-teal: #20b2aa;  
--success-color: #16a085;
--warning-color: #f39c12;
--danger-color: #e74c3c;
```

### Typography
- **Headings**: Inter/Poppins, 600-700 weight
- **Body**: Segoe UI, 400-500 weight
- **Responsive font sizes**: rem units preferred

### Spacing
- **Grid system**: CSS Grid and Flexbox
- **Margins**: 0.5rem, 1rem, 1.5rem, 2rem multiples
- **Border radius**: 4px, 8px, 12px for different components

## 🔐 Security Guidelines

- **No sensitive data** in client-side code
- **Sanitize user inputs** properly  
- **Follow HTTPS** best practices
- **Validate all form data** on both client and server

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and community chat
- **Email**: mothishraghavendra@gmail.com for urgent matters

### Resources
- **Live Demo**: https://dbt-portal-three.vercel.app/
- **Azure Design System**: Microsoft design guidelines
- **Accessibility**: WCAG 2.1 AA compliance guidelines

## 🏆 Recognition

Contributors will be:
- **Listed** in the README acknowledgments
- **Credited** in release notes for significant contributions
- **Invited** to join as collaborators for consistent contributors

## 📜 Code of Conduct

### Our Standards
- **Be respectful** and inclusive
- **Provide constructive** feedback
- **Focus on collaboration** and learning
- **Welcome newcomers** and help them contribute

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or insulting comments
- Spam or irrelevant content  
- Violation of privacy

---

## 🙏 Thank You!

Your contributions help make the DBT Portal better for everyone. Whether it's a small bug fix or a major feature, every contribution is valued and appreciated!

**Happy Contributing!** 🚀