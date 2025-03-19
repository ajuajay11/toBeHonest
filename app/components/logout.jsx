'use client'
import Cookies from 'js-cookie';

export default function logout() {
    const lgout =()=>{
        Cookies.set('token', null, { expires: 12 });
        Cookies.set('isAuthenticated', false, { expires: 12 });
        window.location.href = "/login";
    }
  return (
    <>
       <div>
       <button className='' onClick={lgout}>Logout</button>
       </div>
    </>
  )
}

 