'use server'

export  const  getData = async() =>{
    try {
        return [{id:1},{id:2},{id:3},{id:4}]
    } catch (error) {
        console.log(error);
        return null;
      
    }
}