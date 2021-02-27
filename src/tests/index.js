
const  chai =require( 'chai');
const chaiHttp =require ('chai-http');
const app =require('../server');

chai.use(chaiHttp);
chai.should();

describe('App Tests', () => {
   it('should return the homepage', (done) => {
      chai.request(app).get('/')
      .end((err,res) => {
         res.should.have.status(404);
         done();
      })
   });
});