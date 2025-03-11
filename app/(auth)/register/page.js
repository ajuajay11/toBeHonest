export default async function Page() {
  const res = await fetch('/api/chroniclesOfEveryOne/')

  // Check for successful response
  if (!res.ok) {
    console.error('Failed to fetch:', res.status, res.statusText);
    return <div>Error fetching data</div>;
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
      {posts?.darkTruths?.map((post, index) => (
        <li key={index}>{post.id}</li>
      ))}
    </ul>
  )
}

 

// export default function page() {
//   return (
//     <>
    
//     hello</>
//   )
// }

 