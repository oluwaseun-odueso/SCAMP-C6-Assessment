const Invoice = require('../models/invoiceModel')

async function createInvoice (user_id, client_id, client_name, email, phone_number, item, quantity, unit_price, total, payment_status) {
    try {
        const details = {user_id, client_id, client_name, email, phone_number, item, quantity, unit_price, total, payment_status}
        const user = await Invoice.create(details)
        return user
    } catch (error) {
        return error
    }
}

async function getAllInvoices (user_id) {
    try {
        const allInvoices = await Invoice.findAll({
            where: {user_id}
        })
        return allInvoices
    } catch (error) {
        return error
    }
}

async function getInvoiceById (id, user_id) {
    try {
        const selected = await Invoice.findOne({  
            where: { id , user_id }
        });
        return selected
    } catch (error) {
        return error
    }
}



async function checkIfInvoiceIsPaid(id, user_id) {
    try {
        const response = await Invoice.findOne({
            attributes: [ "payment_status" ]  ,
            where: { id, user_id }
        })
        return response.payment_status === 'paid' ? true : false
    } catch (error) {
        return error
    }
}

async function deleteAnInvoice (id, user_id) {
    try {
        const response = await Invoice.destroy({
            where: { id, user_id } 
        })
        return response
    } catch (error) {
        return error
    }
}

async function updateReferenceNumber (id, user_id, reference) {
    try {
        const response = await Invoice.update({reference}, {
            where: {id, user_id}
        })
        return response
    } catch (error) {
        return error
    }
}

async function updateInvoiceDetails (id, user_id, client_id, client_name, email, phone_number, item, quantity, unit_price, total, payment_status) {
    try {
        const details = {client_id, client_name, email, phone_number, item, quantity, unit_price, total, payment_status}
        const user = await Invoice.update(details, {
            where: { id , user_id}
        })
        return user
    } catch (error) {
        return error
    }
}

const functions = {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    deleteAnInvoice,
    updateReferenceNumber,
    updateInvoiceDetails, 
    checkIfInvoiceIsPaid
}

module.exports = functions