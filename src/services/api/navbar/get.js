import address from "../address"

async function GetNavbar(tes){
    return await new Promise((resolve, reject) => {
        fetch(`${address}/${tes}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

export default GetNavbar