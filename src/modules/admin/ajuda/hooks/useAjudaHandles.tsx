import { useCallback, useEffect, useState } from "react";
import { AjudaFormData } from "../types";
import { getFamiliaOpcaoLista, getTemplateOpcaoLista, getTipoAjudaOpcaoLista } from "@services/get-opcao-lista.service";
import { cadastrarAjuda } from "../services";
import { useAppToast } from "@hooks/useAppToast";
import { AppError } from "@utils/app.error";
import { MESSAGES_ERROR } from "@utils/constantes";

const createDefaultField = () => ({
  error: false,
  message: ""
});

const createInitialFieldState = () => ({
    idFamilia: createDefaultField(),
    idTipoAjuda: createDefaultField(),
    idTemplate: createDefaultField()
});

const initialState = () => ({
    idFamilia: undefined,
    idTipoAjuda: undefined,
    observacao: "",
    idTemplate: undefined
});

export function useAjudaHandles() {
    const { showErrorToast, showSuccessToast } = useAppToast();

    const [form, setForm] = useState<AjudaFormData>(initialState());
    const [fieldState, setFieldState] = useState(createInitialFieldState());
    const [loading, setLoading] = useState(false);
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [familiasOptions, setFamiliasOptions] = useState<any[]>([]);
    const [tiposAjudaOptions, setTiposAjudaOptions] = useState<any[]>([]);
    const [templatesOptions, setTemplatesOptions] = useState<any[]>([]);

    const requiredFields: (keyof typeof fieldState)[] = [
        "idFamilia",
        "idTipoAjuda",
        "idTemplate"
    ];

    const resetForm = useCallback(() => {
        setForm(initialState());
        setFieldState(createInitialFieldState());
    }, []);

    const handleChange = (field: keyof AjudaFormData, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const formValidate = (payload: AjudaFormData) => {
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
            if (!formValidate(form)) return;

            const payload = {
                idFamilia: parseInt(form.idFamilia!),
                ajuda: {
                    tipoAjuda: parseInt(form.idTipoAjuda!),
                    observacao: form.observacao,
                    idTemplate: parseInt(form.idTemplate!)
                }
            };

            await cadastrarAjuda(payload);
            resetForm();
            showSuccessToast({ title: "Ajuda cadastrada com sucesso!" });
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : MESSAGES_ERROR.DEFAULT_REGISTER;
            showErrorToast({ title });
        } finally {
            setFormSubmitting(false);
        }
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
        fieldState,
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