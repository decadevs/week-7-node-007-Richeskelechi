import express, {Request, Response, NextFunction} from 'express';
import fs from "fs";
const router = express.Router();
let data = require("../database/database.json")
type shapeData = {
    createdAt: Date;
    dimension:{
        length: number,
        height: number,
        breadth?: number
    } | number,
    shapeName: string;
    area:number;
    id?: number;
};

/* GET home page. */
router.get('/fetchRecords', (req:Request, res:Response, next:NextFunction) => {
    // res.send("Hello World To calculation")
    res.json(data);
});
router.post('/calculate', (req:Request, res:Response, next:NextFunction) => {
    data = data
    let incoming = req.body;
    if(data.length === 0){
        let shape = incoming.shapeName.toLowerCase();
        if (shape == "rectangle") {
            let value = incoming.dimension
            if (typeof value == "object") {
                let len = Object.keys(value).length
                if (+len != 2) {
                    res.status(400).send("You Must Provide Just Length And Breadth Of The Rectangle")
                }else{
                    let {length, breadth} = value;
                    if (typeof length == "number" && typeof breadth == "number") {
                        let recArea = Number((length * breadth).toFixed(2))
                        let user: shapeData = {
                            createdAt: new Date(),
                            dimension: value,
                            shapeName: shape,
                            area: recArea,
                            id: 1
                        }
                        data.push(user);
                        fs.writeFile(`${__dirname}/../database/database.json`, JSON.stringify(data, null, 3), (error)=> {
                            if(error){
                                console.log(error)
                                return res.status(400).send({
                                    status: 'error',
                                    message: "cannot save"
                                })
                            }
                            return res.status(201).send(user);
                        });
                    }else if(typeof length == "string" || typeof breadth == "string"){
                        let len1 = Number(length)
                        let bre1 = Number(breadth)
                        if(isNaN(len1) || (isNaN(bre1))){
                            return res.send("The Length Or Breadth Provided Is Not A Number")
                        }else{
                            let recArea = Number((len1 * bre1).toFixed(2))
                            let user: shapeData = {
                                createdAt: new Date(),
                                dimension: value,
                                shapeName: shape,
                                area: recArea,
                                id: 1
                            }
                            data.push(user);
                            fs.writeFile(`${__dirname}/../database/database.json`, JSON.stringify(data, null, 3), (error)=> {
                                if(error){
                                    console.log(error)
                                    return res.status(400).send({
                                        status: 'error',
                                        message: "cannot save"
                                    })
                                }
                                return res.status(201).send(user);
                            });
                        }
                    }else{
                        res.send("You Must Provided A Validated value For The Length And Breadth Of The Rectangle")
                    }
                }
            }else{
                return res.status(400).json({
                    message: "The Length And Breadth Of The Rectangle Must Be Provided"
                })
            }
        }else if(shape == "square"){
            let side = incoming.dimension
            if(typeof side == "number"){
                let squareArea = Number((side * side).toFixed(2))
                let user: shapeData = {
                    createdAt: new Date(),
                    dimension: side,
                    shapeName: shape,
                    area: squareArea,
                    id: 1
                }
                data.push(user);
                fs.writeFile(`${__dirname}/../database/database.json`, JSON.stringify(data, null, 3), (error)=> {
                    if(error){
                        console.log(error)
                        return res.status(400).send({
                            status: 'error',
                            message: "cannot save"
                        })
                    }
                    return res.status(201).send(user);
                });
            }else if(typeof side == "string"){
                let sides = Number(side)
                if(isNaN(sides)){
                    return res.send("The Radius Provided Is Not A Number")
                }else{
                    let squareArea = Number((sides * sides).toFixed(2))
                    let user: shapeData = {
                        createdAt: new Date(),
                        dimension: sides,
                        shapeName: shape,
                        area: squareArea,
                        id: 1
                    }
                    data.push(user);
                    fs.writeFile(`${__dirname}/../database/database.json`, JSON.stringify(data, null, 3), (error)=> {
                        if(error){
                            console.log(error)
                            return res.status(400).send({
                                status: 'error',
                                message: "cannot save"
                            })
                        }
                        return res.status(201).send(user);
                    });
                }
            }else{
                return res.send("For A Square You Must Provide Just One Side Of The Square")
            }
        }else if(shape == "triangle"){
            let each = incoming.dimension
            if (typeof each == "object") {
                let len = Object.keys(each).length
                if (+len != 3) {
                    res.status(400).send("You Must Provide The Length, Width And Breadth Of The Rectangle")
                }else{
                    let {length, width, breadth} = each;
                    if (typeof length == "number" && typeof width == "number" && typeof breadth == "number") {
                        let distance = Number((length + width + breadth)/2)
                        let allSum = Number(((distance - length) * (distance - width) * (distance - breadth)).toFixed(2))
                        let finalSum = Number((distance * allSum))
                        let triArea = Number(Math.sqrt(finalSum).toFixed(2))
                        let user: shapeData = {
                            createdAt: new Date(),
                            dimension: each,
                            shapeName: shape,
                            area: triArea,
                            id: 1
                        }
                        data.push(user);
                        fs.writeFile(`${__dirname}/../database/database.json`, JSON.stringify(data, null, 3), (error)=> {
                            if(error){
                                console.log(error)
                                return res.status(400).send({
                                    status: 'error',
                                    message: "cannot save"
                                })
                            }
                            return res.status(201).send(user);
                        });
                    }else if(typeof length == "string" || typeof width == "string" || typeof breadth == "string"){
                        let len1 = Number(length)
                        let bre1 = Number(breadth)
                        let wid1 = Number(width)
                        if(isNaN(len1) || (isNaN(wid1)) || (isNaN(bre1))){
                            return res.send("The Length Or Width Or Breadth Provided Is Not A Number")
                        }else{
                            let distance = Number((len1 + wid1 + bre1)/2)
                            let allSum = Number(((distance - len1) * (distance - wid1) * (distance - bre1)).toFixed(2))
                            let finalSum = Number((distance * allSum))
                            let triArea = Number(Math.sqrt(finalSum).toFixed(2))
                            let user: shapeData = {
                                createdAt: new Date(),
                                dimension: each,
                                shapeName: shape,
                                area: triArea,
                                id: 1
                            }
                            data.push(user);
                            fs.writeFile(`${__dirname}/../database/database.json`, JSON.stringify(data, null, 3), (error)=> {
                                if(error){
                                    console.log(error)
                                    return res.status(400).send({
                                        status: 'error',
                                        message: "cannot save"
                                    })
                                }
                                return res.status(201).send(user);
                            });
                        }
                    }else{
                        res.send("You Must Provided A Validated value For The Length And Breadth Of The Rectangle")
                    }
                }
            }else{
                return res.send("The Length And Breadth Of The Rectangle Must Be Provided")
            }
        }else if(shape == "circle"){
            let radius = incoming.dimension
            if(typeof radius == "number"){
                let circleArea = Number((Math.PI * (radius * radius)).toFixed(2))
                let user: shapeData = {
                    createdAt: new Date(),
                    dimension: radius,
                    shapeName: shape,
                    area: circleArea,
                    id: 1
                }
                data.push(user);
                fs.writeFile(`${__dirname}/../database/database.json`, JSON.stringify(data, null, 3), (error)=> {
                    if(error){
                        console.log(error)
                        return res.status(400).send({
                            status: 'error',
                            message: "cannot save"
                        })
                    }
                    return res.status(201).send(user);
                });
            }else if(typeof radius == "string"){
                let radiuss = Number(radius)
                if(isNaN(radiuss)){
                    return res.send("The Radius Provided Is Not A Number")
                }else{
                    let circleArea = Number((Math.PI * (radiuss * radiuss)).toFixed(2))
                    let user: shapeData = {
                        createdAt: new Date(),
                        dimension: radiuss,
                        shapeName: shape,
                        area: circleArea,
                        id: 1
                    }
                    data.push(user);
                    fs.writeFile(`${__dirname}/../database/database.json`, JSON.stringify(data, null, 3), (error)=> {
                        if(error){
                            console.log(error)
                            return res.status(400).send({
                                status: 'error',
                                message: "cannot save"
                            })
                        }
                        return res.status(201).send(user);
                    });
                }
            }else{
                return res.send("For A Cicle You Must Provide Just A Radius")
            }
        }else{
            return res.send("Shape Name Must Be A Square Or A Triangle Or A Rectangle Or A Circle")
        }
    }else{
        let num: number = 1;
        let currentID = data[data.length-1].id;
        num += currentID; 
        let shape = incoming.shapeName.toLowerCase();
        if (shape == "rectangle") {
            let value = incoming.dimension
            if (typeof value == "object") {
                let len = Object.keys(value).length
                if (+len != 2) {
                    res.status(400).send("You Must Provide Just Length And Breadth Of The Rectangle")
                }else{
                    let {length, breadth} = value;
                    if (typeof length == "number" && typeof breadth == "number") {
                        let recArea = Number((length * breadth).toFixed(2))
                        let user: shapeData = {
                            createdAt: new Date(),
                            dimension: value,
                            shapeName: shape,
                            area: recArea,
                            id: num
                        }
                        data.push(user);
                        fs.writeFile(`${__dirname}/../database/database.json`, JSON.stringify(data, null, 3), (error)=> {
                            if(error){
                                console.log(error)
                                return res.status(400).send({
                                    status: 'error',
                                    message: "cannot save"
                                })
                            }
                            return res.status(201).send(user);
                        });
                    }else if(typeof length == "string" || typeof breadth == "string"){
                        let len1 = Number(length)
                        let bre1 = Number(breadth)
                        if(isNaN(len1) || (isNaN(bre1))){
                            return res.send("The Length Or Breadth Provided Is Not A Number")
                        }else{
                            let recArea = Number((len1 * bre1).toFixed(2))
                            let user: shapeData = {
                                createdAt: new Date(),
                                dimension: value,
                                shapeName: shape,
                                area: recArea,
                                id: num
                            }
                            data.push(user);
                            fs.writeFile(`${__dirname}/../database/database.json`, JSON.stringify(data, null, 3), (error)=> {
                                if(error){
                                    console.log(error)
                                    return res.status(400).send({
                                        status: 'error',
                                        message: "cannot save"
                                    })
                                }
                                return res.status(201).send(user);
                            });
                        }
                    }else{
                        res.send("You Must Provided A Validated value For The Length And Breadth Of The Rectangle")
                    }
                }
            }else{
                return res.status(400).json({
                    message: "You Must Provide Just Length And Breadth Of The Rectangle"
                })
            }
        }else if(shape == "square"){
            let side = incoming.dimension
            if(typeof side == "number"){
                let squareArea = Number((side * side).toFixed(2))
                let user: shapeData = {
                    createdAt: new Date(),
                    dimension: side,
                    shapeName: shape,
                    area: squareArea,
                    id: num
                }
                data.push(user);
                fs.writeFile(`${__dirname}/../database/database.json`, JSON.stringify(data, null, 3), (error)=> {
                    if(error){
                        console.log(error)
                        return res.status(400).send({
                            status: 'error',
                            message: "cannot save"
                        })
                    }
                    return res.status(201).send(user);
                });
            }else if(typeof side == "string"){
                let sides = Number(side)
                if(isNaN(sides)){
                    return res.status(404).json({message: "The Side Provided Is Not A Number"})
                }else{
                    let squareArea = Number((sides * sides).toFixed(2))
                    let user: shapeData = {
                        createdAt: new Date(),
                        dimension: sides,
                        shapeName: shape,
                        area: squareArea,
                        id: num
                    }
                    data.push(user);
                    fs.writeFile(`${__dirname}/../database/database.json`, JSON.stringify(data, null, 3), (error)=> {
                        if(error){
                            console.log(error)
                            return res.status(400).send({
                                status: 'error',
                                message: "cannot save"
                            })
                        }
                        return res.status(201).send(user);
                    });
                }
            }else{
                return res.send("For A Square You Must Provide Just One Side Of The Square")
            }
        }else if(shape == "triangle"){
            let each = incoming.dimension
            if (typeof each == "object") {
                let len = Object.keys(each).length
                if (+len != 3) {
                    res.status(400).json({message:"You Must Provide The Length, Width And Breadth Of The Triangle"})
                }else{
                    let {length, width, breadth} = each;
                    if (typeof length == "number" && typeof width == "number" && typeof breadth == "number") {
                        let distance = Number((length + width + breadth)/2)
                        let allSum = Number(((distance - length) * (distance - width) * (distance - breadth)).toFixed(2))
                        let finalSum = Number((distance * allSum))
                        let triArea = Number(Math.sqrt(finalSum).toFixed(2))
                        let user: shapeData = {
                            createdAt: new Date(),
                            dimension: each,
                            shapeName: shape,
                            area: triArea,
                            id: num
                        }
                        data.push(user);
                        fs.writeFile(`${__dirname}/../database/database.json`, JSON.stringify(data, null, 3), (error)=> {
                            if(error){
                                console.log(error)
                                return res.status(400).send({
                                    status: 'error',
                                    message: "cannot save"
                                })
                            }
                            return res.status(201).send(user);
                        });
                    }else if(typeof length == "string" || typeof width == "string" || typeof breadth == "string"){
                        let len1 = Number(length)
                        let bre1 = Number(breadth)
                        let wid1 = Number(width)
                        if(isNaN(len1) || (isNaN(wid1)) || (isNaN(bre1))){
                            return res.send("The Length Or Width Or Breadth Provided Is Not A Number")
                        }else{
                            let distance = Number((len1 + wid1 + bre1)/2)
                            let allSum = Number(((distance - len1) * (distance - wid1) * (distance - bre1)).toFixed(2))
                            let finalSum = Number((distance * allSum))
                            let triArea = Number(Math.sqrt(finalSum).toFixed(2))
                            let user: shapeData = {
                                createdAt: new Date(),
                                dimension: each,
                                shapeName: shape,
                                area: triArea,
                                id: num
                            }
                            data.push(user);
                            fs.writeFile(`${__dirname}/../database/database.json`, JSON.stringify(data, null, 3), (error)=> {
                                if(error){
                                    console.log(error)
                                    return res.status(400).send({
                                        status: 'error',
                                        message: "cannot save"
                                    })
                                }
                                return res.status(201).send(user);
                            });
                        }
                    }else{
                        res.send("You Must Provided A Validated value For The Length And Breadth Of The Rectangle")
                    }
                }
            }else{
                return res.send("The Length And Breadth Of The Rectangle Must Be Provided")
            }
        }else if(shape == "circle"){
            let radius = incoming.dimension
            if(typeof radius == "number"){
                let circleArea = Number((Math.PI * (radius * radius)).toFixed(2))
                let user: shapeData = {
                    createdAt: new Date(),
                    dimension: radius,
                    shapeName: shape,
                    area: circleArea,
                    id: num
                }
                data.push(user);
                fs.writeFile(`${__dirname}/../database/database.json`, JSON.stringify(data, null, 3), (error)=> {
                    if(error){
                        console.log(error)
                        return res.status(400).send({
                            status: 'error',
                            message: "cannot save"
                        })
                    }
                    return res.status(201).send(user);
                });
            }else if(typeof radius == "string"){
                let radiuss = Number(radius)
                if(isNaN(radiuss)){
                    return res.send("The Radius Provided Is Not A Number")
                }else{
                    let circleArea = Number((Math.PI * (radiuss * radiuss)).toFixed(2))
                    let user: shapeData = {
                        createdAt: new Date(),
                        dimension: radiuss,
                        shapeName: shape,
                        area: circleArea,
                        id: num
                    }
                    data.push(user);
                    fs.writeFile(`${__dirname}/../database/database.json`, JSON.stringify(data, null, 3), (error)=> {
                        if(error){
                            console.log(error)
                            return res.status(400).send({
                                status: 'error',
                                message: "cannot save"
                            })
                        }
                        return res.status(201).send(user);
                    });
                }
            }else{
                return res.send("For A Cicle You Must Provide Just A Radius")
            }
        }else{
            return res.send("Shape Name Must Be A Square Or A Triangle Or A Rectangle Or A Circle")
        }
        // res.send(shape)
    }
    
});
  
  export default router;