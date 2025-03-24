 'use client'
 import { useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";

 export default function index({ commentsData }) {
    const [comment, setComment] = useState({
        text: "",
      });
      
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const token = Cookies.get('token'); 
        const userIds = Cookies.get('userId'); 
        if (!userIds|| !token) {
            alert('User not authenticated');
            return;
        }
        const dataOfComments= {
            text:comment.text,
            userId :userIds,
          }
        try {
            const response = await axios.post(
              `/api/chroniclesComments/${commentsData._id}`,
              dataOfComments,
              {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                },
              }
            );
            console.log(response);
             alert('success')
            // location.reload();
          } catch (error) {
            console.log(error);
          }
  
    };
  return (
    <>
      <div>
        <form className="position-relative" onSubmit={handleSubmit}> 
            <input type="text" required value={comment.text} onChange={(e) => setComment({ ...comment, text: e.target.value })} placeholder='comments' className='form-control'/>
            <button style={{top:'7px',right:'10px'}} className="position-absolute bg-transparent border-0" type='submit'><i className="bi text-black bi-arrow-right-circle-fill"></i></button>
        </form>
        {console.log(commentsData,'commentsData')}
        {commentsData.comments?.length > 0 ? (
          commentsData.comments.map((comment, index) => (
            <div key={index} className="p-2 border rounded mb-2">
              {/* <strong>User:</strong> { comment} <br /> */}
              <div>{comment.text}</div>
              <div>{comment.userId?.email}</div>
            </div>
          ))
        ) : (
          <p>No comments.</p>
        )}
      </div>
    </> 
  )
}