export default async function RegisterAuth() {
    const data = await fetch('https://api.vercel.app/blog')
    const posts = await data.json()
    return (
       <div>
        {console.log(posts)}
          {posts.map((item, index)=>(<div key={index}> 
            {item.id}
            <span>{item.title}</span>
          </div>))}
       </div>
    )
  }