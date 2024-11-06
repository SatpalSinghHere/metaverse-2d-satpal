function sum(a, b) {
    return a + b;
}

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

const BACKEND_URL = "http://localhost:3000"

describe("Authenticate", ()=>{
    test("User is able to sign up only for once", async()=>{
        const username = "satpal"+Math.random()
        const password = "password"

        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username, password, type:"admin"
        })
        expect(response.status).toBe(200)

        const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username, password, type:"admin"
        })
        expect(updatedResponse.status).toBe(400)
    })
})