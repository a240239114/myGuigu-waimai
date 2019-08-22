// 导入axios
import axios from 'axios';

//编写封装代码,需要三个参数请求地址,参数,请求方式
export default function ajax(url,data={} ,type='GET'){
 
    return new Promise(function(resolve,reject){
         let promise;  
        //对参数进行处理,让get请求也能传递对象形式的参数
        if(type === 'GET'){
            let dataStr = '';
            //循环遍历对象,变字符
            Object.keys(data).forEach(key=>{
                dataStr += key+'='+data[key]+'&';
            })

            if(dataStr != ''){
                //去除最后一个&
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))

                url = url +'?'+ dataStr;
            }
            
            //发起请求
            promise = axios.get(url);
        }else{
            promise = axios.post(url);
        }


         promise.then(function(res){
              resolve(res.data)
         }).catch(function(error){
             reject(error)
         }) 
    })
}