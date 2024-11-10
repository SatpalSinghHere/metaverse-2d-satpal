const axios2 = require("axios");

function sum(a, b) {
    return a + b;
}

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

const BACKEND_URL = "http://localhost:3000"
const WS_URL = "ws://localhost:3001"

const axios = {
    post: async (...args) =>{
        try {
            const response = await axios2.post(...args)
            return response
        }
        catch(e){
            return e.response
        }
    },
    get: async (...args) =>{
        try {
            const response = await axios2.get(...args)
            return response
        }
        catch(e){
            return e.response
        }
    },
    put: async (...args) =>{
        try {
            const response = await axios2.put(...args)
            return response
        }
        catch(e){
            return e.response
        }
    },
    delete: async (...args) =>{
        try {
            const response = await axios2.delete(...args)
            return response
        }
        catch(e){
            return e.response
        }
    }
}

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
        expect(response.data.token).toBeDefined()
    })

    test('Signin fails with incorrect credentials', async()=>{
        const username = "satpal"+Math.random()
        const password = "password"

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username, password, type:"admin"
        })

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username, password: "wrongpassword"
        })
        expect(response.status).toBe(403)
    })
})

// describe("User metadata endpoints", ()=>{
//     let token = ""
//     let avatarId = ""
//     beforeAll(async()=>{
//         const username = "satpal"+Math.random()
//         const password = "password"

//         await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username, password, type:"admin"
//         })

//         const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username, password
//         })
//         token = response.body.token

//         const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/avatar`, {
//             imageUrl: "https://w7.pngwing.com/pngs/680/217/png-transparent-avatar-man-8-bit-guy-dude-gaming-graphics-computer-generated-technology-thumbnail.png",
//             name: "avatar1"
//         })

//         const avatarId = avatarResponse.body.avatarId
//     })

//     test("User cannot update their metadat with wrong avatar id", async()=>{
//         const response = await axios.patch(`${BACKEND_URL}/api/v1/user/metadata`, {
//             avatar: "wrongid"
//         })
//         expect(response.status).toBe(400)
//     })

//     test("User can update their metadata with correct avatar id", async()=>{
//         const response = await axios.patch(`${BACKEND_URL}/api/v1/user/metadata`, {
//             avatar: "correctid"
//         },{
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//         expect(response.status).toBe(200)
//     })

//     test("User cannot update their metadata if auth header is not present", async()=>{
//         const response = await axios.patch(`${BACKEND_URL}/api/v1/user/metadata`, {
//             avatar: "correctid"
//         })
//         expect(response.status).toBe(403)
//     })
// })

// describe("User avatar information", ()=>{
//     let token = ""
//     let avatarId = ""
//     let userId=""
//     beforeAll(async()=>{
//         const username = "satpal"+Math.random()
//         const password = "password"

//         const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username, password, type:"admin"
//         })

//         userId = signupResponse.body.userId 

//         const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username, password
//         })
//         token = response.body.token

//         const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/avatar`, {
//             imageUrl: "https://w7.pngwing.com/pngs/680/217/png-transparent-avatar-man-8-bit-guy-dude-gaming-graphics-computer-generated-technology-thumbnail.png",
//             name: "avatar1"
//         })

//         avatarId = avatarResponse.body.avatarId
//     })

//     test("Get back avatar information for a user", async()=>{
//         const response = await axios.get(`${BACKEND_URL}/api/v1/user/metadata/bulk?ids=[${userId}]`)
//         expect(response.status).toBe(200)
//         expect(response.data.avatars.length).toBe(1)
//     })

//     test("Available list of recently created avatars", async()=>{
//         const response = await axios.get(`${BACKEND_URL}/api/v1/avatars`)
//         expect(response.status).toBe(200)
//         expect(response.data.avatars.length).not.toBe(0) 

//         const currentAvatarIds = response.data.avatars.find(x=>x.avatarId === avatarId)
//         expect(currentAvatarIds).toBeDefined()
//     })
// })

// describe("Space information", ()=>{
//     let mapid=''
//     let element1Id =''
//     let element2Id =''
//     let adminToken = ""
//     let adminId=""
//     let userToken = ""
//     let userId = ""
//     beforeAll(async()=>{
//         const username = "satpal"+Math.random()
//         const password = "password"

//         const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username, password, type:"admin"
//         })

//         adminId = signupResponse.body.userId 

//         const signinResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username, password
//         })
//         adminToken = signinResponse.body.token 
        
//         const userSignupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username: username + '-user', password, type:"user"
//         })

//         userId = userSignupResponse.body.userId 

