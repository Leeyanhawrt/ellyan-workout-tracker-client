import BackgroundVideo from "../components/BackgroundVideo";
import FeaturesList from "../components/FeatureList";
import TestimonialList from "../components/TestimonialList";
import paddling_video from "../assets/videos/ndrc-paddling.mp4";
import "../assets/stylesheets/pages/_p_home.scss";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation("", { keyPrefix: "pages.home" });

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
    </>
  );
};

export default HomePage;
