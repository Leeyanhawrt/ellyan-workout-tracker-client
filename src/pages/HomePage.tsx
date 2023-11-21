import BackgroundVideo from "../components/BackgroundVideo";
import FeaturesList from "../components/FeatureList";
import Modal from "../components/Modal";
import Register from "../components/Register";
import TestimonialList from "../components/TestimonialList";
import { useAuthUpdate } from "../contexts/AuthContext";
import paddling_video from "../assets/videos/ndrc-paddling.mp4";
import "../assets/stylesheets/pages/_p_home.scss";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const HomePage = () => {
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const { t } = useTranslation("", { keyPrefix: "pages.home" });

  const setAuth = useAuthUpdate();

  const openRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const closeRegisterModal = () => {
    setShowRegisterModal(false);
  };

  return (
    <>
      <BackgroundVideo
        video={paddling_video}
        header={t("headerText")}
        subheader={t("subheaderText")}
        muted
        autoPlay
        loop
        flipAnimation
        cta_buttons
        openRegisterModal={openRegisterModal}
      />
      <section
        id="features-section"
        className="content-container u-margin-bottom-medium"
      >
        <div className="app-features u-margin-top-medium u-margin-bottom-medium">
          <h2>{t("appFeatures")}</h2>
          <p className="u-margin-top-tiny">{t("appFeatureP")}</p>
        </div>
        <FeaturesList />
      </section>
      <section id="testimonials-section">
        <div className="background-image"></div>
        <h2 className="u-center-text u-padding-top-medium u-margin-bottom-medium">
          {t("testimonialHeader")}
        </h2>
        <TestimonialList />
      </section>
      {showRegisterModal && (
        <Modal>
          <Register setAuth={setAuth} closeRegisterModal={closeRegisterModal} />
        </Modal>
      )}
    </>
  );
};

export default HomePage;
