import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { HelpCircle, Trash2 } from "lucide-react";

const HeaderComponent = ({ clearChat }: { clearChat: () => void }) => {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Natural Language Search
            </h1>
            <div className="flex flex-row gap-2">
                <Button variant="outline" size="icon" className="h-12 w-12">
                    <HelpCircle className="h-4 w-4" />
                </Button>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="destructive"
                                className="h-12"
                                onClick={clearChat}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Clear chat</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </header>
    );
};

export default HeaderComponent;
