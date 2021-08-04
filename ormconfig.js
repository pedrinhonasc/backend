const [rootDir, fileExtension] = process.env.NODE_ENV === "development" ? ['src', 'ts'] : ['dist', 'js'];
console.log(rootDir, fileExtension);

module.exports = [
  {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "entities": [
      `./${rootDir}/modules/images/entities/*.${fileExtension}`,
      `./${rootDir}/modules/products/entities/*.${fileExtension}`
    ],
    "migrations": [
      `./${rootDir}/shared/database/migrations/*.${fileExtension}`
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
      `./${rootDir}/modules/images/entities*.${fileExtension}`,
      `./${rootDir}/modules/products/entities*.${fileExtension}`
    ],
    "migrations": [
      `./${rootDir}/shared/database/seeds/*.${fileExtension}`
    ],
    "cli": {
      "migrationsDir": "./src/shared/database/seeds"
    }
}
]
