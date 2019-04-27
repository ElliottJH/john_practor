import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer'
import { SmallHeader as Header } from '../Header'
import { Markdown } from 'react-showdown'
import { HatsContext } from '../Context'
import ImageGallery from 'react-image-gallery';

import { BaseImageUrl } from '../../../config.json'

const Product = ({ match: { path, params: { id } } }) => {
    const hat = useHat(id)

    const images = hat && hat.images.map(_ => {
        return { original: `${BaseImageUrl}${_.path}`, thumbnail: `${BaseImageUrl}${_.path}` }
    })

    return (
        <section className='product-page'>
            <Header currentPageSlug={path} />
            {hat && <div className="body">
                <nav>
                    <Link to="/home">Home</Link>
                    <span className="fas fa-chevron-right"></span>
                    <Link to="/collection">Collection</Link>
                    <span className="fas fa-chevron-right"></span>
                    <Link to={`/collection/${hat.category}`}>{hat.category}</Link>
                </nav>
                <div className="image-container">
                    <ImageGallery items={images}
                        showFullscreenButton={false}
                        showPlayButton={false} />
                </div>
                <p className="price">£{hat.price}</p>
                <Markdown markdown={hat.description} />
                <p className="credit">{hat.credit}</p>
            </div>}
            <Footer />
        </section>
    )
}

function useHat(id) {
    const { getHat } = useContext(HatsContext)
    const [hat, setHat] = useState()

    const callContext = async () => {
        const response = await getHat(id)

        setHat(response)
    }

    useEffect(() => {
        callContext()
    })

    return hat
}

export default Product