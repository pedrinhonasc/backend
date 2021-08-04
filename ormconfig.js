module.exports = [
  {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "entities": [
      "./src/modules/images/entities/*.ts",
      "./src/modules/products/entities/*.ts"
    ],
    "migrations": [
      "./src/shared/database/migrations/*.ts"
    ],
    "cli": {
      "migrationsDir": "./src/shared/database/migrations"
    }
  },
  {
    "name": "seed",
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "entities": [
      "./src/modules/images/entities*.ts",
      "./src/modules/products/entities*.ts"
    ],
    "migrations": [
      "src/shared/database/seeds/*.ts"
    ],
    "cli": {
      "migrationsDir": "src/shared/database/seeds"
    }
}
]
