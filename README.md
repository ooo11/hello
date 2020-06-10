# Prototype to Hello

**DO NOT COMMIT THIS HERE PLEASE MAKE A COPPY AND REMOVE ALL THE COMMENTS FOR PRODUCTION**

1. Doing project using pug, javascript, angularjs, express, nodejs.
2. Commit to github. `$ git add .` which will add all files of the current directory
```
$ git clone https://username:password@github.com/username/repository.git
$ git config --global user.email "you@example.com"
$ git config --global user.name "Your Name" 
$ git status 
$ git commit -m "message"
$ git push -u origin master

```

3. In production mode, please use `node` instead of `nodemon`. Edit the `package.json` file:

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
