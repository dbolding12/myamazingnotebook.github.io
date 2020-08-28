let notesData = require("../db/db.json");
const { nanoid } = require('nanoid')
const fs = require("fs");


module.exports = function(app) {
   
    app.get("/api/notes/", function(req, res) {
      res.json(notesData);
    });
  
app.post("/api/notes/", function(req, res) {
    console.log(req.body)
        req.body.id = nanoid(); //adding number...
    console.log(req.body)
        notesData.push(req.body);
        fs.writeFile("./db/db.json",JSON.stringify(notesData),function(err){
        console.log(err); //for debugging...
            if(err){
                res.json(false);
            }
                res.json(true); 
        });
        
    });
  
app.delete("/api/notes/:id", function(req, res) {
    console.log(req.params);
    const idDelete = req.params.id; //deleting the id....
    const newNotes = notesData.filter(notes => notes.id != idDelete);
      //notesData.length = 0;
      //res.json({ ok: true });
      notesData = newNotes;
      fs.writeFile("./db/db.json",JSON.stringify(newNotes),function(err){
        console.log(err); //for debugging...
            if(err){
                res.json(false);
            }
                res.json(true); 
        });
    });
  };