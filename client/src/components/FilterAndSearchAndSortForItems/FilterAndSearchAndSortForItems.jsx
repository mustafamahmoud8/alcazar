"use client"
import { PrimaryTextField } from '@/MUIComponents/PrimaryTextField'
import { SearchRounded, FilterListRounded, TuneRounded, ClearRounded } from '@mui/icons-material'
import { Box, Chip, Divider, IconButton, InputAdornment, Tooltip, Typography } from '@mui/material'
import React, { useContext, useRef } from 'react'
import styles from "./FilterAndSearchAndSortForItems.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import { getItems } from '@/store/itemsSlice'
import { FilterAndSearchAndSortForItemsContext } from '@/context/FilterAndSearchAndSortForItemsContext'

const FilterAndSearchAndSortForItems = () => {
    const { search, sort, dimension, category, setSearch, setSort, setDimension, setCategory } = useContext(FilterAndSearchAndSortForItemsContext)
    const { categories } = useSelector((state) => state.categories)
    const { dimensions } = useSelector((state) => state.dimensions)
    const dispatch = useDispatch()
    const debounceRef = useRef(null)

    const handleSearch = (e) => {
        const value = e.target.value
        setSearch(value)
        // Debounce: wait 400ms before dispatching
        clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
            dispatch(getItems({ sort, category, dimension, search: value }))
        }, 400)
    }

    const handleClearSearch = () => {
        setSearch("")
        dispatch(getItems({ sort, category, dimension, search: "" }))
    }

    const handleSort = (e) => {
        setSort(e.target.value)
        dispatch(getItems({ search, category, dimension, sort: e.target.value }))
    }

    const handleCategory = (e) => {
        setCategory(e.target.value)
        dispatch(getItems({ search, category: e.target.value, dimension, sort }))
    }

    const handleDimension = (e) => {
        const val = e.target.value
        if (val === "-1") {
            setDimension("")
            dispatch(getItems({ search, dimension: "", category, sort }))
        } else {
            setDimension(dimensions[+val])
            dispatch(getItems({ search, dimension: dimensions[+val], category, sort }))
        }
    }

    const handleClearAll = () => {
        setSearch(""); setSort(""); setDimension(""); setCategory("")
        dispatch(getItems({}))
    }

    const hasFilters = search || sort || dimension || category

    return (
        <Box className={`grid jcs aic g20 ${styles.filter_and_search_and_sort}`}>

            {/* Search + Sort row */}
            <Box className={`grid jcsb aic g20 ${styles.search_and_sort}`}>
                <PrimaryTextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchRounded sx={{ color: (theme) => theme.palette.primary.main }} />
                            </InputAdornment>
                        ),
                        endAdornment: search ? (
                            <InputAdornment position="end">
                                <IconButton size="small" onClick={handleClearSearch}>
                                    <ClearRounded fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        ) : null,
                    }}
                    placeholder="Search for furniture..."
                    type="search"
                    variant="outlined"
                    fullWidth
                    id="search"
                    value={search}
                    name="search"
                    onInput={handleSearch}
                    size="small"
                />
                <PrimaryTextField
                    id="sort"
                    name="sort"
                    select
                    SelectProps={{ native: true }}
                    variant="outlined"
                    onChange={handleSort}
                    value={sort}
                    size="small"
                    sx={{ minWidth: 150 }}
                >
                    <option value="">Sort By</option>
                    <option value="title">Name (A-Z)</option>
                    <option value="-title">Name (Z-A)</option>
                    <option value="price">Price (Low → High)</option>
                    <option value="-price">Price (High → Low)</option>
                    <option value="-createdAt">Newest First</option>
                    <option value="createdAt">Oldest First</option>
                </PrimaryTextField>
            </Box>

            {/* Filter row */}
            <Box className={`flex jcs aic g15 flex_wrap`}>
                <Box className={`flex aic g10`}>
                    <TuneRounded sx={{ color: (theme) => theme.palette.primary.main }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, whiteSpace: "nowrap" }}>
                        Filter By:
                    </Typography>
                </Box>

                <PrimaryTextField
                    id="category"
                    name="category"
                    select
                    SelectProps={{ native: true }}
                    variant="outlined"
                    value={category}
                    onChange={handleCategory}
                    size="small"
                    sx={{ minWidth: 140 }}
                >
                    <option value="">All Categories</option>
                    {categories && categories.map((cat, i) => (
                        <option key={i} value={cat.title}>{cat.title}</option>
                    ))}
                </PrimaryTextField>

                <PrimaryTextField
                    id="dimensions"
                    name="dimensions"
                    select
                    SelectProps={{ native: true }}
                    variant="outlined"
                    onChange={handleDimension}
                    size="small"
                    sx={{ minWidth: 180 }}
                >
                    <option value="-1">All Dimensions</option>
                    {dimensions.map((dim, i) => (
                        <option key={i} value={i}>
                            L{dim.length} × W{dim.width} × H{dim.height}
                        </option>
                    ))}
                </PrimaryTextField>

                {hasFilters && (
                    <Tooltip title="Clear all filters">
                        <Chip
                            label="Clear All"
                            icon={<ClearRounded />}
                            onClick={handleClearAll}
                            variant="outlined"
                            color="primary"
                            size="small"
                            sx={{ cursor: "pointer", fontWeight: 600 }}
                        />
                    </Tooltip>
                )}
            </Box>

            {/* Active Filters Chips */}
            {hasFilters && (
                <Box className={`flex aic g10 flex_wrap`}>
                    <Typography variant="body2" sx={{ color: "#777", fontWeight: 500 }}>
                        Active:
                    </Typography>
                    {search && <Chip label={`Search: "${search}"`} onDelete={handleClearSearch} size="small" color="primary" variant="outlined" />}
                    {category && <Chip label={`Category: ${category}`} onDelete={() => { setCategory(""); dispatch(getItems({ search, dimension, sort, category: "" })) }} size="small" color="primary" variant="outlined" />}
                    {sort && <Chip label={`Sort: ${sort}`} onDelete={() => { setSort(""); dispatch(getItems({ search, dimension, category, sort: "" })) }} size="small" color="primary" variant="outlined" />}
                </Box>
            )}
        </Box>
    )
}

export default FilterAndSearchAndSortForItems

