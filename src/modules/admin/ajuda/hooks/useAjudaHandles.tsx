import { useEffect, useState } from "react";
import { AjudaFormData } from "../types";
import { getFamiliaOpcaoLista, getTemplateOpcaoLista, getTipoAjudaOpcaoLista } from "@services/get-opcao-lista.service";
import { cadastrarAjuda } from "../services";
import { useAppToast } from "@hooks/useAppToast";
import { AppError } from "@utils/app.error";
import { MESSAGES_ERROR } from "@utils/constantes";

export function useAjudaHandles() {
    const { showErrorToast, showSuccessToast } = useAppToast();

    const [form, setForm] = useState<AjudaFormData>({
        idFamilia: "",
        idTipoAjuda: "",
        observacao: "",
        idTemplate: ""
    });
    
    const [loading, setLoading] = useState(false);
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [familiasOptions, setFamiliasOptions] = useState<any[]>([]);
    const [tiposAjudaOptions, setTiposAjudaOptions] = useState<any[]>([]);
    const [templatesOptions, setTemplatesOptions] = useState<any[]>([]);

    const handleChange = (field: keyof AjudaFormData, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setFormSubmitting(true);
        try {
            const payload = {
                idFamilia: parseInt(form.idFamilia),
                ajuda: {
                    tipoAjuda: parseInt(form.idTipoAjuda),
                    observacao: form.observacao,
                    idTemplate: parseInt(form.idTemplate)
                }
            };
            await cadastrarAjuda(payload);
            showSuccessToast({ title: "Ajuda cadastrada com sucesso!" });
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : MESSAGES_ERROR.DEFAULT_REGISTER;
            showErrorToast({ title });
        } finally {
            setFormSubmitting(false);
        }
    };

    const resetForm = () => {
        setForm({
            idFamilia: "",
            idTipoAjuda: "",
            observacao: "",
            idTemplate: ""
        });
    };

    const loadOptions = async () => {
        setLoading(true);
        try {
            const [familias, tiposAjuda, templates] = await Promise.all([
                getFamiliaOpcaoLista(),
                getTipoAjudaOpcaoLista(),
                getTemplateOpcaoLista()
            ]);

            setFamiliasOptions(familias);
            setTiposAjudaOptions(tiposAjuda);
            setTemplatesOptions(templates);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOptions();
    }, []);

    return {
        form,
        formSubmitting,
        familiasOptions,
        tiposAjudaOptions,
        templatesOptions,
        handleChange,
        handleSubmit,
        resetForm,
        loading
    };
}