//         const userSigninResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username: username + '-user', password
//         })
//         userToken = userSigninResponse.body.token 
        
//         const element1Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://w7.pngwing.com/pngs/680/217/png-transparent",
//             "width": 1,
//             "height": 1,
//             "static": true
//         },{
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })
//         const element2Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://w7.pngwing.com/pngs/680/217/png-transparent",
//             "width": 1,
//             "height": 1,
//             "static": true
//         },{
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })

//         element1Id = element1Response.data.id
//         element2Id = element2Response.data.id

//         const mapResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/map`, {
//             "thumbnail": "https://e7.pngegg.com/pngimages/1001/156/png-clipart-map-pixel-art-map-angle-white.png",
//             "dimensions": "100x200",
//             "defaultElements": [
//                 {
//                     elementId: element1Id,
//                     x: 20,
//                     y: 20
//                 },
//                 {
//                     elementId: element2Id,
//                     x: 18,
//                     y: 20
//                 },
//                 {
//                     elementId: element2Id,
//                     x: 19,
//                     y: 20
//                 }
//             ]
//         },{
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })

//         mapid = mapResponse.data.id

        
//     })

//     test('User is able to create a space', async()=>{
//         const response = await axios.post(`${BACKEND_URL}/api/v1/space`,{
//             "name":"test",
//             "dimensions":"100x200",
//             "mapId":mapid
//         },{
//             headers: {
//                 authorization: `Bearer ${userToken}`
//             }
//         })
//         expect(response.spaceId).toBeDefined()
//     })

//     test('User is able to create a space without passing spaceId', async()=>{
//         const response = await axios.post(`${BACKEND_URL}/api/v1/space`,{
//             "name":"test",
//             "dimensions":"100x200",
//         },{
//             headers: {
//                 authorization: `Bearer ${userToken}`
//             }
//         })
//         expect(response.spaceId).toBeDefined()
//     })

//     test('User is not able to create a space without passing spaceId and dimensions', async()=>{
//         const response = await axios.post(`${BACKEND_URL}/api/v1/space`,{
//             "name":"test",
//         },{
//             headers: {
//                 authorization: `Bearer ${userToken}`
//             }
//         })
//         expect(response.statusCode).toBe(400)
//     })

//     test('User is not able to delete a space that doesnt exist', async()=>{
//         const response = await axios.delete(`${BACKEND_URL}/api/v1/space/randomIdDoesntExist`,{
//             headers: {
//                 authorization: `Bearer ${userToken}`
//             }
//         })
//         expect(response.statusCode).toBe(400)
//     })

//     test('User is able to delete a space that does exist', async()=>{
//         const response = await axios.post(`${BACKEND_URL}/api/v1/space`,{
//             "name":"test",
//             "dimensions":"100x200",
//         },{
//             headers: {
//                 authorization: `Bearer ${userToken}`
//             }
//         })

//         const deleteResponse = await axios.delete(`${BACKEND_URL}/api/v1/space/${response.body.spaceId}`,{
//             headers: {
//                 authorization: `Bearer ${userToken}`
//             }
//         })
//         expect(deleteResponse.statusCode).toBe(200)
//     })

//     test('User is not able to delete a space i.e created by another user', async()=>{
//         const response = await axios.post(`${BACKEND_URL}/api/v1/space`,{
//             "name":"test",
//             "dimensions":"100x200",
//         },{
//             headers: {
//                 authorization: `Bearer ${userToken}`
//             }
//         })

//         const deleteResponse = await axios.delete(`${BACKEND_URL}/api/v1/space/${response.body.spaceId}`,{
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })
//         expect(deleteResponse.statusCode).toBe(400)
//     })

//     test('Admin has no spaces initially', async()=>{
//         const response = await axiox.get(`${BACKEND_URL}/api/v1/space/all`,{
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })
//         expect(response.data.spaces.length).toBe(0)
//     })

//     test('Admin has no spaces initially', async()=>{
//         const spaceCreateResponse = await axios.post(`${BACKEND_URL}/api/v1/space`,{
//             "name":"test",
//             "dimensions":"100x200",
//         },{
//             headers: {
//                 authorization: `Bearer ${userToken}`
//             }
//         })
//         const response = await axiox.get(`${BACKEND_URL}/api/v1/space/all`,{
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })

//         const filteredSpace = response.body.spaces.find(x=>x.id == spaceCreateResponse.spaceId)
//         expect(response.data.spaces.length).toBe(1)
//         expect(filteredSpace).toBeDefined()
//     })



// })

