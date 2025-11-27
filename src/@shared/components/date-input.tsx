import React, { useState, useEffect } from "react";
import { Platform, Pressable } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import {
  VStack,
  Text,
  Input,
  InputField,
  InputSlot,
  Icon,
} from "@gluestack-ui/themed";
import { CalendarDays } from "lucide-react-native";

type DateInputProps = {
  label?: string;
  value?: Date | null;
  onChange?: (date: Date) => void;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  errorMessage?: string;
  required?: boolean;
};

export function DateInput({
  label,
  value,
  onChange,
  placeholder = "Selecione uma data",
  minimumDate,
  maximumDate,
  errorMessage,
  required = false,
}: DateInputProps) {
  const [show, setShow] = useState(false);
  const [internalDate, setInternalDate] = useState<Date | null>(value || null);

  useEffect(() => {
    if (value !== undefined && value !== internalDate) {
      setInternalDate(value);
    }
  }, [value]);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    // Primeiro, sempre fechar o picker no Android
    setShow(false);

    if (event.type === "dismissed") {
      return;
    }

    if (selectedDate) {
      setInternalDate(selectedDate);
      onChange?.(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const formattedDate = internalDate
    ? internalDate.toLocaleDateString("pt-BR")
    : "";

  return (
    <VStack space="xs" mb="$4">
      {label && (
        <Text fontWeight="$medium" color="$textDark700">
          {label} {required && <Text color="$error500">*</Text>}
        </Text>
      )}

      <Pressable onPress={showDatepicker}>
        <Input bg="$backgroundLight100" pointerEvents="none">
          <InputField
            value={formattedDate}
            placeholder={placeholder}
          />
          <InputSlot pr="$3">
            <Icon as={CalendarDays} color="$textDark500" />
          </InputSlot>
        </Input>
      </Pressable>

      {show && (
        <DateTimePicker
          value={internalDate || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleChange}
          locale="pt-BR"
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}

      {errorMessage && (
        <Text color="$error500" fontSize="$sm">
          {errorMessage}
        </Text>
      )}
    </VStack>
  );
}