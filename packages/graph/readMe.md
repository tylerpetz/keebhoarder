


## Running in dev mode 
With hot reload

```
  yarn start
```

Without :(
```
  yarn start:ci
```


# Making changes to db schema

Any changes to db schema can be made in `graph/prisma/schema.prisma`


## Create a new db migration
Generate a new migration with the changes you have updated.

```
  npx prisma migrate save --experimental
```


Push changes to the local sqlite db

```
  npx prisma migrate up --experimental
```


## Generate changes to prisma client
Generate a new migration with the changes you have updated.

```
  npx prisma generate
```

Once the changes have been updated in the prisma client you can now start the server and query with updated changes

