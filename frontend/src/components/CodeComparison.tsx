// Code Comparison Component
import type { CodeSnippet } from "@/lib/types";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const CodeComparison = ({
    compareList,
    setCompareWindow,
    setSelectedSnippet,
}: {
    compareList: CodeSnippet[];
    setCompareWindow: (arg0: boolean) => void;
    setSelectedSnippet: (arg0: CodeSnippet) => void;
}) => {
    return (
        <div className="w-1/2 border-l border-gray-200 dark:border-gray-700 p-6 overflow-y-auto bg-white dark:bg-gray-800">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Code Comparison
                </h3>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCompareWindow(false)}
                    aria-label="Close comparison window"
                >
                    <X className="h-5 w-5" />
                </Button>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            Differences Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            The main differences are in the function
                            implementations and variable naming conventions.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            Recommended Action
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            Based on the analysis, we recommend using Code 2 as
                            it provides better performance and follows the
                            project&apos;s coding standards more closely.
                        </p>
                        <div className="flex space-x-4">
                            <Button
                                variant="default"
                                onClick={() => {
                                    setSelectedSnippet(compareList[1]);
                                    setCompareWindow(false);
                                }}
                            >
                                Use Code 2
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSelectedSnippet(compareList[0]);
                                    setCompareWindow(false);
                                }}
                            >
                                Keep Code 1
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CodeComparison;
