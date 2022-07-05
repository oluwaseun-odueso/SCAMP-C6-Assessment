const request = require('supertest')
const app = require('../app')

beforeAll(async () => {
    const response = await request(app).post('/user/login')
    .send({
        email: 'blessed@gmail.com',
        password: "blessed"
      })
    token = response.body.token;
  });

describe('Create invoice route', () => {
  test('Successful create request', async () => {
      const response = await request(app)
      .post('/invoice/create_invoice')
      .set('Authorization', `Bearer ${token}`)
      .send({
        "client_id": 32,
        "item": "Vitafoam family bed",
        "quantity": 1,
        "unit_price": "28,000",
        "total": "28,000",
        "payment_status": "unpaid"
      })      
      expect(response.body.message).toBe("New invoice created")
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(response.statusCode).toBe(201);
  })

  test('Successful create request', async () => {
    const response = await request(app)
    .post('/invoice/create_invoice')
    .set('Authorization', `Bearer ${token}`)
    .send({})      
    expect(response.body.message).toBe("Please enter all fields correctly")
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    expect(response.statusCode).toBe(400);
  })
})

describe('Get all invoices route', () => {
  test('All invoices', async () => {
    const response = await request(app)
    .get('/invoice/get_all_invoices')
    .set('Authorization', `Bearer ${token}`)
    expect(response.body.message).toBe("All invoices")
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    expect(response.statusCode).toBe(200);
  })
})

describe('Get an invoice route', () => {
  test('Get an invoice', async () => {
    const response = await request(app)
    .get(`/invoice/get_invoice/${11}`)
    .set('Authorization', `Bearer ${token}`)
    expect(response.body.message).not.toBe("Invoice does not exist")
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    expect(response.statusCode).toBe(200);
  })
})

describe('Delete invoice route', () => {
  test('With valid invoice id', async () => {
    const response = await request(app)
    .delete(`/invoice/delete_invoice/${11}`)
    .set('Authorization', `Bearer ${token}`)
    expect(response.body.message).toBe("Invoice has been deleted")
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    expect(response.statusCode).toBe(200);
  })

  test('With non-valid invoice id', async () => {
    const response = await request(app)
    .delete(`/invoice/delete_invoice/${11}`)
    .set('Authorization', `Bearer ${token}`)
    expect(response.body.message).toBe("Invoice does not exist")
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    expect(response.statusCode).toBe(400);
  })
})