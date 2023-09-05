import { Box } from '@mui/material'
import NftLists from 'components/nft/NftLists'
import React from 'react'

function NftList() {

  return (
    <div>
      <div className="gamfi-breadcrumbs-section">
          <div className="container">
            <div className="apply-heading text-center">
              <h2 className="mb-0">NFT Collections</h2>
            </div>
          </div>
        </div>
    
      <Box sx={{mt:10}}></Box>
        <NftLists/>
    </div>
  )
}

export default NftList