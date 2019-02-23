let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the contact model
let contactModel = require('../models/contact');

/* GET contact list page - READ */
router.get('/', (req, res, next) => {
    contactModel.find((err, contactList) => {
        
        if(err) {
            return console.error(err);
        }
        else {
            console.log(contactList);
            
            res.render('contacts/index', {
                title: 'Contact List',
                contactList: contactList
            });
            
        }
    })
});

router.get('/add', (req, res, next)=>{
    res.render('contacts/add', {
        title: 'Add your Contact'
    });
});

router.post('/add', (req, res, next)=>{
    
    //console.log(req.body);
    let newContact = contactModel({
        "firstName": req.body.firstName,            
        "lastName": req.body.lastName,
        "age": req.body.age            
    });

    contactModel.create(newContact, (err, contactModel) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/contact-list');
        }
    });
});

router.get('/edit/:id', (req, res, next)=>{
    let id= req.params.id;
    contactModel.findById(id, (err, contactObject)=>{
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.render('contacts/edit', {
                title: 'Edit contact',
                contact: contactObject
            });
        }
    });
});

router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    let updatedContact = contactModel({
        "_id": id,
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "age": req.body.age
    });

    contactModel.update({_id: id}, updatedContact, (err)=>{
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/contact-list');
        }
    });
});

router.get('/delete/:id', (req, res, next) => {
    let id=req.params.id;

    contactModel.remove({_id: id}, (err) => {
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/contact-list');
        }
    });
});

module.exports = router;