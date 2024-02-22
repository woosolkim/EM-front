"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useState } from "react";
import { getCookie, setCookie } from "cookies-next";

type TextBlockerProps = {
  id: number;
  text: string;
};

interface BlockableWordProps {
  word: string;
  isBlocked: boolean;
  toggleBlock: () => void;
}

const BlockableWord = ({
  word,
  isBlocked,
  toggleBlock,
}: BlockableWordProps) => {
  return (
    <span onClick={toggleBlock} className={cn("mr-[5px] cursor-pointer")}>
      {isBlocked ? (
        <div className="flex flex-row">
          {Array.from({ length: word.length }, (_, index) => (
            <span
              key={index}
              className="bg-gray-300 w-2 h-6 border-r border-black"
            />
          ))}
        </div>
      ) : (
        word
      )}
    </span>
  );
};

export function TextBlocker({ id, text }: TextBlockerProps) {
  const [blockSwitch, setBlockSwitch] = useState(false);
  const [blocked, setBlocked] = useState<number[]>([]);

  // 모든 단어를 분리하고 4자 이상인 단어의 인덱스를 찾음
  const words = text.split(/\s+/);

  const longWordIndices = useMemo(() => {
    return words.reduce((acc: number[], word, index) => {
      if (word.length >= 4) acc.push(index);
      return acc;
    }, []);
  }, [words]);

  const cookie = getCookie(`read-${id}`, {
    path: "/",
    secure: true,
    sameSite: "lax",
  });

  const countToBlock = Math.ceil(longWordIndices.length * 0.1); // 블록할 단어 수

  const shuffled = useMemo(() => {
    return longWordIndices.sort(() => 0.5 - Math.random());
  }, [longWordIndices]);

  const selected = useMemo(() => {
    return shuffled.slice(0, countToBlock);
  }, [shuffled, countToBlock]);

  useEffect(() => {
    if (cookie) {
      setBlocked(cookie.split(",").map(Number));
    } else {
      setBlocked(selected);
      setCookie(`read-${id}`, selected, {
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
    return words.filter((_, index) => blocked.includes(index));
  }, [blocked, words]);

  return (
    <div>
      <button
        className="px-4 py-3 rounded-md bg-green-800 text-lime-400"
        onClick={() => setBlockSwitch(!blockSwitch)}
      >
        감추기
      </button>
      <div className="flex flex-row flex-wrap">
        {words.map((word, index) => (
          <BlockableWord
            key={`${word}-${index}`}
            word={word}
            isBlocked={blockSwitch ? blocked.includes(index) : false}
            toggleBlock={() => {
              if (blockSwitch) {
                toggleBlock(index);
              }
            }}
          />
        ))}
      </div>

      <div className="mt-10 flex flex-col flex-wrap gap-2 items-center justify-center">
        {hiddenWords.map((word, index) => (
          <span key={index} className="border border-black p-2">
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
