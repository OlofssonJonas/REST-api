const express = require ('express')


//Skriv så här för att kunna fetcha din localhost
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
                console.log(err)
                res.status(404).send('Produts doesn´t exist')
               }else{
                res.status(200).send(data)
               }
            })
        })

        app.get('/api/products/:id', (req, res) => {
            fs.readFile('./products.json', function(err, data){
                data = JSON.parse(data)
                const product = data.find((p) => p.id == req.params.id)
                if(!product) {
                    res.status(404).send('Id doesn´t exist')
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

                //multiplicerar ett nytt id med 1000000 och gör det till en sträng
            jsonData.id = Math.floor(Math.random() * 1000000).toString()
            
            console.log(jsonData)

            savedData.push(jsonData)

            fs.writeFile('./products.json', JSON.stringify(savedData, null, 2), function(err) {
            if(err) {
                         console.log(err)
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
            if(!product) {
              res.status(404).send('the id doesnt exist')
              }

              //Här väljer jag så att jag kan uppdatera priset
              product.price = req.body.price
              
          fs.writeFile("./products.json", JSON.stringify(savedData, null, 2),function (err) {
            if (err) {
              
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
          if(!product) {
            res.status(404).send('the id doesnt exist')
            }
            
             const index = savedData.indexOf(product)
              savedData.splice(index, 1)
              fs.writeFile('./products.json', JSON.stringify(savedData, null, 2), function(err) {
                  if(err) {
                      console.log(err)
                  }else{
                      res.status(201).send(product)
                  }
                })
            })
        })

app.listen(port, () => console.log(`yihooo on port ${port}`));

