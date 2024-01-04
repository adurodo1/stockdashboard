import { useEffect, useRef, useState } from "react";
import styles from "./TimeSlider.module.css";
const TimeSlider = ({ slider1, slider2 }) => {
  //console.log("TimeSlider Rendered");
  const [displayValOne, setDisplayValOne] = useState(0);
  const [displayValTwo, setDisplayValTwo] = useState(25);
  const sliderOne = useRef();
  const sliderTwo = useRef();

  // const displayValOne = useRef();

  let minGap = 0;
  const sliderTrack = useRef();
  //let sliderMaxValue = document.getElementById("slider-1").max;
  function fillColor() {
    let max = sliderOne.current.max;

    let percent1 = (sliderOne.current.valueAsNumber / max) * 100; //max
    let percent2 = (sliderTwo.current.valueAsNumber / max) * 100;
    sliderTrack.current.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , rgb(54, 54, 54) ${percent1}% , rgb(54, 54, 54) ${percent2}%, #dadae5 ${percent2}%)`;
  }

  function slideOne(e) {
    if (
      parseInt(sliderTwo.current.valueAsNumber) -
        parseInt(sliderOne.current.valueAsNumber) <=
      minGap
    ) {
      sliderOne.current.valueAsNumber =
        parseInt(sliderTwo.current.valueAsNumber) - minGap;
    }

    setDisplayValOne(sliderOne.current.valueAsNumber);
    slider1.setSlider1value(() => sliderOne.current.valueAsNumber);
    fillColor();
  }
  function slideTwo() {
    if (
      parseInt(sliderTwo.current.valueAsNumber) -
        parseInt(sliderOne.current.valueAsNumber) <=
      minGap
    ) {
      sliderTwo.current.valueAsNumber =
        parseInt(sliderOne.current.valueAsNumber) + minGap;
    }

    setDisplayValTwo(sliderTwo.current.valueAsNumber);
    slider2.setSlider2value(() => sliderTwo.current.valueAsNumber);
    fillColor();
  }

  useEffect(() => {}, []);
  return (
    <>
      <div className={styles.values}>
        <span className={styles.earliest}> {displayValOne + 1999} </span>
        <span> {"--"}</span>
        <span className={styles.latest}> {displayValTwo + 1999} </span>
      </div>
      <div className={styles.slider_container}>
        <div className={styles.slider_track} ref={sliderTrack}></div>
        <input
          type="range"
          min={0}
          max={25}
          value={displayValOne}
          ref={sliderOne}
          onChange={slideOne}
        />
        <input
          type="range"
          min={0}
          max={25}
          value={displayValTwo}
          ref={sliderTwo}
          onInput={slideTwo}
        />
      </div>
    </>
  );
};

export default TimeSlider;
