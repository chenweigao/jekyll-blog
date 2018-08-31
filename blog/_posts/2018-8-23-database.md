---
layout: article
title: Database - SQLite3, MongoDB, SQLAlchemy
key: database
modify_date: 2018-8-23
tags: 
- Python
- Web
comment: true
mathjax: true
---

How to use [SQLite3](), [Flask-PyMongo]().

<!--more-->

# Database and ORM

## Database

Common RDB(Relational Database): PostgreSQL, MySQL, Orcal, MS SQL Server and SQLite.

## Python SQL

Take `SQLite3` for example:

`cur.execute("CREATE TABLE demo(num int, str varchar(20));")`，DB-API规范，创建`cur`游标对象用于执行SQL命令。[Source Code](https://github.com/chenweigao/python_web/blob/master/orm/db_test.py)

```python
conn = sqlite3.connect('test.db')
cur = conn.cursor()
cur.execute("INSERT INTO demo VALUES (%d, '%s')" % (1, 'aaa'))
```

## ORM

Object-Relational Mapping[^3]

[^3]: [ORM, Wiki](https://en.wikipedia.org/wiki/Object-relational_mapping)

, 对象关系模型，具备三方面的基本能力：映射技术、CRUD操作和缓存优化。

Python ORM lib includes **SQLAlchemy**, Django ORM, Peewee

[^4]: [peewee docs](http://docs.peewee-orm.com/en/latest/index.html)

, Strom and SQLObject.

# MongoDB

`database` –`collection` – `document`– `field` – `index`.

[install in LInux](http://www.runoob.com/mongodb/mongodb-linux-install.html)

process in terminal:

```
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

```
mongoimport --db users --collection contacts --file xx.json
```

# Flask-PyMongo

Install: `pip install flask_pymongo`

in `config.py`:

```
class Config:
	MONGO_URI = "mongodb://localhost:27017/myDatabase"
```

in `app/___init__.py`:

```
from flask_pymongo import PyMongo
from config import config
mongo = PyMongo()
mono.init_app(app)
```

in `views.py`:

```
from app import mongo
@main.route('/', methods=['GET', 'POST'])
def index():
	data = mongo.db.mycol.find()
	# mycol is the name of collections
```



# SQLite3

## Insert

[create table](http://www.runoob.com/sqlite/sqlite-create-table.html)

```
CREATE TABLE COMPANY(
   ID INT PRIMARY KEY     NOT NULL,
   NAME           TEXT    NOT NULL,
   AGE            INT     NOT NULL,
   ADDRESS        CHAR(50),
   SALARY         REAL
);

INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
VALUES (1, 'Paul', 32, 'California', 20000.00 );

INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
VALUES (2, 'Allen', 25, 'Texas', 15000.00 );

INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
VALUES (3, 'Teddy', 23, 'Norway', 20000.00 );

INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
VALUES (4, 'Mark', 25, 'Rich-Mond ', 65000.00 );

INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
VALUES (5, 'David', 27, 'Texas', 85000.00 );

INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
VALUES (6, 'Kim', 22, 'South-Hall', 45000.00 );


INSERT INTO COMPANY VALUES (7, 'James', 24, 'Houston', 10000.00 );
```

then format the table:

```
sqlite> .header on
sqlite> .mode column
sqlite> SELECT * FROM COMPANY;
```

output is:

```
ID          NAME        AGE         ADDRESS     SALARY
----------  ----------  ----------  ----------  ----------
1           Paul        32          California  20000.0
2           Allen       25          Texas       15000.0
3           Teddy       23          Norway      20000.0
4           Mark        25          Rich-Mond   65000.0
5           David       27          Texas       85000.0
6           Kim         22          South-Hall  45000.0
```
## update

```
sqlite> UPDATE COMPANY SET ADDRESS = 'Texas' WHERE ID = 6;
```

# Register

```python
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
```

