# Pegula CRM - AngularJS + Python/Django

## Description

Pegula CRM is a **CRM web application** for managing employees, candidates, organizations, tasks, messages and projects. It is under active development and currently has fully functional authentication (login) system, user (admin) and employee management system implemented.

## Technology Used

Pegula CRM is an **AngularJS** app connecting to the **Django** backend which implements the Web service API. The backend is available at  https://github.com/ivanaszuber/pegula-django.

Other libraries used include: **RequireJS**, **angular-ui-router**, **angular-ui-grid**, **angular-couch-potato**, **lodash**, **karma**, **jasmine**... See bower.json for the full list of dependencies.

## Installation

If you'd like to install **Pegula CRM** locally checkout the `pegula-django` repository, install its requirements and create the database with the following commands:

```
git clone git@github.com:ivanaszuber/pegula-django.git pegula-django/

cd pegula-django

pip3 install -U -r requirements.txt  # install Python dependencies

python3 manage.py migrate #create the database and load initial data

python3 manage.py runserver #run the server on localhost:5050

```

Checkout `pegula-crm` and install it's dependencies with the following commands:

```
git clone git@github.com:ivanaszuber/pegula-crm.git pegula-crm/

cd pegula-crm/config

bower install
```

## Build Script

The build script is available in `grunt-tasks`. To create the build directory run the following

```
cd ..

cd grunt/tasks

npm install

grunt

```

This will run the Gruntfile.js and:

- concatenate all .js and .html files into a single .js file,
- copy all necessary lib .js, .css and font files
- minify all those files
- append a hash to every file
- and rename all references to those files so that they point to the correct hashed version


After the build is finished, new files will be available at `pegula-crm/build`

## Testing

To run unit tests install the dependencies by running:

```
cd pegula-crm

npm install
```

This will install `karma`, `jasmine`, `angular-mocks` and other libraries necessary to run the tests.

Start the karma server. This will execute all tests under the `pegula-crm/test` folder.

## UI Testing

For testing purposes the following login credentials are available:

- admin@pegula.io  admin


## Screenshots

Here are some screenshots of the app. Demo will be available soon.

### Login

![](/demo/img/pegula-login.PNG)

### Employee Dashboard

![](/demo/img/pegula.PNG)

### Create Employee

![](/demo/img/pegula-employee.PNG)

