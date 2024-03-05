"use client";

import { cn } from "@/lib/utils";
import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Timer from "./timer";
import { Input } from "@/components/ui/input";

type TextBlockerProps = {
  id: number;
  text: string;
};

interface BlockableWordProps {
  word: string;
  isBlocked: boolean;
  isTargetWord: boolean;
  toggleBlock: () => void;
}

/* eslint-disable no-useless-escape */
const SPECIAL_CHARS_PATTERN = /[\s,.!?;:'"(){}[\]<>@#$%^&*~`\/\\+=_-]/;

const BlockableWord = ({
  word,
  isBlocked,
  isTargetWord,
  toggleBlock,
}: BlockableWordProps) => {
  const [input, setInput] = useState("");
  const [wrong, setWrong] = useState(false);
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    if (isBlocked) {
      setInput("");
    }
  }, [isBlocked]);

  useEffect(() => {
    if (wrong) {
      setTimeout(() => {
        setWrong(false);
      }, 300);
    }
  }, [wrong]);

  return (
    <>
      <Text
        size="17_regular"
        className={cn(
          "mr-[4px]",
          isBlocked && "cursor-pointer",
          isTargetWord && "text-red-600 font-bold",
          correct && "text-green-600 font-bold",
        )}
      >
        {isBlocked && !correct && (
          <form
            className={`max-w-20`}
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              if (input.toLocaleLowerCase() === word.toLocaleLowerCase()) {
                setCorrect(true);
                toggleBlock();
              } else {
                setWrong(true);
                setInput("");
              }
            }}
          >
            <Input
              className={cn(
                `px-1 py-1 h-6 flex items-center justify-center`,
                wrong && " animate-ping focus-visible:ring-red-600",
              )}
              value={input}
              type="text"
              onChange={e => setInput(e.target.value)}
            />
          </form>
        )}

        {(!isBlocked || correct) && word}
      </Text>
      {word.match(/\./) && (
        <>
          <div className="w-full h-4" />
        </>
      )}
    </>
  );
};

export function TextBlocker({ id, text }: TextBlockerProps) {
  const [hideWords, setHideWords] = useState(false);
  const [blocked, setBlocked] = useState<number[]>([]);
  const [testEnd, setTestEnd] = useState(false);

  // 모든 단어를 분리하고 4자 이상인 단어의 인덱스를 찾음
  const words = text.split(/\s+/);

  const longWordIndices = useMemo(() => {
    return words.reduce((acc: number[], word, index) => {
      if (word.length >= 4 && !SPECIAL_CHARS_PATTERN.test(word))
        acc.push(index);
      return acc;
    }, []);
  }, [words]);

  const cookie = getCookie(`read-${id}`, {
    path: "/",
    secure: true,
    sameSite: "lax",
  });

  const countToBlock = useMemo(() => {
    return Math.ceil(longWordIndices.length * 0.1); // 블록할 단어 수
  }, [longWordIndices]);

  const shuffledAndSelected = useMemo(() => {
    return longWordIndices
      .sort(() => 0.5 - Math.random())
      .slice(0, countToBlock);
  }, [longWordIndices, countToBlock]);

  useEffect(() => {
    if (cookie) {
      setBlocked(cookie.split(",").map(Number));
    } else {
      setBlocked(shuffledAndSelected);
      setCookie(`read-${id}`, shuffledAndSelected, {
        maxAge: 60 * 60 * 24 * 1,
        path: "/",
        secure: true,
        sameSite: "lax",
      });
    }
  }, [id, cookie]);

  const toggleBlock = useMemo(() => {
    return (index: number) => {
      setBlocked(currentBlocked =>
        currentBlocked.includes(index)
          ? currentBlocked.filter(i => i !== index)
          : [...currentBlocked, index],
      );
    };
  }, []);

  const hiddenWords = useMemo(() => {
    return words
      .filter((_, index) => blocked.includes(index))
      .sort(() => 0.5 - Math.random());
  }, [blocked, words]);

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="flex flex-row flex-wrap bg-gray-200 p-4 items-center">
        {words.map((word, index) => (
          <BlockableWord
            key={`${word}-${index}`}
            word={word}
            isBlocked={hideWords ? blocked.includes(index) : false}
            isTargetWord={testEnd && blocked.includes(index)}
            toggleBlock={() => {
              if (hideWords) {
                toggleBlock(index);
              }
            }}
          />
        ))}
      </div>

      <div className="w-full flex items-center justify-center">
        <Button
          onClick={() => setHideWords(!hideWords)}
          fontSize="15_semibold"
          variant="skyblue"
        >
          {hideWords && !!hiddenWords.length && "End"}
          {!hideWords && !testEnd && "Start"}
          {!hideWords && testEnd && "Retry"}
        </Button>
      </div>

      {hideWords && !testEnd && (
        <>
          <Timer
            onEnd={() => {
              setHideWords(false);
              setTestEnd(true);
            }}
          />
          <div className="flex flex-row flex-wrap gap-2 items-center justify-center">
            {hiddenWords.map((word, index) => (
              <Button
                key={`${word}-${index}`}
                variant="outline"
                className="text-gray-600 text-white"
                onClick={() => toggleBlock(words.indexOf(word))}
              >
                {word}
              </Button>
            ))}
          </div>
        </>
      )}

      {hideWords && testEnd && (
        <>
          <Timer
            time={30}
            onEnd={() => {
              setHideWords(false);
              setTestEnd(true);
            }}
          />
          <div className="flex flex-row flex-wrap gap-2 items-center justify-center">
            {hiddenWords.map((word, index) => (
              <Button
                key={`${word}-${index}`}
                variant="outline"
                className="text-gray-600 text-white"
                onClick={() => toggleBlock(words.indexOf(word))}
              >
                {word}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
