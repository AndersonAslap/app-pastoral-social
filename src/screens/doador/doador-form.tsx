import React, { useCallback, useState } from 'react';
import { Input, Loading, ScreenHeader } from "@components/index";
import { Box, HStack, Pressable, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import { useAppToast } from '@hooks/useAppToast';
import { AppError } from '@utils/app.error';
import { Seccao } from './components/seccao';
import { cadastrarDoador } from '@services/doador';
import { Masks } from '@utils/masks';

const createDefaultField = () => ({
  error: false,
  message: ""
});

const createInitialFieldState = () => ({
  nomeDoador: createDefaultField(),
  telefone: createDefaultField()
});

const initialState = () => ({
  nomeDoador: "",
  telefone: ""
});

export const DoadorForm: React.FC = () => {
  const { showErrorToast, showSuccessToast } = useAppToast();

  const [formData, setFormData] = useState(initialState());
  const [fieldState, setFieldState] = useState(createInitialFieldState());
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [cadastroConcluido, setCadastroConcluido] = useState(false);

  const requiredFields: (keyof typeof fieldState)[] = [
    "nomeDoador",
    "telefone"
  ];

  const resetForm = useCallback(() => {
    setFormData(initialState());
    setFieldState(createInitialFieldState());
  }, []);

  const handleInputChange = (field: string, value: string) => {
    if (field === "telefone") value = Masks.phone(value);
    setFormData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const formValidate = (payload: {nomeDoador: string, telefone: string}) => {
    let hasError = false;
    const newFieldState = createInitialFieldState();

    requiredFields.forEach(field => {
      const value = payload[field];
      if (!value || (typeof value === "string" && !value.trim())) {
        newFieldState[field] = {
          error: true,
          message: "Campo obrigatório"
        };
        hasError = true;
      }
    });

    setFieldState(newFieldState);

    return !hasError;
  };

  const handleSubmit = async () => {
    setFormSubmitting(true);
    try {
      if (!formValidate({...formData})) return;
      const payload = {...formData, telefone: "55" + Masks.unmask(formData.telefone)};
      await cadastrarDoador(payload);
      resetForm();
      setCadastroConcluido(true);
    } catch (error) {
      const isAppError = error instanceof AppError;
      showErrorToast({
        title: isAppError
          ? error.message
          : "Ocorreu um erro ao enviar o formulário. Tente novamente."
      });
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bg="$white"
      flex={1}
    >
      <ScreenHeader title="Seja Doador" />

      <VStack
        flex={1}
        bg="$blue50"
        px="$6"
        pt="$8"
        pb="$8"
        gap="$6"
      >
        {
          cadastroConcluido
          ? (
              <Box
                bg="$green500"
                borderRadius="$2xl"
                p="$5"
              >
                <VStack gap="$3" alignItems="center">
                  <Text fontSize="$2xl">💚</Text>
                  
                  <Text fontSize="$xl" fontWeight="$bold" color="$white" textAlign="center">
                    Cadastro concluído!
                  </Text>
                  
                  <Text fontSize="$sm" color="$green100" textAlign="center">
                    Agradecemos por se tornar um doador
                  </Text>
                  
                  {/* Notificação WhatsApp simplificada */}
                  <HStack
                    gap="$2" 
                    alignItems="center" 
                    bg="$green700" 
                    p="$2" 
                    borderRadius="$md"
                    mt="$1"
                  >
                    <Text fontSize="$xs" color="$white" textAlign="center">
                      Você receberá notificação no WhatsApp quando a ação começar
                    </Text>
                  </HStack>
                </VStack>
              </Box>
          )
          : (
            <>
               <Box
                  bg="$primary500"
                  borderRadius="$2xl"
                  p="$5"
                >
                  <VStack gap="$3" alignItems="center">
                    <Text fontSize="$2xl">❤️</Text>
                    <Text fontSize="$lg" fontWeight="$bold" color="$white" textAlign="center">
                      Obrigado por sua generosidade!
                    </Text>
                    <Text fontSize="$sm" color="$blue100" textAlign="center">
                      Preencha os dados abaixo para se tornar um doador
                    </Text>
                  </VStack>
                </Box>

                <Seccao titulo="Seus Dados" icone="👤">
                  <VStack gap="$4">
                      <Box>
                        <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
                          Nome Completo *
                        </Text>
                        <Input
                          size="md"
                          placeholder="Seu nome completo"
                          value={formData.nomeDoador}
                          onChangeText={(value) => handleInputChange("nomeDoador", value)}
                          error={fieldState.nomeDoador.error}
                          helperText={fieldState.nomeDoador.message}
                        />
                      </Box>
                
                      <Box>
                        <Text fontSize="$sm" fontWeight="$medium" color="$textDark700">
                          Telefone WhatsApp *
                        </Text>
                
                        <Input
                          size="md"
                          placeholder="(81) 99999-9999"
                          value={formData.telefone}
                          onChangeText={(value) => handleInputChange("telefone", value)}
                          keyboardType="phone-pad"
                          error={fieldState.telefone.error}
                          helperText={fieldState.telefone.message}
                        />
                      </Box>
                    </VStack>
                </Seccao>

                <Pressable
                  onPress={handleSubmit}
                  disabled={formSubmitting} 
                >
                  {({ pressed }) => (
                    <Box
                      bg="$primary500"
                      borderRadius="$xl"
                      py={formSubmitting ? "$2" : "$4"}
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="row"
                      gap="$3"
                      mb="$8"
                      style={{
                        transform: [{ scale: pressed && true ? 0.95 : 1 }]
                      }}
                    >
                      {
                        formSubmitting 
                        ? <Loading />
                        : (
                          <Text 
                            fontSize="$lg" 
                            fontWeight="$bold" 
                            color="$white"
                          >
                            Confirmar Cadastro
                          </Text>
                        )
                      }  
                    </Box>
                  )}
                </Pressable>
            </>
          )
        }
      </VStack>
    </ScrollView>
  );
};