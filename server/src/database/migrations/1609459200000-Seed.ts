import { getManager, MigrationInterface, QueryRunner } from 'typeorm';

/**
 * 서비스 운용에 필요한 기초 데이터를 등록합니다.
 * 레거시 서비스에서 운용중이던 수요관리사업자
 * 메뉴
 * 등
 */
export class Seed1609459200000 implements MigrationInterface {
  private readonly entityManager = getManager();

  public async up(queryRunner: QueryRunner): Promise<void> {}

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('down works');
  }
}
