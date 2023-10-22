import React from 'react'
import Helmet from '../../components/shared/Helmet'
import './style.scss'
import HeaderIntroduction from '../../components/introduction/HeaderIntroduction'
import UseSection from '../../components/introduction/UseSection';
import ToolkitSection from '../../components/introduction/ToolkitSection';
import ModelSection from '../../components/introduction/ModelSection';
import FooterIntroduction from '../../components/introduction/FooterIntroduction';

const Introduction = () => {

  return (
    <Helmet>
      <div className='introduction-page'>
        <HeaderIntroduction />
        {/* <WelcomeSection /> */}
        <UseSection/>
        <ToolkitSection/>

        {/* rãnh thì bổ sung thêm */}
        {/* <ModelSection/> */}
        <FooterIntroduction/>
      </div>
    </Helmet>
  )
}

export default Introduction