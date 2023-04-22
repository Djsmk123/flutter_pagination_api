// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs= require('fs');
export default function handler(req, res) {
  if(req.method=="GET"){
    var page=req.query.page;
    var obj=JSON.parse(fs.readFileSync('products.json'));
    let data=[];
    
    if(page===undefined || page==="0"){
        let itemCount=0;
        for(let i=0;i<obj.length; i++){
            if(itemCount!=5){
                data.push(obj[i]);
                itemCount++;
            }else{
                break;
            }
            
        }
        return res.send({
            'sneakers':data,
            'current_page':1,
             'reach_max':false
        });
    }
    else{
        let itemCount=0;
        for(let i=5*(parseInt(page)-1);i<obj.length; i++){
            if(itemCount!=5){
                data.push(obj[i]);
                itemCount++;
            }else{
                break;
            }
            
        }
        return res.send({
           'sneakers':data,
           'current_page':parseInt(page),
           'reach_max':5*(parseInt(page))>=obj.length ? true : false
        });
      }
  }
}
