const request = require('supertest')

const app = require('../../src/app')
const truncate = require('../utils/truncate')
const factory = require('../factories')

describe('Authentication', () => {

    // beforeAll()
    // beforeEach()
    // afterAll()
    // afterEach()

    beforeEach(async () => {
        await truncate()
    })

    it('should authenticate with valid credentials', async () => {
        // CRIANDO USUÁRIO
        const user = await factory.create('User', {
            password: '123123'
        })
        // MANDANDO REQUISIÇÃO DE LOGIN
        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123123'
            })
        // RESULTADO ESPERADO
        expect(response.status).toBe(200)
    })

    it('should not authenticate with invalid credentials', async () => {
        // CRIANDO USUÁRIO
        const user = await factory.create('User', {
            password: '123123'
        })
        // MANDANDO REQUISIÇÃO DE LOGIN
        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '456123'
            })
        // RESULTADO ESPERADO
        expect(response.status).toBe(401)
    })

    it('should return jwt token when authenticated', async () => {
        // CRIANDO USUÁRIO
        const user = await factory.create('User', {
            password: '123123'
        })
        // MANDANDO REQUISIÇÃO DE LOGIN
        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123123'
            })
        // RESULTADO ESPERADO
        expect(response.body).toHaveProperty('token')
    })

    it('should be able to access private routes when authenticated', async () => {
        // CRIANDO USUÁRIO
        const user = await factory.create('User')
        // MANDANDO REQUISIÇÃO DE ACESSO
        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer ${user.generateToken()}`);
        // RESULTADO ESPERADO
        expect(response.status).toBe(200)
    })

    it('should not be able to access private routes with invalid jwt token', async () => {
        // CRIANDO USUÁRIO
        const user = await factory.create('User')
        // MANDANDO REQUISIÇÃO DE ACESSO
        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer 123456`);
        // RESULTADO ESPERADO
        expect(response.status).toBe(401)
    })
    
})