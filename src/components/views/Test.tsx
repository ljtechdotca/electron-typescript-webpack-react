import { FC, useState } from "react";

const url =
  "https://www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new";

export const Test: FC = () => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  async function testFetch(url: string) {
    setIsLoading(true);
    const response = await window.Main.fetch(url);
    setIsLoading(false);
    setData(response);
  }

  return (
    <div>
      <button onClick={() => testFetch(url)}>submit</button>
      {isLoading ? (
        "Loading"
      ) : (
        <pre>
          <code>{JSON.stringify(data, null, 4)}</code>
        </pre>
      )}
    </div>
  );
};
