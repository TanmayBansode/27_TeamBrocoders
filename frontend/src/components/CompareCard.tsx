import type { CodeSnippet } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";

const CompareCard = ({
    compareList,
    setCompareWindow,
}: {
    compareList: CodeSnippet[];
    setCompareWindow: (arg0: boolean) => void;
}) => {
    const handleCompare = () => {
        setCompareWindow(true);
    };
    return (
        <>
            {compareList.length > 1 && (
                <CardContent>
                    <div className="grid grid-cols-4 gap-2">
                        <Button
                            variant="outline"
                            className="justify-start"
                            onClick={() => handleCompare()}
                        >
                            Compare Selected Codes
                        </Button>
                    </div>
                </CardContent>
            )}
        </>
    );
};

export default CompareCard;
