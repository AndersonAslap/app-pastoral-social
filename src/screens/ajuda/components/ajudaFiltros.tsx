import { FilterContainer } from "@components/filter-container";
import { 
  Button, 
  Text, 
  HStack, 
  VStack, 
  Box, 
  Checkbox, 
  CheckboxIndicator, 
  CheckboxIcon,
  ScrollView,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseIcon,
  Icon
} from "@gluestack-ui/themed";
import { SearchIcon, MapPinIcon, UsersIcon, ChurchIcon, CheckIcon, XIcon } from "lucide-react-native";
import { useState } from "react";

interface FamilyFilterProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
}

export const AjudaFiltros = ({ isFilterOpen, setIsFilterOpen }: FamilyFilterProps) => {
  
  return (
    <FilterContainer isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} modulo="Ajudas">
      <ScrollView showsVerticalScrollIndicator={false} py="$4">
        <VStack space="lg">
          <Text>Testes</Text>
        </VStack>
      </ScrollView>
    </FilterContainer>
  );
};