# Node Template Server

An example server using Node and a template enginde.

## Instructions

### Initialize The Web Server

1. create a new project
2. initialize `npm` and install `express`
3. stop NGINX: `systemctl stop nginx`
4. create a webserver listening on port 80 using Node
5. create a `public` folder
6. serve the folder content using Node

### Initialize The Template Engine

1. call the `app.engine` function and register the engine
2. call `app.set('views', './template');` to select a template folder
3. call `app.set('view engine', 'html');` to enable the template engine

```javascript
app.engine("html", function(path, options, callback) {
    fs.readFile(path, function(err, content) {
        if (err) {
            console.error("fail to open template:", err);
            return callback(err);
        }
        let str = mustache.render(content.toString(), options);
        return callback(null, str);
    })
});
app.set('views', './template');
app.set('view engine', 'html');
```

### First Template

1. create a page `index.html` page into the `template` folder

```html
<p>Hello {{name}}! You seem {{adjective}} today!</p>
```

2. add an http handler for `/` into `index.js`:

```javascript
app.get("/", function(req, resp) {
    resp.render('index', {
        name: 'Toto',
        adjective: 'Happy'
    });
});
```

### Render An Array

1. add an array of data to `index.js`:

```javascript
let db = ["Toto", "Tata", "Titi", "John", "Tutu"];
```

2. edit the `/` handler and pass the `db` array to the `render` function
3. edit the template to display the data

### Render A Function

We want to add a visit counter to our website. To do so:

1. create a function `counter` wich increment a variable each for each call and return the number of time it has been call
2. edit the `/` handler and pass the `counter` function to `render`
3. edit `template/index.html` to call `counter`