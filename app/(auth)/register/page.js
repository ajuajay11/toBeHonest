export default async function Page() {
  const res = await fetch('https://to-be-honest-coy0kl7gm-ajaykrishnanks-projects.vercel.app/api/chroniclesOfEveryOne/')

  // Check for successful response
  if (!res.ok) {
    console.error('Failed to fetch:', res.statusText)
    return <div>Error fetching data</div>
  }

  // Try parsing the response to JSON
  let posts = {}
  try {
    posts = await res.json()
  } catch (error) {
    console.error('Error parsing JSON:', error)
    return <div>Error parsing data</div>
  }

  return (
    <ul>
      {posts.darkTruths?.map((post) => (
        <li key={post.yourStoryTitle}>{post.chroniclesOfYou}</li>
      ))}
    </ul>
  )
}
