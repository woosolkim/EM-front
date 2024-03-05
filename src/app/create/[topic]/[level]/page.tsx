"use client";

import { CreateReadingMaterialDocument } from "@/graphql/types/graphql";
import LoadingSpinner from "@/src/components/loading-spiner";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Create({
  params,
}: {
  params: { level: string; topic: string };
}) {
  const router = useRouter();

  const [createReading, { loading }] = useMutation(
    CreateReadingMaterialDocument,
    {
      variables: {
        level: +params.level,
        topic: params.topic,
        charactersCount: 1000,
      },
    },
  );

  useEffect(() => {
    createReading({
      onCompleted: data => {
        if (data?.createReadingMaterial?.id) {
          router.push(`/read/${params.level}`);
        } else {
          alert("오류가 발생했습니다. 다시 시도해주세요");
        }
      },
    });
  }, []);

  if (loading) return <LoadingSpinner />;

  return <div>!!</div>;
}
