export interface LoginForm {
    user: string | null | undefined;
    password: string | null | undefined;
  }
  
  export interface SignUpForm {
    username: string | null;
    name: string | null;
    email: string | null;
    phone: string | null;
    password: string | null;
    repassword: string | null;
  }
  
  export interface gToken {
    token: string | null | undefined;
  }