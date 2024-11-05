function sendTrackingData(pageName, duration){
   return new Promise( (resolve,reject)=>fetch('/track',{
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({page_name: pageName, duration: duration})
    }))
}

let startTime;

function trackPage(){
    const pageName = document.title
    startTime = Date.now()

    window.addEventListener('beforeunload', ()=>{
        const duration = Math.floor((Date.now() - startTime)/1000)
        sendTrackingData(pageName, duration).then(response => console.log(response))
    })
}

window.addEventListener('DOMContentLoaded', trackPage)