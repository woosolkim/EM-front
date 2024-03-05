"use client";

import { useEffect, useState } from "react";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

type Props = {
  time?: number;
  onEnd: () => void;
};

export default function Timer({ time, onEnd }: Props) {
  const [timeLeft, setTimeLeft] = useState(time ?? 180);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      onEnd();
    }
  }, [timeLeft, onEnd]);

  return (
    <div className="flex flex-row gap-4 items-center justify-center">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setTimeLeft(timeLeft - 10)}
      >
        -10 sec
      </Button>
      <Text size="17_bold">
        {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
      </Text>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setTimeLeft(timeLeft + 10)}
      >
        +10 sec
      </Button>
    </div>
  );
}
