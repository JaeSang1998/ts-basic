import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  content: string;
};

type Pagination<T> = {
  data: T[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
};

async function getPost(page: number): Promise<Pagination<Post>> {
  const res = await fetch(
    `http://localhost:4000/posts?_page=${page}&_per_page=10`
  );
  const data = await res.json();

  return data;
}

function App() {
  const [posts, setPosts] = useState<Pagination<Post> | undefined>();
  const [page, setPage] = useState(1);

  useEffect(() => {
    getPost(page).then((data) => setPosts(data));
  }, [page]);

  const next = () => {
    setPage(page + 1);
  };
  const prev = () => {
    setPage(page - 1);
  };

  return (
    <>
      <h1>Posts</h1>
      <ul>
        {posts?.data.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
      <button onClick={prev}>{"<"}</button>
      <button onClick={next}>{">"}</button>
    </>
  );
}

export default App;
