import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    ArrowRight,
    Code,
    Globe,
    Zap,
    Shield,
    Clock,
    Puzzle,
} from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <header className="container mx-auto px-4 py-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Code className="h-8 w-8 text-blue-400" />
                    <span className="text-2xl font-bold">CodeScout</span>
                    <span>by tiotievry</span>
                </div>
                <nav className="hidden md:flex space-x-6">
                    <a
                        href="#features"
                        className="hover:text-blue-400 transition-colors"
                    >
                        Features
                    </a>
                    <a
                        href="#demo"
                        className="hover:text-blue-400 transition-colors"
                    >
                        Demo
                    </a>
                    <a
                        href="#pricing"
                        className="hover:text-blue-400 transition-colors"
                    >
                        Pricing
                    </a>
                </nav>
                <Button variant="outline" className="hidden md:inline-flex">
                    Get Started
                </Button>
            </header>

            <main className="flex-grow container mx-auto px-4 py-12">
                <section className="text-center mb-20">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Revolutionize Your Code Search
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                        CodeScout uses advanced NLP and RAG architecture to
                        transform how you search and retrieve code. Ask
                        naturally, get precise results.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                        <Input
                            className="max-w-md bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                            placeholder="Ask CodeScout anything..."
                        />
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            Search Code <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </section>

                <section
                    id="features"
                    className="grid md:grid-cols-3 gap-8 mb-20"
                >
                    <FeatureCard
                        icon={<Globe className="h-10 w-10 text-blue-400" />}
                        title="Multi-Language Support"
                        description="From C++ to Python, JavaScript to Go, CodeScout speaks your language."
                    />
                    <FeatureCard
                        icon={<Zap className="h-10 w-10 text-yellow-400" />}
                        title="Real-Time Responsiveness"
                        description="Get immediate feedback while longer tasks process in the background."
                    />
                    <FeatureCard
                        icon={<Shield className="h-10 w-10 text-green-400" />}
                        title="Custom Guidelines"
                        description="Ensure all code aligns with your organization's standards and practices."
                    />
                    <FeatureCard
                        icon={<Clock className="h-10 w-10 text-purple-400" />}
                        title="Smart Code Search"
                        description="Use natural language to find specific snippets, functions, or implementations."
                    />
                    <FeatureCard
                        icon={<Code className="h-10 w-10 text-red-400" />}
                        title="Regex Matching"
                        description="Search your entire repository using powerful regex patterns."
                    />
                    <FeatureCard
                        icon={<Puzzle className="h-10 w-10 text-orange-400" />}
                        title="Simple Integration"
                        description="Seamlessly integrates into your existing development workflows and tools."
                    />
                </section>

                <section id="demo" className="mb-20">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        See CodeScout in Action
                    </h2>
                    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                        <div className="flex items-center mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <pre className="text-sm overflow-x-auto">
                            <code>{`> CodeScout, find me a function to calculate Fibonacci numbers in Python

Searching repository for Fibonacci function in Python...

Found the following code snippet:

def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# Example usage:
for i in range(10):
    print(fibonacci(i))

This recursive function calculates Fibonacci numbers efficiently.
Would you like me to explain the code or find alternative implementations?`}</code>
                        </pre>
                    </div>
                </section>

                <section id="pricing" className="text-center">
                    <h2 className="text-3xl font-bold mb-6">Pricing Plans</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <PricingCard
                            title="Starter"
                            price="$49"
                            period="per month"
                            features={[
                                "Up to 5 users",
                                "10,000 queries/month",
                                "Basic support",
                            ]}
                        />
                        <PricingCard
                            title="Pro"
                            price="$99"
                            period="per month"
                            features={[
                                "Up to 20 users",
                                "50,000 queries/month",
                                "Priority support",
                                "Custom integrations",
                            ]}
                            highlighted={true}
                        />
                        <PricingCard
                            title="Enterprise"
                            price="Custom"
                            period="contact us"
                            features={[
                                "Unlimited users",
                                "Unlimited queries",
                                "24/7 support",
                                "Dedicated account manager",
                            ]}
                        />
                    </div>
                </section>
            </main>

            <footer className="bg-gray-900 py-8">
                <div className="container mx-auto px-4 text-center text-gray-400">
                    <p>&copy; 2024 CodeScout. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg transition-transform hover:scale-105">
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-300">{description}</p>
        </div>
    );
}

function PricingCard({ title, price, period, features, highlighted = false }) {
    return (
        <div
            className={`bg-gray-800 rounded-lg p-6 shadow-lg ${
                highlighted
                    ? "border-2 border-blue-500 transform scale-105"
                    : ""
            }`}
        >
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <div className="text-4xl font-bold mb-2">{price}</div>
            <div className="text-gray-400 mb-6">{period}</div>
            <ul className="text-left mb-6">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center mb-2">
                        <ArrowRight className="h-4 w-4 mr-2 text-blue-400" />
                        {feature}
                    </li>
                ))}
            </ul>
            <Button
                className={`w-full ${
                    highlighted
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-700 hover:bg-gray-600"
                }`}
            >
                Choose Plan
            </Button>
        </div>
    );
}
