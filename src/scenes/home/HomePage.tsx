import BackgroundVideo from "../../components/BackgroundVideo";
import FeaturesList from "./FeatureList";
import Modal from "../../components/Modal";
import Register from "./Register";
import TestimonialList from "./TestimonialList";
import { useAuth, useAuthUpdate } from "../../contexts/AuthContext";
import { useModal } from "../../contexts/ModalContext";
import paddling_video from "/src/assets/videos/ndrc-paddling.mp4";
import "/src/assets/stylesheets/pages/_p_home.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const HomePage = () => {
  const { t } = useTranslation("", { keyPrefix: "pages.home" });
  const navigate = useNavigate();
  const authStatus = useAuth();
  const setAuth = useAuthUpdate();
  const { showRegisterModal, setRegisterModal } = useModal();

  const openRegisterModal = () => {
    if (authStatus) {
      navigate("/dashboard/workout_program");
      return;
    }
    setRegisterModal(true);
  };

  const closeRegisterModal = () => {
    setRegisterModal(false);
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
        <div className="app-features">
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
