import React, { useState, useEffect } from "react";
import Loader from "../assets/loading.gif";
import { Link } from "react-router-dom";
import "../style/Movie.css";

const Movie = () => {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchItems = async () => {
    //일반적으로 fetch를 사용할 때는 두 단계를 거친다.
    //첫번째 단계는 요청 주소에서 객체 데이터를 받아오는 단계이고(data)
    //두번째 단계는 돌아온 객체 데이터를 json() 객체로 변환하는 단계이다(dataObj)
    //이 두 단계를 동시에 모두 진행시켜주는 모듈이 axios이다.
    const data = await fetch("https://yts.mx/api/v2/list_movies.json?limit=5");
    // console.log(data);
    const dataObj = await data.json();
    // console.log(dataObj);
    const movies = dataObj.data.movies;
    // console.log(movies);

    //받아온 결과를 반복문을 통해 태그 작성
    const movieContents = movies.map((movie) => (
      <div key={movie.id}>
        <div>
          <h2>
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
          </h2>
          <img src={movie.medium_cover_image} alt='' />
        </div>
      </div>
    ));
    setItems(movieContents);
    setLoading(false);
  };

  return (
    <div className='section movie'>
      {loading ? (
        <div className='loader'>
          <img src={Loader} className='loading_img' alt='' />
        </div>
      ) : (
        <div className='center'>{items}</div>
      )}
    </div>
  );
};

export default Movie;
