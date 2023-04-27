export interface Res {
  list: List[];
  pageNum: number;
  pageSize: number;
  total: number;
}
interface List {
  id: number;
  name: string;
  jobNumber: string;
  originalInstitution: string;
  originalDepartment: string;
  warehousingTime: string;
  anchorType: string;
  institution: string;
  department: string;
  changeTime: string;
  img: string;
}
