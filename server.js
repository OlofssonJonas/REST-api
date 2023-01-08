const express = require ('express')


//Skriv så här för att kunna fetcha din localhost från din frontend
const cors = require('cors')


//porten för serven sätter jag till 3000
const port = 3000

//Här öppnar jag upp så att jag kan använda fs
const fs = require('fs') 


const app = express()

app.use(cors())
app.use(express.json())

    //GET
            app.get('/api/products', (req, res) => {
            fs.readFile('./products.json', function(err, data){
                data = JSON.parse(data)
               if(err) {
                res.status(404).send('Cannot read file')
               }else{
                res.status(200).send(data)
               }
            })
        })

        app.get('/api/products/:id', (req, res) => {
            fs.readFile('./products.json', function(err, data){
                data = JSON.parse(data)
                const product = data.find((p) => p.id == req.params.id)
                if(err) {
                    res.status(404).send('Cannot read file')
                }else{
                    res.status(200).send(product)
                } 
            })
        })

        //POST
     app.post('/api/products', (req, res) => {
       fs.readFile('./products.json', function(err, data){
            const savedData = JSON.parse(data)
            const jsonData = req.body
             if (err){
                res.status(404).send('Cannot read file')
             }

                //multiplicerar ett nytt id med 1000000 och gör det till en sträng
            jsonData.id = Math.floor(Math.random() * 1000000).toString()

            savedData.push(jsonData)

            fs.writeFile('./products.json', JSON.stringify(savedData, null, 2), function(err) {
                    if(err) {
                        res.status(404).send('Not working')
                     }else{
                         res.status(201).send(jsonData)    
                    }
                });
        });
    });
                        
                        

    //PUT
    app.put("/api/products/:id", (req, res) => {
        fs.readFile("./products.json", function (err, data) {

            //Här sparar jag den parsade datan i en variabel
            let savedData = JSON.parse(data);

            // //Här letar jag upp det specifika id´t
            const product = savedData.find(p => p.id == (req.params.id))
            if(err) {
              res.status(404).send('Cannot read file')
              }

              //Här väljer jag så att jag kan uppdatera priset
              product.price = req.body.price
              
          fs.writeFile("./products.json", JSON.stringify(savedData, null, 2),function (err) {
            if (err) {
                res.status(404).send('Cannot update')
              } else {
                res.status(201).send(product);
              }
            }
          );
        });
    })

     //DELETE
     app.delete('/api/products/:id', (req, res) => {
         fs.readFile('./products.json', function(err, data){
          let savedData = JSON.parse(data);
          const product = savedData.find(p => p.id == (req.params.id))
          if(err) {
            res.status(404).send('Cannot read file')
            }
            
             const index = savedData.indexOf(product)
              savedData.splice(index, 1)
              fs.writeFile('./products.json', JSON.stringify(savedData, null, 2), function(err) {
                  if(err) {
                      res.status(404).send('Cannot delete')
                  }else{
                      res.status(201).send(product)
                  }
                })
            })
        })

app.listen(port, () => console.log(`Yihooo, the server is up and running on port ${port}`));

