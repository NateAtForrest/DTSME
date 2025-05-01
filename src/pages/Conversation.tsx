import React, { useState, useCallback, useRef } from 'react';
import { ArrowUp, User, Bot, Clock, ThumbsUp, ThumbsDown, AlertCircle, Copy, Send, Upload, X } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useLocation } from 'react-router-dom';
import FileUpload from '../components/ui/FileUpload';
import { generateResponse } from '../lib/openai';

interface Expert {
  id: number;
  name: string;
  role: string;
  image: string;
  expertise: string[];
  languages: string[];
  experience: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface UploadedFile {
  file: File;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  progress?: number;
  error?: string;
}

const Conversation: React.FC = () => {
  const [message, setMessage] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const expert = location.state?.expert as Expert | undefined;
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (message.trim() === '' || isLoading) return;

    const newMessage: Message = {
      role: 'user',
      content: message.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await generateResponse(
        messages.concat(newMessage).map(m => ({
          role: m.role,
          content: m.content
        })),
        expert
      );

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response || 'I apologize, but I was unable to generate a response.',
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error while processing your request.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFilesAccepted = useCallback((files: File[]) => {
    const newFiles = files.map(file => ({
      file,
      status: 'uploading' as const,
      progress: 0
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate file processing
    newFiles.forEach(uploadedFile => {
      const timer = setInterval(() => {
        setUploadedFiles(prev => prev.map(f => {
          if (f.file === uploadedFile.file) {
            const progress = (f.progress || 0) + 20;
            if (progress >= 100) {
              clearInterval(timer);
              return { ...f, status: 'complete' as const, progress: 100 };
            }
            return { ...f, progress };
          }
          return f;
        }));
      }, 500);
    });
  }, []);

  const removeFile = (file: File) => {
    setUploadedFiles(prev => prev.filter(f => f.file !== file));
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Conversation</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1.5">
            <Clock size={16} className="text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">Active Session: 12:45</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-4">
        <Card className="col-span-3 flex flex-col h-[calc(100vh-14rem)]">
          <CardHeader className="py-3 px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {expert ? (
                  <div className="relative">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="h-12 w-12 rounded-full object-cover border-2 border-blue-100"
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                ) : (
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bot size={24} className="text-blue-600" />
                  </div>
                )}
                <div className="ml-3">
                  <div className="flex items-center">
                    <p className="text-lg font-medium text-gray-900">{expert ? expert.name : 'AI Assistant'}</p>
                    <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {expert ? expert.experience : 'AI'}
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    <p className="text-sm text-gray-600">{expert ? expert.role : 'Synthetic SME'}</p>
                    {expert && (
                      <div className="flex ml-3 space-x-1">
                        {expert.languages.map((lang, index) => (
                          <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {lang}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowUpload(!showUpload)}
                  icon={<Upload size={16} />}
                >
                  Add Knowledge
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setMessages([])}
                >
                  Clear Chat
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                >
                  Export
                </Button>
              </div>
            </div>
            {expert && (
              <div className="mt-3 flex flex-wrap gap-2">
                {expert.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-6">
            {showUpload && (
              <div className="mb-6 bg-gray-50 rounded-lg p-4">
                <FileUpload onFilesAccepted={handleFilesAccepted} />
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map((uploadedFile, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-2 rounded-md">
                        <div className="flex items-center space-x-2">
                          <File size={16} className="text-gray-500" />
                          <span className="text-sm text-gray-700">{uploadedFile.file.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {uploadedFile.status === 'uploading' && (
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${uploadedFile.progress}%` }}
                              />
                            </div>
                          )}
                          {uploadedFile.status === 'complete' && (
                            <span className="text-xs text-green-600">Complete</span>
                          )}
                          <button
                            onClick={() => removeFile(uploadedFile.file)}
                            className="p-1 hover:bg-gray-100 rounded-full"
                          >
                            <X size={14} className="text-gray-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {messages.length === 0 && (
              <div className="flex">
                <div className="flex-shrink-0">
                  {expert ? (
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bot size={18} className="text-blue-600" />
                    </div>
                  )}
                </div>
                <div className="ml-3 bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-3xl">
                  <p className="text-gray-800">
                    {expert 
                      ? `Hello! I'm ${expert.name}, your ${expert.role.toLowerCase()}. I specialize in ${expert.expertise.join(', ')}. How can I assist you today?`
                      : "Hello! I'm your AI assistant. I can help you with questions about our products, services, and more. What would you like to know?"}
                  </p>
                </div>
              </div>
            )}

            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="flex-shrink-0">
                    {expert ? (
                      <img
                        src={expert.image}
                        alt={expert.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Bot size={18} className="text-blue-600" />
                      </div>
                    )}
                  </div>
                )}
                <div className={`${
                  msg.role === 'user' 
                    ? 'mr-3 bg-blue-50 rounded-lg rounded-tr-none' 
                    : 'ml-3 bg-gray-100 rounded-lg rounded-tl-none'
                } p-3 max-w-3xl`}>
                  <p className="text-gray-800">{msg.content}</p>
                  <div className="mt-2 flex items-center justify-end space-x-2">
                    <span className="text-xs text-gray-500">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                    {msg.role === 'assistant' && (
                      <>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <ThumbsUp size={14} className="text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <ThumbsDown size={14} className="text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <Copy size={14} className="text-gray-500" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                {msg.role === 'user' && (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                    <User size={18} className="text-gray-600" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex">
                <div className="flex-shrink-0">
                  {expert ? (
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bot size={18} className="text-blue-600" />
                    </div>
                  )}
                </div>
                <div className="ml-3 bg-gray-100 p-3 rounded-lg rounded-tl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          
          <div className="p-4 border-t border-gray-200">
            <div className="relative">
              <textarea
                className="block w-full p-3 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder={`Ask ${expert ? expert.name : 'a'} question...`}
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <button
                className={`absolute right-3 bottom-3 p-2 ${
                  message.trim() && !isLoading
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-400'
                } rounded-full hover:bg-blue-700 focus:outline-none transition-colors`}
                onClick={handleSendMessage}
                disabled={!message.trim() || isLoading}
              >
                <Send size={18} />
              </button>
            </div>
            <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
              <div>
                <span>Strict mode enabled: Only answering from knowledge base</span>
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-1" />
                  Auto-citations
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-1" checked />
                  High precision
                </label>
              </div>
            </div>
          </div>
        </Card>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Context Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 py-2">
              <ContextSource
                title="Sales Pitch Deck Q2 2025"
                relevance={92}
              />
              <ContextSource
                title="Pricing Documentation"
                relevance={87}
              />
              <ContextSource
                title="Enterprise Feature List"
                relevance={73}
              />
              <ContextSource
                title="Customer Interview Transcripts"
                relevance={68}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Suggested Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" fullWidth>
                How does our pricing compare to competitors?
              </Button>
              <Button variant="outline" size="sm" fullWidth>
                What discounts are available for non-profits?
              </Button>
              <Button variant="outline" size="sm" fullWidth>
                Can customers upgrade mid-contract?
              </Button>
              <Button variant="outline" size="sm" fullWidth>
                What's included in the SLA?
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Conversation Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Questions</span>
                <span className="text-sm font-medium">{messages.filter(m => m.role === 'user').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Sources Used</span>
                <span className="text-sm font-medium">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Avg. Response Time</span>
                <span className="text-sm font-medium">1.8s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Confidence Score</span>
                <span className="text-sm font-medium">92%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface ContextSourceProps {
  title: string;
  relevance: number;
}

const ContextSource: React.FC<ContextSourceProps> = ({ title, relevance }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700">{title}</span>
      <div className="flex items-center">
        <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
          <div 
            className="bg-blue-600 h-1.5 rounded-full" 
            style={{ width: `${relevance}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-500">{relevance}%</span>
      </div>
    </div>
  );
};

export default Conversation;