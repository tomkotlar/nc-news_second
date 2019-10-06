const app = require('./app')
const PORT = procss.env.PORT || 9090

app.listen(PORT,( err) => {
    if (err) throw err
    console.log(`...lisening to port ${PORT}.....`)
})