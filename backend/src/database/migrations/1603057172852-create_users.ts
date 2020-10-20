import { text } from 'express';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsers1603057172852 implements MigrationInterface {
	public async up (queryRunner: QueryRunner): Promise<void> {
		queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					{
						name: 'id',
						type: 'integer',
						isUnique: true,
						unsigned: true,
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'name',
						type: 'text',
					},
					{
						name: 'email',
						type: 'text',
					},
					{
						name: 'password',
						type: 'text',
					},
				],
			}),
		);
	}

	public async down (queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropTable('users');
	}
}
