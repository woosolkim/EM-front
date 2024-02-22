import { GetTodaysReadingByLevelDocument } from "@/graphql/types/graphql";
import { getClient } from "@/lib/apollo-client/client";
import { TextBlocker } from "../components/text-blocker";
import { format } from "date-fns";

export default async function Home() {
  const { data } = await getClient().query({
    query: GetTodaysReadingByLevelDocument,
    variables: {
      level: 2,
    },
  });

  const reads = data?.getTodaysReadingByLevel;

  return (
    <div>
      <div>
        {reads.map(read => {
          const date = format(Number(read.createdAt), "yyyy-MM-dd");

          return (
            <div key={read.id} className="w-full border mb-2">
              <h1>{date}</h1>
              <TextBlocker text={read.content} id={read.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
