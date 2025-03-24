
import Logout from './../../logout';
import Comments from './comments'
export default async function Home() {
  try {
    const res = await fetch('http://localhost:3000/api/chroniclesOfEveryOne/', {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('Failed to fetch:', res.status, res.statusText);
      return <div>Error fetching data</div>;
    }

    const posts = await res.json();

    return (
      <>
        <section className="container py-5">
          <div className="row g-3">
            {console.log(posts,'posts--------')}
            {posts?.darkTruths.map((post, index) => {
              return <div key={index} className='col-12 col-md-4'>
                <div className='card bg-black text-white border-warning h-100'>
                  <div className="card-header d-flex justify-content-between align-items-center" style={{ zIndex: 999 }}>
                    <div>
                      <h1 className="fs-5">{post.yourStoryTitle}</h1>
                    </div>
                    <div>
                      <img src="/a.png" alt="ProfilePic" height={50} width={50} style={{ borderRadius: "50%" }} />
                    </div>
                  </div>
                  <div className='card-body'>
                    <p>{post.chroniclesOfYou}</p>
                  </div>
                  <div className='comments'>
                  <Comments commentsData={post}/>
                  </div>
                </div>
              </div>
            })}
          </div>
        </section>

        <Logout />
      </>
    );
  } catch (error) {
    return <div>Something went wrong</div>;
  }
}
