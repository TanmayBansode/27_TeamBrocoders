import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const suggestedQueries = [
    "How do I create a React component?",
    "Explain async/await in JavaScript",
    "What's the difference between let and const?",
    "Show me how to use map in Python",
];

const Suggestions = ({ setInput }: { setInput: (value: string) => void }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-medium">
                    Suggested Queries
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-2">
                    {suggestedQueries.map((query, index) => (
                        <span
                            onClick={() => setInput(query)}
                            key={index}
                            className="p-2 rounded-md border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-xl"
                        >
                            {query}
                        </span>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default Suggestions;
