import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req:Request, res:Response, next:NextFunction) {
  // res.render('index', { title: 'Express' });
  res.send("Hello World")
});

// router.get('/', (req:Request, res:Response)=>{
//   res.send("HELLO WORLD")
// })

export default router;
