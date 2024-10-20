import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaCode, FaGithub } from "react-icons/fa";
import { MdOutlineAdd } from "react-icons/md";
import { Message, CodeSnippet } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FaCodeCompare } from "react-icons/fa6";


const Messages = ({
    messages,
    compareList,
    setCompareList,
    setSelectedSnippet,
    assistantMessage,
}: {
    messages: Message[];
    compareList: CodeSnippet[];
    setCompareList: (arg0: CodeSnippet[]) => void;
    setSelectedSnippet: (arg0: CodeSnippet) => void;
    assistantMessage: Message;
}) => {
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const addToCompare = (index: number, action: boolean) => {
        if (!assistantMessage.codeSnippets) return;
        const snippet = assistantMessage.codeSnippets[index];

        if (action) {
            setCompareList([...compareList, snippet]);
            snippet.compareList = true;
        } else {
            const newCompareList = compareList.filter(
                (item) => item !== snippet
            );
            setCompareList(newCompareList);
            snippet.compareList = false;
        }
    };

    const onLike = () => {
        setLike(true);
        setDislike(false);
    };

    const onDislike = () => {
        setDislike(true);
        setLike(false);
    };

    return messages.map((message, index) => (
        <div
            key={index}
            className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
            }`}
        >
            <Card
                className={`max-w-[70%] ${
                    message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : ""
                }`}
            >
                <CardContent className="p-3">
                    <p className="mb-2">{message.content}</p>
                    {message.codeSnippets && (
                        <>
                            <div className="mt-4 space-y-4">
                                {message.codeSnippets.map(
                                    (snippet, snippetIndex) => (
                                        <Card
                                            key={snippetIndex}
                                            className="bg-muted"
                                        >
                                            <CardHeader className="p-3 d-flex justify-content-between">
                                                <div className="col-lg-4">
                                                    <p>
                                                        Code Version{" "}
                                                        {snippetIndex + 1}
                                                    </p>
                                                </div>
                                                <div className="col-lg-1">
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        onClick={() =>
                                                            setSelectedSnippet(
                                                                snippet
                                                            )
                                                        }
                                                        className="bg-border"
                                                    >
                                                        <FaCode />
                                                    </Button>

                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        className="bg-border mx-2"
                                                    >
                                                        <FaGithub />
                                                    </Button>

                                                    {snippet.compareList ? (
                                                        <Button
                                                            variant="secondary"
                                                            size="sm"
                                                            onClick={() =>
                                                                addToCompare(
                                                                    snippetIndex,
                                                                    false
                                                                )
                                                            }
                                                            className="bg-border"
                                                        >
                                                            <FaCodeCompare />
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            variant="secondary"
                                                            size="sm"
                                                            onClick={() =>
                                                                addToCompare(
                                                                    snippetIndex,
                                                                    true
                                                                )
                                                            }
                                                            className="bg-border"
                                                        >
                                                            <MdOutlineAdd />
                                                        </Button>
                                                    )}
                                                </div>
                                            </CardHeader>
                                        </Card>
                                    )
                                )}
                            </div>

                            <div className="relative bottom-0 left-0 mt-4 flex space-x-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={onLike}
                                    aria-label="Like"
                                    className={
                                        like
                                            ? "bg-green-100"
                                            : "text-green-500 hover:text-green-600 hover:bg-green-100"
                                    }
                                >
                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                    Like
                                </Button>

                                <Dialog>
                                    <DialogTrigger>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={onDislike}
                                            aria-label="Dislike"
                                            className={
                                                dislike
                                                    ? "bg-red-100"
                                                    : "text-red-500 hover:text-red-600 hover:bg-red-100"
                                            }
                                        >
                                            <ThumbsDown className="h-4 w-4 mr-1" />
                                            Dislike
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Reason</DialogTitle>
                                            <DialogDescription>
                                                <Input
                                                    className="mt-4"
                                                    type="textarea"
                                                    placeholder="Response is not adhering to coding standards"
                                                />
                                                <Button
                                                    className="mt-4"
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    Submit
                                                </Button>
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    ));
};

export default Messages;