// describe('Arena Endpoints', ()=>{
//     let mapid=''
//     let element1Id =''
//     let element2Id =''
//     let adminToken = ""
//     let adminId=""
//     let userToken = ""
//     let userId = ""
//     let spaceId = ""

//     beforeAll(async()=>{
//         const username = "satpal"+Math.random()
//         const password = "password"

//         const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username, password, type:"admin"
//         })

//         adminId = signupResponse.body.userId 

//         const signinResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username, password
//         })
//         adminToken = signinResponse.body.token 
        
//         const userSignupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username: username + '-user', password, type:"user"
//         })

//         userId = userSignupResponse.body.userId 

//         const userSigninResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username: username + '-user', password
//         })
//         userToken = userSigninResponse.body.token 
        
//         const element1Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://w7.pngwing.com/pngs/680/217/png-transparent",
//             "width": 1,
//             "height": 1,
//             "static": true
//         },{
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })
//         const element2Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://w7.pngwing.com/pngs/680/217/png-transparent",
//             "width": 1,
//             "height": 1,
//             "static": true
//         },{
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })

//         element1Id = element1Response.data.id
//         element2Id = element2Response.data.id

//         const mapResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/map`, {
//             "thumbnail": "https://e7.pngegg.com/pngimages/1001/156/png-clipart-map-pixel-art-map-angle-white.png",
//             "dimensions": "100x200",
//             "defaultElements": [
//                 {
//                     elementId: element1Id,
//                     x: 20,
//                     y: 20
//                 },
//                 {
//                     elementId: element2Id,
//                     x: 18,
//                     y: 20
//                 },
//                 {
//                     elementId: element2Id,
//                     x: 19,
//                     y: 20
//                 }
//             ]
//         },{
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })

//         mapid = mapResponse.data.id

//         const spaceResponse = await axios.post(`${BACKEND_URL}/api/v1/space`,{
//             "name":"test",
//             "dimensions":"100x200",
//             "mapId":mapid
//         },{
//             headers: {
//                 authorization: `Bearer ${userToken}`
//             } 
//         })

//         spaceId = spaceResponse.data.spaceId

        
//     })

//     test('Incorrect spaceId returns a 400', async()=>{
//         const response = await axios.get(`${BACKEND_URL}/api/v1/space/wrongSpaceId`,{
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })
//         expect(response.statusCode).toBe(400)
//     })

//     test('Correct space id returns all the elements', async()=>{
//         const response = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`,{
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })
//         expect(response.data.dimensions).toBe("100x200")
//         expect(response.data.elements.length).toBe(2)
//     })

//     test('Delete endpoint is able to delete an element', async()=>{
//         const response = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`,{
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })
//         await axios.delete(`${BACKEND_URL}/api/v1/space/element`,{
//             spaceId: spaceId,
//             elementId: response.data.elementId[0].id
//         })
//         const newResponse = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`,{
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })
//         expect(response.data.elements.length).toBe(1)
//     })

//     test('Adding an element fails if x or y lies outside the dimensions', async()=>{
        
//         await axios.post(`${BACKEND_URL}/api/v1/space/element`,{
//             "elementId": element1Id,
//             "spaceId": spaceId,
//             "x": 1000000,
//             "y": 10000000, 
//         },{
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })
        
//         expect(response.statusCode).toBe(400)
//     })

//     test('Adding an element works as expected', async()=>{
        
//         await axios.post(`${BACKEND_URL}/api/v1/space/element`,{
//             "elementId": element1Id,
//             "spaceId": spaceId,
//             "x": 10,
//             "y": 10
//         },{
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })
//         const newResponse = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`)
//         expect(response.data.elements.length).toBe(3)
//     })
// })

// describe('Admin Endpoints', async()=>{
    
//     let adminToken = ""
//     let adminId=""
//     let userToken = ""
//     let userId = ""
    

//     beforeAll(async()=>{
//         const username = "satpal"+Math.random()
//         const password = "password"

//         const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username, password, type:"admin"
//         })

//         adminId = signupResponse.body.userId 

//         const signinResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username, password
//         })
//         adminToken = signinResponse.body.token 
        
//         const userSignupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//             username: username + '-user', password, type:"user"
//         })

//         userId = userSignupResponse.body.userId 

//         const userSigninResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//             username: username + '-user', password
//         })
//         userToken = userSigninResponse.body.token 
//     })

//     test('User is not able to hit admin endpoints', async()=>{
//         const elementResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://w7.pngwing.com/pngs/680/217/png-transparent",
//             "width": 1,
//             "height": 1,
//             "static": true
//         },{
//             headers: {
//                 authorization: `Bearer ${usertoken}`
//             }
//         })

