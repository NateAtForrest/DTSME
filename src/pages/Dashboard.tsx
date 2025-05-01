import React from 'react';
import { BarChart2, BookOpen, MessageSquare, FileText, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const smeExperts = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Product Expert",
      image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=300",
      expertise: ["Product Features", "Technical Specifications", "Integration Guidelines"],
      languages: ["English", "Mandarin"],
      experience: "8 years"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Sales Specialist",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
      expertise: ["Enterprise Sales", "Pricing", "Contract Negotiation"],
      languages: ["English", "Spanish"],
      experience: "12 years"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Technical Advisor",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300",
      expertise: ["System Architecture", "API Integration", "Performance Optimization"],
      languages: ["English", "Portuguese"],
      experience: "10 years"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Support Lead",
      image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=300",
      expertise: ["Customer Support", "Troubleshooting", "User Training"],
      languages: ["English", "Korean"],
      experience: "6 years"
    }
  ];

  const handleSMEClick = (expert: typeof smeExperts[0]) => {
    navigate('/conversation', { state: { expert } });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Button variant="primary" size="md">New Knowledge Source</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Subject Matter Experts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {smeExperts.map((expert) => (
              <button
                key={expert.id}
                onClick={() => handleSMEClick(expert)}
                className="group text-center transition-transform hover:scale-105"
              >
                <div className="relative mx-auto w-24 h-24 mb-3">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-full rounded-full object-cover shadow-md group-hover:shadow-lg transition-shadow"
                  />
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <h3 className="font-medium text-gray-900">{expert.name}</h3>
                <p className="text-sm text-gray-500">{expert.role}</p>
                <div className="mt-2 flex flex-wrap justify-center gap-1">
                  {expert.expertise.slice(0, 2).map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Knowledge Items"
          value="1,286"
          icon={<BookOpen className="h-6 w-6 text-blue-500" />}
          change="+12.5%"
          description="from last month"
        />
        <StatCard
          title="Conversations"
          value="856"
          icon={<MessageSquare className="h-6 w-6 text-teal-500" />}
          change="+5.2%"
          description="from last month"
        />
        <StatCard
          title="Content Generated"
          value="349"
          icon={<FileText className="h-6 w-6 text-amber-500" />}
          change="+18.3%"
          description="from last month"
        />
        <StatCard
          title="Hallucination Rate"
          value="0.8%"
          icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
          change="-0.4%"
          description="from last month"
          positive
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-gray-500">Activity chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Knowledge Sources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <KnowledgeSourceItem 
              title="Sales Pitch Deck Q2 2025"
              type="PDF"
              date="2 hours ago"
              status="Processing"
            />
            <KnowledgeSourceItem 
              title="Customer Interview Transcripts"
              type="Audio"
              date="Yesterday"
              status="Complete"
            />
            <KnowledgeSourceItem 
              title="Product Documentation v2.1"
              type="DOCX"
              date="2 days ago"
              status="Complete"
            />
            <KnowledgeSourceItem 
              title="Email Templates Collection"
              type="TXT"
              date="3 days ago"
              status="Complete"
            />
            <Button variant="outline" fullWidth>View All Sources</Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Knowledge Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-gray-500">Coverage visualization will be displayed here</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Queries</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <QueryItem query="What are our pricing options for enterprise customers?" count={48} />
            <QueryItem query="How does our product compare to Competitor X?" count={36} />
            <QueryItem query="What is our refund policy?" count={29} />
            <QueryItem query="Can you provide case studies for the healthcare industry?" count={25} />
            <QueryItem query="What security certifications do we have?" count={22} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  description: string;
  positive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  description,
  positive = false
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
          <span className={`text-sm font-medium ${positive ? 'text-green-600' : 'text-blue-600'}`}>
            {change}
          </span>
          <span className="text-sm text-gray-500 ml-1">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
};

interface KnowledgeSourceItemProps {
  title: string;
  type: string;
  date: string;
  status: 'Processing' | 'Complete' | 'Error';
}

const KnowledgeSourceItem: React.FC<KnowledgeSourceItemProps> = ({
  title,
  type,
  date,
  status
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
          {type}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900 line-clamp-1">{title}</p>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full ${
        status === 'Processing' ? 'bg-amber-100 text-amber-800' : 
        status === 'Complete' ? 'bg-green-100 text-green-800' : 
        'bg-red-100 text-red-800'
      }`}>
        {status}
      </span>
    </div>
  );
};

interface QueryItemProps {
  query: string;
  count: number;
}

const QueryItem: React.FC<QueryItemProps> = ({ query, count }) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-700 line-clamp-1">{query}</p>
      <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
        {count} times
      </span>
    </div>
  );
};

export default Dashboard;