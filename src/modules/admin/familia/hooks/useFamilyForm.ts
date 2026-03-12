import { useAppToast } from "@shared/hooks/useAppToast";
import { listarComunidadeService } from "@shared/services/comunidade.service";
import { listarDificuldadeService } from "@shared/services/dificuldade.service";
import { AppError } from "@shared/utils/app.error";
import { MESSAGES_ERROR } from "@shared/utils/constantes";
import { useCallback, useEffect, useState } from "react";
import { ICriarFamiliaPayload } from "../../../../@shared/types/payload";
import { createFamiliaService } from "../services";
import { Masks } from "@utils/masks";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@shared/routes/app.routes";

const createDefaultField = () => ({
  error: false,
  message: ""
});

const createInitialFieldState = () => ({
  nomeRepresentante: createDefaultField(),
  idade: createDefaultField(),
  idDificuldade: createDefaultField(),
  cpfRg: createDefaultField(),
  telefone: createDefaultField(),
  endereco: createDefaultField(),
  qtdPessoasResidencia: createDefaultField(),
  qtdPessoasEmpregadas: createDefaultField()
});

const initialState = () => ({
  nomeRepresentante: "",
  idade: "",
  idComunidade: undefined,
  idDificuldade: undefined,
  dificuldades: [],
  cpfRg: "",
  telefone: "",
  endereco: "",
  qtdPessoasResidencia: "",
  qtdPessoasEmpregadas: "",
  criancasFrequentamEscola: false,
  membroComProblemaSaude: false,
  jaRecebeuAjuda: false,
  desejaParticiparCursos: false,
  observacao: "",
  outros: ""
});

export const useFamilyForm = () => {

  const { showErrorToast, showSuccessToast } = useAppToast();
  const { cpfOrRg, phone, unmask } = Masks;

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [form, setForm] = useState<ICriarFamiliaPayload>(initialState());
  const [fieldState, setFieldState] = useState(createInitialFieldState());
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [dificuldadeOptions, setDificuldadeOptions] = useState<{ label: string; value: string }[]>([]);
  const [comunidadeOptions, setComunidadeOptions] = useState<{ label: string; value: string }[]>([]);

  const requiredFields: (keyof typeof fieldState)[] = [
    "nomeRepresentante",
    "idade",
    "idDificuldade",
    "cpfRg",
    "telefone",
    "endereco",
    "qtdPessoasResidencia",
    "qtdPessoasEmpregadas"
  ];

  const resetForm = useCallback(() => {
    setForm(initialState());
    setFieldState(createInitialFieldState());
  }, []);

  const handleCancel = () => {
    resetForm();
    navigation.navigate("familiaListagem");
  };

  const handleChange = (field: keyof ICriarFamiliaPayload, value: any) => {

    if (field === "idDificuldade") {
      setForm(prev => ({
        ...prev,
        idDificuldade: value,
        dificuldades: [value]
      }));
      return;
    }

    if (field === "cpfRg") value = cpfOrRg(value);
    if (field === "telefone") value = phone(value);

    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formValidate = (payload: ICriarFamiliaPayload) => {
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
      const payload: ICriarFamiliaPayload = {
        ...form,
        cpfRg: unmask(form.cpfRg),
        telefone: unmask(form.telefone)
      };

      if (!formValidate(payload)) return;

      await createFamiliaService(payload);
      resetForm();
      showSuccessToast({ title: "Família cadastrada com sucesso!" });
    } catch (error) {
      const isAppError = error instanceof AppError;
      showErrorToast({
        title: isAppError
          ? error.message
          : MESSAGES_ERROR.DEFAULT_REGISTER
      });
    } finally {
      setFormSubmitting(false);
    }
  };

  const loadSelects = async () => {
    try {
      const [dificuldades, comunidades] = await Promise.all([
        listarDificuldadeService(),
        listarComunidadeService()
      ]);

      setDificuldadeOptions(dificuldades || []);
      setComunidadeOptions(comunidades || []);
    } catch (error) {
      const isAppError = error instanceof AppError;
      showErrorToast({
        title: isAppError
          ? error.message
          : "Erro ao carregar dados"
      });
    }
  };

  useEffect(() => {
    loadSelects();
  }, []);

  useFocusEffect(
    useCallback(() => {
      resetForm();
    }, [])
  );

  return {
    form,
    fieldState,
    formSubmitting,
    dificuldadeOptions,
    comunidadeOptions,
    handleChange,
    handleSubmit,
    handleCancel
  };
};