# Atom Exam
To locally make the application work, follow the next steps:

<pre>cd functions</pre>

<pre>npm install</pre>

## Dependencies

Latest version of <code>firebase-admin</code>, <code>firebase-tools</code> and <code>firebase-functions</code>

## Local Deploy

On a terminal, use the following command:

<pre> firebase emulators: start </pre>

On a side terminal, use the following commands:
<pre>cd functions</pre>
<pre>npm run build:watch</pre>

## Postman URLS

The known urls are:

<strong>LIST ALL</strong>

<pre>http://127.0.0.1:5001/atom-test-321d2/us-central1/API/api/v1/todo/</pre>

<strong>FIND</strong>

<pre>http://127.0.0.1:5001/atom-test-321d2/us-central1/API/api/v1/todo/[ID]</pre>

<strong>CREATE</strong>

<pre>http://127.0.0.1:5001/atom-test-321d2/us-central1/API/api/v1/todo/</pre>

Body Example:

<pre>{
    "title":"Testing2",
    "description":"testing testing",
    "completed": false,
    "create_date": "July 31, 2023 at 4:18:30 PM UTC-5",
    "update_date": "July 31, 2023 at 4:18:30 PM UTC-5"
}</pre>

<strong>UPDATE</strong>

<pre>http://127.0.0.1:5001/atom-test-321d2/us-central1/API/api/v1/todo/[ID]</pre>

Body Example:

<pre>{
    "title":"Testing2",
    "description":"testing testing2",
    "completed": false,
    "create_date": "July 31, 2023 at 4:18:30 PM UTC-5",
    "update_date": "July 31, 2023 at 4:18:30 PM UTC-5"
}</pre>

<strong>DELETE</strong>

<pre>http://127.0.0.1:5001/atom-test-321d2/us-central1/API/api/v1/todo/[ID]</pre>
