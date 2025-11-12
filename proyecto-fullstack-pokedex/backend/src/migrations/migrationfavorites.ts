import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddFavoritosTable271025 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "favoritos",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "idPokemon",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "userId",
                        type: "int",
                        isNullable: false,
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "favoritos",
            new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("favoritos");
        const foreignKey = table?.foreignKeys.find(
            fk => fk.columnNames.indexOf("userId") !== -1
        );
        if (foreignKey) {
            await queryRunner.dropForeignKey("favoritos", foreignKey);
        }
        await queryRunner.dropTable("favoritos");
    }
}