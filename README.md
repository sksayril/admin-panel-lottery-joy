# Lottery Management System

A comprehensive React TypeScript application for managing multiple types of lottery and betting games with enhanced UI, form validation, and real-time notifications.

## 🎮 Game Types

### 1. Lottery Games
- **Traditional lottery system** with ticket-based gameplay
- **SEM options**: 5, 10, 20, 25, 30, 40, 50
- **Draw time management** with countdown timers
- **Ticket management** with mobile number validation
- **Number range selection** (first number to second number)
- **Real-time calculations** for tickets and points

### 2. Big & Small Games
- **Binary betting system** (Big vs Small)
- **Round-based gameplay** with 30-second intervals
- **Real-time betting** with live updates
- **Result generation** with random number selection
- **Bet tracking** and statistics

### 3. Color Prediction Games
- **Three-color system**: Red, Green, Violet
- **Different multipliers**: Red (2x), Green (14x), Violet (4.5x)
- **Number ranges**: Red (1-7), Green (8-12), Violet (13-15)
- **45-second rounds** with betting windows
- **Color-coded interface** for easy identification

## ✨ Features

### Enhanced UI/UX
- **Modern gradient designs** with professional color schemes
- **Responsive layout** that works on all screen sizes
- **Smooth animations** and transitions
- **Interactive elements** with hover effects
- **Professional icons** from Lucide React

### Form Validation & Error Handling
- **Real-time validation** for all input fields
- **Visual feedback** with error states and success messages
- **Toast notifications** using React Hot Toast
- **Input sanitization** and type checking
- **Required field indicators** with asterisks

### Date & Time Management
- **React DatePicker** for precise date/time selection
- **Countdown timers** for game rounds
- **Automatic round management** with state transitions
- **Time formatting** utilities

### Game Management
- **Multiple game types** with different logic
- **Game state management** (Active, Scheduled, Paused)
- **Player statistics** and revenue tracking
- **Bet history** and transaction logs
- **Settings management** for each game type

## 🛠️ Technical Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Hot Toast** for notifications
- **React DatePicker** for date/time selection

## 📁 Project Structure

```
src/
├── components/
│   ├── App.tsx                 # Main application component
│   ├── Sidebar.tsx             # Navigation sidebar
│   ├── Dashboard.tsx           # Dashboard overview
│   ├── Users.tsx              # User management
│   ├── Agents.tsx             # Agent management
│   ├── Games.tsx              # Games listing and management
│   ├── LotteryGame.tsx        # Lottery game interface
│   ├── LotterySettings.tsx    # Lottery settings
│   ├── BigSmallGame.tsx       # Big & Small game interface
│   ├── ColorGame.tsx          # Color prediction game interface
│   ├── GameSettings.tsx       # General game settings
│   └── Login.tsx              # Authentication
├── index.css                  # Global styles
└── main.tsx                   # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd admin-panel-lottery

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🎯 Key Features by Game Type

### Lottery Games
- **Mobile number validation** (10-15 digits)
- **SEM selection** with predefined options
- **Number range input** with validation
- **Ticket calculation** (second number - first number + 1)
- **Total amount calculation** (MRP × ticket count)
- **Draw time display** with countdown
- **Ticket management** with add/remove functionality

### Big & Small Games
- **Round-based system** with 30-second intervals
- **Bet placement** with amount validation
- **Real-time statistics** for Big and Small bets
- **Result generation** with random number selection
- **Game state management** (Active/Paused)
- **Bet history** with timestamps

### Color Prediction Games
- **Three-color betting** system
- **Different payout multipliers** for each color
- **Number range mapping** to colors
- **45-second rounds** with betting windows
- **Color-coded interface** for easy identification
- **Bet tracking** by color

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_APP_TITLE=Lottery Management System
VITE_API_URL=http://localhost:3000/api
```

### Game Settings
Each game type has its own settings panel:
- **Lottery Settings**: SEM options, draw times, ticket prices
- **Big & Small Settings**: Bet ranges, round durations, payouts
- **Color Settings**: Color multipliers, number ranges, bet limits

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🎨 UI Components

### Common Components
- **Cards** with shadow and hover effects
- **Buttons** with gradient backgrounds
- **Input fields** with validation states
- **Tables** with sorting and filtering
- **Modals** for confirmations and forms
- **Toast notifications** for user feedback

### Game-Specific Components
- **Lottery**: Ticket input forms, SEM selectors
- **Big & Small**: Bet placement interface, result display
- **Color**: Color selection buttons, multiplier display

## 🔒 Security Features

- **Input validation** and sanitization
- **Type safety** with TypeScript
- **Form validation** with error handling
- **Secure routing** with authentication checks

## 📊 Data Management

### State Management
- **React useState** for local component state
- **Props drilling** for component communication
- **Event handlers** for user interactions

### Data Flow
1. **User input** → Form validation
2. **Validated data** → State update
3. **State change** → UI re-render
4. **User feedback** → Toast notifications

## 🧪 Testing

### Manual Testing Checklist
- [ ] Form validation for all input fields
- [ ] Game state transitions
- [ ] Responsive design on different screen sizes
- [ ] Toast notifications for user actions
- [ ] Navigation between different game types
- [ ] Settings management for each game type

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload dist folder to Netlify
```

## 📈 Performance Optimization

- **Code splitting** with React.lazy()
- **Image optimization** with WebP format
- **CSS optimization** with Tailwind CSS
- **Bundle optimization** with Vite
- **Lazy loading** for non-critical components

## 🔄 Future Enhancements

### Planned Features
- [ ] Real-time WebSocket integration
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Advanced user management
- [ ] Payment gateway integration
- [ ] Mobile app development

### Technical Improvements
- [ ] State management with Redux/Zustand
- [ ] Unit testing with Jest
- [ ] E2E testing with Cypress
- [ ] Performance monitoring
- [ ] Error tracking with Sentry

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
