import { Center, Heading, HStack, VStack } from "@gluestack-ui/themed";

type Props = {
    title: string;
}

export function ScreenHeader({ title } : Props) {
    return (
        <Center
            bg="$blue100" 
            pb="$6" 
            pt="$16"
        >
            <Heading
                color="$blue900"
                fontSize="$xl"
                fontFamily="$heading"   
            >
                {title}
            </Heading>
        </Center>
    )
}