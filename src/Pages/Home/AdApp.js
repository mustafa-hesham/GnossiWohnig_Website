import React from "react";
import { useTranslation } from "react-i18next";
import Row from "../../Components/Atoms/Row";
import Column from "../../Components/Atoms/Column";
import Tick from "../../Assets/Icons/tick.png";
import Text from "../../Components/Atoms/Text";
import Image from "../../Components/Atoms/Image";
import { CustomList } from "../../Components/Molecules/List";
import { IconLinkButton } from "../../Components/Atoms/Button";
import LogoAppStore from "../../Assets/logo_app_store.png";
import LogoPlayStore from "../../Assets/logo_play_store.png";
import AppLogo from "../../Assets/app_logo.png";
import Background from "../../Components/Atoms/Background";
import styled, { useTheme } from "styled-components";

const ImgContainer = styled.div`
  box-shadow: 0px 0px 7px 2px rgba(135, 135, 135, 0.3);
  border-radius: 20px;
  display: block;
  width: 120px;
  margin: 10px auto 0px auto;
`;

const AdApp = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Row alignItems="center">
      <Column width="30%" marginBottomTablet="30px">
        <ImgContainer>
          <Image src={AppLogo} width="120px" alt="Logo" />
        </ImgContainer>
        <Text size="18px" marginTop="20px" weight="400">
          {t("Home.App")}
        </Text>
      </Column>
      <Column width="35%" marginBottomTablet="30px">
        <CustomList
          marginTop="10px"
          marginBottom="10px"
          marker={Tick}
          list={[
            <Text align="left">{t("Home.AppArgue1")}</Text>,
            <Text align="left">{t("Home.AppArgue2")}</Text>,
            <Text align="left">{t("Home.AppArgue3")}</Text>,
          ]}
        />
      </Column>
      <Column width="25%" widthTablet="50%">
        <Background
          backgroundColor={theme.colors.lightgrey}
          pt="15px"
          pb="15px"
          boarderRadius="15px"
        >
          <Text pt="20px" marginBottom="10px" size="16px">
            {t("Home.NowAvailable")}
          </Text>
          <Row justify="center" isRow={true} isRowOnMobile={true}>
            <IconLinkButton
              aria-label="App Store"
              link="#"
              alt="App Store"
              icon={LogoAppStore}
            />
            <IconLinkButton
              aria-label="Play Store"
              link="https://play.google.com/store/apps/details?id=com.nelinik.gnossi_wohnig"
              alt="Play Store"
              icon={LogoPlayStore}
            />
          </Row>
        </Background>
      </Column>
    </Row>
  );
};

export default AdApp;
