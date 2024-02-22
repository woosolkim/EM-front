import { GetTodaysReadingByLevelDocument } from "@/graphql/types/graphql";
import { getClient } from "@/lib/apollo-client/client";
import { format } from "date-fns";

export default async function Home() {
  const { data } = await getClient().query({
    query: GetTodaysReadingByLevelDocument,
    variables: {
      level: 5,
    },
  });

  const reads = data?.getTodaysReadingByLevel;

  return (
    <div>
      <div>
        {reads.map(read => {
          const date = format(Number(read.createdAt), "yyyy-MM-dd");
          return (
            <div className="w-full border mb-2">
              <h1>{date}</h1>
              <p>{read.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
