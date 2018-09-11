---
layout: article
title: Python Web Development, Flask, Database
key: python_web
modify_date: 2018-9-11
date: 2018-7-23
tags: 
- Python
- Web
comment: true
mathjax: true
---
Flask is a microframework for Python based on Werkzeug, Jinja 2 and good intentions. 
  <!--more-->

# 0. Flask Structure

## 0.1 Context

**application context and request context**：

| variable      | context             | description                                          |
| ------------- | ------------------- | ---------------------------------------------------- |
| `current_app` | application context | The application instance for the active application. |
| `g`           | ac                  |                                                      |
| `request`     | request context     |                                                      |
| `session`     | rc                  |                                                      |

```python
from flask import current_app
```
> [`g`](http://flask.pocoo.org/docs/1.0/api/#flask.g) is a special object that is unique for each request. It is used to store data that might be accessed by multiple functions during the request. The connection is stored and reused instead of creating a new connection if `get_db` is called a second time in the same request.

## 0.2 Blueprint

We use the `create_app()` so that the application is created at runtime.

> A blueprint is similar to an application in that it can also define routes. The difference is that routes associated with
> a blueprint are in a dormant state until the blueprint is registered with an application, at which point the routes become part of it.

```python
# app/main/__init__.py
from flask import Blueprint
main = Blueprint('main', __name__)
```

The constructor for this class takes two required arguments: **the blueprint name** and **the model or package where the blueprint is located**(always default `__name__`).

## 0.3 Others

1. `redirect()`: 重定向

2. `url_for()`: 路由地址反向生成

   ```
   url_for('[a function name]')  #输出这个函数对应的URL
   return redirect(url_for('auth.unconfirmed'))
   ```

# 1. Client Dev

## 1.1 HTML Form

**HTML表单**用于客户端收集用户在浏览器的输入，分别为：

1. 文本输入

   |          | [source code](https://github.com/chenweigao/python_web/blob/master/HTML/form.html) |
   | -------- | ------------------------------------------------------------ |
   | 单行文本 | ` <input type="text"> `                                      |
   | 多行文本 | `<textarea>`                                                 |
   | 密码框   | ` <input type="password"> `                                  |

2. 选择

    |            | [source code](https://github.com/chenweigao/python_web/blob/master/HTML/form.html) |
    | ---------- | ------------------------------------------------------------ |
    | 单选(单点) | ` <input type="radio" checked="checked"> `                   |
    | 单选(下拉) | `<select>`and `<option>`                                     |
    | 多选       | ` <input type="checkbox">`                                   |

## 1.2 jQuery

使用jQuery:

```html
 <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
```

Tips: `src`的内容需查找最新的加以替换。

在Javascript中调用jQuery:

```javascript
$(selector).action()
```

例如：

```html
<button type="button" onclick="$('p').toggle();">Toggle the message</button>
```

意义为选择所有的`<p>`标签，并对其进行`toggle()`操作，对元素进行隐藏、显示。

# 2. Database and ORM

## 2.1 Database

Common RDB(Relational Database): PostgreSQL, MySQL, Orcal, MS SQL Server and SQLite.

## 2.2 Python SQL

Take `SQLite3` for example:

`cur.execute("CREATE TABLE demo(num int, str varchar(20));")`，DB-API规范，创建`cur`游标对象用于执行SQL命令。[Source Code](https://github.com/chenweigao/python_web/blob/master/orm/db_test.py)

```python
conn = sqlite3.connect('test.db')
cur = conn.cursor()
cur.execute("INSERT INTO demo VALUES (%d, '%s')" % (1, 'aaa'))
```

## 2.3 ORM

Object-Relational Mapping[^3]

[^3]: [ORM, Wiki](https://en.wikipedia.org/wiki/Object-relational_mapping)

, 对象关系模型，具备三方面的基本能力：映射技术、CRUD操作和缓存优化。

Python ORM lib includes **SQLAlchemy**, Django ORM, Peewee

[^4]: [peewee docs](http://docs.peewee-orm.com/en/latest/index.html)

, Strom and SQLObject.

## 2.4 MongoDB

### Basic

`database` –`collection` – `document`– `field` – `index`.

[install in LInux](http://www.runoob.com/mongodb/mongodb-linux-install.html)

process in terminal:

```shell
./mongo.exe
> show dbs
> use [db name] #create db
> db #see db
> db.createCollection(name, options) #create collections
> show collections
> db.colname.insert({"xx", "xx"})
> db.collection_name.find()
> db.collection_name.find().pretty() #show in formatted
```

batch import `.json` file:

```shell
mongoimport --db users --collection contacts --file xx.json
```

### Query Documents

- specify conditions using query operators

## 2.5 Flask-PyMongo

Install: `pip install flask_pymongo`

in `config.py`:

```python
class Config:
	MONGO_URI = "mongodb://localhost:27017/myDatabase"
```

in `app/___init__.py`:

```python
from flask_pymongo import PyMongo
from config import config
mongo = PyMongo()
mono.init_app(app)
```

in `views.py`:

```python
from app import mongo
@main.route('/', methods=['GET', 'POST'])
def index():
	data = mongo.db.mycol.find()
	# mycol is the name of collections
```

## 2.6 SQLite3

[create table](http://www.runoob.com/sqlite/sqlite-create-table.html)

format the table:

```shell
sqlite> .header on
sqlite> .mode column
sqlite> SELECT * FROM COMPANY;
```

update:

```shell
sqlite> UPDATE COMPANY SET ADDRESS = 'Texas' WHERE ID = 6;
```

register:

```python
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
```

# 3. Virtual environment

在项目开发中，为了避免每个项目不同组件安装在同一台计算机时导致相互之间的冲突，需要使用到虚拟环境。开发者或者系统管理员可以让每个项目运行在独立的虚拟环境中，从而避免了不同项目组件之间配置的冲突。

## 3.1 Installation

Take Linux system as example:

```python
pip install virtualenv
```

## 3.2 Usage 

```python
cd [project directory]
virtualenv venv
```

该命令执行后，将在当前目录中建立一个venv目录，该目录复制了一份完整的当前系统的python环境。之后运行python时可以直接运行该项目的bin文件夹中的命令。

例：在当前虚环境下安装Tornado组件：

```python
./venv/bin/pip install tornado
```

或者在该虚环境中运行python程序：

```python
./venv/bin/python xxxx.py
```

也可以使用`activate`命令启动虚环境，之后不必再显示地调用虚环境bin文件夹中的命令：

```python
source ./venv/bin/activate
```

退出虚拟环境使用`deactive`：

```python
(venv) xxx:~/xxx$ deactivate
```

 Install from `requirement.txt`:

```python
pip install -r requirements.txt
```

generate a `requirement.txt` from current project:

```
pip freeze > requirement.txt
```



#  4. Network frameworks

MVC(Model-View-Controller) [^1]

[^1]: mvc components, [wiki](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)

最早是由Trygve Reenskaug在1978年提出，最开始用于Smalltalk语言的一种内部架构。

![MVC]({{ site.url }}/assets/500px-MVC-Process.svg.png)

目前python主流的Web框架包括: Django, Tornado, Flask and Twisted.



## 4.1 Web Server

目前主流的Web服务器包括**Nginx, Apache, lighthttpd, IIS, etc..**，Python服务端程序在Linux平台下使用最广泛的是Nginx。

### WSGI

Web Server Gateway Interface[^2], 为Python语言定义Web服务器和服务端程序的通用接口规范。

[^2]: [WSGI, wiki](https://en.wikipedia.org/wiki/Web_Server_Gateway_Interface)

### Nginx

```shell
sudo apt-get install nginx
sudo service nginx start/status/stop/restart
```

## 4.2 Django

### Installation

```python
pip3 install django
```

测试是否安装成功：

```python
python3
>>> import django
>>> print(django.VERSION)
```

### Establish application

建立项目：

```python
django-admin startproject [project-name]
```

建立应用：

```python
python manage.py startapp [app-name]
```

例如，在当前目录中创建一个项目*my_project*, 并且拥有特定的目录结构：

```python
djangp-admin startproject my_project
cd my_project
python3 manage.py startapp my_app
```

完成之后目录结构类似于：

```shell
my_project/
	manage.py
	my_project/
		__init__.py
		settings.py
		urls.py
		wsgi.py
	my_app/
		__init__.py
		admin.py
		apps.py
		migrations/
			__init__.py
		models.py
		tests.py
		views.py
```

内置web服务器运行：

```pyton
python manage.py runserver 0.0.0.0:8001
```

生成数据移植文件：

```python
python manage.py makemigrations app
```

移植到数据库：

```pyth
python manage.py migrate
```

## 4.3 Jinja

### Rendering templates

```python
@app.route('/user/<name>')
def user(name):
    return render_template('user.html', name=name)
```

The function `render_template` takes the filename of the template as its first argument, the additional arguments are `key/value` pairs **that represent actual values for variables referenced in the template**.

`user.html` like this:

```
{% raw %}
<h1>Hello, {{ name|capitalize }}!</h1>
{% endraw %}
```

In this example, we use the **variable filters**: `safe`, `capitalize`(converts the first character of the value to uppercase), `lower`,`upper`, `title`, `trim`(removes leading and trailing whitespace from the value), `striptags`(removes any HTML tags from the value before rendering).

The default Jinja delimiters are configured as follows:

```
{% raw %}
{% ... %} for statemrnt
	e.g. {% if loop.index is divisibleby 3 %}
{{ ... }} for Expressions to print to the template output
{# ... #} for Comments not included in the template output
#  ... ## for Line Statements
{% endraw %}
```

#### Whitespace Control

The official docs about [Whitespace Control](http://jinja.pocoo.org/docs/2.10/templates/#whitespace-control).

`trim_blocks` : remove the first newline after a template tag.

`lstrip_blocks`: strips tabs and spaces from the beginning of a line to the start of a block.

#### Line Statements

```
{% raw %}
<ul>
# for item in seq
    <li>{{ item }}</li>
# endfor
</ul>
{% endraw %}
```

equals:

```
{% raw %}
<ul>
{% for item in seq %}
    <li>{{ item }}</li>
{% endfor %}
</ul>
{% endraw %}
```

### Flask_Bootstrap

Install: `pip install flask-bootstrap`

Basic usage:

```python
# app.py
from flask_bootstrap import Bootstrap
app = Flak(__name__)
bootstrap = Bootstrap(app)
```

In the `base.html` file, to import the bootstrap layout:

```
{% raw %}
{% extends "bootstrap/base.html" %}
{% endraw %}
```

If you want run the app:

```python
# app.py
if __name__ == '__main__':
    app.run(port=45467, debug=True)
```

**Flask-moment** is very useful for localization of dates and times, Install `pip install flask-moment`.

```
from flask import import Moment
moment = Moment(app)
```

usage in html file: ‘L’ to ‘LLLL’ for different levels of verbosity.

```
{{ momnet(current_time)}}.format('LLLL') }}
# output: Monday, July 30, 2018 9:31 PM
```

### Bootstrap CND

[link](https://www.bootstrapcdn.com/bootswatch/)

## 4.4 Web Forms

Install: `pip install Flask-WTF`

create the forms:

```
# forms.py
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField
from wtforms.validators import DataRequired


class VideoForm(FlaskForm):
    switch_map = BooleanField(u'Open the map', default=1)
    switch_video = BooleanField(u'Open the video')
    submit = SubmitField(u'Submit')
```

use the forms:

```
# views.py
from wtforms import ValidationError
from .forms import VideoForm

@main.route('/', methods=['GET', 'POST'])
def index():
    form = VideoForm()
    return render_template('index.html', form=form)
```

In html file:

```
# index.html
{% raw %}
<div>
	{{ wtf.quick_form(form) }}
<div>
{% endraw %}
```

# 5. Video Streaming with Flask

# 6. Flask Test

> The normal test in python includes **unittest, pytest, nose**, we use the nose to make a test.
>

# 7. Flask Script

```python
# manage.py
import os
from app import create_app, db
from app.models import User, Role
from flask.ext.script import Manager, Shell
from flask.ext.migrate import Migrate, MigrateCommand

app = create_app(os.getenv('FLASK_CONFIG') or 'default')
manager = Manager(app)
migrate = Migrate(app, db)

def make_shell_context():
    return dict(app=app, db=db, User=User, Role=Role)

manager.add_command("shell", Shell(make_context=make_shell_context))
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
```

# New Words

| words |                means                |
| :---: | :---------------------------------: |
|  PK   |             primary key             |
|  FK   |             foregin key             |
| CRUD  | create, retrieve, update and delete |

