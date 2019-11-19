## Documentation coming very soon.

# Running and installing

Install Postgres and create databases `lisk_dev`, `moracle`, and `lisk_dev2`.
The following SQL snippet for your convenience:
```
drop database lisk_dev;
drop database lisk_dev2;
drop database moracle;
create database lisk_dev;
create database lisk_dev2;
create database moracle;
```


Clone this repository and install dependencies with `npm i` in both the `lisksdk-test` and `moracle` folders.


Open a new terminal window/tab and `cd` into the `moracle` folder and start the TypeScript compiler with `tsc -w`.
Go into the ormconfig.js file and change the database info. Install TypeORM: `npm i -g typeorm` and run:

```
cd built
typeorm migration:run
```

Open a new terminal window/tab and start the Moracle HTTP server with `cd moracle/built` and `node index`.


`cd` into the `lisksdk-test/src` folder and run `node index` to start the Lisk custom blockchain.



# Moracle node and Lisk custom blockchain

HUGE thanks to ThePool/Karek, Sidechain Solutions, and Moosty.
