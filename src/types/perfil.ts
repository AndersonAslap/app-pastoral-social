export interface PerfilFormData {
  nome: string;
  telefone: string;
  nickName: string;
  novaSenha: string;
  confirmarSenha: string;
}

export interface PerfilFormProps {
  form: PerfilFormData;
  formSubmitting: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onFormChange: (field: keyof PerfilFormData, value: string) => void;
  onTogglePasswordVisibility: () => void;
  onToggleConfirmPasswordVisibility: () => void;
  onSubmit: () => void;
}

export interface UserInfo {
  nickName: string;
  nome: string;
  telefone: string;
}