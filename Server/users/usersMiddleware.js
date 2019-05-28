exports.updateRank = function(){
    return function(req,res,next){
        debugger
        
        let pos = req.body.wins
        let n = req.body.wins+req.body.losses
        let z = 1.96;
        let phat = 1 * pos / n;
       
        
        req.body.ranking = (phat + z*z/(2*n) - z * Math.sqrt((phat*(1-phat)+z*z/(4*n))/n))/(1+z*z/n);
        console.log(req.body.ranking)
        next()
    }
}
