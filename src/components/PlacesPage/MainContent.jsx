import React from "react";
import PlaceCard from "./PlaceCard";
import styles from "./MainContent.module.css";

const MainContent = () => {
  const places = [
    {
      name: "Las artes y las ciencias",
      location: "Valencia, España",
      category: "Puntos de interés, patrimonio histórico",
      rating: 4.5,
      reviews: 234,
      image:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/28f799131e98771ee7047663ef8aa526f5ed4c6a75e23a496b336b59bd7b5fa7?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    },
    {
      name: "Praça do Comércio",
      location: "Lisboa, Portugal",
      category: "Puntos de interés, patrimonio histórico",
      rating: 3.5,
      reviews: 234,
      image:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/5d46b6640234b5db1264721c71e8c7132e5e1600dea5889b26cc474f78c8e59e?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    },
    {
      name: "Gendarmenmarkt",
      location: "Berlín, Alemania",
      category: "Puntos de interés, patrimonio histórico",
      rating: 5,
      reviews: 234,
      image:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/be0e1328fadced1a7d874948df6547a1503035c56acff3e448435c7eda5dbdc7?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    },
    {
      name: "Castelo de Sao Jorge",
      location: "Lisboa, Portugal",
      category: "Puntos de interés, patrimonio histórico",
      rating: 3.2,
      reviews: 234,
      image:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/cfc663134fee90ba350b67e659973cbb55a4d6c256b8824d93be399059133a83?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    },
    {
      name: "Las casas rojas",
      location: "Ámsterdam, Países Bajos",
      category: "Puntos de interés, patrimonio histórico",
      rating: 4.2,
      reviews: 234,
      image:
        "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/8b3d76c167ce4b5f1b9d9d58d84c5f6f412c3afc4deddbef25feb1a2bd0b9700?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
    },
  ];

  return (
    <main className={styles.mainContent}>
      <div className={styles.header}>
        <h1 className={styles.title}>3.500 lugares disponibles</h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Busca tu destino"
            className={styles.searchInput}
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/4808b055d3ab7e8b8c5732886a2bcd458a3d73b876db256fdcf24eaeaced22de?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
            alt="Search"
            className={styles.searchIcon}
          />
        </div>
      </div>
      <div className={styles.filters}>
        <select className={styles.filterSelect}>
          <option>Selecciona un país</option>
        </select>
        <select className={styles.filterSelect}>
          <option>Selecciona un destino</option>
        </select>
        <select className={styles.filterSelect}>
          <option>Selecciona un orden</option>
        </select>
      </div>
      <div className={styles.loginBanner}>
        <div className={styles.loginBannerLeft}>
          <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/6736a24d7d0736b0250a7acc032c30914b57137164b9ebd63add28325fe87921?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
          alt="Login"
          className={styles.loginIcon}
          />
          <p className={styles.loginMessage}>
            Inicia sesión y empieza a organizar tu próxima aventura
          </p>
        </div>
        <button className={styles.loginButton}>Iniciar sesión</button>
      </div>
      <div className={styles.placesList}>
        {places.map((place, index) => (
          <PlaceCard key={index} place={place} />
        ))}
      </div>
      <button className={styles.showMoreButton}>Mostrar más</button>
      <div className={styles.recommendedPlaces}>
        <h2 className={styles.recommendedTitle}>
          Otras personas tambien han visto
        </h2>
        <div className={styles.recommendedList}>
          <div className={styles.recommendedItem}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/5938d0b4d4193a56f68ffb5518fec1a8326c7bcd870b04aeb66449ed43927fb9?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
              alt="Washington monument"
              className={styles.recommendedImage}
            />
            <p className={styles.recommendedName}>Washington monument</p>
          </div>
          <div className={styles.recommendedItem}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/1aec48f7f81b79e406dbb0201fa9f9891f7e9d5f9980b3ea4dc28f2d8976d585?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
              alt="Mercado central"
              className={styles.recommendedImage}
            />
            <p className={styles.recommendedName}>Mercado central</p>
          </div>
          <div className={styles.recommendedItem}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/feec33879aaca35113c8b86af0b809d0797b174ce644681dde9705fd23762df1?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
              alt="La sagrada familia"
              className={styles.recommendedImage}
            />
            <p className={styles.recommendedName}>La sagrada familia</p>
          </div>
        </div>
      </div>
      <div className={styles.promotionalBanner}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/74655b165160f8fd87012996cecf80d0d77ec4b9281b0c6c6de60b2eddc87f92?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
          alt="Discover Japan"
          className={styles.promotionalImage}
        />
        <div className={styles.promotionalContent}>
          <h2 className={styles.promotionalTitle}>Descubre Japón</h2>
          <p className={styles.promotionalText}>
            Explora la magia de Japón y déjate cautivar por su historia, su vida
            urbana y sus paisajes naturales. Desde la majestuosidad del Monte
            Fuji hasta la serenidad de los jardines zen, cada rincón de Japón te
            espera con una experiencia única
          </p>
          <button className={styles.exploreButton}>Explorar</button>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
