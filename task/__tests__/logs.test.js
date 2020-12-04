const supertest = require('supertest')
const server = require('../app')


describe('GET /public/logs?from=...&to=...',()=>{

    afterAll((done)=>{
        server.close();
    })

    it('should response status 200 and array',(done)=>{
     supertest(server)
        .get('/public/logs')
        .set({'authorization-token':'a5c9700a-684e-11ea-bc55-0242ac130003'})
        .then(res=>{
            expect(res.status).toBe(200)
            expect(res.body).toEqual(expect.any(Array))
            done()
        }).catch(error=>{
            done(error)
        })
    })

    it('should response status 200 and array',(done)=>{
        supertest(server)
           .get('/public/logs?from=1584970030882&to=1584970031938')
           .set({'authorization-token':'a5c9700a-684e-11ea-bc55-0242ac130003'})
           .then(res=>{
               expect(res.status).toBe(200)
               expect(res.body).toEqual(expect.any(Array))
               done()
           }).catch(error=>{
               done(error)
           })
    })

    it('should response status 404 and message',(done)=>{
        supertest(server)
           .get('/public/logs?from=0000000000000&to=0000000000001')
           .set({'authorization-token':'a5c9700a-684e-11ea-bc55-0242ac130003'})
           .then(res=>{
               expect(res.status).toBe(404)
               expect(res.body).toMatchObject({message:'Resources not found'})
               done()
           }).catch(error=>{
               done(error)
           })
    })

    it('should response status 403 and message',(done)=>{
        supertest(server)
           .get('/public/logs?from=1584970030882&to=1584970031938')
           .set({'authorization-token':'00000000-0000-0000-0000-000000000000'})
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
           .get('/public/logs?from=asdasd&to=asdasd')
           .set({'authorization-token':'a5c9700a-684e-11ea-bc55-0242ac130003'})
           .then(res=>{
               expect(res.status).toBe(400)
               expect(res.body).toMatchObject({message:'Validation failed'})
               done()
           }).catch(error=>{
               done(error)
           })
    })

})

describe('GET /public/logs/:uuid',()=>{

    afterAll((done)=>{
        server.close();
    })

    it('should response status 200 and array',(done)=>{
     supertest(server)
        .get('/public/logs/3a791358-abb0-48da-8770-b0d5ed649092')
        .set({'authorization-token':'a5c9700a-684e-11ea-bc55-0242ac130003'})
        .then(res=>{
            expect(res.status).toBe(200)
            expect(res.body).toEqual(expect.any(Array))
            done()
        }).catch(error=>{
            done(error)
        })
    })

    it('should response status 404 and message',(done)=>{
        supertest(server)
           .get('/public/logs/00000000-0000-0000-0000-000000000000')
           .set({'authorization-token':'a5c9700a-684e-11ea-bc55-0242ac130003'})
           .then(res=>{
               expect(res.status).toBe(404)
               expect(res.body).toMatchObject({message:'Resources not found'})
               done()
           }).catch(error=>{
               done(error)
           })
    })

    it('should response status 403 and array',(done)=>{
        supertest(server)
           .get('/public/logs/3a791358-abb0-48da-8770-b0d5ed649092')
           .set({'authorization-token':'00000000-0000-0000-0000-000000000000'})
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
           .get('/public/logs/3a791358-abb0-48da-8770-b0d5ed649092')
           .set({'authorization-token':'00000000-0000-0000-0000-00000000000'})
           .then(res=>{
               expect(res.status).toBe(400)
               expect(res.body).toMatchObject({message:'Validation failed'})
               done()
           }).catch(error=>{
               done(error)
           })
    })

})