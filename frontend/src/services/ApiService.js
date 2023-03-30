import createToast from "./ToastService";

async function fetchIPDetails(ipadresses){
    let response;
    try{
        createToast("info","Processing your request.")
        response=await fetch("http://127.0.0.1:5000/api"+'/lookup/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ip_addresses: ipadresses
            })
        })
        if (response.ok) {
            return await response.json();
        }
        throw new Error('Something went wrong');
    }catch (e) {
        createToast("error",e)
    }
}

export default fetchIPDetails;