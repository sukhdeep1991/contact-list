"use strict";
const express = require('express');
const bodyParser= require('body-parser');
var mongodb = require('mongodb');
var cors = require('cors');
const MongoClient = mongodb.MongoClient;
const app = express();

app.use(bodyParser.json());
app.use(cors());

var dbCollection;
var contactInformationTypes = ["mobile", "email"];

function isNullOrEmpty(value){
    return value === undefined || value === null || value === "" ||
    (Array.isArray(value) && value.length === 0);
}
function validateContact(contact){
    if(isNullOrEmpty(contact.firstName)){
        return "First Name is required";
    } else if(isNullOrEmpty(contact.lastName)){
        return "Last Name is required";
    } else if(isNullOrEmpty(contact.informations)){
        return "Contact information is missing";
    }
    for(var i = 0; i < contact.informations.length ; i ++){
        if(contactInformationTypes.indexOf(contact.informations[i].type) === -1){
            return "Invalid Contact information type";
        } else if(isNullOrEmpty(contact.informations[i].value)){
            return "Contact information value is not provided";
        }
    }
    return null;
}

MongoClient.connect("mongodb://admin:admin@ds123193.mlab.com:23193/contacts-store", function(error, database){
    if(error){
        console.log("Error while connecting with mongo db", error);
        return;
    }
    dbCollection = database.collection("contacts");
	console.log("Mongo db connected");
	app.listen(4300, function(){
		console.log("Listening on localhost:4300");
	});
});

app.all("*", function(req, res, next){
    setTimeout(function(){
        next();
    }, 5000);
});
//Get existing contacts
app.get("/contacts", function(request, response){
    var docs = [];
    dbCollection.find({}).each(function(error, doc){
        if(error){
            response.status(500).send("Could not get contacts from database");
            return;
        }
        if(doc){
            docs.push(doc);
        } else {
            response.status(200).send(docs);
            return false;
        }
    });
});

app.get("/contacts/:contactId", function(request, response){
    dbCollection.find({_id: new mongodb.ObjectID(request.params.contactId)}).each(function(error, doc){
        if(error){
            response.status(500).send("Could not get contacts from database");
            return;
        }
        if(doc){
            response.status(200).send(doc);
            return false;
        } else {
            response.status(400).send("Contact does not exist");    
        }
    });
});

app.post("/contacts", function(request, response){
    var validationError = validateContact(request.body);
    if(validationError){
        response.status(400).send(validationError);
        return;
    }
    dbCollection.save(request.body, function(error){
        if(error){
            response.status(500).send("Could not save Contact in database");
            return;
        }
        response.status(201).send("Contact created successfully");
    });
});

app.delete("/contacts/:contactId", function(request, response){
    dbCollection.deleteOne({_id: new mongodb.ObjectID(request.params.contactId)}, function(error){
        if(error){
            response.status(500).send("Could not delete Contact from database");
            return;
        }
        response.status(200).send("Contact deleted successfully");
    });
});


app.put("/contacts/:contactId", function(request, response){
    var validationError = validateContact(request.body);
    if(validationError){
        response.status(400).send(validationError);
        return;
    }
    delete request.body._id;
    dbCollection.update({_id:  new mongodb.ObjectID(request.params.contactId)}, 
        request.body, function(error, result){
        if(error || result.modifiedCount === 0){
            console.log(error);
            response.status(500).send("Could not update Contact in database");
            return;
        }
        response.status(200).send("Contact updated successfully");
    });
});