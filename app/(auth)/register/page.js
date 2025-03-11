export default async function Page() {
  try {
    const res = await fetch('http://localhost:3000/api/chroniclesOfEveryOne', {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('Failed to fetch:', res.status, res.statusText);
      return <div>Error fetching data</div>;
    }

    const posts = await res.json();

    return (
      <ul>
        {posts.darkTruths?.map((post) => (
          <li key={post.yourStoryTitle}>{post.chroniclesOfYou}</li>
        ))}
      </ul>
    );
  } catch (error) {
    console.error('Error:', error);
    return <div>Something went wrong</div>;
  }
}
