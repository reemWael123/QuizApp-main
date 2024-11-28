export interface ListColumn {
  type: string;
  header: string;
  datafield: string;
  objectKey?: string;
  objectValue?: string;
  format?: string;
  actions?: {
    isView?: boolean;
    isEdit?: boolean;
    isDelete?: boolean;
    isReAssign?: boolean;
  };
}