//         const mapResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/map`, {
//             "thumbnail": "https://e7.pngegg.com/pngimages/1001/156/png-clipart-map-pixel-art-map-angle-white.png",
//             "dimensions": "100x200",
//             "defaultElements": []
//         },{
//             headers: {
//                 authorization: `Bearer ${userToken}`
//             }
//         })

//         const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/avatar`, {
//             imageUrl: "https://w7.pngwing.com/pngs/680/217/png-transparent-avatar-man-8-bit-guy-dude-gaming-graphics-computer-generated-technology-thumbnail.png",
//             name: "avatar1"
//         },{
//             headers: {
//                 authorization: `Bearer ${userToken}`
//             }
//         })

//         const updateElementResponse =  await axios.put(`${BACKEND_URL}/api/v1/admin/element/123`, {
//             imageUrl: "https://w7.pngwing.com/pngs/680/217/png-transparent-avatar-man-8-bit-guy-dude-gaming-graphics-computer-generated-technology-thumbnail.png",
            
//         },{
//             headers: {
//                 authorization: `Bearer ${userToken}`
//             }
//         })

//         expect(elementResponse.statusCode).toBe(403)
//         expect(mapResponse.statusCode).toBe(403)
//         expect(avatarResponse.statusCode).toBe(403)
//         expect(updateElementResponse.statusCode).toBe(403)
//     })

//     test('Admin is able to hit admin endpoints', async()=>{
//         const elementResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://w7.pngwing.com/pngs/680/217/png-transparent",
//             "width": 1,
//             "height": 1,
//             "static": true
//         },{
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })

//         const mapResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/map`, {
//             "thumbnail": "https://e7.pngegg.com/pngimages/1001/156/png-clipart-map-pixel-art-map-angle-white.png",
//             "dimensions": "100x200",
//             "defaultElements": []
//         },{
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })

//         const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/avatar`, {
//             imageUrl: "https://w7.pngwing.com/pngs/680/217/png-transparent-avatar-man-8-bit-guy-dude-gaming-graphics-computer-generated-technology-thumbnail.png",
//             name: "avatar1"
//         },{
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })

//         expect(elementResponse.statusCode).toBe(403)
//         expect(mapResponse.statusCode).toBe(403)
//         expect(avatarResponse.statusCode).toBe(403)
        
//     })

//     test('Admin is able to update the imageUrl for an element', async()=>{
//         const elementResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://w7.pngwing.com/pngs/680/217/png-transparent",
//             "width": 1,
//             "height": 1,
//             "static": true
//         },{
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })

//         const updateElementResponse =  await axios.put(`${BACKEND_URL}/api/v1/admin/element/${elementResponse.data.id}`, {
//             imageUrl: "https://w7.pngwing.com/pngs/680/217/png-transparent-avatar-man-8-bit-guy-dude-gaming-graphics-computer-generated-technology-thumbnail.png",
            
//         },{
//             headers: {
//                 authorization: `Bearer ${userToken}`
//             }
//         })

//         expect(updateElementResponse.statusCode).toBe(200)
//     })
// })

// describe('Websockets tests', ()=>{
//     let adminToken
//     let adminId
//     let userToken
//     let userId
//     let mapid=''
//     let element1Id =''
//     let element2Id =''
//     let spaceId = ""
//     let ws1Messages = []
//     let ws2Messages = []
//     let userX
//     let userY
//     let adminX
//     let adminY

//     function waitForAndPopLatestMessage(messageArray){
//         return new Promise(r=>{
//             if(messageArray.length>0){
//               resolve(messageArray.shift())  
//             }else{
//                 let interval = setInterval(()=>{
//                     if(messageArray.length > 0){
//                         resolve(messageArray.shift())
//                         clearInterval(interval)
//                     }
//                 }, 100)
//             }
//         })
//     }

//     async function setupHTTP(){
//         const username = 'satpal'+Math.random()
//         const password = 'password'

//         const adminSignupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//             username, password, role:'admin'
//         })

//         const adminSigninResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
//             username, password
//         })
//         adminid = adminSignupResponse.data.userId
//         adminToken = adminSigninResponse.data.token

//         const userSignupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
//             username: username+'-user', password, role:'user'
//         })

//         const userSigninResponse = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
//             username: username+'-user', password
//         })
//         userId = adminSignupResponse.data.userId
//         userToken = adminSigninResponse.data.token

