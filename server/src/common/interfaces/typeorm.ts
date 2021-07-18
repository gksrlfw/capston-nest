/**
 *
 */
export interface TypeormInsertResult {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: any;
  serverStatus: number;
  warningStatus: number;
}
