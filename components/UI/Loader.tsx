import { Box, CircularProgress } from '@mui/material'
import React from 'react'

export function Loader() {
    return (
        <Box sx={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100vh", zIndex: "9", background: "#000000bd" }} display="flex" justifyContent="center" alignItems="center" color="lightblue">
            <CircularProgress color='inherit' />
        </Box>
    )
}
