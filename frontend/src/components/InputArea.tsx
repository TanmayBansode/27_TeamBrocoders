import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
const InputArea = ({
    handleSubmit,
    input,
    setInput,
    loading,
}: {
    handleSubmit: (e: React.FormEvent) => void;
    input: string;
    setInput: (value: string) => void;
    loading: boolean;
}) => {
    return (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <form onSubmit={handleSubmit} className="flex space-x-2">
                <div className="flex-1 relative">
                    <Input
                        type="text"
                        placeholder="Ask for code examples or explanations..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="text-2xl h-12"
                        maxLength={500}
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
                        {input.length}/500
                    </span>
                </div>
                <Button type="submit" disabled={loading} className="h-12">
                    <Send className="h-4 w-4 mr-2" />
                    Send
                </Button>
            </form>
        </div>
    );
};

export default InputArea;
