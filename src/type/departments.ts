export interface DepartmentProjectResult {
  id: number;
  department: number;
  department_name: string;
  project: number;
  project_name: string;
  name: string;
  description: string;
  owner_name: string;
  due_date: string;
  status: string;
  status_display: string;
  is_default: boolean;
  tasks_count: number;
  completed_tasks_count: number;
  created_at: string;
  updated_at: string;
}

export interface DepartmentProjectResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: DepartmentProjectResult[];
}
export interface DepartmentState {
  department: DepartmentProjectResponse | null;
  loading: boolean;
  error: string | null;
}

export interface IDepError {
  message: string;
}