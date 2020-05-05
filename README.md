run server
```
node server.js
```

create todo
```
curl -d '{"text": "tararara1", "done": "true"}' -H "Content-Type: application/json" -X POST http://localhost:4000/api/todos
```

delete todo
```
curl -H "Content-Type: application/json" -X DELETE  http://localhost:4000/api/todos/:id
```

get all todos
```
curl http://localhost:4000/api/todos
```

get todos done
```
curl -d 'done=true' http://localhost:4000/api/todos
```

get todos not done
```
curl -d 'done=false' http://localhost:4000/api/todos
```