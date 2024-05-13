import express from 'express'
const app = express();
app.use(express.json())

const PORT = process.env.PORT || 3000

//middleWare functions
const loggingMiddleWare = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`)
    next();
};

app.use(loggingMiddleWare, (req, res, next) => {
    console.log('finished logging...... ')
    next();
});

const resolveIndexByUserId = (req, res, next) => {
    const {
        body,
        params: { id }} = req;
    const parseId = parseInt(id)
    if(isNaN(parseId)) return res.sendStatus(400);
    const findUserIndex = usersTable.findIndex((user) => user.id === parseId)
    if(findUserIndex === -1) return res.sendStatus(404);
    req.findUserIndex === findUserIndex;
    next();

  
}

//GET Request
const usersTable = [
    {id : 1, userName: 'ade', displayName: 'ade'},
    {id : 2, userName: 'ojo', displayName: 'ojo'},
    {id : 3, userName: 'seli', displayName: 'seli'},
    {id : 4, userName: 'mat', displayName: 'mat'}

]

app.get('/', (req, res) => {
    res.send('hello')
})

//get users
app.get('/api/users', (req, res) => {
    console.log(req.query);
    const {
        query: {filter, value},} = req;

    //when filter and value are undefined
    if(filter && value) return res.send(
        usersTable.filter((user) => user[filter].includes(value))
    );
    return res.send(usersTable);
});

 //get products
 app.get('/api/products', (req, res) => {
    res.send([
       {id : 1,  productName: 'tv', price: 2000},
        {id : 2, productName: 'set jo', price: 2000},
        {id : 3, productName: 'apple', price: 2000},
        {id : 4, productName: 'android', price: 2000}
    ])
 })

 //get by user id
 app.get('/api/users/:id', resolveIndexByUserId,  (req, res) => {
    const {findUserIndex} = req;
    const findUser = usersTable[findUserIndex];
    if(!findUser) return res.sendStatus(404);
    return res.send(findUser);
 })

 //POST Request
 app.post('/api/users', (req, res) => {
    const {body} = req;
    const newUser = {id: usersTable[usersTable.length - 1].id + 1, ...body };
    usersTable.push(newUser);
    return res.status(201).send(newUser);
 })

//PUT Request
app.put('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const {body, findUserIndex} = req;
    usersTable[findUserIndex] = {id: usersTable[findUserIndex].id, ...body}
    res.sendStatus(200)
})

//PATCH Request
app.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const {body, findUserIndex} = req;
    usersTable[findUserIndex] = {...usersTable[findUserIndex], ...body};
    return res.sendStatus(200);
})

//DELETE Request
app.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { findUserIndex } = req;
    const parseId = parseInt(id)
    usersTable.splice(findUserIndex, 1);
    return res.sendStatus(200)
});







app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
} )