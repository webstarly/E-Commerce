import React from 'react';
import CategoryList from '../Components/CategoryList';
import SlideBanner from '../Components/SlideBanner';
import ProductHorizontalCard from '../Components/PoductHorizontalCard';
import ProductVerticalCard from '../Components/ProductVerticalCard';



const Home = () => {
  return (
    <div className=''>
      <CategoryList />
      <SlideBanner/>

      <ProductHorizontalCard category={'airpods'} heading={'Best Ranking Products'}/>
      <ProductHorizontalCard category={'watches'} heading={'Awesome Deals'}/>

      <ProductVerticalCard category={"camera"} heading={"Camera"}/>
      <ProductVerticalCard category={"earphones"} heading={"Earphones"}/>
      <ProductVerticalCard category={"refrigerator"} heading={"Refrigerator"}/>
      <ProductVerticalCard category={"processor"} heading={"Processor"}/>
      <ProductVerticalCard category={"speaker"} heading={"Speaker"}/>
      <ProductVerticalCard category={"trimmers"} heading={"Trimmers"}/>
      <ProductVerticalCard category={"printers"} heading={"Printers"}/>
      <ProductVerticalCard category={"tv"} heading={"Tv"}/>
      <ProductVerticalCard category={"mouse"} heading={"Mouse"}/>
      <ProductVerticalCard category={"mobiles"} heading={"Mobiles"}/>


    </div>
  )
}

export default Home
