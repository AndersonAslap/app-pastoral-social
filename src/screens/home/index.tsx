import { HomeHeader } from "./components/home-header";
import { ScrollView, VStack } from "@gluestack-ui/themed";
import HomeMenu from "./components/home-menu";

export function Home() {
    return (
        <VStack flex={1}>
            <HomeHeader />

            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                mt="$4"
            >
                <HomeMenu />
            </ScrollView>
        </VStack>
    );
}
