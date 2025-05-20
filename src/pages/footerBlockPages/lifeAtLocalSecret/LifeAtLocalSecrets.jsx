"use client";
import React, { useState } from "react";
import styles from "./LifeAtLocalSecrets.module.css";
import HeroSection from "../../../components/footerBlockPages/lifeAtLocalSecret/HeroSection";
import WorkPhilosophySection from "../../../components/footerBlockPages/lifeAtLocalSecret/WorkPhilosophySection";
import BenefitsSection from "../../../components/footerBlockPages/lifeAtLocalSecret/BenefitsSection";
import FaqSection from "../../../components/footerBlockPages/lifeAtLocalSecret/FaqSection";
import Sidebar from "../../../components/footerBlockPages/common/Sidebar";
import Header from "../../../components/layouts/Header";
import Footer from "../../../components/layouts/Footer";

function LifeAtLocalSecrets() {
  return (
    <>
    <Header />
    <main className="page-center">
      <div className={styles.contentWrapper}>
        <div className={styles.topSection}>
          <Sidebar />
          <HeroSection />
        </div>

        <WorkPhilosophySection
          imageUrl="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/3a828e75aae7d6413b581f349f0ae00b3cf84ea2?placeholderIfAbsent=true"
          title="Trabajo por proyectos"
          description="El trabajo por proyectos es la creencia de que lo que hacemos determina dónde y cómo trabajamos. Algunas funciones se optimizan para el trabajo en la oficina, mientras que otras requieren menos colaboración cara a cara y, por lo tanto, se pueden realizar principalmente desde casa. De todos modos, todos los empleados de tiempo completo deben pasar al menos algo de tiempo en persona con su equipo."
          imageLeft={true}
          containerClassName={styles.sectionProjects}
        />

        <WorkPhilosophySection
          imageUrl="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/b13848e15dd1ae6cc23fc6eaa977313bef2d10a5?placeholderIfAbsent=true"
          title="Todos los viajeros son bienvenidos"
          description="Queremos que nuestros equipos reflejen la diversa comunidad de viajes global a la que servimos. Después de todo, diferentes perspectivas, experiencias y voces nos inspiran a pensar en grande, actuar con más valentía y recordarnos que estamos mejor juntos. Nuestros grupos de recursos para empleados brindan un espacio dedicado para organizarse en torno a identidades e intereses compartidos."
          imageLeft={false}
          containerClassName={styles.sectionTravelers}
        />

        <WorkPhilosophySection
          imageUrl="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/04abb9152241148c9d7dff53b38a569e6f87cead?placeholderIfAbsent=true"
          title="Trabajo basado en actividades"
          description="El trabajo basado en actividades (ABW) es la creencia de que lo que hacemos determina dónde y cómo trabajamos. Algunas funciones se optimizan para el trabajo en la oficina, mientras que otras requieren menos colaboración cara a cara y, por lo tanto, se pueden realizar principalmente desde casa. De todos modos, todos los empleados de tiempo completo deben pasar al menos algo de tiempo en persona con sus colegas."
          imageLeft={true}
          containerClassName={styles.sectionActivities}
        />
      </div>

      <BenefitsSection />
      <FaqSection />
    </main>
    <Footer />
    </>
  );
}

export default LifeAtLocalSecrets;
