var Sequelize = require('sequelize')
var path = require('path')
var sequelize = new Sequelize(undefined,undefined,undefined,{
    host: 'localhost',
    dialect: 'sqlite',
    storage: path.join(__dirname,'../database/database.sqlite')
});

var Note=sequelize.define('note',{
  uid:{
    type:Sequelize.STRING,
  },
  text: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING
  },
  level:{
    type: Sequelize.NUMBER
  },
  isFinish:{
    type: Sequelize.BOOLEAN
  } 
})
Note.sync()
// .then(()=>{
//   Note.create({uid:'123', text: "非要尝试上", username: "我是小鱼" ,level:3,isFinish:false}).then(jane => {
//     console.log("Jane's auto-generated ID:");
//   });  
// }).then(()=>{
//   Note.findAll({raw:true}).then(users => {
//     console.log("All users:", JSON.stringify(users, null, 4));
//   });
// })

module.exports.Note=Note;