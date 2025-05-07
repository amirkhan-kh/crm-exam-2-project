export interface IUser {
    id?: number;
    full_name?: string;
    gender?: string;
    birth_date?: string;
    role?: string;
    face_id?: null;
    company_id?: number;
    avatar?: string | null;
    salary_type?: string;
  }
  
  export interface IUserState {
    user: IUser | null;
    loading: boolean;
    error: string | null;
  }