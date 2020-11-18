const router = require('koa-router')()
const fs = require('fs')
var request = require('request');

router.get('/', async (ctx, next) => {

    let url='https://m.ximalaya.com/m-revision/common/album/queryAlbumTrackRecordsByPage?albumId=203355&page=8&pageSize=100'
     await  request(url, function (error, response, body) {
         console.log('error',error)
         // console.log('body',JSON.parse(body).data.trackDetailInfos)

         let data_list=JSON.parse(body).data.trackDetailInfos
         for(let i=0;i<data_list.length;i++){
             downloadFile( data_list[i].trackInfo.playPath,(data_list[i].trackInfo.title).replace('?','').replace(/\|/g, ',').replace(/\s+/g,""), (e,r) => {
                 console.log(`下载完毕`+e,r);
             });
         }
     })

    function downloadFile(url, filename, callback) {
        if(url){
            const stream = fs.createWriteStream('./public/mp3/'+filename+'.m4a');
            request(url).pipe(stream).on('close', callback);
        }
    }

})

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})

module.exports = router
