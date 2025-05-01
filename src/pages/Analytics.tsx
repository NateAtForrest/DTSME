import React, { useState } from 'react';
import { Calendar, BarChart2, PieChart, TrendingUp, Filter, FileQuestion, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';

const Analytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'usage' | 'coverage' | 'quality'>('overview');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md pl-3 pr-2 py-1">
            <Calendar size={16} className="text-gray-500" />
            <span className="text-sm text-gray-700">Last 30 days</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            icon={<Filter size={16} />}
          >
            Filters
          </Button>
        </div>
      </div>
      
      <div className="flex space-x-1 border-b">
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'overview' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'usage' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('usage')}
        >
          Usage Analytics
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'coverage' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('coverage')}
        >
          Knowledge Coverage
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'quality' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('quality')}
        >
          Quality Metrics
        </button>
      </div>
      
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total Conversations"
              value="1,247"
              trend="+18.2%"
              icon={<BarChart2 className="h-6 w-6 text-blue-500" />}
            />
            <MetricCard
              title="Questions Answered"
              value="5,893"
              trend="+24.5%"
              icon={<FileQuestion className="h-6 w-6 text-green-500" />}
            />
            <MetricCard
              title="Content Generated"
              value="349"
              trend="+12.8%"
              icon={<TrendingUp className="h-6 w-6 text-amber-500" />}
            />
            <MetricCard
              title="Hallucination Rate"
              value="0.8%"
              trend="-0.4%"
              trendDirection="down"
              icon={<AlertCircle className="h-6 w-6 text-red-500" />}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Conversation Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Conversation trend chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Query Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Query categories chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Knowledge Gaps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">Pricing for healthcare sector</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                    28 queries
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">Integration with legacy systems</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                    23 queries
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">GDPR compliance details</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '52%' }}></div>
                    </div>
                  </div>
                  <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                    19 queries
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Most Used Sources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">Product Documentation</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '86%' }}></div>
                    </div>
                  </div>
                  <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    86%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">Sales Pitch Deck</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                  <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    72%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">Case Studies</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '64%' }}></div>
                    </div>
                  </div>
                  <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    64%
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center pt-4">
                  <div className="relative w-36 h-36">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-200"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-green-500"
                        strokeWidth="10"
                        strokeDasharray={2 * Math.PI * 40}
                        strokeDashoffset={2 * Math.PI * 40 * (1 - 0.92)}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-gray-900">92%</span>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Helpful responses</span>
                      <span className="text-sm font-medium text-gray-900">94%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Accurate information</span>
                      <span className="text-sm font-medium text-gray-900">93%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Natural conversation</span>
                      <span className="text-sm font-medium text-gray-900">89%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      
      {activeTab === 'usage' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Usage Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-gray-500">Usage analytics visualizations will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {activeTab === 'coverage' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-gray-500">Knowledge coverage visualizations will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {activeTab === 'quality' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quality Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-gray-500">Quality metrics visualizations will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  trendDirection?: 'up' | 'down';
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend,
  trendDirection = 'up',
  icon,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          </div>
          {icon}
        </div>
        <div className="mt-4">
          <span 
            className={`text-sm font-medium ${
              trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend}
          </span>
          <span className="text-sm text-gray-500 ml-1">vs last period</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Analytics;