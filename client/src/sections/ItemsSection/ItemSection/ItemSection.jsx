"use client"
import React, { useEffect } from 'react'
import ItemImages from '@/components/ItemImages/ItemImages'
import { useParams, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getItem } from '@/store/itemSlice'
import { PrimaryBox } from '@/MUIComponents/PrimaryBox'
import { PrimaryContainer } from '@/MUIComponents/PrimaryContainer'
import styles from "./ItemSection.module.scss"
import ItemInfo from '@/components/ItemInfo/ItemInfo'
import { Box, Breadcrumbs, Link, Skeleton, Typography } from '@mui/material'
import { HomeRounded, ChevronRightRounded, StoreRounded } from '@mui/icons-material'

const ItemSection = () => {
    const { itemId } = useParams()
    const router = useRouter()
    const dispatch = useDispatch()
    const { item, isLoading } = useSelector((state) => state.item)

    useEffect(() => {
        dispatch(getItem({ item_id: itemId }))
    }, [dispatch, itemId])

    return (
        <PrimaryBox>
            <PrimaryContainer className={`grid jcs aifs g30`}>
                {/* Breadcrumb */}
                <Breadcrumbs
                    separator={<ChevronRightRounded fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', color: '#777' }}
                        onClick={() => router.push('/')}
                    >
                        <HomeRounded fontSize="small" /> Home
                    </Link>
                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', color: '#777' }}
                        onClick={() => router.push('/shop')}
                    >
                        <StoreRounded fontSize="small" /> Shop
                    </Link>
                    <Typography sx={{ color: (theme) => theme.palette.primary.main, fontWeight: 600 }}>
                        {isLoading ? <Skeleton width={120} /> : item?.title}
                    </Typography>
                </Breadcrumbs>

                {/* Loading State */}
                {isLoading ? (
                    <Box className={`grid jcs aifs g50 ${styles.item_section_box}`}>
                        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
                        <Box className="grid g20">
                            <Skeleton variant="text" width="70%" height={50} />
                            <Skeleton variant="text" width="40%" height={36} />
                            <Skeleton variant="text" width="100%" />
                            <Skeleton variant="text" width="100%" />
                            <Skeleton variant="text" width="80%" />
                            <Skeleton variant="rectangular" height={48} width="60%" sx={{ borderRadius: 2, mt: 2 }} />
                        </Box>
                    </Box>
                ) : item ? (
                    <Box className={`grid jcs aifs g50 ${styles.item_section_box}`}>
                        <ItemImages images={item.images} />
                        <ItemInfo data={item} />
                    </Box>
                ) : (
                    <Box className="flex jcc aic g20" sx={{ py: 10, textAlign: "center", width: "100%" }}>
                        <Typography variant="h4" sx={{ color: "#ccc" }}>Item not found</Typography>
                    </Box>
                )}
            </PrimaryContainer>
        </PrimaryBox>
    )
}

export default ItemSection

