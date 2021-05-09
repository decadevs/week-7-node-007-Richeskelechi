"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var router = express_1.default.Router();
var data = require("../database/database.json");
/* GET home page. */
router.get('/fetchRecords', function (req, res, next) {
    // res.send("Hello World To calculation")
    res.json(data);
});
router.post('/calculate', function (req, res, next) {
    data = data;
    var incoming = req.body;
    if (data.length === 0) {
        var shape = incoming.shapeName.toLowerCase();
        if (shape == "rectangle") {
            var value = incoming.dimension;
            if (typeof value == "object") {
                var len = Object.keys(value).length;
                if (+len != 2) {
                    res.status(400).send("You Must Provide Just Length And Breadth Of The Rectangle");
                }
                else {
                    var length_1 = value.length, breadth = value.breadth;
                    if (typeof length_1 == "number" && typeof breadth == "number") {
                        var recArea = Number((length_1 * breadth).toFixed(2));
                        var user_1 = {
                            createdAt: new Date(),
                            dimension: value,
                            shapeName: shape,
                            area: recArea,
                            id: 1
                        };
                        data.push(user_1);
                        fs_1.default.writeFile(__dirname + "/../database/database.json", JSON.stringify(data, null, 3), function (error) {
                            if (error) {
                                console.log(error);
                                return res.status(400).send({
                                    status: 'error',
                                    message: "cannot save"
                                });
                            }
                            return res.status(200).send(user_1);
                        });
                    }
                    else if (typeof length_1 == "string" || typeof breadth == "string") {
                        var len1 = Number(length_1);
                        var bre1 = Number(breadth);
                        if (isNaN(len1) || (isNaN(bre1))) {
                            return res.send("The Length Or Breadth Provided Is Not A Number");
                        }
                        else {
                            var recArea = Number((len1 * bre1).toFixed(2));
                            var user_2 = {
                                createdAt: new Date(),
                                dimension: value,
                                shapeName: shape,
                                area: recArea,
                                id: 1
                            };
                            data.push(user_2);
                            fs_1.default.writeFile(__dirname + "/../database/database.json", JSON.stringify(data, null, 3), function (error) {
                                if (error) {
                                    console.log(error);
                                    return res.status(400).send({
                                        status: 'error',
                                        message: "cannot save"
                                    });
                                }
                                return res.status(200).send(user_2);
                            });
                        }
                    }
                    else {
                        res.send("You Must Provided A Validated value For The Length And Breadth Of The Rectangle");
                    }
                }
            }
            else {
                return res.send("The Length And Breadth Of The Rectangle Must Be Provided");
            }
        }
        else if (shape == "square") {
            var side = incoming.dimension;
            if (typeof side == "number") {
                var squareArea = Number((side * side).toFixed(2));
                var user_3 = {
                    createdAt: new Date(),
                    dimension: side,
                    shapeName: shape,
                    area: squareArea,
                    id: 1
                };
                data.push(user_3);
                fs_1.default.writeFile(__dirname + "/../database/database.json", JSON.stringify(data, null, 3), function (error) {
                    if (error) {
                        console.log(error);
                        return res.status(400).send({
                            status: 'error',
                            message: "cannot save"
                        });
                    }
                    return res.status(200).send(user_3);
                });
            }
            else if (typeof side == "string") {
                var sides = Number(side);
                if (isNaN(sides)) {
                    return res.send("The Radius Provided Is Not A Number");
                }
                else {
                    var squareArea = Number((sides * sides).toFixed(2));
                    var user_4 = {
                        createdAt: new Date(),
                        dimension: sides,
                        shapeName: shape,
                        area: squareArea,
                        id: 1
                    };
                    data.push(user_4);
                    fs_1.default.writeFile(__dirname + "/../database/database.json", JSON.stringify(data, null, 3), function (error) {
                        if (error) {
                            console.log(error);
                            return res.status(400).send({
                                status: 'error',
                                message: "cannot save"
                            });
                        }
                        return res.status(200).send(user_4);
                    });
                }
            }
            else {
                return res.send("For A Square You Must Provide Just One Side Of The Square");
            }
        }
        else if (shape == "triangle") {
            var each = incoming.dimension;
            if (typeof each == "object") {
                var len = Object.keys(each).length;
                if (+len != 3) {
                    res.status(400).send("You Must Provide The Length, Width And Breadth Of The Rectangle");
                }
                else {
                    var length_2 = each.length, width = each.width, breadth = each.breadth;
                    if (typeof length_2 == "number" && typeof width == "number" && typeof breadth == "number") {
                        var distance = Number((length_2 + width + breadth) / 2);
                        var allSum = Number(((distance - length_2) * (distance - width) * (distance - breadth)).toFixed(2));
                        var finalSum = Number((distance * allSum));
                        var triArea = Number(Math.sqrt(finalSum).toFixed(2));
                        var user_5 = {
                            createdAt: new Date(),
                            dimension: each,
                            shapeName: shape,
                            area: triArea,
                            id: 1
                        };
                        data.push(user_5);
                        fs_1.default.writeFile(__dirname + "/../database/database.json", JSON.stringify(data, null, 3), function (error) {
                            if (error) {
                                console.log(error);
                                return res.status(400).send({
                                    status: 'error',
                                    message: "cannot save"
                                });
                            }
                            return res.status(200).send(user_5);
                        });
                    }
                    else if (typeof length_2 == "string" || typeof width == "string" || typeof breadth == "string") {
                        var len1 = Number(length_2);
                        var bre1 = Number(breadth);
                        var wid1 = Number(width);
                        if (isNaN(len1) || (isNaN(wid1)) || (isNaN(bre1))) {
                            return res.send("The Length Or Width Or Breadth Provided Is Not A Number");
                        }
                        else {
                            var distance = Number((len1 + wid1 + bre1) / 2);
                            var allSum = Number(((distance - len1) * (distance - wid1) * (distance - bre1)).toFixed(2));
                            var finalSum = Number((distance * allSum));
                            var triArea = Number(Math.sqrt(finalSum).toFixed(2));
                            var user_6 = {
                                createdAt: new Date(),
                                dimension: each,
                                shapeName: shape,
                                area: triArea,
                                id: 1
                            };
                            data.push(user_6);
                            fs_1.default.writeFile(__dirname + "/../database/database.json", JSON.stringify(data, null, 3), function (error) {
                                if (error) {
                                    console.log(error);
                                    return res.status(400).send({
                                        status: 'error',
                                        message: "cannot save"
                                    });
                                }
                                return res.status(200).send(user_6);
                            });
                        }
                    }
                    else {
                        res.send("You Must Provided A Validated value For The Length And Breadth Of The Rectangle");
                    }
                }
            }
            else {
                return res.send("The Length And Breadth Of The Rectangle Must Be Provided");
            }
        }
        else if (shape == "circle") {
            var radius = incoming.dimension;
            if (typeof radius == "number") {
                var circleArea = Number((Math.PI * (radius * radius)).toFixed(2));
                var user_7 = {
                    createdAt: new Date(),
                    dimension: radius,
                    shapeName: shape,
                    area: circleArea,
                    id: 1
                };
                data.push(user_7);
                fs_1.default.writeFile(__dirname + "/../database/database.json", JSON.stringify(data, null, 3), function (error) {
                    if (error) {
                        console.log(error);
                        return res.status(400).send({
                            status: 'error',
                            message: "cannot save"
                        });
                    }
                    return res.status(200).send(user_7);
                });
            }
            else if (typeof radius == "string") {
                var radiuss = Number(radius);
                if (isNaN(radiuss)) {
                    return res.send("The Radius Provided Is Not A Number");
                }
                else {
                    var circleArea = Number((Math.PI * (radiuss * radiuss)).toFixed(2));
                    var user_8 = {
                        createdAt: new Date(),
                        dimension: radiuss,
                        shapeName: shape,
                        area: circleArea,
                        id: 1
                    };
                    data.push(user_8);
                    fs_1.default.writeFile(__dirname + "/../database/database.json", JSON.stringify(data, null, 3), function (error) {
                        if (error) {
                            console.log(error);
                            return res.status(400).send({
                                status: 'error',
                                message: "cannot save"
                            });
                        }
                        return res.status(200).send(user_8);
                    });
                }
            }
            else {
                return res.send("For A Cicle You Must Provide Just A Radius");
            }
        }
        else {
            return res.send("Shape Name Must Be A Square Or A Triangle Or A Rectangle Or A Circle");
        }
    }
    else {
        var num = 1;
        var currentID = data[data.length - 1].id;
        num += currentID;
        var shape = incoming.shapeName.toLowerCase();
        if (shape == "rectangle") {
            var value = incoming.dimension;
            if (typeof value == "object") {
                var len = Object.keys(value).length;
                if (+len != 2) {
                    res.status(400).send("You Must Provide Just Length And Breadth Of The Rectangle");
                }
                else {
                    var length_3 = value.length, breadth = value.breadth;
                    if (typeof length_3 == "number" && typeof breadth == "number") {
                        var recArea = Number((length_3 * breadth).toFixed(2));
                        var user_9 = {
                            createdAt: new Date(),
                            dimension: value,
                            shapeName: shape,
                            area: recArea,
                            id: num
                        };
                        data.push(user_9);
                        fs_1.default.writeFile(__dirname + "/../database/database.json", JSON.stringify(data, null, 3), function (error) {
                            if (error) {
                                console.log(error);
                                return res.status(400).send({
                                    status: 'error',
                                    message: "cannot save"
                                });
                            }
                            return res.status(200).send(user_9);
                        });
                    }
                    else if (typeof length_3 == "string" || typeof breadth == "string") {
                        var len1 = Number(length_3);
                        var bre1 = Number(breadth);
                        if (isNaN(len1) || (isNaN(bre1))) {
                            return res.send("The Length Or Breadth Provided Is Not A Number");
                        }
                        else {
                            var recArea = Number((len1 * bre1).toFixed(2));
                            var user_10 = {
                                createdAt: new Date(),
                                dimension: value,
                                shapeName: shape,
                                area: recArea,
                                id: num
                            };
                            data.push(user_10);
                            fs_1.default.writeFile(__dirname + "/../database/database.json", JSON.stringify(data, null, 3), function (error) {
                                if (error) {
                                    console.log(error);
                                    return res.status(400).send({
                                        status: 'error',
                                        message: "cannot save"
                                    });
                                }
                                return res.status(200).send(user_10);
                            });
                        }
                    }
                    else {
                        res.send("You Must Provided A Validated value For The Length And Breadth Of The Rectangle");
                    }
                }
            }
            else {
                return res.send("The Length And Breadth Of The Rectangle Must Be Provided");
            }
        }
        else if (shape == "square") {
            var side = incoming.dimension;
            if (typeof side == "number") {
                var squareArea = Number((side * side).toFixed(2));
                var user_11 = {
                    createdAt: new Date(),
                    dimension: side,
                    shapeName: shape,
                    area: squareArea,
                    id: num
                };
                data.push(user_11);
                fs_1.default.writeFile(__dirname + "/../database/database.json", JSON.stringify(data, null, 3), function (error) {
                    if (error) {
                        console.log(error);
                        return res.status(400).send({
                            status: 'error',
                            message: "cannot save"
                        });
                    }
                    return res.status(200).send(user_11);
                });
            }
            else if (typeof side == "string") {
                var sides = Number(side);
                if (isNaN(sides)) {
                    return res.send("The Radius Provided Is Not A Number");
                }
                else {
                    var squareArea = Number((sides * sides).toFixed(2));
                    var user_12 = {
                        createdAt: new Date(),
                        dimension: sides,
                        shapeName: shape,
                        area: squareArea,
                        id: num
                    };
                    data.push(user_12);
                    fs_1.default.writeFile(__dirname + "/../database/database.json", JSON.stringify(data, null, 3), function (error) {
                        if (error) {
                            console.log(error);
                            return res.status(400).send({
                                status: 'error',
                                message: "cannot save"
                            });
                        }
                        return res.status(200).send(user_12);
                    });
                }
            }
            else {
                return res.send("For A Square You Must Provide Just One Side Of The Square");
            }
        }
        else if (shape == "triangle") {
            var each = incoming.dimension;
            if (typeof each == "object") {
                var len = Object.keys(each).length;
                if (+len != 3) {
                    res.status(400).send("You Must Provide The Length, Width And Breadth Of The Rectangle");
                }
                else {
                    var length_4 = each.length, width = each.width, breadth = each.breadth;
                    if (typeof length_4 == "number" && typeof width == "number" && typeof breadth == "number") {
                        var distance = Number((length_4 + width + breadth) / 2);
                        var allSum = Number(((distance - length_4) * (distance - width) * (distance - breadth)).toFixed(2));
                        var finalSum = Number((distance * allSum));
                        var triArea = Number(Math.sqrt(finalSum).toFixed(2));
                        var user_13 = {
                            createdAt: new Date(),
                            dimension: each,
                            shapeName: shape,
                            area: triArea,
                            id: num
                        };
                        data.push(user_13);
                        fs_1.default.writeFile(__dirname + "/../database/database.json", JSON.stringify(data, null, 3), function (error) {
                            if (error) {
                                console.log(error);
                                return res.status(400).send({
                                    status: 'error',
                                    message: "cannot save"
                                });
                            }
                            return res.status(200).send(user_13);
                        });
                    }
                    else if (typeof length_4 == "string" || typeof width == "string" || typeof breadth == "string") {
                        var len1 = Number(length_4);
                        var bre1 = Number(breadth);
                        var wid1 = Number(width);
                        if (isNaN(len1) || (isNaN(wid1)) || (isNaN(bre1))) {
                            return res.send("The Length Or Width Or Breadth Provided Is Not A Number");
                        }
                        else {
                            var distance = Number((len1 + wid1 + bre1) / 2);
                            var allSum = Number(((distance - len1) * (distance - wid1) * (distance - bre1)).toFixed(2));
                            var finalSum = Number((distance * allSum));
                            var triArea = Number(Math.sqrt(finalSum).toFixed(2));
                            var user_14 = {
                                createdAt: new Date(),
                                dimension: each,
                                shapeName: shape,
                                area: triArea,
                                id: num
                            };
                            data.push(user_14);
                            fs_1.default.writeFile(__dirname + "/../database/database.json", JSON.stringify(data, null, 3), function (error) {
                                if (error) {
                                    console.log(error);
                                    return res.status(400).send({
                                        status: 'error',
                                        message: "cannot save"
                                    });
                                }
                                return res.status(200).send(user_14);
                            });
                        }
                    }
                    else {
                        res.send("You Must Provided A Validated value For The Length And Breadth Of The Rectangle");
                    }
                }
            }
            else {
                return res.send("The Length And Breadth Of The Rectangle Must Be Provided");
            }
        }
        else if (shape == "circle") {
            var radius = incoming.dimension;
            if (typeof radius == "number") {
                var circleArea = Number((Math.PI * (radius * radius)).toFixed(2));
                var user_15 = {
                    createdAt: new Date(),
                    dimension: radius,
                    shapeName: shape,
                    area: circleArea,
                    id: num
                };
                data.push(user_15);
                fs_1.default.writeFile(__dirname + "/../database/database.json", JSON.stringify(data, null, 3), function (error) {
                    if (error) {
                        console.log(error);
                        return res.status(400).send({
                            status: 'error',
                            message: "cannot save"
                        });
                    }
                    return res.status(200).send(user_15);
                });
            }
            else if (typeof radius == "string") {
                var radiuss = Number(radius);
                if (isNaN(radiuss)) {
                    return res.send("The Radius Provided Is Not A Number");
                }
                else {
                    var circleArea = Number((Math.PI * (radiuss * radiuss)).toFixed(2));
                    var user_16 = {
                        createdAt: new Date(),
                        dimension: radiuss,
                        shapeName: shape,
                        area: circleArea,
                        id: num
                    };
                    data.push(user_16);
                    fs_1.default.writeFile(__dirname + "/../database/database.json", JSON.stringify(data, null, 3), function (error) {
                        if (error) {
                            console.log(error);
                            return res.status(400).send({
                                status: 'error',
                                message: "cannot save"
                            });
                        }
                        return res.status(200).send(user_16);
                    });
                }
            }
            else {
                return res.send("For A Cicle You Must Provide Just A Radius");
            }
        }
        else {
            return res.send("Shape Name Must Be A Square Or A Triangle Or A Rectangle Or A Circle");
        }
        // res.send(shape)
    }
});
exports.default = router;
