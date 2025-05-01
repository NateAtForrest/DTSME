import React, { useState } from 'react';
import { Upload, Plus, Filter, Search, File, Trash2, ArrowUpDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';

const KnowledgeBase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sources' | 'chunks'>('sources');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="md"
            icon={<Upload size={16} />}
          >
            Import Source
          </Button>
          <Button 
            variant="primary" 
            size="md"
            icon={<Plus size={16} />}
          >
            Add Source
          </Button>
        </div>
      </div>
      
      <div className="flex space-x-1 border-b">
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'sources' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('sources')}
        >
          Knowledge Sources
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'chunks' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('chunks')}
        >
          Knowledge Chunks
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="relative w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search knowledge base..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            icon={<Filter size={16} />}
          >
            Filters
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            icon={<ArrowUpDown size={16} />}
          >
            Sort
          </Button>
        </div>
      </div>
      
      {activeTab === 'sources' ? (
        <SourcesTable />
      ) : (
        <ChunksTable />
      )}
    </div>
  );
};

const SourcesTable: React.FC = () => {
  const sources = [
    {
      id: '1',
      name: 'Sales Pitch Deck Q2 2025',
      type: 'PDF',
      size: '2.4 MB',
      chunks: 48,
      addedDate: '2025-05-15',
      status: 'Complete',
    },
    {
      id: '2',
      name: 'Customer Interview Transcripts',
      type: 'Audio',
      size: '45.2 MB',
      chunks: 184,
      addedDate: '2025-05-14',
      status: 'Complete',
    },
    {
      id: '3',
      name: 'Product Documentation v2.1',
      type: 'DOCX',
      size: '1.8 MB',
      chunks: 73,
      addedDate: '2025-05-13',
      status: 'Complete',
    },
    {
      id: '4',
      name: 'Email Templates Collection',
      type: 'TXT',
      size: '356 KB',
      chunks: 26,
      addedDate: '2025-05-12',
      status: 'Complete',
    },
    {
      id: '5',
      name: 'Competitor Analysis Report',
      type: 'PDF',
      size: '5.1 MB',
      chunks: 112,
      addedDate: '2025-05-10',
      status: 'Complete',
    },
    {
      id: '6',
      name: 'Customer Service Call Recordings',
      type: 'Audio',
      size: '156.8 MB',
      chunks: 0,
      addedDate: '2025-05-15',
      status: 'Processing',
    },
  ];
  
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 bg-gray-50">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Size</th>
              <th className="px-6 py-3">Chunks</th>
              <th className="px-6 py-3">Added Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sources.map((source) => (
              <tr key={source.id} className="bg-white hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  <div className="flex items-center">
                    <File size={18} className="mr-2 text-gray-400" />
                    {source.name}
                  </div>
                </td>
                <td className="px-6 py-4">{source.type}</td>
                <td className="px-6 py-4">{source.size}</td>
                <td className="px-6 py-4">{source.chunks}</td>
                <td className="px-6 py-4">{source.addedDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    source.status === 'Complete' 
                      ? 'bg-green-100 text-green-800' 
                      : source.status === 'Processing'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {source.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    icon={<Trash2 size={16} className="text-red-500" />}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

const ChunksTable: React.FC = () => {
  const chunks = [
    {
      id: '1',
      content: 'Our Enterprise plan includes 24/7 priority support, SLA guarantees, and dedicated account management.',
      source: 'Sales Pitch Deck Q2 2025',
      embedding: 'ada-002',
      tokens: 24,
      confidence: 0.92,
    },
    {
      id: '2',
      content: 'For healthcare clients, we ensure HIPAA compliance and provide BAA agreements as standard.',
      source: 'Customer Interview Transcripts',
      embedding: 'ada-002',
      tokens: 18,
      confidence: 0.89,
    },
    {
      id: '3',
      content: 'Our refund policy allows for full refunds within 30 days of purchase, no questions asked.',
      source: 'Email Templates Collection',
      embedding: 'ada-002',
      tokens: 16,
      confidence: 0.95,
    },
    {
      id: '4',
      content: 'The security architecture includes end-to-end encryption, regular penetration testing, and SOC 2 compliance.',
      source: 'Product Documentation v2.1',
      embedding: 'ada-002',
      tokens: 22,
      confidence: 0.88,
    },
    {
      id: '5',
      content: 'Compared to Competitor X, our solution offers 40% faster processing times and supports twice as many integrations.',
      source: 'Competitor Analysis Report',
      embedding: 'ada-002',
      tokens: 26,
      confidence: 0.91,
    },
  ];
  
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 bg-gray-50">
            <tr>
              <th className="px-6 py-3 w-2/5">Content</th>
              <th className="px-6 py-3">Source</th>
              <th className="px-6 py-3">Embedding</th>
              <th className="px-6 py-3">Tokens</th>
              <th className="px-6 py-3">Confidence</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {chunks.map((chunk) => (
              <tr key={chunk.id} className="bg-white hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {chunk.content}
                </td>
                <td className="px-6 py-4">{chunk.source}</td>
                <td className="px-6 py-4">{chunk.embedding}</td>
                <td className="px-6 py-4">{chunk.tokens}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${chunk.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span>{(chunk.confidence * 100).toFixed(0)}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    icon={<Trash2 size={16} className="text-red-500" />}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default KnowledgeBase;