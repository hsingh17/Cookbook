- **dotenv** package allows you to add enviornment variables to **process.env** with .env files
- add API keys to .env files to hide them from users
- **HTTPS Request Methods**
    - **GET**: request representation of specified resource. should only retrieve data  
    - **HEAD**: similar to GET but no response body
    - **POST**: submits new data that must be changed on the server
    - **PUT**: replaces existing data on the server with updated data
    - **DELETE**: deletes the specified resource
      
- **Path vs Query Parameters**
    - **Path Param**: /employee/**:id** (id is a path param)
    - **Query Param**: /employee **?start=1&size=10** (query params start with ? and separated with &)
    - Use query parameters as **optional** fields that filter the request 

- **Executing requests in parallel**
    - .map function lets us execute the fetches for ABC filtering in parallel rather than series. (see /backend/controllers/filter.js)
    - This lets us drastically reduce the time to receive all the data

- **For..in vs forEach**
    - For..in is for accessing object properties vs forEach is for iterating over arrays

- **React Children Updating**
    - A component only calls its constructors once **(UNLESS IT HAS A UNIQUE KEY ASSOCIATED WITH IT)**
    - If props change, a child component will not update those props unless it has **componentWillRecieveProps** function, but this is an anti-pattern according to React docs
    - Solution is to pass it a key, so React will rerender it as a new component thus calling its constructor again.