import { ScrollView } from "@gluestack-ui/themed";
import { 
  Button, 
  Text, 
  HStack, 
  VStack, 
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseIcon,
  Icon
} from "@gluestack-ui/themed";
import { CheckIcon, XIcon } from "lucide-react-native";

interface FamilyFilterProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  children: React.ReactNode
}

export const CustomModal = ({ isOpen, setIsOpen, children, title }: FamilyFilterProps) => {

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
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
            <Text fontSize="$xl" fontWeight="bold" color="$textDark800">
                {title}
            </Text>
            <Button 
              size="sm" 
              variant="link" 
              onPress={() => setIsOpen(false)}
            >
              <Icon as={CloseIcon} size="lg" color="$textDark600" />
            </Button>
          </HStack>
        </ModalHeader>
        
        <ModalBody px="$4" py="$0" mb="$16">
            <ScrollView showsVerticalScrollIndicator={false}>
                {children}
            </ScrollView>
        </ModalBody>

        {
            /*
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
            */
        }
      </ModalContent>
    </Modal>
  );
};