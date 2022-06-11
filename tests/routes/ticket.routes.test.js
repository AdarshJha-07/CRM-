const User = require("../../models/userModels");
const db = require("../db");
const config = require("../../utils/auth.configs");
const client = require("../../utils/Notificationservice").client;
const request = require("supertest");
const app = require("../../index");
const { ticketPriority } = require("../../utils/constant");
const jwt =require("jsonwebtoken");
/**
 * I need to have the server
 */

beforeAll(async () => {

    /**
     * connection
     */

    /**
     * This will be executed before all the tests
     */
    await db.clearDatabase();
    /**
     * Insert one test user in the database
     */
    await User.create({

        name: "Adarsh",
        userId: 1,
        email: "adarshjha91101@gmail.com",
        userType: "ENGINEER",
        password: "Welcome1",
        userStatus: "APPROVED"

    })
})

/**
 * After all the tests are done
 */
afterAll( async ()=>{
   await db.closeDatabase();

})


/**
 * Test app.post("/crm/api/v1/tickets",
 *     [authJwt.verifyToken],ticketController.createTicket);  
 */

const ticketRequestBody = {
    title: "Test",
    ticketPriority: 4,
    description: "Test",
    status: "OPEN",
    assignee: 1
}

describe("testing the POST Ticket creation endpoint", () => {

    const apiEndpoint = "/crm/api/v1/ticket";

    /**
     * 1. Request body - I have
     * 2. JWT Access token in the header
     * 3. POST call
     */

    const token = jwt.sign({ id: 1 },config.secret.code , {
        expiresIn: 600
    });

    /**
     * Mock the notification service
     */
    jest.spyOn(client, 'post').mockImplementation((url, args, cb) => cb("Test", null));


    it("I should be able to successfully create a ticket",async () => {

        /**
         * Call the API
         * 
         * I need the server, and I need the supertest
         */

    const res = await request(app).post(apiEndpoint).set("x-access-token", token).send(ticketRequestBody);

        expect(res.status).toEqual(201);


    });

});