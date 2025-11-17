import React, { useState, useEffect, useRef } from 'react';
import { Send, Upload, BookOpen, Trash2, Loader2 } from 'lucide-react';

/**
 * BookBite - AI Book Chat Application
 * 
 * This is the main component that handles:
 * - File uploads (.txt books)
 * - Chat message display and management
 * - Simulated AI responses (Phase 1)
 * - UI interactions and state management
 */
function App() {
  // State for managing the uploaded book
  const [bookContent, setBookContent] = useState(null); // Stores the text content of the uploaded book
  const [bookName, setBookName] = useState(null); // Stores the name of the uploaded file

  // State for managing chat messages
  const [messages, setMessages] = useState([]); // Array of message objects {id, text, sender, timestamp}

  // State for managing user input
  const [inputText, setInputText] = useState(''); // Current text in the input field

  // State for managing loading states
  const [isLoading, setIsLoading] = useState(false); // Whether AI is "thinking" (simulated)

  // Ref for auto-scrolling to bottom when new messages arrive
  const messagesEndRef = useRef(null);

  // Ref for the file input element (hidden, triggered by button)
  const fileInputRef = useRef(null);

  /**
   * Auto-scroll to bottom whenever messages change
   * This ensures users always see the latest message
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Scrolls the messages container to the bottom
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Handles file upload when user selects a .txt file
   * Uses FileReader API to read the file content as text
   */
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    
    // Validate that a file was selected
    if (!file) {
      return;
    }

    // Validate file type (only .txt for now)
    if (!file.name.endsWith('.txt')) {
      alert('Please upload a .txt file. PDF support coming soon!');
      return;
    }

    // Create a FileReader to read the file
    const reader = new FileReader();

    // This function runs when the file is successfully read
    reader.onload = (e) => {
      const content = e.target.result;
      setBookContent(content); // Store the book content
      setBookName(file.name); // Store the book filename
      
      // Add a welcome message about the book
      const welcomeMessage = {
        id: Date.now(),
        text: `📚 Book "${file.name}" loaded successfully! You can now ask me questions about it.`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    };

    // This function runs if there's an error reading the file
    reader.onerror = () => {
      alert('Error reading file. Please try again.');
    };

    // Start reading the file as text
    reader.readAsText(file);
  };

  /**
   * Simulates an AI response (Phase 1 placeholder)
   * In Phase 2, this will call the Anthropic Claude API
   * 
   * For now, it just echoes back the user's message with a note
   */
  const simulateAIResponse = async (userMessage) => {
    // Simulate thinking time (1-2 seconds)
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Create a simulated response
    // In Phase 2, this will use the actual book content and Claude API
    const response = bookContent
      ? `I understand you're asking about "${userMessage}". Once we connect to Claude API, I'll analyze the book content to give you a detailed answer! 📖`
      : `You said: "${userMessage}". Please upload a book first to have meaningful conversations about it!`;

    return response;
  };

  /**
   * Handles sending a message when user clicks send or presses Enter
   */
  const handleSendMessage = async () => {
    // Don't send if input is empty or already loading
    if (!inputText.trim() || isLoading) {
      return;
    }

    // Create user message object
    const userMessage = {
      id: Date.now(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    // Add user message to the chat immediately
    setMessages(prev => [...prev, userMessage]);
    
    // Clear the input field
    setInputText('');
    
    // Set loading state
    setIsLoading(true);

    try {
      // Simulate AI response (Phase 1)
      // In Phase 2, this will call the real API
      const aiResponseText = await simulateAIResponse(userMessage.text);

      // Create AI message object
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date()
      };

      // Add AI response to the chat
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      // Handle errors (for now, just show a message)
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, something went wrong. Please try again.',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      // Always turn off loading state
      setIsLoading(false);
    }
  };

  /**
   * Handles Enter key press in the input field
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent new line
      handleSendMessage();
    }
  };

  /**
   * Clears all messages from the chat
   */
  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear all messages?')) {
      setMessages([]);
    }
  };

  /**
   * Triggers the hidden file input when upload button is clicked
   */
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-primary-100 flex flex-col">
      {/* Header Section */}
      <header className="bg-white shadow-md border-b border-primary-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* App Title */}
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-primary-800">BookBite</h1>
            </div>

            {/* Book Status and Upload Button */}
            <div className="flex items-center space-x-4">
              {/* Display current book name if loaded */}
              {bookName && (
                <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-primary-100 rounded-lg">
                  <BookOpen className="w-4 h-4 text-primary-600" />
                  <span className="text-sm font-medium text-primary-700 truncate max-w-xs">
                    {bookName}
                  </span>
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={handleUploadClick}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 shadow-sm"
                title="Upload a .txt book file"
              >
                <Upload className="w-5 h-5" />
                <span className="hidden sm:inline">Upload Book</span>
              </button>

              {/* Hidden file input - triggered by button */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Messages Area - Scrollable chat container */}
      <main className="flex-1 container mx-auto px-4 py-6 overflow-hidden flex flex-col">
        <div className="flex-1 bg-white rounded-lg shadow-lg overflow-y-auto scrollbar-thin p-6 mb-4">
          {/* Welcome message when no messages exist */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
              <BookOpen className="w-16 h-16 mb-4 text-primary-300" />
              <h2 className="text-xl font-semibold mb-2">Welcome to BookBite!</h2>
              <p className="max-w-md">
                Upload a .txt book file to start having AI-powered conversations about it.
              </p>
            </div>
          )}

          {/* Message List */}
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] sm:max-w-[70%] rounded-lg px-4 py-3 shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {message.text}
                  </p>
                  <p
                    className={`text-xs mt-2 ${
                      message.sender === 'user'
                        ? 'text-primary-100'
                        : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-3 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-5 h-5 text-primary-600 animate-spin" />
                    <span className="text-sm text-gray-600">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area - Fixed at bottom */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-end space-x-2">
            {/* Text Input */}
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={bookContent ? "Ask a question about the book..." : "Upload a book first to start chatting..."}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows="1"
              disabled={isLoading}
            />

            {/* Clear Chat Button */}
            {messages.length > 0 && (
              <button
                onClick={handleClearChat}
                className="p-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                title="Clear chat"
                disabled={isLoading}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}

            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              className={`p-3 rounded-lg transition-colors duration-200 ${
                !inputText.trim() || isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm'
              }`}
              title="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-600">
        <p>BookBite - Phase 1: Simulated AI | Phase 2: Claude API Integration Coming Soon</p>
      </footer>
    </div>
  );
}

export default App;

