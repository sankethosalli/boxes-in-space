// const bunyan = require('bunyan');
 
//  const log = bunyan.createLogger({
//      name: 'ofx',
//      level: 'info',

//      streams: [
//          {
//              level: (process.env.NODE_ENV === 'production') ? 'warn' : 'debug',
//              stream: process.stdout,
//          },
//      ],
//      serializers: {
//          req: bunyan.stdSerializers.req,
//          err: bunyan.stdSerializers.err,

//      }
 
//  });
 

class Log {
    constructor() {
    }
    debug = (params, name = undefined) => {
      if(params !== undefined && name !== undefined){
      console.log("debug:ent123: ", name, params);
    } else if(params !== undefined){
      console.log("debug:ent123: ", params);
    } else if(name !== undefined){
      console.log("debug:ent123: ", name);
    } else{
      console.log("debug:ent123: ", "EMPTY");
    }
    }
    error = (params, name = undefined) => {
      if(params !== undefined && name !== undefined){
      console.log("error:ent123: ", name, params);
    } else if(params !== undefined){
      console.log("error:ent123: ", params);
    } else if(name !== undefined){
      console.log("error:ent123: ", name);
    } else{
      console.log("error:ent123: ", "EMPTY");
    }
    }
  }


const log = new Log();


 module.exports = log;