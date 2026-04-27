// types/permissions.ts
export type Permission = 
  /* FAMILIA */
  | "listar_familia" /* OK */
  | "cadastrar_familia" /* OK */
  | "editar_familia"

  /* ESTOQUE/PRODUTO */
  | "listar_estoque" /* OK */
  | "cadastrar_item_estoque" /* OK */
  | "deletar_estoque" /* OK */
  
  /* MODELO TEMPLATE */
  | "listar_template" /* OK */
  | "criar_modelo_template" /* OK */
  | "gerar_cesta" /* OK */
  | "consultar_geracao_modelo" /* OK */

  /* CESTA */
  | "listar_cesta" /* OK */
  | "cancelar_cesta" /* OK */

  /* AJUDA */
  | "listar_ajuda" /* OK */
  | "associar_familia_ajuda" /* OK */
  | "aprovar_ajuda" /* OK */
  | "cancelar_ajuda" /* OK */
  | "entregar_ajuda" /* OK */
  | "confirmar_ajuda"

  /* AÇÃO */
  | "cadastrar_acao"  /* OK */
  | "atualizar_acao"

  /* PERFIL */
  | "atualizar_usuario" /* OK */

  /* RELATÓRIO */
  | "visualizar_relatorios"

  /* OUTROS */
  | "listar_item_produto"
  | "listar_und"
  | "listar_localizacao"
  | "listar_dificuldade"
  | "listar_comunidade"
  | "listar_tipo_template"
  | "not.allowed";

export type PermissionMode = 'any' | 'all';

export interface PermissionContextType {
  userPermissions: Permission[];
  setPermissions: (permissions: Permission[]) => void;
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
}

export interface CanProps {
  children: React.ReactNode;
  permission?: Permission | null;
  permissions?: Permission[];
  mode?: PermissionMode;
  fallback?: React.ReactNode | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  permissions: Permission[];
}