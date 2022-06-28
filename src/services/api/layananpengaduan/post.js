import address from "../address"

function PostLayananPengaduan(path, data){
    return new Promise((resolve, reject)=>{
        fetch(`${address}/${path}`, {
            method: 'POST',
            mode: 'cors',
            body: data
        })
        .then(res=>res.json())
        .then(res=>resolve(res))
        .catch(err=>reject(err))
    })
}

export default PostLayananPengaduan