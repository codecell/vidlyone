const request = require('supertest');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');
const mongoose = require('mongoose');
let server;

describe('/genres', () => {
  
   beforeEach(() => { server = require('../../index'); });
   afterEach(async () => { 
    await server.close();
    await Genre.remove({});
   }) ;

 describe('GET /', () => {
     it('should return all genres', async () => {
        await Genre.collection.insertMany([{name: 'genre1'}, {name: 'genre2'}]);

         const res = await request(server).get('/genres');
         expect(res.status).toBe(200);
         expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
         expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
     });
   });

  describe('GET /:id', () => {
     it('should return the genre if given id is valid',async () => {
       const genre = new Genre({ name: 'genre1'});
       await genre.save();

       const res = await request(server).get('/genres/' + genre._id);
       expect(res.status).toBe(200);
       expect(res.body).toHaveProperty('name', genre.name);
     });

     it('should return 404 if given id is invalid',async () => {

      const res = await request(server).get('/genres/0');
      expect(res.status).toBe(404);
      });
   });

  describe('POST /genres', () => {

     let token;
     let name;
     
     const exec = async () => {
        return await request(server)
        .post('/genres')
        .set('x-auth-token', token)
        .send({ name: name}); 
     };
     beforeEach(() => { 
       token = new User().generateAuthToken();
       name = 'genre1' 
     });
     

    it('should return 401 if client is not logged in',async () => {
         token ='';
         const res = await exec();

         expect(res.status).toBe(401);
     });

     it('should return 400 if genre is less than 5 characters',async () => {      
         name = '1234';
         const res = await exec();
         expect(res.status).toBe(400);
     });

     it('should return 400 if genre is more than 50 characters',async () => {
        
         name = new Array(55).join('a');
        
        const res = await exec();
        expect(res.status).toBe(400);
      });

    it('should save the genre if its valid',async () => {

         await exec();
         const genre = await Genre.find({ name: 'genre1'});
         expect(genre).not.toBeNull();
    }); 

    it('should return the genre to client if its valid',async () => {      
          name = 'genre1';
          const res = await exec();
    
          expect(res.body).toHaveProperty('_id');
          expect(res.body).toHaveProperty('name', 'genre1');
    }); 

  }); 
}); 
