# Finance manager
## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

Env option below required.
```
DATABASE_SYNCHRONIZE=true
```

## [Api Docs](https://kostya-kon.github.io/fin-manager/)

### Category 
- CRUD

### Bank 
- CRUD

### Webhook 
- CRUD 
- you can register multiple hooks and each of them will be notified of a new transaction event

### Transactions
- Create, Delete, Get (all)
- After creating the transaction, the balance of the respective bank will be recalculated 

### Statistic
- Post method provide you to get statistic about categories during some period
