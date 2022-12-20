import address from "../address"

function PostLayananPengaduan(path, data){
    return new Promise((resolve, reject)=>{
        fetch(`${address}/${path}`, {
            method: 'POST',
            mode: 'cors',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(res=>resolve(res))
        .catch(err=>reject(err))
    })
}

export default PostLayananPengaduan