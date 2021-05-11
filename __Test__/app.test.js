const request = require("supertest");
const app = require("../bin/www");

describe("GET /fetchRecords", function () {
    it("GET All Users In The Database", (done) => {
      request(app)
        .get("/fetchRecords")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
})
describe("POST /calculate", () => {
    it("should solve and print out the area of a square", async() => {
        const data = {
            "shapeName": "square",
            "dimension": 5
        }
        const res = await request(app)
            .post("/calculate")
            .send(data)
            .set("Accept", "application/json");
        expect(res.body.area).toEqual(25)
        expect(res.type).toBe("application/json")
        expect(res.status).toEqual(201);
    });
    it("should solve and print out the area of a circle", async() => {
        const data = {
            "shapeName": "circle",
            "dimension": 7
        }
        const res = await request(app)
            .post("/calculate")
            .send(data)
            .set("Accept", "application/json");
        expect(res.body.area).toEqual(153.94)
        expect(res.type).toBe("application/json")
        expect(res.status).toEqual(201);
    });
});
describe("Error for POST /calculate", () => {
    it("should return error for invalid dimension of a Rectangle", async() => {
        const data = {
            shapeName: "rectangle",
            dimension: 2,
        };
        const res = await request(app)
            .post("/calculate")
            .send(data)
            .set("Accept", "application/json");

            console.log(res.body);

        expect(res.body.message).toBe("You Must Provide Just Length And Breadth Of The Rectangle");
        expect(res.type).toBe("application/json");
        expect(res.status).toEqual(400);
    });
    it("should return error for invalid Triangle sides", async() => {
        const data = {
            shapeName: "triangle",
            dimension: {
                "a": 105,
                "b": 99,
            }
        };
        const res = await request(app)
            .post("/calculate")
            .send(data)
            .set("Accept", "application/json");
            expect(res.body.message).toBe("You Must Provide The Length, Width And Breadth Of The Triangle");
            expect(res.type).toBe("application/json");
        expect(res.status).toEqual(400);
    });
    it("should return error for invalid dimension data type of a square", async() => {
        const data = {
            shapeName: "square",
            dimension: "2A",
        };
        const res = await request(app)
            .post("/calculate")
            .send(data)
            .set("Accept", "application/json");
        expect(res.body.message).toBe("The Side Provided Is Not A Number");
        expect(res.type).toBe("application/json");
        expect(res.status).toEqual(404);
    });
});