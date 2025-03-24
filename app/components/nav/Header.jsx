import Image from "next/image";

export default function Header() {
  // Image optimization
  return (
    <>
      <header className="text-white">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-6 col-md-3">
              <h1 className="mb-0 fs-3">CHRONICLES</h1>
            </div>
            <div className="col-md-6 d-none d-md-block text-center">
              <Image src="/tbh.png" alt="tbh" width={80} height={80} />
            </div>
            <div className="col-md-3 d-none d-md-block text-end">
              <i className="fs-2 bi bi-list"></i>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
