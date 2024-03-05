"use client";

import { useEffect, useState } from "react";
import { Text } from "@/components/ui/text";

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  return (
    <Text size="17_bold">
      {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
    </Text>
  );
}
