export interface formType {
  id?: number;
  createTime?: string;
  type?: { label: string; value: string } | null
  ;
  title: string;
  file?: any;
  url: string;
  content: string;
}
