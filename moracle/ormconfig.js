module.exports = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "jacksonroberts",
    password: "",
    database: "moracle",
    entities: ["./built/entities/**/*.js"],
    migrations: ["./built/migration/**/*.js"],
    "cli": {
        "migrationsDir": "./src/migration"
    }
};
