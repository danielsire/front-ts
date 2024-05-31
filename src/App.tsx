import React from 'react';
import './App.css';
import Counter from './Counter';
import axios from 'axios';
import { IUser } from './IUser';

const baseURL = "http://localhost:4000/v1/user";

const defaultPosts: IUser[] = []


function App() {

 const [posts, setPosts]: [IUser[], (posts: IUser[]) => void] = React.useState(defaultPosts)

 const [loading, setLoading]: [
  boolean,
  (loading: boolean) => void
] = React.useState<boolean>(true);

const [error, setError]: [string, (error: string) => void] = React.useState(
  ''
);

React.useEffect(() => {
  axios
    .get<IUser[]>(`${baseURL}/`, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
      withCredentials: false
    })
    .then((response) => {
      setPosts(response.data);
      setLoading(false);
    })
    .catch((ex) => {
      'An unexpected error has occurred';

      setError(ex.error);
      setLoading(false);
    });
}, []);

  return (
    <div className="App">
      <Counter />
      {loading}
      <ul className="posts">
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.name}</h3>
            <p>{post.email}</p>
            <p>{post.age}</p>
          </li>
        ))}
      </ul>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;