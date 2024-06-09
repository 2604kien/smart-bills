export const backEndServer:string="http://localhost:3500/"
export const getConfig=(token:string):Object=>{
    const config={
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    return config;
}