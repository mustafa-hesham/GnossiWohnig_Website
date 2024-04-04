import { useTranslation } from "react-i18next";
import Text from "../../Atoms/Text";
import { RoundIconButton } from "../../Atoms/Button";
import googleIcon from "../../../Assets/Icons/google.svg";
import { signInWithGoogle, useAuth } from "../../../firebaseProvider";
import { useState } from "react";

const SocialMediaRegister = () => {
  const { t } = useTranslation();
  const [showSpinner, setShowSpinner] = useState(false);
  const { isSignedIn } = useAuth();

  if (showSpinner && isSignedIn) {
    setShowSpinner(false);
  }

  const signIn = () => {
    setShowSpinner(true);
    signInWithGoogle();
  };

  return (
    <>
      <Text size="18px" marginBottom="20px">
        {t("Auth.RegisterWithGoogle")}
      </Text>
      <RoundIconButton
        aria-label="Registrieren mit Google"
        icon={googleIcon}
        onClick={signIn}
      />
    </>
  );
};

export default SocialMediaRegister;
