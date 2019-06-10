var express = require('express');
var router = express.Router();
var Note = require('../model/note.js').Note

/* GET users listing. */
router.get('/notes', function(req, res, next) {  //因为前面有api，所以/api可以不写
  var opts = {raw: true}
  if(req.session && req.session.user){
    opts.where = {uid:req.session.user.uid }
  }
  Note.findAll(opts).then(function(notes) {
    if(req.session && req.session.user){
      var user={
        username:req.session.user.username,uid:req.session.user.id,img:req.session.user.avatar
      }
      res.send({status: 0, data: notes,user:user });
    }else{
      res.send({status: 0, data: notes});
    }
  }).catch(function(){
    res.send({ status: 1,errorMsg: '数据库异常'});
  });
});

router.post('/notes/add', function(req, res, next){
  var username = req.session.user.username;
  var uid=req.session.user.uid;
  var o = req.body;
  //判断完成后，开始创建Note
  Note.create({uid:uid,username:username,text:o.text,level:o.level}).then(function(data){
    res.send({status: 0,data:data})
  }).catch(function(){
    res.send({ status: 1,errorMsg: '数据库异常或者你没有权限'});
  })
})


router.post('/notes/edit', function(req, res, next){
  // if(!req.session || !req.session.user){
  //   return res.send({status: 1, errorMsg: '请先登录'})
  // }
  var noteId = req.body.id;
  // var note = req.body.note;
  if(req.body.note){
    o={text:req.body.note}
  }else if(req.body.level){
    o={level:req.body.level}
  }else{
    o={isFinish:req.body.isFinish}
  }
  // var username = req.session.user.username;
  //将文本改为note，条件是where里面的内容
  Note.update(o, {where:{id: noteId}}).then(function(lists){
    // if(lists[0] === 0){
    //   return res.send({ status: 1,errorMsg: '你没有权限'});
    // }
    res.send({status: 0})
  }).catch(function(e){
    res.send({ status: 1,errorMsg: '数据库异常或者你没有权限'});
  })
})

router.post('/notes/delete', function(req, res, next){
  var noteId = req.body.id
  Note.destroy({where:{id:noteId}}).then(function(){
    // if(deleteLen === 0){
    //   return res.send({ status: 1, errorMsg: '你没有权限'});
    // }
    res.send({status: 0})
  }).catch(function(e){
    res.send({ status: 1,errorMsg: '数据库异常或者你没有权限'});
  })
})

module.exports = router;
