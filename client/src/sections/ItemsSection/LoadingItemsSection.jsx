import LoadingItemBox from '@/components/ItemBox/LoadingItemBox'
import React from 'react'

const LoadingItemsSection = ({ editable }) => {
    return (
        new Array(8).fill(0).map((_, i) =>
            (<LoadingItemBox key={i} editable={editable} />)
        )
    )
}

export default LoadingItemsSection

