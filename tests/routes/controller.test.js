const request = require("supertest");
const router = require("../../routes/app").router;

test("shouldReturn200Response", async () => {
    const response = await request(router)
        .post("/proofread")
        .send({"text": "魚を食べれる"});
    expect(response.statusCode).toBe(200);

    const resultResponseBody = JSON.parse(response.text);
    expect(resultResponseBody.text).toEqual("魚を食べれる");
    expect(resultResponseBody.errors).toEqual([{
        "column": 5,
        "line": 1,
        "message": "ら抜き言葉を使用しています。"
    },
        {
            "column": 6,
            "line": 1,
            "message": "文末が\"。\"で終わっていません。"
        }]);
})

test("shouldReturn200ResponseWhenRequestNoParam", async () => {
    const response = await request(router)
        .post("/proofread");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("{}");
})

test("shouldReturn200ResponseWhenRequestNoValueParam", async () => {
    const testParam = [""," ","　","  ","　　"," 　"];

    for (const param of testParam) {
        const response = await request(router)
            .post("/proofread")
            .send({"text": param});
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("{}");
    }
})