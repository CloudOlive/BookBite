# BookBite - AI Book Chat Application

A modern, browser-based chat application where you can upload books and have AI-powered conversations about them. Built with React, Tailwind CSS, and designed for easy learning.

## 📚 Features (Phase 1 - Current)

- ✅ Clean, modern chat interface with message history
- ✅ File upload for .txt book files
- ✅ Display current book name in header
- ✅ Text input with send button
- ✅ Messages displayed in conversation format (user right, AI left)
- ✅ Loading indicator when AI is "thinking"
- ✅ Clear chat button
- ✅ Auto-scroll to latest message
- ✅ Enter key to send messages
- ✅ Mobile responsive design
- ✅ Simulated AI responses (ready for Phase 2 API integration)

## 🚀 Quick Start Guide

### Prerequisites

Make sure you have Node.js installed on your computer. You can download it from [nodejs.org](https://nodejs.org/) if you don't have it yet.

### Step 1: Install Dependencies

Open your terminal/command prompt in the BookBite folder and run:

```bash
npm install
```

This will install all the required packages:
- React and React DOM
- Tailwind CSS for styling
- lucide-react for icons
- Other necessary dependencies

### Step 2: Start the Development Server

Run this command:

```bash
npm start
```

The app will automatically open in your browser at `http://localhost:3000`. If it doesn't, manually navigate to that address.

### Step 3: Upload a Book

1. Click the "Upload Book" button in the header
2. Select a `.txt` file from your computer
3. Wait for the book to load (you'll see a confirmation message)
4. Start asking questions about the book!

## 📁 Project Structure

```
BookBite/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.js              # Main application component (all logic here)
│   ├── index.js            # React entry point
│   └── index.css           # Tailwind CSS imports and custom styles
├── package.json            # Project dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration for Tailwind
└── README.md              # This file
```

## 🎨 Understanding the Code

### App.js - Main Component

The `App.js` file contains all the application logic. Here's what each section does:

#### State Management (useState hooks)
- `bookContent`: Stores the text content of the uploaded book
- `bookName`: Stores the filename of the uploaded book
- `messages`: Array of all chat messages
- `inputText`: Current text in the input field
- `isLoading`: Whether AI is currently "thinking"

#### Key Functions

1. **handleFileUpload**: 
   - Reads the uploaded .txt file using FileReader API
   - Stores the content and filename
   - Shows a welcome message

2. **handleSendMessage**:
   - Creates a user message object
   - Adds it to the messages array
   - Simulates AI response (Phase 1 placeholder)
   - Adds AI response to messages

3. **simulateAIResponse**:
   - Currently just returns a placeholder message
   - In Phase 2, this will call the Anthropic Claude API

4. **handleClearChat**:
   - Removes all messages from the chat

#### UI Sections

1. **Header**: App title, book status, upload button
2. **Messages Area**: Scrollable container showing all chat messages
3. **Input Area**: Text input, clear button, send button

### Styling with Tailwind CSS

The app uses Tailwind CSS utility classes for styling:
- `bg-primary-600`: Primary blue color
- `rounded-lg`: Rounded corners
- `shadow-lg`: Drop shadow
- `flex`: Flexbox layout
- `hover:bg-primary-700`: Hover effects

## 🧪 Testing the App

1. **Upload a Book**:
   - Create a simple `.txt` file with some text
   - Upload it using the "Upload Book" button
   - Verify the book name appears in the header

2. **Send Messages**:
   - Type a message and click Send (or press Enter)
   - Verify the message appears on the right (user messages)
   - Verify AI response appears on the left after a short delay

3. **Test Features**:
   - Try the clear chat button
   - Try sending empty messages (should be disabled)
   - Try uploading a non-.txt file (should show error)

## 🔧 Available Scripts

- `npm start`: Start development server (runs on http://localhost:3000)
- `npm build`: Create production build
- `npm test`: Run tests (if configured)

## 📝 Next Steps (Phase 2)

Once Phase 1 is working, we'll add:

1. **Anthropic Claude API Integration**:
   - Replace `simulateAIResponse` with real API calls
   - Include book content in API prompts
   - Handle API errors gracefully

2. **Enhanced Features**:
   - PDF file support using pdf-parse
   - Conversation history persistence (localStorage)
   - Multiple book management
   - Book content chunking for large files

## 🐛 Troubleshooting

### App won't start
- Make sure you've run `npm install`
- Check that Node.js is installed: `node --version`
- Try deleting `node_modules` folder and running `npm install` again

### File upload not working
- Make sure you're uploading a `.txt` file
- Check browser console for errors (F12 → Console tab)

### Styling looks broken
- Make sure Tailwind CSS is properly configured
- Try restarting the development server

## 📖 Learning Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [FileReader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)

## 💡 Tips for Learning

1. **Read the Comments**: Every function and section has comments explaining what it does
2. **Experiment**: Try changing colors, text, or adding new features
3. **Console Logging**: Add `console.log()` statements to see what's happening
4. **React DevTools**: Install the React DevTools browser extension to inspect components

## 📄 License

This project is for educational purposes.

---

**Happy Coding! 🚀**

