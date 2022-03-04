const supertest = require('supertest');

const app = require('./../app');

describe('Status test',()=>{
    it('Testing status code',async ()=>{
       const response =  await supertest(app).get('/');
       expect(response.statusCode).toEqual(200);
    });

    it('Testing Status Message',async ()=>{
        const response =  await supertest(app).get('/');
        expect(response.text).toEqual('Hello API');
     });
});

describe('Product Inventory Test',()=>{
    it('Test list of products',async ()=>{
       const response =  await supertest(app)
       .get('/productlist')
       .expect(res=>res.status == 200);
    });
});