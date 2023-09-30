import { Box, CircularProgress } from '@mui/material'
import React from 'react'

export function Loader({
    isShadow = true,
    message,
}: {
    isShadow?: boolean;
    message?: string;
}) {

    if (isShadow) {
        return (
            <Box sx={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100vh", zIndex: "9", background: "#000000bd" }} display="flex" justifyContent="center" alignItems="center" color="lightblue">
                <CircularProgress color='inherit' />
            </Box>
        )
    }

    return (
        <Box sx={{ width: "100%", height: "40vh", color: "#020079" }} display="flex" flexDirection="column" rowGap="3vw" justifyContent="center" alignItems="center" color="lightblue">
            <CircularProgress color='inherit' />
            {!!message && <div style={{ fontSize: "120%" }}>
                {message}
            </div>}
        </Box>
    )


}
