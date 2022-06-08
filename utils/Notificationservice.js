const Client=require("node-rest-client").Client;
const client=  new Client();
/**
 * Expose a function which will take the following informartion :
 * 
 * subject,
 * content,
 * recepientEmails,
 * requester,
 * ticketId
 * 
 * and then make a POST call
 */
exports.client=client;
exports.sendMail=(tickeId,subject,content,emailIds,requester)=>{

    const reqBody={
        ticketId:tickeId,
        subject:subject,
        content:content,
        recepientEmails:emailIds,
        requester:requester,
    }
    const headers={
        "Content-Type":"application/json"
    }

    const args={
        data:reqBody,
        headers:headers
    }
    client.post("http://localhost:7777/notiServ/api/v1/notification",args,(data,response)=>{

        console.log("REQUEST SENT");
        console.log(data);

       // console.log(response);
    })
    // req.on('requestTimeout', function (req) {
    //     console.log('request has expired');
    //     req.abort();
    // });

    // req.on('responseTimeout', function (res) {
    //     console.log('response has expired');

    // });

    // req.on('error', function (err) {
    //     console.log('request error', err);
    // });

}