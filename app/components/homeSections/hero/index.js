 
import Image from "next/image"

export default function index() {
  return (
    <>
        <section className="container py-5">
          <div className="row">
            <div className="col-6">
               <Image src="/1-28af7910.png" className="img-fluid rounded-4" alt="tbh" width={320} height={480} />
            </div>
            <div className="col-6">
              <h2 className="fs-1">We’re changing the way the world understands wealth.</h2>
              <p className="mt-5">At Bluebird Mutual, we inspire everyday people to make money through simple, socially conscious investment and impartial business support. Together, we can generate wealth and inspire success through choices that make everyone feel good. Let’s show you how.</p>
            </div>
          </div>
        </section>
    </>
  )
}

 