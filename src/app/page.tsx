import { GetTodaysReadingByLevelDocument } from "@/graphql/types/graphql";
import { getClient } from "@/lib/apollo-client/client";
import { TextBlocker } from "../components/text-blocker";
import { format } from "date-fns";
import { Text } from "@/components/ui/text";

export default async function Home() {
  const { data } = await getClient().query({
    query: GetTodaysReadingByLevelDocument,
    variables: {
      level: 1,
    },
  });

  const reads = data?.getTodaysReadingByLevel;

  if (!reads.length) {
    return <div>읽을 거리가 없어요</div>;
  }

  return (
    <div>
      <div>
        {reads &&
          reads.map(read => {
            const date = format(Number(read.createdAt), "yyyy-MM-dd");
            return (
              <div key={read.id} className="w-full mb-2">
                <Text size="24_semibold_130%" className="mb-7">
                  {date}, {read.topic}
                </Text>
                <TextBlocker text={read.content} id={read.id} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
