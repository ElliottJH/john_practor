import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer'
import { SmallHeader as Header } from '../Header'
import { Markdown } from 'react-showdown'
import { HatsContext } from '../Context'
import ImageGallery from 'react-image-gallery'
import magnifier from '../Magnifier'

import "react-image-gallery/styles/css/image-gallery.css";
import { BaseImageUrl } from '../../../config.json'

const Product = ({ match: { path, params: { id } } }) => {
    const hat = useHat(id)

    const images = hat && hat.images.map((_, index) => {
        return {
            original: `${BaseImageUrl}1000/${_.path}`, thumbnail: `${BaseImageUrl}300/${_.path}`,
            originalClass: 'galleryImage'
        }
    })

    const imagesHaveLoaded = target => {
        magnifier(target, 2)
    }

    return (
        <section className='product-page'>
            <Header currentPageSlug={path} />
            {hat && <div className="body">
                <nav>
                    <Link to="/home">Home</Link>
                    <span>-</span>
                    <Link to="/collections">Collections</Link>
                    <span>-</span>
                    <Link to={`/collections/${hat.category}`}>{hat.category}</Link>
                </nav>
                <div className="image-container">
                    <ImageGallery
                        items={images}
                        showFullscreenButton={false}
                        lazyLoad={true}
                        showPlayButton={false}
                        showNav={true}
                        onImageLoad={event => imagesHaveLoaded(event.target)} />
                </div>
                <Markdown markdown={hat.description} />
                {hat.credit && <p className="credit"><b>Credit: </b>{hat.credit}</p>}
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