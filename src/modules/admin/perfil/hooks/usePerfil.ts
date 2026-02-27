import { useState } from "react";
import { PerfilFormData } from "../types";
import { useAuth } from "@shared/hooks/useAuth";
import { useAppToast } from "@hooks/useAppToast";
import { AppError } from "@utils/app.error";
import { MESSAGES_ERROR } from "@utils/constantes";
import { atualizarPerfil } from "../services";

export const usePerfil = () => {
  const { showErrorToast, showSuccessToast } = useAppToast();
  const { user } = useAuth();
  const { nome, nickName } = user;

  const [form, setForm] = useState<PerfilFormData>({
    nome: nome || "",
    nickName: nickName ||"",
    novaSenha: "",
    confirmarSenha: ""
  });
  
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field: keyof PerfilFormData, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    setFormSubmitting(true);
    try {
      const payload = { ...form };

      if (payload.novaSenha !== "" && payload.novaSenha !== payload.confirmarSenha) {
        showErrorToast({ title: "As senhas não coincidem!" });
        return;
      }

      await atualizarPerfil(payload);
      showSuccessToast({ title: "Dados atualizados com sucesso!" });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : MESSAGES_ERROR.DEFAULT_UPDATE;
      showErrorToast({ title });
    } finally {
      setFormSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return {
    form,
    formSubmitting,
    showPassword,
    showConfirmPassword,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    user
  };
};