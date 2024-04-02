import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { device } from "../../Components/Atoms/Devices";
import Row from "../../Components/Atoms/Row";
import Column from "../../Components/Atoms/Column";
import Card from "../../Components/Molecules/Card";
import {
  callCloudFunctionWithAppCheck,
  checkIfProUser,
  setProUserStatus,
  setSubscription,
  streamCollection,
  useAuth,
} from "../../firebaseProvider";
import SwitchButton from "../../Components/Molecules/SwitchButton";
import Text from "../../Components/Atoms/Text";
import DummyCard from "../../Components/Molecules/DummyCard";
import Spinner from "../../Components/Atoms/Spinner";
import Modal from "react-modal";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const SubTitle = styled.h2`
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 50px;
  display: block;
  font-weight: normal;

  @media ${device.tablet} {
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 30px;
  }

  @media ${device.mobile} {
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 30px;
  }
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "2px solid #4287a1",
    padding: "20px",
  },
};
const FreeObjects = () => {
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();
  const queryId = query.get("id");
  const { t } = useTranslation();
  const [objectsInView, setObjectsInView] = useState([]);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [freeObjects, setFreeObjects] = useState([]);
  const [addSnapshots, setAddSnapshots] = useState([]);
  const [modSnapshots, setModSnapshots] = useState([]);
  const [delSnapshots, setDelSnapshots] = useState([]);
  const [proUser, setProUser] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { isSignedIn, user } = useAuth();

  // todo: replace with check for subscription status on revenuecat
  if (proUser == null && user) {
    checkIfProUser(user.uid).then((res) => {
      setProUser(res);
    });
  }

  const updateUserSubscription = useCallback(() => (subscription) => {
    if (user && user?.uid && subscription) {
      setSubscription(user?.uid, true, subscription);
    }
  }, [user]);

  useEffect(() => {

    if (queryId && isSignedIn) {
      callCloudFunctionWithAppCheck("getpaymentDetails", {
        sessionId: queryId,
      })
        .then((response) => {
          if (response?.data?.subscription) {
            updateUserSubscription(response?.data?.subscription);
          }
        })
        .catch((error) => {
          console.log("Error response", error);
        });

      callCloudFunctionWithAppCheck("sendStripeTokens", {
        app_user_id: user.uid,
        fetch_token: queryId,
      })
        .then((response) => {
          setProUserStatus(user.uid, true);
          setProUser(true);
        })
        .catch((error) => {
          console.log("sendStripeToken failed:", error);
        });
    }
  }, [queryId, isSignedIn, query, updateUserSubscription, user?.uid]);

  const sortObjects = (obj) => {
    var res = null;

    if (obj !== null) {
      res = Array.from(obj).sort((x, y) => {
        return x.timestamp - y.timestamp;
      });
      res = res.reverse();
    }
    return res;
  };

  useEffect(() => {
    streamCollection(
      "freeObjects",
      setAddSnapshots,
      setModSnapshots,
      setDelSnapshots
    );
  }, []);

  useEffect(() => {
    if (!freeObjects) {
      const sortedAddSnap = sortObjects(addSnapshots);
      setFreeObjects(sortedAddSnap);
      setObjectsInView(sortedAddSnap);
    } else if (!addSnapshots.every(x => freeObjects.includes(x))) {
      const combinedArray = Array.from(new Set([...addSnapshots, ...freeObjects]));
      setFreeObjects(combinedArray);
      setObjectsInView(combinedArray);
    }
  }, [addSnapshots, freeObjects]);

  useEffect(() => {
    if (modSnapshots) {
      modSnapshots.forEach((obj) => {
        var index = null;

        for (var i = 0; i < freeObjects.length; i++) {
          if (freeObjects[i].id === obj.id) {
            index = i;
          }
        }
        if (index !== null) {
          let updateFreeObjects = [...freeObjects];
          updateFreeObjects[index] = obj;
          setFreeObjects(updateFreeObjects);
        }
      });
    }
  }, [modSnapshots, freeObjects]);

  useEffect(() => {
    if (delSnapshots) {
      delSnapshots.forEach((obj) => {
        var index = null;

        for (var i = 0; i < freeObjects.length; i++) {
          if (freeObjects[i].id === obj.id) {
            index = i;
          }
        }

        if (index !== null) {
          let updateFreeObjects = [...freeObjects];
          updateFreeObjects.splice(index, 1);
          setFreeObjects(updateFreeObjects);
        }
      });
    }
  }, [delSnapshots, freeObjects]);

  useEffect(() => {
    if (switchChecked) {
      var res = [];
      freeObjects.forEach((element) => {
        if (element["objectInZH"]) res.push(element);
      });
      setObjectsInView(res);
    } else {
      setObjectsInView(freeObjects);
    }
  }, [freeObjects, switchChecked]);

  const filterZHObjects = (value) => {
    setSwitchChecked(value);
    if (value) {
      var res = [];
      freeObjects.forEach((element) => {
        if (element["objectInZH"]) res.push(element);
      });
      setObjectsInView(res);
    } else {
      setObjectsInView(freeObjects);
    }
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="PaymentModal"
        ariaHideApp={false}
      >
        <Row justify="center" isRow={true} isRowOnMobile={true}>
          <stripe-buy-button
            client-reference-id={user?.uid}
            buy-button-id="buy_btn_1OxAwNA0PZbui0YFoMEai8iv"
            publishable-key="pk_live_51Oc542A0PZbui0YFdbDHthOxmRJ1iQTynGsUO43SVyfAu4Qnk5HxDNqpGSIVxeI4xdkt9FXfCE008mcVEeaW298L00zUHCEiL0"
          ></stripe-buy-button>
        </Row>
      </Modal>
      <Row justify="center" isRow={true} isRowOnMobile={true}>
        <SubTitle>{t("Home.FreeObjects")}</SubTitle>
      </Row>
      <Row justify="center" isRow={true} isRowOnMobile={true}>
        <Column width="60%">
          <Row>
            <Column marginLeft="10px">
              <SwitchButton
                onChange={filterZHObjects}
                checked={switchChecked}
                label={t("Home.OnlyZHCity")}
              />
            </Column>
          </Row>
          {objectsInView ? (
            objectsInView.length === 0 ? (
              <Text marginTop="50px" size="18px">
                {t("Home.NoObjects")}
              </Text>
            ) : (
              objectsInView.map((element) =>
                proUser ? (
                  <Card key={element.id} data={element} />
                ) : (
                  <DummyCard
                    onclick={() => {
                      if (user && user?.uid) {
                        setIsOpen(true);
                      }
                    }}
                    key={element.id}
                    data={element}
                  />
                )
              )
            )
          ) : (
            <Row justify="center" isRow={true}>
              <Column marginTop="50px">
                <Spinner />
              </Column>
            </Row>
          )}
        </Column>
      </Row>
    </>
  );
};

export default FreeObjects;
