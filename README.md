# Hello World

Lesson on learing Git. 

1. Doing project using pug, javascript, angularjs, express, nodejs.
2. Commit to github
```
$ git config --global user.email "you@example.com"
$ git config --global user.name "Your Name"
$ git status 
$ git commit -m "message"
$ git push -u origin master

```

3. Edit the `package.json` file:

```json
        "scripts": {
            "start": "node ./start.js"
        },
        ...
        "engines": {
            "node": "13.8.0"
        },
```

4. Commit to heroku
```
        $ heroku login
        $ heroku git:clone -a <Filename>
        $ cd <Filename>
        $ git add .
        $ git commit -am "input your comment here"
        $ git push heroku master
        
```

5. Config vars
    go to heroku >>> app >>> Settings >>> 
    `input KEY and Value, Key = users, Value = htpasswd`
    `user:htpasswd`
