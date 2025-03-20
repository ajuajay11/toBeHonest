
import Logout from './components/logout'
export default async function Home() {
  try {
    const res = await fetch('https://to-be-honest.vercel.app/api/chroniclesOfEveryOne', {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('Failed to fetch:', res.status, res.statusText);
      return <div>Error fetching data</div>;
    }

    const posts = await res.json();

    return (
      <>
      <ul>
        {posts.darkTruths?.map((post) => (
          <li key={post.yourStoryTitle}>{post.chroniclesOfYou}</li>
        ))}
      </ul>
      <Logout/>
      </>
    );
  } catch (error) {
    return <div>Something went wrong</div>;
  }
}
