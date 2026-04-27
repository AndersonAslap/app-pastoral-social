Vou ajustar todo o fluxo para TypeScript. Aqui está a implementação completa:

## 1. Definição de tipos

```typescript
// types/permissions.ts
export type Permission = 
  | "cadastrar_familia"
  | "listar_familia"
  | "editar_familia"
  | "cadastrar_item_estoque"
  | "criar_modelo_template"
  | "listar_template"
  | "gerar_cesta"
  | "entregar_ajuda"
  | "aprovar_ajuda"
  | "listar_ajuda"
  | "visualizar_relatorios"
  | "listar_estoque"
  | "listar_localizacao"
  | "listar_und"
  | "listar_item_produto"
  | "deletar_estoque"
  | "listar_dificuldade"
  | "consultar_geracao_modelo"
  | "associar_familia_ajuda"
  | "listar_comunidade"
  | "listar_tipo_template"
  | "listar_cesta"
  | "cancelar_cesta"
  | "atualizar_usuario"
  | "cancelar_ajuda"
  | "confirmar_ajuda"
  | "cadastrar_acao"
  | "atualizar_acao";

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
  permission?: Permission;
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
```

## 2. Contexto de Permissões

```typescript
// contexts/PermissionContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Permission, PermissionContextType } from '../types/permissions';

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export const usePermissions = (): PermissionContextType => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermissions must be used within PermissionProvider');
  }
  return context;
};

interface PermissionProviderProps {
  children: ReactNode;
}

export const PermissionProvider: React.FC<PermissionProviderProps> = ({ children }) => {
  const [userPermissions, setUserPermissions] = useState<Permission[]>([]);

  const setPermissions = (permissions: Permission[]): void => {
    setUserPermissions(permissions);
  };

  const hasPermission = (permission: Permission): boolean => {
    return userPermissions.includes(permission);
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(permission => userPermissions.includes(permission));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every(permission => userPermissions.includes(permission));
  };

  const value: PermissionContextType = {
    userPermissions,
    setPermissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
};
```

## 3. Componente Can

```typescript
// components/Can.tsx
import React from 'react';
import { usePermissions } from '../contexts/PermissionContext';
import { CanProps } from '../types/permissions';

export const Can: React.FC<CanProps> = ({ 
  children, 
  permission, 
  permissions, 
  mode = 'any', 
  fallback = null 
}) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermissions();

  let hasAccess = false;

  if (permission) {
    hasAccess = hasPermission(permission);
  } else if (permissions && permissions.length > 0) {
    if (mode === 'all') {
      hasAccess = hasAllPermissions(permissions);
    } else {
      hasAccess = hasAnyPermission(permissions);
    }
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};
```

## 4. Hook personalizado useCan

```typescript
// hooks/useCan.ts
import { usePermissions } from '../contexts/PermissionContext';
import { Permission } from '../types/permissions';

interface UseCanReturn {
  can: (permission: Permission) => boolean;
  canAny: (permissions: Permission[]) => boolean;
  canAll: (permissions: Permission[]) => boolean;
}

export const useCan = (): UseCanReturn => {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermissions();

  const can = (permission: Permission): boolean => {
    return hasPermission(permission);
  };

  const canAny = (permissions: Permission[]): boolean => {
    return hasAnyPermission(permissions);
  };

  const canAll = (permissions: Permission[]): boolean => {
    return hasAllPermissions(permissions);
  };

  return { can, canAny, canAll };
};
```

## 5. Serviço de API (exemplo)

```typescript
// services/api.ts
import { User, Permission } from '../types/permissions';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

// Simulando uma API
export const api = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    // Sua chamada real à API aqui
    const response = await fetch('https://sua-api.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      throw new Error('Erro no login');
    }
    
    return response.json();
  },
  
  getUserPermissions: async (userId: string): Promise<Permission[]> => {
    const response = await fetch(`https://sua-api.com/users/${userId}/permissions`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar permissões');
    }
    
    return response.json();
  }
};
```

## 6. Tela de Login com TypeScript

```typescript
// screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { usePermissions } from '../contexts/PermissionContext';
import { api } from '../services/api';
import { Permission } from '../types/permissions';

interface LoginScreenProps {
  navigation: any; // Ajuste conforme seu navigator
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setPermissions } = usePermissions();

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setLoading(true);
    
    try {
      const response = await api.login({ email, password });
      const userPermissions: Permission[] = response.user.permissions;
      
      // Armazena as permissões no contexto
      setPermissions(userPermissions);
      
      // Armazena token (opcional)
      // AsyncStorage.setItem('@App:token', response.token);
      
      // Navegar para próxima tela
      navigation.replace('Home');
    } catch (error) {
      console.error('Erro no login:', error);
      Alert.alert('Erro', 'Falha ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button
        title={loading ? "Carregando..." : "Entrar"}
        onPress={handleLogin}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});
