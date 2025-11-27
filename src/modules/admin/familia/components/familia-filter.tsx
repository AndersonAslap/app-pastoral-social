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

export const FamilyFilter = ({ isFilterOpen, setIsFilterOpen }: FamilyFilterProps) => {
  const [filters, setFilters] = useState({
    comunidade: false,
    localizacao: false,
    nome: false,
    situacao: false,
  });

  const handleToggleFilter = (filterName: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      comunidade: false,
      localizacao: false,
      nome: false,
      situacao: false,
    });
  };

  const handleApplyFilters = () => {
    console.log('Filtros aplicados:', filters);
    setIsFilterOpen(false);
  };

  const selectedCount = Object.values(filters).filter(Boolean).length;

  return (
    <Modal
      isOpen={isFilterOpen}
      onClose={() => setIsFilterOpen(false)}
      size="full"
    >
      <ModalBackdrop />
      <ModalContent 
        marginTop="auto" 
        marginBottom={0}
        borderTopLeftRadius="$3xl"
        borderTopRightRadius="$3xl"
        maxHeight="85%"
      >
        <ModalHeader 
          backgroundColor="$backgroundLight50" 
          borderTopLeftRadius="$3xl" 
          borderTopRightRadius="$3xl"
          pb="$4"
        >
          <HStack alignItems="center" justifyContent="space-between" width="100%">
            <VStack>
              <Text fontSize="$xl" fontWeight="bold" color="$textDark800">
                Filtrar Famílias
              </Text>
              <Text fontSize="$sm" color="$textDark500">
                {selectedCount > 0 
                  ? `${selectedCount} filtro${selectedCount > 1 ? 's' : ''} selecionado${selectedCount > 1 ? 's' : ''}`
                  : 'Selecione os filtros'
                }
              </Text>
            </VStack>
            <Button 
              size="sm" 
              variant="link" 
              onPress={() => setIsFilterOpen(false)}
            >
              <Icon as={CloseIcon} size="lg" color="$textDark600" />
            </Button>
          </HStack>
        </ModalHeader>
        
        <ModalBody px="$4" py="$0">
          <ScrollView showsVerticalScrollIndicator={false} py="$4">
            <VStack space="lg">
              {/* Filtro por Comunidade */}
              <Box
                bg={filters.comunidade ? "$primary50" : "$backgroundLight0"}
                borderWidth={filters.comunidade ? 2 : 1}
                borderColor={filters.comunidade ? "$primary500" : "$borderLight200"}
                borderRadius="$lg"
                p="$4"
              >
                <Checkbox
                  value="comunidade"
                  isChecked={filters.comunidade}
                  onChange={() => handleToggleFilter('comunidade')}
                >
                  <HStack space="md" alignItems="center" flex={1}>
                    <Box
                      bg={filters.comunidade ? "$primary500" : "$backgroundLight100"}
                      p="$2"
                      borderRadius="$md"
                    >
                      <ChurchIcon 
                        size={20} 
                        color={filters.comunidade ? "white" : "#64748b"} 
                      />
                    </Box>
                    
                    <VStack flex={1}>
                      <Text fontWeight="$medium" color="$textDark700" size="md">
                        Por comunidade
                      </Text>
                      <Text size="sm" color="$textDark500">
                        Filtrar por igreja
                      </Text>
                    </VStack>

                    <CheckboxIndicator bg="$primary600">
                      <CheckboxIcon as={CheckIcon} color="white" />
                    </CheckboxIndicator>
                  </HStack>
                </Checkbox>
              </Box>

              {/* Filtro por Localização */}
              <Box
                bg={filters.localizacao ? "$primary50" : "$backgroundLight0"}
                borderWidth={filters.localizacao ? 2 : 1}
                borderColor={filters.localizacao ? "$primary500" : "$borderLight200"}
                borderRadius="$lg"
                p="$4"
              >
                <Checkbox
                  value="localizacao"
                  isChecked={filters.localizacao}
                  onChange={() => handleToggleFilter('localizacao')}
                >
                  <HStack space="md" alignItems="center" flex={1}>
                    <Box
                      bg={filters.localizacao ? "$primary500" : "$backgroundLight100"}
                      p="$2"
                      borderRadius="$md"
                    >
                      <MapPinIcon 
                        size={20} 
                        color={filters.localizacao ? "white" : "#64748b"} 
                      />
                    </Box>
                    
                    <VStack flex={1}>
                      <Text fontWeight="$medium" color="$textDark700" size="md">
                        Por localização
                      </Text>
                      <Text size="sm" color="$textDark500">
                        Filtrar por endereço
                      </Text>
                    </VStack>

                    <CheckboxIndicator bg="$primary600">
                      <CheckboxIcon as={CheckIcon} color="white" />
                    </CheckboxIndicator>
                  </HStack>
                </Checkbox>
              </Box>

              {/* Filtro por Nome */}
              <Box
                bg={filters.nome ? "$primary50" : "$backgroundLight0"}
                borderWidth={filters.nome ? 2 : 1}
                borderColor={filters.nome ? "$primary500" : "$borderLight200"}
                borderRadius="$lg"
                p="$4"
              >
                <Checkbox
                  value="nome"
                  isChecked={filters.nome}
                  onChange={() => handleToggleFilter('nome')}
                >
                  <HStack space="md" alignItems="center" flex={1}>
                    <Box
                      bg={filters.nome ? "$primary500" : "$backgroundLight100"}
                      p="$2"
                      borderRadius="$md"
                    >
                      <SearchIcon 
                        size={20} 
                        color={filters.nome ? "white" : "#64748b"} 
                      />
                    </Box>
                    
                    <VStack flex={1}>
                      <Text fontWeight="$medium" color="$textDark700" size="md">
                        Por nome
                      </Text>
                      <Text size="sm" color="$textDark500">
                        Filtrar por representante
                      </Text>
                    </VStack>

                    <CheckboxIndicator bg="$primary600">
                      <CheckboxIcon as={CheckIcon} color="white" />
                    </CheckboxIndicator>
                  </HStack>
                </Checkbox>
              </Box>

              {/* Filtro por Situação */}
              <Box
                bg={filters.situacao ? "$primary50" : "$backgroundLight0"}
                borderWidth={filters.situacao ? 2 : 1}
                borderColor={filters.situacao ? "$primary500" : "$borderLight200"}
                borderRadius="$lg"
                p="$4"
              >
                <Checkbox
                  value="situacao"
                  isChecked={filters.situacao}
                  onChange={() => handleToggleFilter('situacao')}
                >
                  <HStack space="md" alignItems="center" flex={1}>
                    <Box
                      bg={filters.situacao ? "$primary500" : "$backgroundLight100"}
                      p="$2"
                      borderRadius="$md"
                    >
                      <UsersIcon 
                        size={20} 
                        color={filters.situacao ? "white" : "#64748b"} 
                      />
                    </Box>
                    
                    <VStack flex={1}>
                      <Text fontWeight="$medium" color="$textDark700" size="md">
                        Por situação
                      </Text>
                      <Text size="sm" color="$textDark500">
                        Filtrar por status familiar
                      </Text>
                    </VStack>

                    <CheckboxIndicator bg="$primary600">
                      <CheckboxIcon as={CheckIcon} color="white" />
                    </CheckboxIndicator>
                  </HStack>
                </Checkbox>
              </Box>
            </VStack>
          </ScrollView>
        </ModalBody>

        <ModalFooter 
          backgroundColor="$backgroundLight50" 
          borderBottomLeftRadius="$3xl" 
          borderBottomRightRadius="$3xl"
          pt="$4"
        >
          <HStack space="sm" width="100%">
            <Button 
              variant="outline" 
              flex={1} 
              onPress={handleClearFilters}
              borderColor="$borderLight300"
              bg="$backgroundLight0"
            >
              <HStack space="sm" alignItems="center">
                <XIcon size={16} color="#64748b" />
                <Text color="$textDark600" fontWeight="$medium">
                  Limpar
                </Text>
              </HStack>
            </Button>
            
            <Button 
              flex={1} 
              onPress={handleApplyFilters}
              bg="$primary600"
              borderColor="$primary700"
            >
              <HStack space="sm" alignItems="center">
                <CheckIcon size={16} color="white" />
                <Text color="white" fontWeight="$medium">
                  Aplicar
                </Text>
              </HStack>
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};