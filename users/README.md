# users

## Get started
global dependencies pm2

```bash
yarn install
yarn start
```

Other actions
```bash
yarn restart // Restarting all processes
yarn stop // Stopping all processes
yarn delete // Deleting all processes
pm2 monit // Monitoring all processes
```

http://localhost:4000/graphql  
http://localhost:3000/


```graphql
query findCompany {
  company(id: "2") {
    id
    name
    description
    users {
      id
      firstName
      age
      company {
        id
        name
        description
      }
    }
  }
}
```

```graphql
query findCompany {
  google: company(id: "1") {
    id
    name
    description
  }  
  apple: company(id: "2") {
    id
    name
    description
  }
}
```

```graphql
{
  google: company(id: "1") {
    ...companyDetails
  }
  apple: company(id: "2") {
    ...companyDetails
  }
}

fragment companyDetails on Company {
  id
  name
  description
}
```

```graphql
mutation {
  addUser(firstName: "Stephen", age: 26) {
    id
    firstName
    age
  }
}
```

```graphql
mutation {
  deleteUser(id: "Skk88i8z-") {
    id
  }
}
```

```graphql
mutation {
  editUser(id: "23", firstName: "nicolas", age: 0) {
    age
  }
}
```