```

## 7. Tela Home com exemplos de uso

```typescript
// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { Can } from '../components/Can';
import { useCan } from '../hooks/useCan';
import { AdminPanel } from '../components/AdminPanel';

export const HomeScreen: React.FC = () => {
  const { can } = useCan();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bem-vindo à aplicação!</Text>

      {/* Verificando permissão única */}
      <Can permission="cadastrar_familia">
        <View style={styles.section}>
          <Button title="Cadastrar Família" onPress={() => {}} />
        </View>
      </Can>

      {/* Com fallback */}
      <Can 
        permission="deletar_estoque" 
        fallback={
          <View style={styles.disabledSection}>
            <Text style={styles.disabledText}>
              Botão de deletar estoque desabilitado
            </Text>
          </View>
        }
      >
        <View style={styles.section}>
          <Button title="Deletar Estoque" color="red" onPress={() => {}} />
        </View>
      </Can>

      {/* Verificando se tem PELO MENOS UMA das permissões */}
      <Can 
        permissions={['listar_familia', 'listar_comunidade']} 
        mode="any"
      >
        <View style={styles.section}>
          <Button title="Listar Registros" onPress={() => {}} />
        </View>
      </Can>

      {/* Verificando se tem TODAS as permissões */}
      <Can 
        permissions={['listar_estoque', 'listar_item_produto']} 
        mode="all"
      >
        <View style={styles.section}>
          <Button title="Relatório de Estoque" onPress={() => {}} />
        </View>
      </Can>

      {/* Componente que usa o hook useCan */}
      <AdminPanel />

      {/* Menu com múltiplas verificações */}
      <View style={styles.menu}>
        <Text style={styles.menuTitle}>Menu Principal</Text>
        
        <Can permission="listar_familia">
          <Button title="Famílias" onPress={() => {}} />
        </Can>

        <Can permission="listar_estoque">
          <Button title="Estoque" onPress={() => {}} />
        </Can>

        <Can permission="visualizar_relatorios">
          <Button title="Relatórios" onPress={() => {}} />
        </Can>

        <Can permission="listar_ajuda">
          <Button title="Ajudas" onPress={() => {}} />
        </Can>
      </View>

      {/* Exemplo usando o hook diretamente */}
      {can('listar_template') && (
        <View style={styles.section}>
          <Button title="Templates" onPress={() => {}} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 15,
  },
  disabledSection: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  disabledText: {
    color: 'gray',
    textAlign: 'center',
  },
  menu: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 20,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
```

## 8. Componente AdminPanel com useCan

```typescript
// components/AdminPanel.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useCan } from '../hooks/useCan';

export const AdminPanel: React.FC = () => {
  const { can, canAny } = useCan();

  // Verifica se tem pelo menos uma permissão de admin
  if (!canAny(['aprovar_ajuda', 'cancelar_ajuda', 'confirmar_ajuda'])) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel Administrativo</Text>
      
      {can('aprovar_ajuda') && (
        <View style={styles.buttonContainer}>
          <Button title="Aprovar Ajuda" onPress={() => {}} />
        </View>
      )}
      
      {can('cancelar_ajuda') && (
        <View style={styles.buttonContainer}>
          <Button title="Cancelar Ajuda" onPress={() => {}} />
        </View>
      )}
      
      {can('confirmar_ajuda') && (
        <View style={styles.buttonContainer}>
          <Button title="Confirmar Ajuda" onPress={() => {}} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 10,
  },
});
```

## 9. App principal

```typescript
// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PermissionProvider } from './contexts/PermissionContext';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App(): React.JSX.Element {
  return (
    <PermissionProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PermissionProvider>
  );
}
```

## 10. Arquivo de configuração TypeScript (opcional)

```json
// tsconfig.json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "jsx": "react-native",
    "types": ["react-native", "jest"],
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "noEmit": true
  }
}
```

## Benefícios da implementação com TypeScript:

1. **Type Safety**: Garante que permissões sejam apenas as definidas no tipo `Permission`
2. **Autocomplete**: IDE oferece sugestões das permissões disponíveis
3. **Refatoração segura**: Mudanças nos tipos são refletidas em toda aplicação
4. **Documentação viva**: Os tipos servem como documentação
5. **Prevenção de erros**: Erros de digitação são capturados em tempo de compilação

## Uso prático:

```typescript
// Em qualquer componente
<Can permission="cadastrar_familia">
  <MeuComponente />
</Can>

// Ou usando o hook
const { can } = useCan();
if (can('listar_estoque')) {
  // fazer algo
}
```

Dessa forma, você tem uma implementação completa, tipada e segura para gerenciamento de permissões em React Native com Expo!