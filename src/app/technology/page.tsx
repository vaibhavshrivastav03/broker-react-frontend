"use client";

import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Zap,
  Database,
  Code,
  Lock,
  CheckCircle,
  ArrowRight,
  Workflow,
  Server,
  Globe,
  Shield,
  GitBranch,
  Cpu,
  Network
} from "lucide-react";

export default function TechnologyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-blue-500 text-white border-0 mb-4">
              Technical Deep Dive
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI-Powered Integration Technology
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Discover how our intelligent field mapping algorithm and advanced integration
              architecture make connecting to any website platform effortless.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">5-10 min</div>
                <div className="text-sm text-slate-300">Average Setup Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">99.9%</div>
                <div className="text-sm text-slate-300">Field Match Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">50+</div>
                <div className="text-sm text-slate-300">CMS Platforms Supported</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              The Challenge: Complex Data Integration
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Traditional API integrations require developers to manually map hundreds of fields,
              understand platform-specific schemas, and write custom code for each CMS. Our AI eliminates this complexity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="text-red-600">✗</span> Traditional Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• Manual field mapping for each platform</li>
                  <li>• Requires developer expertise (costly)</li>
                  <li>• 2-4 weeks average integration time</li>
                  <li>• Custom code for WordPress, Wix, etc.</li>
                  <li>• Breaks when platforms update</li>
                  <li>• Difficult to maintain and scale</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="text-green-600">✓</span> AI-Powered Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• Automatic field detection and mapping</li>
                  <li>• Zero coding required (save thousands)</li>
                  <li>• 5-10 minute setup time</li>
                  <li>• Works with 50+ platforms out-of-box</li>
                  <li>• Self-healing when platforms change</li>
                  <li>• Scales infinitely with AI learning</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Algorithm Explanation */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                How the AI Field Mapping Algorithm Works
              </h2>
              <p className="text-lg text-slate-600">
                A multi-stage intelligent system that understands yacht listing data and website schemas
              </p>
            </div>

            <Tabs defaultValue="discovery" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="discovery">Discovery</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="matching">Matching</TabsTrigger>
                <TabsTrigger value="validation">Validation</TabsTrigger>
                <TabsTrigger value="sync">Sync</TabsTrigger>
              </TabsList>

              {/* Stage 1: Discovery */}
              <TabsContent value="discovery">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-600" />
                      Stage 1: Website Discovery
                    </CardTitle>
                    <CardDescription>
                      AI crawls and analyzes your website structure
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg border">
                      <h4 className="font-semibold mb-3">What Happens:</h4>
                      <ol className="space-y-2 text-sm">
                        <li><strong>1. Platform Detection</strong> - AI identifies your CMS (WordPress, Wix, Custom, etc.)</li>
                        <li><strong>2. Schema Extraction</strong> - Discovers database tables, custom fields, and data structures</li>
                        <li><strong>3. API Inspection</strong> - Tests available REST/GraphQL endpoints</li>
                        <li><strong>4. Content Analysis</strong> - Analyzes existing listings (if any) to understand format</li>
                      </ol>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold mb-2 text-blue-900">Technical Details:</h4>
                      <div className="text-sm text-blue-800 space-y-1">
                        <p><strong>WordPress:</strong> Detects custom post types, ACF fields, plugins (Essential Real Estate, WPCasa)</p>
                        <p><strong>Wix:</strong> Uses Wix Data API to discover collections and field schemas</p>
                        <p><strong>Custom CMS:</strong> REST API inspection + HTML parsing for data patterns</p>
                      </div>
                    </div>

                    <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                      <div className="text-green-400 mb-2">// Example: WordPress Schema Detection</div>
                      <div>POST /wp-json/broker-api/v1/discover</div>
                      <div className="text-slate-400 mt-2">Response:</div>
                      <pre className="text-slate-300">{`{
  "platform": "WordPress 6.4",
  "custom_post_types": ["yacht_listing"],
  "fields": {
    "vessel_name": "text",
    "vessel_price": "number",
    "vessel_length": "number",
    "vessel_year": "number",
    ...
  },
  "plugins": ["ACF Pro", "YachtSync"]
}`}</pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Stage 2: Analysis */}
              <TabsContent value="analysis">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cpu className="h-5 w-5 text-purple-600" />
                      Stage 2: Semantic Analysis
                    </CardTitle>
                    <CardDescription>
                      Natural Language Processing to understand field meanings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg border">
                      <h4 className="font-semibold mb-3">AI Processing:</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="font-semibold text-sm mb-1">🔍 Field Name Analysis</p>
                          <p className="text-sm text-slate-600">
                            NLP model analyzes field names like "boat_name", "vessel_title", "yacht_name"
                            and understands they all mean the same thing
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-sm mb-1">📊 Data Type Inference</p>
                          <p className="text-sm text-slate-600">
                            Examines existing data to determine if "price" is stored as string, integer,
                            or formatted with currency symbols
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-sm mb-1">🎯 Context Understanding</p>
                          <p className="text-sm text-slate-600">
                            Distinguishes between "length" (vessel LOA) vs "length" (video duration)
                            based on surrounding field context
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <h5 className="font-semibold text-purple-900 mb-2">Your Website Field</h5>
                        <code className="text-sm bg-white px-2 py-1 rounded">yacht_length_feet</code>
                        <div className="mt-3 text-xs text-purple-800">
                          <strong>AI Understands:</strong>
                          <ul className="mt-1 space-y-1">
                            <li>• Refers to vessel dimensions</li>
                            <li>• Unit: feet (imperial)</li>
                            <li>• Data type: numeric</li>
                            <li>• Likely range: 20-200</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h5 className="font-semibold text-blue-900 mb-2">API Field</h5>
                        <code className="text-sm bg-white px-2 py-1 rounded">length_ft</code>
                        <div className="mt-3 text-xs text-blue-800">
                          <strong>Confidence Score:</strong>
                          <div className="mt-2 bg-white rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{width: '98%'}}></div>
                          </div>
                          <p className="mt-1">98% match - Auto-mapped ✓</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-xs">
                      <div className="text-green-400 mb-2">// AI Semantic Matching Example</div>
                      <pre className="text-slate-300">{`{
  "api_field": "price_usd",
  "website_candidates": [
    {"field": "yacht_price", "confidence": 0.95},
    {"field": "asking_price", "confidence": 0.92},
    {"field": "list_price_usd", "confidence": 0.98},
  ],
  "selected": "list_price_usd",
  "reasoning": "Exact currency match + high semantic similarity"
}`}</pre>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Stage 3: Matching */}
              <TabsContent value="matching">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GitBranch className="h-5 w-5 text-green-600" />
                      Stage 3: Intelligent Matching
                    </CardTitle>
                    <CardDescription>
                      Creating the optimal field-to-field mapping
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg border">
                      <h4 className="font-semibold mb-3">Matching Algorithm:</h4>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-green-700 font-bold text-sm">1</span>
                          </div>
                          <div>
                            <p className="font-semibold text-sm">Direct Name Matching</p>
                            <p className="text-sm text-slate-600">
                              If field names are identical or very similar (e.g., "year" → "year")
                            </p>
                            <div className="mt-1 text-xs text-green-600">Confidence: 95-100%</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-blue-700 font-bold text-sm">2</span>
                          </div>
                          <div>
                            <p className="font-semibold text-sm">Semantic Similarity</p>
                            <p className="text-sm text-slate-600">
                              Vector embeddings compare meaning (e.g., "boat_builder" → "make")
                            </p>
                            <div className="mt-1 text-xs text-blue-600">Confidence: 80-95%</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-purple-700 font-bold text-sm">3</span>
                          </div>
                          <div>
                            <p className="font-semibold text-sm">Data Pattern Analysis</p>
                            <p className="text-sm text-slate-600">
                              Examines actual data values to confirm field purpose
                            </p>
                            <div className="mt-1 text-xs text-purple-600">Confidence boost: +5-10%</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-yellow-700 font-bold text-sm">4</span>
                          </div>
                          <div>
                            <p className="font-semibold text-sm">Human Feedback Loop</p>
                            <p className="text-sm text-slate-600">
                              User corrections improve model for future mappings
                            </p>
                            <div className="mt-1 text-xs text-yellow-600">Continuous learning</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                      <h4 className="font-semibold mb-4">Example Mapping Results:</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between bg-white p-3 rounded">
                          <div className="flex items-center gap-3">
                            <code className="text-sm bg-blue-100 px-2 py-1 rounded">API: name</code>
                            <ArrowRight className="h-4 w-4 text-slate-400" />
                            <code className="text-sm bg-green-100 px-2 py-1 rounded">WP: vessel_name</code>
                          </div>
                          <Badge className="bg-green-500 text-white">99%</Badge>
                        </div>
                        <div className="flex items-center justify-between bg-white p-3 rounded">
                          <div className="flex items-center gap-3">
                            <code className="text-sm bg-blue-100 px-2 py-1 rounded">API: price_usd</code>
                            <ArrowRight className="h-4 w-4 text-slate-400" />
                            <code className="text-sm bg-green-100 px-2 py-1 rounded">WP: asking_price</code>
                          </div>
                          <Badge className="bg-green-500 text-white">96%</Badge>
                        </div>
                        <div className="flex items-center justify-between bg-white p-3 rounded">
                          <div className="flex items-center gap-3">
                            <code className="text-sm bg-blue-100 px-2 py-1 rounded">API: make</code>
                            <ArrowRight className="h-4 w-4 text-slate-400" />
                            <code className="text-sm bg-green-100 px-2 py-1 rounded">WP: manufacturer</code>
                          </div>
                          <Badge className="bg-blue-500 text-white">91%</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Stage 4: Validation */}
              <TabsContent value="validation">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Stage 4: Validation & Testing
                    </CardTitle>
                    <CardDescription>
                      Ensuring data integrity before going live
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg border">
                      <h4 className="font-semibold mb-3">Quality Assurance Steps:</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-semibold text-sm">Test Write</p>
                            <p className="text-sm text-slate-600">
                              AI creates a sample listing on your website to verify all fields sync correctly
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-semibold text-sm">Data Type Verification</p>
                            <p className="text-sm text-slate-600">
                              Confirms numbers are stored as numbers, dates as dates, currencies with proper formatting
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-semibold text-sm">Image Upload Test</p>
                            <p className="text-sm text-slate-600">
                              Verifies photo gallery integration and media library compatibility
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-semibold text-sm">Rollback Capability</p>
                            <p className="text-sm text-slate-600">
                              Automatically deletes test listing—no mess left behind
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-3">Preview Dashboard</h4>
                      <p className="text-sm text-blue-800 mb-3">
                        Before going live, you see exactly how your listings will appear:
                      </p>
                      <div className="bg-white rounded p-3 text-xs space-y-2 border">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Vessel Name:</span>
                          <span className="font-semibold">Ocean Whisper</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Price:</span>
                          <span className="font-semibold text-green-600">$895,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Length:</span>
                          <span className="font-semibold">50 ft</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Images:</span>
                          <span className="text-sm">✓ 3 photos uploaded</span>
                        </div>
                      </div>
                      <p className="text-xs text-blue-700 mt-3 italic">
                        ✓ All fields validated • Ready to sync
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Stage 5: Sync */}
              <TabsContent value="sync">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-600" />
                      Stage 5: Real-Time Synchronization
                    </CardTitle>
                    <CardDescription>
                      Continuous, bidirectional data sync
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg border">
                      <h4 className="font-semibold mb-3">How Sync Works:</h4>
                      <div className="space-y-4">
                        <div>
                          <p className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <Network className="h-4 w-4" />
                            Webhook-Based Updates
                          </p>
                          <p className="text-sm text-slate-600">
                            When a listing is updated in the API, a webhook instantly notifies your website.
                            Changes appear within 2-5 seconds.
                          </p>
                        </div>

                        <div>
                          <p className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <Workflow className="h-4 w-4" />
                            Smart Conflict Resolution
                          </p>
                          <p className="text-sm text-slate-600">
                            If the same listing is modified in both systems simultaneously, AI determines
                            the most recent change and syncs accordingly.
                          </p>
                        </div>

                        <div>
                          <p className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <Database className="h-4 w-4" />
                            Incremental Sync
                          </p>
                          <p className="text-sm text-slate-600">
                            Only changed fields are updated, not entire listings—saving bandwidth and
                            improving performance.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <h4 className="font-semibold text-yellow-900 mb-3">Performance Metrics:</h4>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-white p-3 rounded">
                          <div className="text-2xl font-bold text-yellow-600">2-5s</div>
                          <div className="text-xs text-slate-600">Sync Latency</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <div className="text-2xl font-bold text-green-600">99.9%</div>
                          <div className="text-xs text-slate-600">Uptime</div>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <div className="text-2xl font-bold text-blue-600">10K+</div>
                          <div className="text-xs text-slate-600">Listings/sec</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-xs">
                      <div className="text-green-400 mb-2">// Webhook Payload Example</div>
                      <pre className="text-slate-300">{`{
  "event": "listing.updated",
  "boat_id": "boat-001",
  "changed_fields": ["price_usd", "location"],
  "new_values": {
    "price_usd": 850000,
    "location": "Newport, RI"
  },
  "timestamp": "2025-12-17T14:35:22Z"
}`}</pre>
                      <div className="text-slate-400 mt-3">→ Your website auto-updates in 3 seconds</div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Supported Platforms & CMSs
              </h2>
              <p className="text-lg text-slate-600">
                Our AI has been trained on 50+ platforms and learns new ones daily
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* WordPress */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">WordPress</CardTitle>
                  <Badge className="w-fit bg-green-500">Tier 1 - Fully Optimized</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <p className="font-semibold">Auto-detects:</p>
                    <ul className="text-slate-600 space-y-1">
                      <li>• Custom Post Types</li>
                      <li>• ACF / Meta Box fields</li>
                      <li>• WooCommerce integration</li>
                      <li>• Yacht/Real Estate plugins</li>
                    </ul>
                    <p className="text-xs text-green-600 pt-2">Setup time: 3-5 minutes</p>
                  </div>
                </CardContent>
              </Card>

              {/* Wix */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Wix</CardTitle>
                  <Badge className="w-fit bg-blue-500">Tier 1 - Fully Optimized</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <p className="font-semibold">Auto-detects:</p>
                    <ul className="text-slate-600 space-y-1">
                      <li>• Wix Data Collections</li>
                      <li>• Dynamic Pages</li>
                      <li>• Field schemas</li>
                      <li>• Media Manager</li>
                    </ul>
                    <p className="text-xs text-blue-600 pt-2">Setup time: 5-7 minutes</p>
                  </div>
                </CardContent>
              </Card>

              {/* Squarespace */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Squarespace</CardTitle>
                  <Badge className="w-fit bg-purple-500">Tier 1 - Fully Optimized</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <p className="font-semibold">Auto-detects:</p>
                    <ul className="text-slate-600 space-y-1">
                      <li>• Collection templates</li>
                      <li>• Custom form fields</li>
                      <li>• Image blocks</li>
                      <li>• Commerce integration</li>
                    </ul>
                    <p className="text-xs text-purple-600 pt-2">Setup time: 5-8 minutes</p>
                  </div>
                </CardContent>
              </Card>

              {/* Webflow */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Webflow</CardTitle>
                  <Badge className="w-fit bg-green-500">Tier 1 - Fully Optimized</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <p className="font-semibold">Auto-detects:</p>
                    <ul className="text-slate-600 space-y-1">
                      <li>• CMS Collections</li>
                      <li>• Reference fields</li>
                      <li>• Multi-image fields</li>
                      <li>• Rich text content</li>
                    </ul>
                    <p className="text-xs text-green-600 pt-2">Setup time: 4-6 minutes</p>
                  </div>
                </CardContent>
              </Card>

              {/* Custom PHP/Laravel */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Custom CMS</CardTitle>
                  <Badge className="w-fit bg-yellow-500">Tier 2 - Universal Support</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <p className="font-semibold">Works with:</p>
                    <ul className="text-slate-600 space-y-1">
                      <li>• Laravel / PHP frameworks</li>
                      <li>• Node.js / Express</li>
                      <li>• Python / Django</li>
                      <li>• Any REST/GraphQL API</li>
                    </ul>
                    <p className="text-xs text-yellow-600 pt-2">Setup time: 8-12 minutes</p>
                  </div>
                </CardContent>
              </Card>

              {/* Other */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">40+ More</CardTitle>
                  <Badge className="w-fit bg-slate-500">Tier 2 - Universal Support</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <p className="font-semibold">Including:</p>
                    <ul className="text-slate-600 space-y-1">
                      <li>• Shopify, BigCommerce</li>
                      <li>• Drupal, Joomla</li>
                      <li>• Ghost, Contentful</li>
                      <li>• Static site generators</li>
                    </ul>
                    <p className="text-xs text-slate-600 pt-2">Contact for specific platform</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Security & Data Protection
              </h2>
              <p className="text-lg text-slate-600">
                Enterprise-grade security at every layer of the integration
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-red-600" />
                    Data Encryption
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• <strong>TLS 1.3</strong> encryption for all data in transit</p>
                  <p>• <strong>AES-256</strong> encryption for credentials at rest</p>
                  <p>• <strong>Zero-knowledge</strong> architecture for API tokens</p>
                  <p>• Credentials stored in secure vault, never logged</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-blue-600" />
                    Infrastructure
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• Hosted on <strong>AWS</strong> with SOC 2 compliance</p>
                  <p>• Redundant backups across 3 regions</p>
                  <p>• DDoS protection and rate limiting</p>
                  <p>• 99.9% uptime SLA with monitoring</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Access Control
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• <strong>IP whitelisting</strong> for API access</p>
                  <p>• JWT tokens with short expiration</p>
                  <p>• Per-broker data isolation</p>
                  <p>• Audit logs for all API calls</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-600" />
                    Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• <strong>GDPR</strong> compliant data handling</p>
                  <p>• <strong>CCPA</strong> privacy protections</p>
                  <p>• Regular security audits</p>
                  <p>• Data deletion on request</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience AI-Powered Integration?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            See how our technology can connect your website to the broker ecosystem in minutes, not weeks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Back to Home
            </a>
            <a
              href="/listings"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors border-2 border-blue-400"
            >
              View Live Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-slate-600 text-sm">
            Broker Listings API Demo - AI-Powered Integration Technology
          </p>
        </div>
      </footer>
    </div>
  );
}
