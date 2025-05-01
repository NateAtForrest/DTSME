import React from 'react';
import { Save, Trash2, Lock, User, Database, Bell, Globe, Shield, RefreshCw } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>
      
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1">
          <div className="bg-white shadow-sm rounded-lg">
            <nav className="space-y-1 p-3">
              <a
                href="#general"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-700"
              >
                <Globe className="mr-3 h-5 w-5" />
                <span>General</span>
              </a>
              <a
                href="#knowledge-base"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <Database className="mr-3 h-5 w-5" />
                <span>Knowledge Base</span>
              </a>
              <a
                href="#style-training"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <RefreshCw className="mr-3 h-5 w-5" />
                <span>Style Training</span>
              </a>
              <a
                href="#security"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <Shield className="mr-3 h-5 w-5" />
                <span>Security</span>
              </a>
              <a
                href="#notifications"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <Bell className="mr-3 h-5 w-5" />
                <span>Notifications</span>
              </a>
              <a
                href="#account"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <User className="mr-3 h-5 w-5" />
                <span>Account</span>
              </a>
            </nav>
          </div>
        </div>
        
        <div className="col-span-3 space-y-6">
          <Card id="general">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Application Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value="Synthetic SME"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default SME Persona
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Product Expert</option>
                  <option>Sales Specialist</option>
                  <option>Support Agent</option>
                  <option>Technical Advisor</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Content Type
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Blog Post</option>
                  <option>Email Template</option>
                  <option>Social Media</option>
                  <option>Sales Materials</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Default Anti-Hallucination Level
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="1"
                    max="3"
                    value="3"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">Strict</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Higher settings enforce stricter adherence to knowledge base facts.
                </p>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  variant="primary" 
                  size="md"
                  icon={<Save size={16} />}
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card id="knowledge-base">
            <CardHeader>
              <CardTitle>Knowledge Base Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Embedding Model
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>text-embedding-ada-002</option>
                  <option>text-embedding-3-large</option>
                  <option>text-embedding-3-small</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chunking Strategy
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Semantic Paragraphs</option>
                  <option>Fixed Size (500 tokens)</option>
                  <option>Fixed Size (1000 tokens)</option>
                  <option>Sentence-based</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Retrieval Parameters
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Top K Results
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value="8"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Similarity Threshold
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value="0.75"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked />
                  <span className="text-sm text-gray-700">Enable hybrid search (semantic + keyword)</span>
                </label>
              </div>
              
              <div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked />
                  <span className="text-sm text-gray-700">Auto-refresh knowledge base on new documents</span>
                </label>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  variant="primary" 
                  size="md"
                  icon={<Save size={16} />}
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card id="style-training">
            <CardHeader>
              <CardTitle>Style Training Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Writing Style Profiles
                </label>
                <div className="space-y-3 mt-2">
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Product Expert</p>
                      <p className="text-xs text-gray-500">Based on 186 documents</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        icon={<Trash2 size={14} className="text-red-500" />}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Sales Specialist</p>
                      <p className="text-xs text-gray-500">Based on 124 documents</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        icon={<Trash2 size={14} className="text-red-500" />}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="mt-3"
                >
                  Add New Style Profile
                </Button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Style Extraction Method
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Auto-detect from documents</option>
                  <option>Manual configuration</option>
                  <option>Hybrid approach</option>
                </select>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  variant="primary" 
                  size="md"
                  icon={<Save size={16} />}
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card id="security">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API Authentication Method
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>API Key</option>
                  <option>OAuth 2.0</option>
                  <option>JWT</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Retention Policy
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="retention" className="mr-2" checked />
                    <span className="text-sm text-gray-700">Keep conversation history for 30 days</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="retention" className="mr-2" />
                    <span className="text-sm text-gray-700">Keep conversation history for 90 days</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="retention" className="mr-2" />
                    <span className="text-sm text-gray-700">Keep conversation history indefinitely</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked />
                  <span className="text-sm text-gray-700">Enable audit logging for all interactions</span>
                </label>
              </div>
              
              <div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked />
                  <span className="text-sm text-gray-700">Enable content filtering for generated text</span>
                </label>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  variant="primary" 
                  size="md"
                  icon={<Lock size={16} />}
                >
                  Update Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;