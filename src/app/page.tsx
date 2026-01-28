import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Database, Lock, Zap, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section with Background Image */}
      <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523496922380-91d5afba98a3?w=1920&auto=format&fit=crop&q=80"
            alt="Luxury catamaran on turquoise water"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/60"></div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Demo Environment
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              A Shared Listing API for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200">
                Independent Yacht Brokers
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-100 mb-8 max-w-2xl mx-auto drop-shadow">
              Securely publish and consume yacht listings across multiple brokers. One API, infinite possibilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base h-12 px-8 bg-white text-slate-900 hover:bg-slate-100">
                <Link href="/listings">
                  View Listings Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base h-12 px-8 bg-transparent border-2 border-white text-white hover:bg-white/10">
                <Link href="/admin/login">
                  Open Admin Dashboard
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Built By Brokers, For Brokers
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            An industry-owned ecosystem that keeps advertising costs low and data control in your hands
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl">Minimal Cost</CardTitle>
              <CardDescription className="text-base">
                Industry-owned means dramatically lower costs. Pay $200/month for up to 20 boats, then just $10 per additional boat.
                No lengthy contracts—just simple monthly billing in advance. Commercial feeds charge $2,000+/month with annual commitments. Reduce advertising costs by up to 90%.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl">Data Ownership</CardTitle>
              <CardDescription className="text-base">
                Your listings, your data, your control. Update, modify, or remove listings anytime with secure
                API access and IP whitelisting.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl">Maximum Reach</CardTitle>
              <CardDescription className="text-base">
                One API connection distributes to all participating platforms. No more paying separate fees
                to each listing site and portal.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* The Problem */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                The Rising Cost Problem
              </h2>
              <p className="text-xl text-slate-300">
                Independent yacht brokers are facing an unsustainable burden
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-4xl mb-3">📈</div>
                <h3 className="text-xl font-semibold mb-3">Escalating Feed Costs</h3>
                <p className="text-slate-300">
                  Commercial API providers are charging thousands of dollars per month for yacht listing feeds, pricing out independent brokers who can't afford enterprise-level contracts.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-4xl mb-3">🔒</div>
                <h3 className="text-xl font-semibold mb-3">Vendor Lock-In</h3>
                <p className="text-slate-300">
                  Proprietary systems force brokers into expensive annual contracts with auto-renewal clauses and early termination fees.
                  Limited control over your own listing data and how it's distributed—trapped by lengthy agreements.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-4xl mb-3">💸</div>
                <h3 className="text-xl font-semibold mb-3">Duplicated Fees</h3>
                <p className="text-slate-300">
                  To reach multiple platforms, brokers must pay separate fees to each listing site, MLS system, and syndication service—multiplying their monthly costs.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-4xl mb-3">⚖️</div>
                <h3 className="text-xl font-semibold mb-3">Unfair Competition</h3>
                <p className="text-slate-300">
                  Large brokerage firms can afford premium distribution, while independent brokers struggle to compete, creating an uneven playing field in the market.
                </p>
              </div>
            </div>

            <div className="text-center bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-lg p-6">
              <p className="text-lg font-semibold text-red-200">
                Result: Independent brokers spend more on advertising technology than on actually selling boats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              THE SOLUTION
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              An Industry-Owned API Ecosystem
            </h2>
            <p className="text-xl text-slate-600">
              An industry-standard API feed owned and operated by the brokers themselves—
              keeping costs at cost and control in your hands.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-green-500">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Industry Owned</h3>
              <p className="text-slate-600">
                Governed by brokers, for brokers. Industry-owned infrastructure means fees only cover operational costs—typically <strong>90% less</strong> than commercial providers.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-blue-500">
              <div className="text-4xl mb-3">📜</div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Open Standard</h3>
              <p className="text-slate-600">
                One feed, unlimited distribution. Publish once to reach yacht portals, broker websites, mobile apps, and CRMs—all from a single API connection.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-purple-500">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Level Playing Field</h3>
              <p className="text-slate-600">
                Small independent brokers get the same distribution power as large firms—no premium tiers, no special treatment, just fair access for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Expanded */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-center text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
              A simple, secure workflow that puts independent brokers in control of their listings
              while minimizing costs and maximizing reach.
            </p>

            <div className="space-y-8 mb-12">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center text-2xl font-bold">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3 text-slate-900">Brokers Publish Listings</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    Independent brokers authenticate using secure API credentials (JWT tokens with IP whitelisting)
                    and publish their yacht listings to the shared ecosystem. Each broker maintains complete ownership
                    and control of their data—you can update, modify, or remove listings at any time.
                  </p>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <p className="text-sm font-semibold text-slate-700 mb-2">Cost Savings:</p>
                    <p className="text-sm text-slate-600">
                      Instead of paying $500-2,000/month per platform, brokers pay
                      <strong className="text-green-600"> $200/month for up to 20 boats</strong>, then just
                      <strong className="text-green-600"> $10 per additional boat</strong> to publish to the entire ecosystem.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center text-2xl font-bold">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3 text-slate-900">API Validates & Distributes</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    The industry-standard API validates incoming listings for data quality, ensures proper formatting,
                    and securely distributes them across the ecosystem. All participating platforms—yacht portals,
                    aggregator sites, mobile apps, and broker websites—have equal access to the same feed.
                  </p>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <p className="text-sm font-semibold text-slate-700 mb-2">Industry Standard + AI Integration:</p>
                    <p className="text-sm text-slate-600">
                      Standardized data format means you don't need custom integrations for each platform.
                      Our AI technology automatically maps API fields to WordPress and any hosting environment—setup in minutes, not days.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center text-2xl font-bold">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3 text-slate-900">Everyone Benefits</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    Consumers discover listings across multiple platforms—broker websites, yacht search portals,
                    mobile apps, and CRM systems—all pulling from the same trusted source. Brokers get maximum exposure
                    without paying separate fees to each platform. The industry saves millions collectively.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm font-semibold text-green-800 mb-2">Real Impact:</p>
                    <p className="text-sm text-green-700">
                      An independent broker with 20 listings pays just
                      <strong> $2,400/year</strong> (shared ecosystem) vs.
                      <strong> $24,000+/year</strong> (multiple commercial feeds)—a <strong>90% savings</strong>.
                      Brokers with 30 boats pay $3,600/year, still saving over 85%.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ecosystem Benefits */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 text-center">Why Industry Ownership Matters</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-slate-200">Cost-Based Pricing</h4>
                  <p className="text-sm text-slate-300">
                    Fees only cover server costs, maintenance, and security.
                    Industry-owned infrastructure keeps costs minimal.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-slate-200">Broker Governance</h4>
                  <p className="text-sm text-slate-300">
                    Industry committee sets policies, pricing, and standards.
                    Decisions made by brokers who understand the market.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-slate-200">Transparent Pricing</h4>
                  <p className="text-sm text-slate-300">
                    $200/month for 20 boats, $10 per additional boat.
                    Simple month-to-month billing in advance—no lengthy contracts, no cancellation fees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                No Lengthy Contracts • Month-to-Month Billing
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-slate-600 mb-2">
                No hidden fees. Just cost-based pricing that scales with your business.
              </p>
              <p className="text-lg text-slate-600">
                Pay monthly in advance. Cancel anytime with no penalties.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Basic Tier */}
              <Card className="border-2 border-green-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-sm font-semibold">
                  MOST POPULAR
                </div>
                <CardHeader className="pt-8">
                  <CardTitle className="text-2xl mb-2">Basic Membership</CardTitle>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-slate-900">$200</span>
                    <span className="text-slate-600 text-lg">/month</span>
                  </div>
                  <CardDescription className="text-base">
                    Perfect for independent brokers and small agencies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-slate-700"><strong>Up to 20 boat listings</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-slate-700">Full API access with documentation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-slate-700">Secure IP whitelisting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-slate-700">Unlimited distribution to all platforms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-slate-700">Real-time listing updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-slate-700">7-day-a-week technical support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-slate-700"><strong>No lengthy contracts</strong> - cancel anytime</span>
                    </li>
                  </ul>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-green-800">
                      <strong>Annual cost: $2,400</strong> vs. $24,000+ with commercial providers
                    </p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-purple-800">
                      <strong>Simple Monthly Billing:</strong> Pay monthly in advance. No annual contracts, no cancellation fees, no vendor lock-in.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-blue-600">+</span>
                      <p className="text-sm font-semibold text-blue-900">Optional Add-On</p>
                    </div>
                    <p className="text-sm text-blue-800">
                      <strong>Developer Support & Installation:</strong> $25/hour for custom integration assistance,
                      API setup, and technical implementation help
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Scale Tier */}
              <Card className="border-2 border-blue-500">
                <CardHeader>
                  <CardTitle className="text-2xl mb-2">Scale as You Grow</CardTitle>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-slate-900">$10</span>
                    <span className="text-slate-600 text-lg">/boat/month</span>
                  </div>
                  <CardDescription className="text-base">
                    For brokers with larger inventories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span className="text-slate-700"><strong>Every boat over 20 listings</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span className="text-slate-700">All Basic Membership features included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span className="text-slate-700">No volume limits or caps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span className="text-slate-700">7-day-a-week technical support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span className="text-slate-700">Priority support for high-volume brokers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span className="text-slate-700"><strong>No contracts</strong> - month-to-month billing</span>
                    </li>
                  </ul>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
                    <p className="text-sm font-semibold text-slate-700 mb-2">Pricing Examples:</p>
                    <div className="space-y-1 text-sm text-slate-600">
                      <p><strong>25 boats:</strong> $200 + (5 × $10) = $250/month</p>
                      <p><strong>30 boats:</strong> $200 + (10 × $10) = $300/month</p>
                      <p><strong>50 boats:</strong> $200 + (30 × $10) = $500/month</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Still 75-85% cheaper</strong> than commercial alternatives at any scale
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Optional Add-Ons */}
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-purple-600">⚙️</span>
                  Optional Developer Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-slate-900">Installation & Integration Support</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-purple-600 mt-1">✓</span>
                        <div>
                          <p className="font-medium text-slate-900">API Setup Assistance</p>
                          <p className="text-sm text-slate-600">Help getting your first API connection configured</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-purple-600 mt-1">✓</span>
                        <div>
                          <p className="font-medium text-slate-900">Custom Integration</p>
                          <p className="text-sm text-slate-600">Integration with your existing website or CRM system</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-purple-600 mt-1">✓</span>
                        <div>
                          <p className="font-medium text-slate-900">Technical Troubleshooting</p>
                          <p className="text-sm text-slate-600">Debug API issues or data formatting problems</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-purple-600 mt-1">✓</span>
                        <div>
                          <p className="font-medium text-slate-900">Code Examples & Training</p>
                          <p className="text-sm text-slate-600">Custom code samples for your specific use case</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-6 border border-purple-200">
                    <div className="mb-4">
                      <p className="text-4xl font-bold text-purple-600 mb-1">$25</p>
                      <p className="text-slate-600">per hour</p>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-slate-600">Minimum:</span>
                        <span className="font-semibold">1 hour</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-slate-600">Billing:</span>
                        <span className="font-semibold">Hourly, billed after work</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-slate-600">Availability:</span>
                        <span className="font-semibold">7 days a week</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-slate-600">Response Time:</span>
                        <span className="font-semibold">Same or next business day</span>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t">
                      <p className="text-xs text-slate-600 italic">
                        Most brokers complete their integration without developer support,
                        but we're here if you need us!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comparison Table */}
            <Card>
              <CardHeader>
                <CardTitle>Compare to Commercial Providers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Inventory Size</th>
                        <th className="text-right py-3 px-4">Broker Listings API</th>
                        <th className="text-right py-3 px-4">Commercial Providers</th>
                        <th className="text-right py-3 px-4 text-green-600">Savings</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">10 boats</td>
                        <td className="text-right py-3 px-4 font-semibold">$200/mo</td>
                        <td className="text-right py-3 px-4">$2,000+/mo</td>
                        <td className="text-right py-3 px-4 text-green-600 font-semibold">90%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">20 boats</td>
                        <td className="text-right py-3 px-4 font-semibold">$200/mo</td>
                        <td className="text-right py-3 px-4">$2,500+/mo</td>
                        <td className="text-right py-3 px-4 text-green-600 font-semibold">92%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">30 boats</td>
                        <td className="text-right py-3 px-4 font-semibold">$300/mo</td>
                        <td className="text-right py-3 px-4">$3,000+/mo</td>
                        <td className="text-right py-3 px-4 text-green-600 font-semibold">90%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">50 boats</td>
                        <td className="text-right py-3 px-4 font-semibold">$500/mo</td>
                        <td className="text-right py-3 px-4">$4,000+/mo</td>
                        <td className="text-right py-3 px-4 text-green-600 font-semibold">87.5%</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">100 boats</td>
                        <td className="text-right py-3 px-4 font-semibold">$1,000/mo</td>
                        <td className="text-right py-3 px-4">$6,000+/mo</td>
                        <td className="text-right py-3 px-4 text-green-600 font-semibold">83%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-500 mt-4 text-center">
                  * Commercial provider pricing based on industry averages for similar API feeds and listing distribution services
                </p>
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📋</span>
                    <div>
                      <h4 className="font-semibold text-purple-900 mb-2">Contract Comparison</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-green-700 mb-1">✓ Broker Listings API</p>
                          <ul className="space-y-1 text-slate-700">
                            <li>• Month-to-month billing</li>
                            <li>• Pay monthly in advance</li>
                            <li>• Cancel anytime, no penalties</li>
                            <li>• No lengthy contracts to sign</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-red-700 mb-1">✗ Commercial Providers</p>
                          <ul className="space-y-1 text-slate-700">
                            <li>• Annual contracts required</li>
                            <li>• Early termination fees</li>
                            <li>• Auto-renewal clauses</li>
                            <li>• Vendor lock-in tactics</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Technology & Future Products */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Powered by AI • Built for the Future
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Intelligent Integration & Scalability
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Cutting-edge AI technology makes integration effortless, and our product roadmap
                ensures the platform evolves with your needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* AI-Powered Integration */}
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <CardTitle className="text-xl mb-2">AI-Powered Field Matching</CardTitle>
                  <CardDescription className="text-base text-slate-700">
                    Latest AI technology automatically matches API fields to your existing systems
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-blue-600 mt-1">✓</span>
                      <div>
                        <p className="font-semibold text-slate-900">WordPress Integration</p>
                        <p className="text-sm text-slate-600">Automatic field mapping to WordPress custom post types and plugins</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-blue-600 mt-1">✓</span>
                      <div>
                        <p className="font-semibold text-slate-900">Any Hosting Environment</p>
                        <p className="text-sm text-slate-600">Adapts to Wix, Squarespace, custom CMS, or any website platform</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-blue-600 mt-1">✓</span>
                      <div>
                        <p className="font-semibold text-slate-900">Intelligent Data Mapping</p>
                        <p className="text-sm text-slate-600">AI learns your schema and automatically syncs listing details</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-blue-600 mt-1">✓</span>
                      <div>
                        <p className="font-semibold text-slate-900">Fully Scalable</p>
                        <p className="text-sm text-slate-600">Handles 10 listings or 10,000 with the same ease</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
                    <p className="text-sm text-blue-900">
                      <strong>Zero Manual Configuration:</strong> Just connect your website, and our AI does the rest.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Products in Pipeline */}
              <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <CardTitle className="text-xl mb-2">New Products in Pipeline</CardTitle>
                  <CardDescription className="text-base text-slate-700">
                    Exciting features coming soon to transform how you manage listings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <div className="flex items-start gap-3 mb-2">
                        <span className="text-2xl">📱</span>
                        <div>
                          <h4 className="font-semibold text-slate-900">Branded Vendor Apps</h4>
                          <p className="text-sm text-slate-600 mt-1">
                            White-label mobile apps with your branding for seamless listing integration.
                            Sync directly from the field to your inventory.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <div className="flex items-start gap-3 mb-2">
                        <span className="text-2xl">👥</span>
                        <div>
                          <h4 className="font-semibold text-slate-900">Client Data Capture</h4>
                          <p className="text-sm text-slate-600 mt-1">
                            Advanced lead capture and client tracking integrated directly into listing feeds.
                            Know who's viewing what, in real-time.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                      <div className="flex items-start gap-3 mb-2">
                        <span className="text-2xl">✍️</span>
                        <div>
                          <h4 className="font-semibold text-slate-900">Direct Client Listing Submission</h4>
                          <p className="text-sm text-slate-600 mt-1">
                            Boat owners submit listings directly to the portal. Brokers review and authorize
                            drafts before publication—streamlining acquisition workflow.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 rounded-lg">
                    <p className="text-sm text-purple-900">
                      <strong>Early Access:</strong> Existing members get priority access to all new features at no additional cost.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Integration Process */}
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-center mb-2">How AI-Powered Integration Works</CardTitle>
                <CardDescription className="text-slate-300 text-center text-lg">
                  From API connection to live listings in minutes, not days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                      1
                    </div>
                    <h4 className="font-semibold mb-2">Connect Your Site</h4>
                    <p className="text-sm text-slate-300">
                      Provide your website URL and credentials. Works with WordPress, custom CMS, or any platform.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                      2
                    </div>
                    <h4 className="font-semibold mb-2">AI Analyzes Schema</h4>
                    <p className="text-sm text-slate-300">
                      Our AI automatically detects your data structure and creates intelligent field mappings.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                      3
                    </div>
                    <h4 className="font-semibold mb-2">Review & Approve</h4>
                    <p className="text-sm text-slate-300">
                      Preview the mapping in seconds. Adjust if needed, or approve with one click.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                      4
                    </div>
                    <h4 className="font-semibold mb-2">Go Live</h4>
                    <p className="text-sm text-slate-300">
                      Listings automatically sync to your website. Updates in real-time, no manual work required.
                    </p>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <p className="text-slate-200 text-lg">
                    <strong>Average Setup Time:</strong> <span className="text-green-400">5-10 minutes</span> vs.
                    <span className="text-red-400"> days or weeks</span> with traditional integrations
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-3xl mx-auto bg-gradient-to-br from-slate-900 to-slate-700 border-0 text-white">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl mb-2">Ready to Explore?</CardTitle>
            <CardDescription className="text-slate-300 text-lg">
              This is a fully functional demo. Try the admin dashboard or browse listings.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-base">
              <Link href="/listings">
                Browse Listings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base bg-transparent border-white text-white hover:bg-white/10">
              <Link href="/admin/login">
                Admin Dashboard
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-slate-600 text-sm">
            Broker Listings API Demo - A demonstration of a shared yacht listing ecosystem
          </p>
        </div>
      </footer>
    </div>
  );
}
