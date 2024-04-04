import React from "react";
import styled, { useTheme } from "styled-components";
import Row from "../Atoms/Row";
import Column from "../Atoms/Column";
import Image from "../Atoms/Image";
import DummyHouse from "../../Assets/dummy_house2.svg";
import Text from "../Atoms/Text";
import { useTranslation } from "react-i18next";

const CardContainer = styled.a`
  margin-top: 20px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0px 0px 7px 2px rgba(135, 135, 135, 0.3);
  border-radius: 15px;
  display: block;
  width: 100%;
  border: none;
  text-decoration: none;
  cursor: pointer;
`;

const ObjectCard = ({ data }) => {
  const imgUrl = data.previewImgUrl === "" ? DummyHouse : data.previewImgUrl;
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <CardContainer href={data.link} target="_blank">
      <Row justify="center" isRow={true}>
        <Column
          width="15%"
          widthTablet="15%"
          widthMobile="100%"
          marginTop="20px"
          marginBottom="20px"
        >
          <Image
            width="110px"
            height="110px"
            src={imgUrl}
            alt="Vorschau"
          ></Image>
        </Column>
        <Column
          width="75%"
          widthTablet="75%"
          widthMobile="100%"
          marginLeft="20px"
        >
          <Row justify="space-between" isRow={true}>
            <Column
              width="80%"
              widthTablet="70%"
              marginTopMobile="0px"
              marginTop="22px"
            >
              <Text
                align="left"
                alignMobile="center"
                size="20px"
                sizeTablet="18px"
                sizeMobile="14px"
                weightMobile="bold"
              >
                {data.description === ""
                  ? t("Home.DummyDescr")
                  : data.description}
              </Text>
            </Column>
            <Column
              width="20%"
              widthTablet="20%"
              textAlign="right"
              marginTop="22px"
              marginTopMobile="5px"
            >
              <Text
                align="right"
                alignMobile="center"
                size="18px"
                sizeTablet="16px"
                sizeMobile="14px"
                display="inline"
                weight="500"
              >
                {data.price !== "" ? data.price : "Fr. -.-"}
              </Text>
            </Column>
          </Row>
          <Text
            align="left"
            size="14px"
            marginTop="5px"
            marginTopMobile="20px"
            widthMobile="95%"
          >
            <b>{t("Home.Rooms")}</b>
            {data.rooms !== "" ? data.rooms : "-"}
          </Text>
          <Text align="left" size="14px" widthMobile="95%">
            <b>{t("Home.Size")}</b>
            {data.size !== "" ? data.size : "-"}
          </Text>
          <Text align="left" size="14px" widthMobile="95%">
            <b>{t("Home.Address")}</b>
            {data.address !== "" ? data.address : "-"}
          </Text>
          <Row justify="space-between" isRow={true}>
            <Column width="50%" widthTablet="30%">
              <Text align="left" size="14px" widthMobile="95%">
                <b>{t("Home.AvailableFrom")}</b>
                {data.availableFrom !== "" ? data.availableFrom : "-"}
              </Text>
            </Column>
            <Column
              width="50%"
              widthTablet="70%"
              textAlign="right"
              marginTopTablet="10px"
              marginTopMobile="10px"
              marginBottomMobile="20px"
            >
              <Text
                align="right"
                size="16px"
                sizeMobile="13px"
                display="inline"
                color={theme.colors.primary}
              >
                <b>{data.provider}</b>
              </Text>
            </Column>
          </Row>
        </Column>
      </Row>
    </CardContainer>
  );
};

export default ObjectCard;
