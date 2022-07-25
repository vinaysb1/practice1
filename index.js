var http = require('http');
var fs = require('fs');
var url = require('url');
const { exit } = require('process');

var server = http.createServer(function (req, res) {
    
    const myURL = new URL(req.url, "http://localhost:8080");
    //console.log(myURL.pathname);
    //console.log(myURL.search);  

    if(req.url.localeCompare('/')==0)
    {
      fs.readFile('index.html', function (err, data) {
        if (err) {
          return console.error(err);
        }
        console.log("Asynchronous read successful for index.html ");
        res.write(data.toString());
        res.end();    
      });
    }
    else if (req.url.localeCompare('/about')==0)
    {
      fs.readFile('about.html', function (err, data) {
        if (err) {
          return console.error(err);
        }
        console.log("Asynchronous read successful for about.html ");
        res.write(data.toString());
        res.end();    
      });
    }
    else if (req.url.localeCompare('/contact')==0)
    {
      fs.readFile('contact.html', function (err, data) {
        if (err) {
          return console.error(err);
        }
        console.log("Asynchronous read successful for contact.html ");
        res.write(data.toString());
        res.end();    
      });
    }
    else if (req.url.localeCompare('/register')==0)
    {
        fs.readFile('register.html', function (err, data) {
            if (err) {
              return console.error(err);
            }
            console.log("Asynchronous read successful for contact.html ");
            res.write(data.toString());
            res.end();    
          });
    }
    else if (myURL.pathname.localeCompare('/create')==0)
    {
        var n = myURL.searchParams.get('name');
        var a = parseInt(myURL.searchParams.get('age'));
        var m = myURL.searchParams.get('mobile');
        var e = myURL.searchParams.get('email');
    
        const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://vinayb:321@cluster0.fyrqq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });        
        client.connect(err => {
          try
          {
                var db =  client.db("company");
                db.collection("employees").insertOne({name:n, age:a, mobile:m, email:e}, function(err, resp){
                if (err)
                {
                    console.log(err.message);
                }
                console.log("1 document inserted");
                res.write("Your Name " + n + "<br>");
                res.write("Your Age " + a + "<br>");
                res.write("Your account details has been stored in the database");
                res.end();
            });
          }
          catch(e)
          {
              console.log(e);
          }          
        });
      }
    else if (myURL.pathname.localeCompare('/view')==0)
    {
      const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = "mongodb+srv://vinayb:321@cluster0.fyrqq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });       
      client.connect(err => {
      try
      {
            var db =  client.db("college");
            db.collection("employees").find({}).toArray(function (err, result){
            if (err)
              console.log(err.message);
            console.log("records found");
            //console.log(result);
            console.log(result.length);
            for(var i=0; i<result.length; i++)
            {
              res.write(result[i]['name']);
              res.write("<br>");
            }
            res.end();
          });
        }
        catch(e)
        {
            console.log(e);
        }
        // perform actions on the collection object
        // client.close();
        //console.log("Connected");
        
      });
      }
    else
    {
        res.write("Page not found");
        res.end();
    }



});

server.listen(8080);
