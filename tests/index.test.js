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

    test("Signup fails if the username is empty", async()=>{
        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            password: "password", type:"admin"
        })
        expect(response.status).toBe(400)
    })

    test('Signin succeeds with correct credentials', async()=>{
        const username = "satpal"+Math.random()
        const password = "password"

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username, password, type:"admin"
        })

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username, password, type:"admin"
        })
        expect(response.status).toBe(200)
        expect(response.body.token).toBeDefined()
    })

    test('Signin fails with incorrect credentials', async()=>{
        const username = "satpal"+Math.random()
        const password = "password"

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username, password, type:"admin"
        })

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username, password: "wrongpassword", type:"admin"
        })
        expect(response.status).toBe(403)
    })
})