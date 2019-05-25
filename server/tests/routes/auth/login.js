/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import mockData from '../../utils/mockData';
import app from '../../../src/app';

const {
    nominalUserDetails, adminUserDetails, invalidUserDetails, emptyUserDetails,
} = mockData.login;

let userToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo0LCJpc0FkbWluIjpmYWxzZX0sImlhdCI6MTU1NzYzNTg0MH0.2beg31aVdbUtrzVCZg5MOVwexhIUN1Xu9N5gCeQE6cc';
let adminToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJpc0FkbWluIjp0cnVlfSwiaWF0IjoxNTU3NjM1NzU2fQ.jdZGusccaSLh4hpK7TfY-46UZ14dI5PigQZa8kz89Vs';

describe('Auth routes: login', () => {
    it('should login a valid nominal user', (done) => {
        request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({ ...nominalUserDetails })
            .end((err, res) => {
                userToken = res.body.data.token;
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body.data.user).to.include.keys('firstname');
                expect(res.body.data.user).to.include.keys('lastname');
                expect(res.body.data.user).to.include.keys('email');
                expect(res.body.data.user).to.include.keys('is_admin');
                expect(res.body.data.user).to.include.keys('created_at');
                expect(res.body.data.user.is_admin).to.equal(null);

                done(err);
            });
    });

    it('should return user token', (done) => {
        request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({ ...nominalUserDetails })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body.data).to.include.keys('token');

                done(err);
            });
    });

    it('should return login in an Admin User', (done) => {
        request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({ ...adminUserDetails })
            .end((err, res) => {
                adminToken = res.body.data.token;
                expect(res.statusCode).to.equal(200);
                expect(res.body.data).to.include.keys('token');
                expect(res.body.data.user.is_admin).to.equal(true);

                done(err);
            });
    });

    it('should return user data details', (done) => {
        request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({ ...nominalUserDetails })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.data).to.include.keys('user');
                expect(res.body.data.user).to.include.keys('email');
                expect(res.body.data.user).to.include.keys('firstname');
                expect(res.body.data.user).to.include.keys('created_at');

                done(err);
            });
    });

    it('should validate invalid credentials', (done) => {
        request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({ ...invalidUserDetails })
            .end((err, res) => {
                expect(res.statusCode).to.equal(401);
                expect(res.body).to.include.keys('error');

                done(err);
            });
    });

    it('should return an error', (done) => {
        request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({ ...invalidUserDetails })
            .end((err, res) => {
                expect(res.statusCode).to.equal(401);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.equal('Invalid Credentials');

                done(err);
            });
    });

    it('should return error of missing password field', (done) => {
        request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({ ...emptyUserDetails })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body.errors[0].param).to.equal('email');

                done(err);
            });
    });

    it('should return error for invalid email format', (done) => {
        request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .send({ ...emptyUserDetails })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                expect(res.body).to.include.keys('errors');

                done(err);
            });
    });
});

describe('Update User Details', () => {
    describe('## Inputs', () => {
        it('should output error for empty user details', (done) => {
            request(app)
                .patch('/api/v1/auth/user')
                .set('authorization', userToken)
                .send({ })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.include.keys('message');
                    expect(res.body).to.include.keys('data');
                    expect(res.body.data).to.be.a('object');

                    done(err);
                });
        });

        it('should output error for unauthorized access', (done) => {
            request(app)
                .patch('/api/v1/auth/user')
                .send({ })
                .end((err, res) => {
                    expect(res.statusCode).to.equal(401);

                    done(err);
                });
        });
    });
});

export default { userToken, adminToken };
