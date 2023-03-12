export const config = {
    headers:{
        authorization : 'Bearer '+document.cookie.substring(6)
    }
}