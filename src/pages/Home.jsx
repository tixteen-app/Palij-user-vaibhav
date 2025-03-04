import React from 'react'
import HomeBanner from '../components/Home/banner/banner'
import Knowmore from '../components/Home/Knowmore'
import MainOurStory from '../components/Home/ourStory/MainOurStory'
import MainAllproductImages from '../components/Home/ourProductImages/mainAllproductImages'
import Uptodate from '../components/Home/uptoDate/uptodate'
import Footer from '../components/Footer/footer'
import Ourcollection from '../components/Home/ourCollection/Ourcollection'
import BesatSaller from '../components/Home/BestSaller/besatSaller'
import Voice from '../components/Home/Voices/Voice'

function Home() {
  return (
    <div>
        <HomeBanner/>
        
        <Knowmore/>
        <Ourcollection/>
        <MainOurStory/>
        <BesatSaller/>
        <MainAllproductImages/>
        <Voice/>
        <Uptodate/>
    </div>
  )
}

export default Home