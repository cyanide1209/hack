import axios from "axios"

function apiRequest(url,params="", body="", method="GET",hasImg=false) {
    url = "http://20.171.25.176:8070/";

    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: url + (params == ""?params:"?"+params),
            //data: JSON.stringify(body),
            headers: !hasImg? {'X-Requested-With': 'XMLHttpRequest'}:{'Content-Type': 'multipart/form-data'},
            data: body,
            responseType: "json",
            proxy: false
        }).then((res) => {
            return resolve(res.data);
        }).catch(((err) => {
            return reject(err);
        }));
        
    });
}

export default apiRequest