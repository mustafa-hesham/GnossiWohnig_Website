import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { useTheme } from "styled-components";
import { device } from "../../Components/Atoms/Devices";
import Section from "../../Components/Atoms/Section";
import Text from "../../Components/Atoms/Text";
import { getCollection } from "../../firebaseProvider";
import BackgroundImage from "../../Assets/header2.webp";
import HeaderSection from "../../Components/Atoms/HeaderSection";
import AdApp from "./AdApp";
import FreeObjects from "./FreeObjects";

const Title = styled.h1`
  font-size: 55px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  color: ${(props) => props.theme.colors.white};

  @media ${device.tablet} {
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  @media ${device.mobile} {
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 30px;
    width: 90%;
  }
`;

const Home = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [freeObjects, setFreeObjects] = useState();

  if (freeObjects == null) {
    getCollection("freeObjects").then((data) => {
      setFreeObjects(data);
    });
  }

  return (
    <>
      <HeaderSection
        pt="100px"
        pb="250px"
        ptTablet="90px"
        pbTablet="150px"
        ptMobile="80px"
        pbMobile="100px"
        className="Header-BackgroundImage"
        backgroundImage={BackgroundImage}
      >
        <Title>{t("Home.Title")}</Title>
        <Text
          color={theme.colors.white}
          size="18px"
          sizeTablet="14px"
          sizeMobile="14px"
          width="70%"
          widthMobile="80%"
        >
          {t("Home.Subtitle")}
        </Text>
      </HeaderSection>
      <Section
        pt="100px"
        pb="100px"
        ptTablet="80px"
        ptMobile="60px"
        width="80%"
      >
        <AdApp />
      </Section>
      <Section pb="100px" pt="100px" backgroundColor={theme.colors.secundary}>
        <FreeObjects />
      </Section>
    </>
  );
};

export default Home;