//         const element1Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://w7.pngwing.com/pngs/680/217/png-transparent",
//             "width": 1,
//             "height": 1,
//             "static": true
//         },{
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })
//         const element2Response = await axios.post(`${BACKEND_URL}/api/v1/admin/element`, {
//             "imageUrl": "https://w7.pngwing.com/pngs/680/217/png-transparent",
//             "width": 1,
//             "height": 1,
//             "static": true
//         },{
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })

//         element1Id = element1Response.data.id
//         element2Id = element2Response.data.id

//         const mapResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/map`, {
//             "thumbnail": "https://e7.pngegg.com/pngimages/1001/156/png-clipart-map-pixel-art-map-angle-white.png",
//             "dimensions": "100x200",
//             "defaultElements": [
//                 {
//                     elementId: element1Id,
//                     x: 20,
//                     y: 20
//                 },
//                 {
//                     elementId: element2Id,
//                     x: 18,
//                     y: 20
//                 },
//                 {
//                     elementId: element2Id,
//                     x: 19,
//                     y: 20
//                 }
//             ]
//         },{
//             headers: {
//                 authorization: `Bearer ${adminToken}`
//             }
//         })

//         mapid = mapResponse.data.id

//         const spaceResponse = await axios.post(`${BACKEND_URL}/api/v1/space`,{
//             "name":"test",
//             "dimensions":"100x200",
//             "mapId":mapid
//         },{
//             headers: {
//                 authorization: `Bearer ${userToken}`
//             } 
//         })

//         spaceId = spaceResponse.data.spaceId 
//     }

//     async function setupWs(){
//         ws1 = new WebSocket(WS_URL)
        
//         await new Promise(r=>{
//             ws1.onopen = r
//         })
        
//         ws1.onmessage = (event) =>{
//             ws1Messages.push(JSON.parse(event.data))
//         }

//         ws2 = new WebSocket(WS_URL)

//         await new Promise(r=>{
//             ws2.onopen = r
//         })        
//         ws2.onmessage = (event) =>{
//             ws2Messages.push(JSON.parse(event.data))
//         }
//     }

//     beforeAll(async()=>{
//         setupHTTP()
//         setupWs()
//     })

//     test("Get back ack for joining the space", async()=>{
//         ws1.send(JSON.stringify({
//             "type": "join",
//             "payloads": {
//                 "spaceId": spaceId,
//                 "token": adminToken            }
//         }))
//         const message1 = await waitForAndPopLatestMessage(ws1Messages)

//         ws1.send(JSON.stringify({
//             "type": "join",
//             "payloads": {
//                 "spaceId": spaceId,
//                 "token": userToken            }
//         }))

//         const message2 = await waitForAndPopLatestMessage(ws2Messages)
//         const message3 = await waitForAndPopLatestMessage(ws1Messages)

//         expect(message1.type).toBe("space-joined")
//         expect(message2.type).toBe("space-joined")

//         expect(message1.payload.users.length).toBe(0)
//         expect(message2.payload.users.length).toBe(1)
//         expect(message3.type).toBe("user-join")
//         expect(message3.payload.x).toBe(message2.payload.spawn.x)
//         expect(message3.payload.y).toBe(message2.payload.spawn.y)
//         expect(message3.payload.userId).toBe(userId)

//         expect(message1.payload.users.length + message2.payload.users.length).toBe(1)

//         adminX = message1.payload.spawn.x
//         adminY = message1.payload.spawn.y

//         userX = message2.payload.spawn.x
//         userY = message2.payload.spawn.y
//     })

//     test('User should not be able to move accross the boundary of the wall', async()=>{
//         ws1.send(JSON.stringify)({
//             type:"movement",
//             payload : {
//                 x: 1000000,
//                 y: 10000
//             }
//         })
//         const message = await waitForAndPopLatestMessage(ws1Messages)
//         expect(message.type).toBe("movement-rejected")
//         expect(message.payload.x).toBe(adminX)
//         expect(message.payload.y).toBe(adminY)
//     })

//     test('User should not be able to move two bloacks at the same time', async()=>{
//         ws1.send(JSON.stringify)({
//             type:"movement",
//             payload : {
//                 x: adminX + 2,
//                 y: 10000
//             }
//         })
//         const message = await waitForAndPopLatestMessage(ws2Messages)
//         expect(message.type).toBe("movement-rejected")
//         expect(message.payload.x).toBe(adminX)
//         expect(message.payload.y).toBe(adminY)
//     })    
    
//     test('If a user leaves, the other user receives a leave event', async()=>{
//         ws1.close()
//         const message = await waitForAndPopLatestMessage(ws2Messages)
//         expect(message.type).toBe("user-left")
//         expect(message.payload.userId).toBe(adminUserId)
        
//     }) 
// })