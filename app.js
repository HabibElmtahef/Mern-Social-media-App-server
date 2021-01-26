const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const {MONGOURI} = require('./keys')

app.use(express.json())
app.use(cors())


////////////////////////////////
mongoose.connect(MONGOURI, {
    useNewUrlParser:true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log('Connected to Database Yeaaaah')
})
mongoose.connection.on('error', (err) => {
    console.log('error connecting',err)
})
/////////////////////////////////

app.get('/', (req, res) => {
    res.send('Ana Khedam azbi')
})
app.use('/user', require('./routes/userRoute'))
app.use('/post', require('./routes/postRoute'))

const PORT = 5000

app.listen(PORT, () =>{
    console.log('Ana khedam fi PORT', PORT)
})