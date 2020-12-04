const supertest = require('supertest')
const server = require('../app')
const randomString = require('crypto-random-string')

describe('POST /internal/users',()=>{

    afterAll((done)=>{
        server.close();
    })

    it('should response status 200 and message',(done)=>{
     supertest(server)
        .post('/internal/users')
        .set({'authorization-token':'320ca9c4-ed20-4f09-bcb8-9b34b976b501'})
        .send({username:randomString({length:10})})
        .then(res=>{
            expect(res.status).toBe(200)
            expect(res.body).toEqual(expect.any(Object))
            done()
        }).catch(error=>{
            done(error)
        })
    })

    it('should response status 409 and message',(done)=>{
        supertest(server)
           .post('/internal/users')
           .set({'authorization-token':'320ca9c4-ed20-4f09-bcb8-9b34b976b501'})
           .send({username:'admin'})
           .then(res=>{
               expect(res.status).toBe(409)
               expect(res.body).toMatchObject({message:'This user already exist'})
               done()
           }).catch(error=>{
               done(error)
           })
       })

       it('should response status 400 and message',(done)=>{
        supertest(server)
           .post('/internal/users')
           .set({'authorization-token':'00000000-0000-0000-0000-000000000000'})
           .send({username:'admin'})
           .then(res=>{
               expect(res.status).toBe(403)
               expect(res.body).toMatchObject({message:'Unauthorized action'})
               done()
           }).catch(error=>{
               done(error)
           })
       })

       it('should response status 400 and message',(done)=>{
        supertest(server)
           .post('/internal/users')
           .send({username:'admin'})
           .then(res=>{
               expect(res.status).toBe(400)
               expect(res.body).toMatchObject({message:'Validation failed'})
               done()
           }).catch(error=>{
               done(error)
           })
       })

  
})