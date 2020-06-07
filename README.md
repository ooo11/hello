# Hello World

Lesson on learing Git. 

1. Doing project using pug, javascript, angularjs, express, nodejs.

2. Edit the `package.json` file:

```json
        "scripts": {
            "start": "node ./start.js"
        },
        ...
        "engines": {
            "node": "13.8.0"
        },
```

3. Commit to heroku
```
        $ heroku login
        $ heroku git:clone -a <Filename>
        $ cd <Filename>
        $ git add .
        $ git commit -am "input your comment here"
        $ git push heroku master
        
```

4. Config vars
    go to heroku >>> app >>> Settings >>> 
    `input KEY and Value, Key = users, Value = htpasswd`
    `user:htpasswd`