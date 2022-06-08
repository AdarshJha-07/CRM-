/**
 * THIS FILE CONTAINS ALL TEST TO TICKETCONTROLLER
*/

const Ticket = require("../../models/ticket.model");
const User = require("../../models/userModels");
const constants = require("../../utils/constant");
const { mockRequest, mockResponse } = require('./interceptor');
const ticketController = require("../../controller/ticket.controller");
const client = require("../../utils/Notificationservice").client;

const saveduserObj = {
  userType: "CUSTOMER",
  password: "323fser4353",
  name: "Test",
  userId: 1,
  email: "test@.com",
  ticketCreated: [],
  ticketAssigned: [],
  save: jest.fn()  //mock the save function
}
const ticketObj = {
  title: "TESTING",
  description: "hello chic chic",
  ticketPriority: 4
}
const updateTicketBody = {

  title: "Test",
  ticketPriority: 4,
  description: "Test",
  status: "CLOSED",
  reporter: 1,
  assignee: 1,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  _id: "saffs2324",

}
const createdTicketBody = {
  _id: "saffs2324",
  title: "Test",
  ticketPriority: 4,
  description: "Test",
  status: "OPEN",
  reporter: 1,
  assignee: 1,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  save: jest.fn().mockReturnValue(Promise.resolve(updateTicketBody))
}


describe("ticket controller create feature", () => {
  it("TEST OF CREATE FUNCTION", async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.body = ticketObj;
    req.userId = 1;
    const userSpy = jest.spyOn(User, 'findOne').mockReturnValue(
      Promise.resolve(saveduserObj)
    )


    const ticketSpy = jest.spyOn(Ticket, 'create').mockImplementation(
      (ticketObj) => Promise.resolve(createdTicketBody)
    )
    const userSpy2 = jest.spyOn(User, 'findOne').mockReturnValue(
      Promise.resolve(saveduserObj)
    )

    const clientSpy = jest.spyOn(client, 'post').mockImplementation(
      (url, args, cb) => cb('Test', null));

    await ticketController.createTicket(req, res);

    expect(userSpy).toHaveBeenCalled();
    expect(ticketSpy).toHaveBeenCalled();
    expect(clientSpy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        _id: "saffs2324",
        title: "Test",
        ticketPriority: 4,
        description: "Test",
        status: "OPEN",
        assignee: 1,


      })
    )

  })
  it("TICKET FAILURE", async () => {

    const req = mockRequest();
    const res = mockResponse();
    req.body = ticketObj;
    req.userId = 1;
    const userSpy = jest.spyOn(User, 'findOne').mockReturnValue(
      Promise.resolve(saveduserObj)
    )
    const ticketSpy = jest.spyOn(Ticket, 'create').mockImplementation(
      cb => cb(new Error("ERROR WHILE CREATING TICKET"), null)
    );

    await ticketController.createTicket(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Some internal error"
    })

  })
});
  describe("ticket update ",()=>{
  it("update",async()=>{
          
         const req=mockRequest();
         const res=mockResponse();
         req.body=updateTicketBody;
         req.params={
           id:createdTicketBody._id
         }
         req.userId=1;
       const ticketSpy=jest.spyOn(Ticket,"findOne").mockReturnValue(
         Promise.resolve(createdTicketBody)
       )
       const userSpy=jest.spyOn(User,"findOne").mockReturnValue(
       Promise.resolve(saveduserObj)
       )
       await ticketController.updateTicket(req, res);
         expect(ticketSpy).toHaveBeenCalled();
         expect(userSpy).toHaveBeenCalled();
         expect(res.status).toHaveBeenCalledWith(200);

  })
})

// test("TWO OBJECT",()=>{
//   const object={
//   name:"ADARSH",
//   age:22,
//   address:{
//     lane:"23",
//     building:"dhoom"
//   }
// }
//   expect(object).toEqual({
//     name:"ADARSH",
//     age:22,
//     address:{
//       lane:"23",
//       building:"dhoom"
//     }
//   })
// })