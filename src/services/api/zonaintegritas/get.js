import address from "../address"

async function GetZonaIntegritas(path){
    return await new Promise((resolve, reject)=>{
        fetch(`${address}/${path}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res=>res.json())
        .then(res=>resolve(res))
        .catch(err=>reject(err))
    })
}

export default GetZonaIntegritas