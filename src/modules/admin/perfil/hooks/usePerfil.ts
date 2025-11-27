import { useState } from "react";
import { PerfilFormData } from "../types";
import { useAuth } from "@shared/hooks/useAuth";

export const usePerfil = () => {
  const { user } = useAuth();
  const { nome } = user;

  const [form, setForm] = useState<PerfilFormData>({
    nome: nome || "",
    senha: "",
    confirmarSenha: "",
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
      // Lógica de submit aqui
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(error);
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