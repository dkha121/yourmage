import React from 'react'
import './style.scss'

const ImageGeneration = ({ randomImages }) => {
  

    return (
        <div className='image-generation'>
            <div className="chakra-tabs__tablist">
                <button type="button" className="chakra-tabs__tab active">Image Generation</button>
                <button type="button" className="chakra-tabs__tab" >Prompt Generation</button>
            </div>

            <div className='generation-image-main'>
                {randomImages.map((item, index) => (
                    <div className="chakra-aspect-ratio" key={index}>
                        <div className="chakra-card">
                            <div className="chakra-card__body">
                                <img src={item} alt="tmp" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ImageGeneration