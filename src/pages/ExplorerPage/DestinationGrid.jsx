import React from "react";
import DestinationCard from "./DestinationCard";
import styles from "./DestinationGrid.module.css";

const destinations = [
  {
    name: "Milán",
    results: 120,
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/ee412b5ebcc0ba7b6617f22d3f137d2dd196fd93?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    name: "Ámsterdam",
    results: 210,
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/78369e60dd652f68b8e782407df3112cfde512d0?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    name: "Ibiza",
    results: 210,
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/0c4cf3941e490d554396ad35ca9316dca843d900?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    name: "Florencia",
    results: 163,
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/89cfde6c3299c2f62e890e7e6afe5a3d721bc417?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    name: "Berlín",
    results: 163,
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/b174caaec7e7939d81b486ea5aa1ab7ed682a7aa?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    name: "Mallorca",
    results: 120,
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/6819d7f0d2f7d35af67f32dc934b4a560fae3878?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    name: "Cerdeña",
    results: 120,
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/4a39d2ccc8a755ddd4434676a768e37f0afdda3d?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    name: "Lisboa",
    results: 120,
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/b376f7ded54388113f1cabd32a89cbe1990082c8?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    name: "Bucarest",
    results: 163,
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/74d03aaf1d79edafe8100e72b2c1f50ad1c0c722?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    name: "Malta",
    results: 120,
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/e207bd14ce1be5ba8c0535b7bccca67fb5b70c2d?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    name: "Bruselas",
    results: 120,
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/1592cde0e164d3a7d2f75207679c2f28595c7f3a?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    name: "Copenhague",
    results: 120,
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/2743ee795a42c2bf32d1106c0b3c3321d3a39dd2?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    name: "Albufeira",
    results: 163,
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/e9a53a04fc4e05ef2f0b15639bb6147900a60d53?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    name: "Angers",
    results: 120,
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/1525e4caf4086f6eaaa3e61c38fd97f8d2dd58e4?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    name: "Bilbao",
    results: 210,
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/c4ddbd7db9cc823c043f64882834126015d74c74?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    name: "Braga",
    results: 120,
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/7ddb9e43c88e49f0ff344aa9713f67f1b2e3083b?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    name: "Madrid",
    results: 163,
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/f91824bea9967094d456f0f96428785f0ce72e98?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    name: "Málaga",
    results: 210,
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/acac1140116d2a24f98ab5ee3a4bed62c4de9a7b?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    name: "Budapest",
    results: 210,
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/a3acd9c178d66ea1388992dacbc25526c31a1a4d?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
  {
    name: "Barcelona",
    results: 120,
    image:
      "https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/412a373ca115135fd2ed7a3d96aa8680bdd73c7a?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&",
  },
];

const DestinationGrid = () => {
  return (
    <div className={styles.destinationGrid}>
      {destinations.map((destination, index) => (
        <DestinationCard
          key={index}
          name={destination.name}
          results={destination.results}
          image={destination.image}
        />
      ))}
    </div>
  );
};

export default DestinationGrid;
