import React, { useState } from 'react';
import { FileText, Coffee, Mail, Megaphone, Clipboard, CopyCheck, Download } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const ContentGeneration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blog' | 'email' | 'social' | 'sales'>('blog');
  const [generating, setGenerating] = useState(false);
  
  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Content Generation</h1>
        <Button 
          variant="primary" 
          size="md"
          onClick={handleGenerate}
          disabled={generating}
        >
          {generating ? 'Generating...' : 'Generate Content'}
        </Button>
      </div>
      
      <div className="flex space-x-1 border-b">
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 flex items-center ${
            activeTab === 'blog' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('blog')}
        >
          <FileText size={16} className="mr-2" />
          Blog Post
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 flex items-center ${
            activeTab === 'email' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('email')}
        >
          <Mail size={16} className="mr-2" />
          Email Template
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 flex items-center ${
            activeTab === 'social' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('social')}
        >
          <Megaphone size={16} className="mr-2" />
          Social Media
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 flex items-center ${
            activeTab === 'sales' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('sales')}
        >
          <Coffee size={16} className="mr-2" />
          Sales Materials
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Content Editor</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1">
                {activeTab === 'blog' && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        id="title"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value="How Enterprise Organizations Can Optimize Their Data Security Strategy"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                        Content
                      </label>
                      <textarea
                        id="content"
                        rows={20}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                        value={`# How Enterprise Organizations Can Optimize Their Data Security Strategy

In today's digital landscape, data security is not just an IT concern but a critical business imperative for enterprise organizations. With cyber threats becoming increasingly sophisticated and data breaches making headlines with alarming frequency, organizations must adopt comprehensive security strategies that protect sensitive information while enabling business growth.

## The Evolving Threat Landscape

Enterprise organizations face a complex threat landscape that continues to evolve rapidly. According to our recent security research, the average cost of a data breach has reached $4.35 million, with large enterprises often facing much higher costs due to their extensive data ecosystems.

Several key trends are shaping today's security challenges:

1. **Ransomware attacks** continue to target large organizations with the resources to pay significant ransoms
2. **Supply chain vulnerabilities** expose organizations to risks through their partner ecosystems
3. **Cloud security misconfigurations** represent a growing attack vector as companies accelerate digital transformation
4. **IoT device proliferation** expands the potential attack surface dramatically

## Building a Resilient Security Strategy

Our approach to enterprise data security emphasizes a multi-layered strategy that addresses the full spectrum of potential vulnerabilities:

### 1. Comprehensive Risk Assessment

Begin with a thorough evaluation of your organization's data assets, identifying where your most sensitive information resides and understanding the regulatory requirements that govern its protection. Our assessment framework examines:

- Data classification and sensitivity mapping
- Compliance requirements across jurisdictions
- Current security controls and their effectiveness
- Potential impact of security incidents

### 2. Zero Trust Architecture Implementation

The traditional perimeter-based security model is no longer sufficient. We recommend implementing a Zero Trust approach that verifies every user and device attempting to access resources, regardless of their location.

Our Enterprise customers have reported a 73% reduction in successful breach attempts after implementing our Zero Trust framework, which includes:

- Continuous authentication and authorization
- Least privilege access controls
- Microsegmentation of networks
- End-to-end encryption for data in transit and at rest

### 3. Advanced Threat Detection and Response

Deploying sophisticated monitoring tools enables organizations to identify potential threats before they cause damage. Our recommended detection capabilities include:

- AI-powered anomaly detection
- Behavioral analytics to identify suspicious activities
- Automated incident response workflows
- Threat intelligence integration

### 4. Regular Security Testing and Validation

Security is not a one-time implementation but an ongoing process. Our enterprise security program emphasizes:

- Regular penetration testing by certified professionals
- Red team exercises to simulate sophisticated attacks
- Compliance audits and certification maintenance
- Security awareness training for all employees

## Measuring Security Program Effectiveness

Implementing security controls is only valuable if their effectiveness can be measured and demonstrated to stakeholders. Our security metrics framework provides actionable insights through:

- Key risk indicators (KRIs) aligned with business objectives
- Security posture scorecards
- Benchmark comparisons against industry peers
- Return on security investment (ROSI) calculations

## Conclusion

Enterprise organizations that prioritize data security as a strategic business function rather than a compliance requirement are better positioned to protect their most valuable assets while enabling innovation and growth. By implementing a comprehensive security strategy that encompasses people, processes, and technology, organizations can significantly reduce their risk exposure while building customer trust.

Our enterprise security solutions are designed to address the unique challenges faced by large organizations navigating complex security landscapes. Contact our team to learn how we can help optimize your security strategy.`}
                      />
                    </div>
                  </div>
                )}
                {activeTab === 'email' && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject Line
                      </label>
                      <input
                        id="subject"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter subject line..."
                        value="Introducing our Enterprise Security Solution"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email-content" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Content
                      </label>
                      <textarea
                        id="email-content"
                        rows={15}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter email content..."
                        value="Dear {{first_name}},

I hope this email finds you well. As [Company]'s CISO, I understand the increasing pressure to enhance security measures while balancing operational efficiency.

Based on our recent conversation about your organization's security challenges, I wanted to share some information about our Enterprise Security Suite, which has helped companies like yours achieve:

• 73% reduction in successful breach attempts
• 45% decrease in incident response time
• 68% improvement in compliance audit outcomes

Our solution addresses the specific challenges you mentioned, including:

1. Advanced threat detection with AI-powered analytics
2. Seamless implementation of Zero Trust architecture
3. Comprehensive compliance management for your industry regulations
4. 24/7 expert security monitoring and response

I've attached a case study from a {{industry}} organization that faced similar challenges to yours.

Would you be available for a brief 20-minute demo next week? I can show you how our solution specifically addresses your security priorities without disrupting your operations.

Best regards,

{{sender_name}}
Enterprise Security Specialist
[Company]

P.S. We're hosting an exclusive security roundtable for enterprise leaders on {{date}}. I'd be happy to reserve a spot for you if you're interested."
                      />
                    </div>
                  </div>
                )}
                {activeTab === 'social' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Platform
                      </label>
                      <div className="flex space-x-2">
                        <button className="px-3 py-2 bg-blue-100 text-blue-800 font-medium text-sm rounded-md">
                          LinkedIn
                        </button>
                        <button className="px-3 py-2 bg-gray-100 text-gray-800 font-medium text-sm rounded-md">
                          Twitter
                        </button>
                        <button className="px-3 py-2 bg-gray-100 text-gray-800 font-medium text-sm rounded-md">
                          Facebook
                        </button>
                        <button className="px-3 py-2 bg-gray-100 text-gray-800 font-medium text-sm rounded-md">
                          Instagram
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="social-content" className="block text-sm font-medium text-gray-700 mb-1">
                        Post Content
                      </label>
                      <textarea
                        id="social-content"
                        rows={8}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter social media content..."
                        value="🔒 New Research Alert: Enterprise organizations implementing Zero Trust architecture see 73% fewer successful breaches.

Our latest Enterprise Security Report reveals the top strategies that leading organizations are using to protect sensitive data in 2025.

Key findings:
• Cloud security misconfigurations remain the #1 vulnerability
• AI-powered detection reduces response time by 45%
• Board-level security focus increased by 67% YoY

Download the full report: [link]

#CyberSecurity #EnterpriseIT #ZeroTrust #DataProtection"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Suggested Hashtags
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-700">
                          #CyberSecurity
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-700">
                          #EnterpriseIT
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-700">
                          #DataProtection
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-700">
                          #ZeroTrust
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-700">
                          #InfoSec
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-700">
                          #CloudSecurity
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-700">
                          #CISO
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'sales' && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="material-type" className="block text-sm font-medium text-gray-700 mb-1">
                        Material Type
                      </label>
                      <select
                        id="material-type"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option>One-Pager</option>
                        <option>Case Study</option>
                        <option>Competitive Comparison</option>
                        <option>ROI Calculator</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="sales-content" className="block text-sm font-medium text-gray-700 mb-1">
                        Content
                      </label>
                      <textarea
                        id="sales-content"
                        rows={20}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={`# Enterprise Security Solution: One-Pager

## The Challenge

Enterprise organizations face escalating security threats while managing complex IT environments:

* 68% report increasing sophistication of attacks
* 72% struggle with security talent shortages
* 84% are concerned about cloud security risks
* 76% face challenges meeting compliance requirements

## Our Solution

Our Enterprise Security Suite provides comprehensive protection through a unified platform:

### 1. Advanced Threat Protection
* AI-powered detection of known and zero-day threats
* Behavioral analytics to identify anomalous activity
* Automated response workflows for rapid containment
* Continuous monitoring across all environments

### 2. Zero Trust Implementation
* Identity-based access control for all resources
* Continuous verification of users and devices
* Microsegmentation to limit lateral movement
* End-to-end encryption for all sensitive data

### 3. Cloud Security Posture Management
* Automated discovery of cloud resources
* Continuous configuration assessment
* IAM privilege monitoring and management
* Multi-cloud security standardization

### 4. Compliance Automation
* Pre-built frameworks for major regulations
* Automated evidence collection and reporting
* Real-time compliance posture visualization
* Gap analysis and remediation guidance

## Key Benefits

| Metric | Industry Average | With Our Solution |
|--------|-----------------|-------------------|
| Breach detection time | 212 days | 24 hours |
| Security FTE efficiency | Base | +45% |
| Compliance audit prep | 6-8 weeks | 3-5 days |
| Mean time to remediate | 72 hours | 4.5 hours |

## Client Success Story

"After implementing the Enterprise Security Suite, we reduced our security incidents by 73% and cut response time by over 45%. The compliance automation alone saved our team hundreds of hours per quarter." 
— CISO, Fortune 500 Financial Services Company

## Pricing & Implementation

* Flexible licensing based on organization size
* Typical implementation timeline: 4-6 weeks
* 24/7 expert support included
* Dedicated success manager for enterprise clients

## Next Steps

1. Security posture assessment (complimentary)
2. Custom implementation roadmap
3. ROI analysis and business case development
4. Technology integration planning`}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex justify-between">
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="md"
                    icon={<CopyCheck size={16} />}
                  >
                    Check Content
                  </Button>
                  <Button 
                    variant="outline" 
                    size="md"
                    icon={<Clipboard size={16} />}
                  >
                    Copy
                  </Button>
                  <Button 
                    variant="outline" 
                    size="md"
                    icon={<Download size={16} />}
                  >
                    Export
                  </Button>
                </div>
                <p className="text-sm text-gray-500 italic">
                  All content is generated based on verified knowledge sources.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                  Topic
                </label>
                <input
                  id="topic"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Enterprise Security"
                  value="Enterprise Security"
                />
              </div>
              
              <div>
                <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-1">
                  Writing Style
                </label>
                <select
                  id="style"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Professional</option>
                  <option>Conversational</option>
                  <option>Academic</option>
                  <option>Technical</option>
                  <option>Persuasive</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-1">
                  Tone
                </label>
                <select
                  id="tone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Authoritative</option>
                  <option>Friendly</option>
                  <option>Urgent</option>
                  <option>Informative</option>
                  <option>Inspiring</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">
                  Content Length
                </label>
                <select
                  id="length"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Brief (300-500 words)</option>
                  <option>Standard (800-1200 words)</option>
                  <option selected>Comprehensive (1500-2000 words)</option>
                  <option>In-depth (2500+ words)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Advanced Options
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" checked />
                    <span className="text-sm text-gray-700">Include statistics</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" checked />
                    <span className="text-sm text-gray-700">Add citations</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" checked />
                    <span className="text-sm text-gray-700">Use brand terminology</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-700">SEO optimization</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Security Whitepaper 2025</span>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  Primary
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Enterprise Case Studies</span>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                  Selected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Product Documentation</span>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                  Selected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Competitor Analysis Report</span>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                  Selected
                </span>
              </div>
              <Button variant="outline" size="sm" fullWidth>
                Manage Sources
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Content History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-700">
                <p className="font-medium">Previous Generations</p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center justify-between">
                    <span className="text-blue-600 hover:underline cursor-pointer">Enterprise Security Blog v2</span>
                    <span className="text-xs text-gray-500">2h ago</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-blue-600 hover:underline cursor-pointer">Enterprise Security Blog v1</span>
                    <span className="text-xs text-gray-500">3h ago</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-blue-600 hover:underline cursor-pointer">Cloud Security Email</span>
                    <span className="text-xs text-gray-500">Yesterday</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContentGeneration;