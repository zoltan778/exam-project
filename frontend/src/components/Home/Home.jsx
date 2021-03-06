import "./Home.css";
import React, { useRef, useEffect } from "react";
import Items from "./../Items/Items";
import { connect } from "react-redux";

const Home = ({ loading, data }) => {
  const mainImgRef = useRef();
  const menuImgRef = useRef();
  const introductionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        let target;
        if (entry.target.className === "mainImage")
          target = entry.target.querySelector("img");
        else target = entry.target;

        if (entry.isIntersecting) {
          target.style.transform = "scale(1)";
        } else {
          target.style = "";
        }
      }
    });

    if (mainImgRef.current && menuImgRef.current && introductionRef.current) {
      observer.observe(mainImgRef.current);
      observer.observe(menuImgRef.current);
      observer.observe(introductionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loading]);

  return (
    <div className="Home">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mainContainer">
          <div
            className="head"
            style={{
              backgroundImage: 'url("head.jpg")',
              backgroundSize: "cover",
            }}
          >
            <img className="logo" src="logo.png" alt="" />

            <h1>Pizza Party Étterem</h1>
          </div>

          <div className="firstPart">
            <div className="mainImage" ref={mainImgRef}>
              <img src="mainImage.jpg" alt="" />
            </div>

            <p
              className="introduction"
              ref={introductionRef}
              style={{ transform: "scale(0)" }}
            >
              A Party Pizzériát 1997-ben nyitottuk, többé-kevésbé családi
              vállalkozás keretében. Elsősorban a lakosság "pizzaigényeit"
              szerettük volna kielégíteni, de a környékbeli falvakból és a
              közelebbi városokból is sikerült már törzsvendékeket szereznünk az
              elmult másfél évtizedben. Gazdaságadta lehetőségekhez, és Kedves
              Vendégeink pénztárcájához igazodva megpróbáltunk az árszínvonal
              arany középútján maradni, természetesen maximális minőség mellett.
              Minden erőnkből azon dolgozunk, hogy aki tőlünk távozik, jó
              érzéssel- véleménnyel, és nem utolsó sorben tele hassal tegye!
            </p>
          </div>

          <div className="secondPart">
            <img
              className="menuImage"
              ref={menuImgRef}
              style={{ transform: "scale(0)" }}
              src="menuImage.png"
              alt=""
            />

            <div className="pizzasAndToppings">
              <div className="pizzasContainer">
                <h2>Pizzák</h2>
                {data.pizza.length ? (
                  <Items items={data.pizza} itemType="pizza" />
                ) : (
                  <p className="warning"> No pizzas </p>
                )}
              </div>

              <div className="toppingsContainer">
                <h2>Feltétek</h2>
                {data.topping.length ? (
                  <Items items={data.topping} itemType="topping" />
                ) : (
                  <p className="warning"> No toppings </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.data.data,
  loading: state.data.loading,
});

export default connect(mapStateToProps)(Home);
