import React from 'react';
import { ScrollView, VStack, Box } from "@gluestack-ui/themed";
import { usePerfil } from '@hooks/perfil/usePerfil';
import { ProfileHeader } from './components/perfilHeader';
import { PersonalInfoSection } from './components/personalInfoSection';
import { SecuritySection } from './components/securitySection';
import { SecurityTip } from './components/secutiryTip';
import { ActionButtons } from './components/actionButton';

export const Perfil: React.FC = () => {
  const {
    form,
    formSubmitting,
    showPassword,
    showConfirmPassword,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    user,
    onCancel
  } = usePerfil();

  console.log(JSON.stringify(user, null, 2))

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bg="$blue100"
      flex={1}
    >
      <VStack
        flex={1}
        bg="$backgroundLight50"
        borderTopLeftRadius="$3xl"
        borderTopRightRadius="$3xl"
        px="$6"
        pt="$16"
        pb="$8"
        gap="$6"
      >
        <ProfileHeader />

        <PersonalInfoSection
          form={form}
          onFormChange={handleChange}
          nickName={user.nickName}
        />

        <SecuritySection
          form={form}
          formSubmitting={formSubmitting}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          onFormChange={handleChange}
          onTogglePasswordVisibility={togglePasswordVisibility}
          onToggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
          onSubmit={handleSubmit}
        />

        <SecurityTip />

        <ActionButtons
          formSubmitting={formSubmitting}
          onSubmit={handleSubmit}
          onCancel={onCancel}
        />

        {/* Espaço extra para scroll */}
        <Box h="$8" />
      </VStack>
    </ScrollView>
  );
};