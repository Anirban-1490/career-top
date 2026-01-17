import { AIEnhancer } from "@/action/ai";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";

import React, { PropsWithChildren, useEffect, useState } from "react";
import { ContainerWithSpinner } from "../container-with-spinner";
import { Parser } from "html-to-react";
import { RefreshCcw } from "lucide-react";

interface AIDialogProps {
  description: string;
  addAIEnhancedDescription?: (enhancedText: string) => void;
  setText?: (value: string) => void;
}

export function AIDialog({
  children,
  description,
  addAIEnhancedDescription,
}: AIDialogProps & PropsWithChildren) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-[40rem]">
        <AIDialogInner
          setOpen={setOpen}
          description={description}
          addAIEnhancedDescription={addAIEnhancedDescription}
        />
      </DialogContent>
    </Dialog>
  );
}

function AIDialogInner({
  description,
  setOpen,
  addAIEnhancedDescription,
}: AIDialogProps & {
  setOpen: (value: boolean) => void;
}) {
  const [text, setText] = useState("");

  const { isFetching, data, refetch } = useQuery({
    queryKey: ["ai-enchancer"],
    queryFn: async () => AIEnhancer(description),
    refetchOnWindowFocus: false,

    gcTime: 0,
  });
  const enhancedText = data?.aiResponse?.enhancedText;

  useEffect(() => {
    if (enhancedText) {
      setText?.(enhancedText as string);
    }
  }, [enhancedText, setText]);

  return (
    <>
      <DialogHeader>
        <DialogTitle>AI Enhancer</DialogTitle>
        <DialogDescription>
          Use our AI agent to improve your resume content into next level
        </DialogDescription>
      </DialogHeader>
      <div
        id="ai-dialog-output"
        className=" w-full h-70 border border-input-outline rounded-md overflow-auto p-4 flex flex-col"
      >
        {isFetching && (
          <ContainerWithSpinner loadingLabel={"Improving with AI..."} />
        )}
        {!isFetching && data?.message ? (
          <div className="mt-auto text-center">{data.message}</div>
        ) : (
          <div className=" list-disc ">{Parser().parse(enhancedText)}</div>
        )}
      </div>
      <div className="flex justify-end items-center gap-3">
        <Button
          onClick={() => {
            if (isFetching) return;
            refetch();
          }}
          disabled={isFetching || data?.rateLimit?.hasExceededRateLimit}
          aria-disabled={isFetching || data?.rateLimit?.hasExceededRateLimit}
          variant={"ghost"}
          size={"lg"}
          className="w-fit h-fit !p-0 disabled:cursor-not-allowed"
        >
          {" "}
          <RefreshCcw className=" size-5" />
        </Button>
        <span>
          Re-Enhance Left: {data?.rateLimit?.remaining}/
          {data?.rateLimit?.maxToken}
        </span>
      </div>
      <DialogFooter className="mt-5">
        <DialogClose asChild>
          <Button size={"sm"} variant={"ghost"} type="button">
            Close
          </Button>
        </DialogClose>
        <Button
          onClick={() => {
            if (isFetching || data?.message) return;
            addAIEnhancedDescription?.(text);
            setOpen(false);
          }}
          size={"sm"}
          disabled={isFetching || !!data?.message}
          type="button"
        >
          Add To Resume
        </Button>
      </DialogFooter>
    </>
  );
}
