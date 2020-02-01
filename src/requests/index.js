import axios from 'axios'

const isDev=process.env.NODE_ENV==='development'
const service=axios.create({
    baseURL:isDev?'http://rap2api.taobao.org/app/mock/243275':''
})
service.interceptors.request.use(config=>{
    config.data=Object.assign({}, config.data,{
        authToken:'tokenPlacehoder'
    })
    return config
})
service.interceptors.response.use(resp=>{
    if(resp.data.code===200){
        return resp.data.data
    }
    else{

    }
})
export const getArticles=(offset=0,limit=10)=>{
    return service.post('/api/v1/articleList',{
        offset,
        limit
    })
}