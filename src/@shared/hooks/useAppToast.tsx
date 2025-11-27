import {
  useToast,
  Toast,
  ToastTitle,
} from "@gluestack-ui/themed";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastOptions {
  title: string;
  duration?: number;
}

const TOAST_COLORS: Record<
  ToastType,
  { bg: string; titleColor: string; descColor: string }
> = {
  success: { bg: "$green500", titleColor: "$white", descColor: "$white" },
  error: { bg: "$red500", titleColor: "$white", descColor: "$white" },
  warning: { bg: "$yellow500", titleColor: "$black", descColor: "$black" },
  info: { bg: "$blue500", titleColor: "$white", descColor: "$white" },
};

export function useAppToast() {
  const toast = useToast();

  function showToast(type: ToastType, options: ToastOptions) {
    const { title, duration = 3000 } = options;
    const colors = TOAST_COLORS[type];

    toast.show({
      placement: "top",
      duration,
      containerStyle: {
        marginTop: 40,
      },
      render: () => (
        <Toast backgroundColor={colors.bg} action={type} variant="outline">
          <ToastTitle color={colors.titleColor}>{title}</ToastTitle>
        </Toast>
      ),
    });
  }

  // Funções auxiliares para maior clareza
  const showSuccessToast = (options: ToastOptions) =>
    showToast("success", options);

  const showErrorToast = (options: ToastOptions) => showToast("error", options);

  const showWarningToast = (options: ToastOptions) =>
    showToast("warning", options);

  const showInfoToast = (options: ToastOptions) => showToast("info", options);

  return {
    showToast,
    showSuccessToast,
    showErrorToast,
    showWarningToast,
    showInfoToast,
  };
}
