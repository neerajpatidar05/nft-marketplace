import { React, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  styled,
  Typography,
} from '@mui/material'
import { ethers } from 'ethers'
import Grid from '@mui/material/Grid'
import { Link, useLocation, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  nftcontract,
  marketplaceContract,
  marketplaceaddress,
  nftcontractaddress,
} from 'web3config/web3config'
import FormControl from '@mui/material/FormControl'
import NativeSelect from '@mui/material/NativeSelect'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import {
  BorderAll,
  CenterFocusStrong,
  FormatUnderlined,
} from '@mui/icons-material'

const DatailsBody = styled(Box)(
  () => `
    margin: 3% 10%;
}
  `,
)
const ImagBody = styled(Box)(
  () => `
  
    display: flex;
    justify-content: flex-start;
}
  `,
)

const BackBtn = styled(Box)(
  () => `
   margin: 3% 10%;
    display: flex;
    justify-content: flex-start;
    cursor:pointer
   
}
  `,
)
function ListnftForSale() {
  const location = useLocation()
  const state = location.state
  console.log(state, 'stateeeeeeeeeeee')
  const tokenid = parseInt(location.state.names.id._hex)
  const [amount, setAmount] = useState('')
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(43200)
  const [saleType, setsaleType] = useState(1)
  const handleAmountChange = (event) => {
    setAmount(event.target.value)
  }
  const handleTimePeriodChange = (event) => {
    setSelectedTimePeriod(event.target.value)
  }
  const handleSaleTypeChange = (event) => {
    setsaleType(event.target.value)
    console.log(saleType, 'saletyperrrrrrrrrrrr')
  }
  function etherToWei(etherAmount) {
    const weiAmount = ethers.utils.parseEther(etherAmount.toString())
    return weiAmount
  }

  async function handlelistfosale() {
    const weiAmount = etherToWei(amount)
    const param = [tokenid, weiAmount, selectedTimePeriod, saleType]
    const approve = await nftcontract.approve(marketplaceaddress, tokenid)
    const createSale = await marketplaceContract.createSale(...param)
  }
  return (
    <>
      <div className="gamfi-breadcrumbs-section">
        <div className="container">
          <div className="apply-heading text-center">
            <h2 className="mb-0">Owned by : - </h2>
            <h3>
              <a href="/profile" color="black">
                You
              </a>
            </h3>
          </div>
        </div>
      </div>
      {console.log(saleType, 'saletypeeee')}
      <Link to="/profile">
        <BackBtn>
          <ArrowBackIcon /> Back
        </BackBtn>
      </Link>

      <DatailsBody>
        <Grid container spacing={2}>
          <Grid item xs={2} md={6}>
            <div>
              <ImagBody>
                <img src={state.names.uri} width="70%" />
              </ImagBody>
            </div>
          </Grid>
          <Grid item xs={10} md={6}>
            <Card sx={{ width: '100%' }}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>
                    Created by - You <b></b>
                  </div>
                  <div>
                    Current Price -<b> {amount} ETH</b>
                  </div>
                </Typography>

                <Typography style={{ color: 'black' }}>
                  NFT Name :-{state.names.nftname} <b></b>
                </Typography>

                <Typography>
                  <div>
                    <Grid item xs={4} sx={{ mt: 5 }}>
                      <Typography
                        variant="h5"
                        component="h5"
                        style={{ color: 'black' }}
                      >
                        Description :-
                      </Typography>
                    </Grid>
                    <Grid item xs={11}>
                      <p>{state.names.nftdescription}</p>
                    </Grid>
                  </div>
                </Typography>

                <Box>
                  <Typography
                    variant="h5"
                    component="h5"
                    style={{ color: 'black', marginBottom: 10 }}
                  >
                    Details : -
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={4}>
                        <span>Contract Address:</span>
                      </Grid>
                      <Grid item xs={6} md={8}>
                        <span>{nftcontractaddress}</span>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={4}>
                        <span>Token Standard:</span>
                      </Grid>
                      <Grid item xs={6} md={8}>
                        <span>ERC721</span>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={4}>
                        <span>Chain:</span>
                      </Grid>
                      <Grid item xs={6} md={8}>
                        <span>Etherium</span>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={4}>
                        <span>Token ID:</span>
                      </Grid>
                      <Grid item xs={6} md={8}>
                        <span>{tokenid}</span>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box sx={{ flexGrow: 1, border: '2px' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={4}>
                        <span>Sale Type:</span>
                      </Grid>
                      <Grid item xs={6} md={8}>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue={1}
                          name="radio-buttons-group"
                          onChange={handleSaleTypeChange}
                        >
                          <FormControlLabel
                            value={1}
                            control={<Radio />}
                            name="rediobutton"
                            label="DirectSale"
                          />
                          <FormControlLabel
                            value={0}
                            control={<Radio />}
                            name="rediobutton"
                            label="Auction"
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ flexGrow: 1, border: '2px' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={4}>
                        <span>Validity:</span>
                      </Grid>
                      <Grid item xs={6} md={8}>
                        <FormControl>
                          <NativeSelect
                            value={selectedTimePeriod}
                            onChange={handleTimePeriodChange}
                            inputProps={{
                              name: 'sale-type',
                              id: 'sale-type-select',
                            }}
                          >
                            <option value={43200}>12 Hours</option>
                            <option value={86400}>1 Day</option>
                            <option value={604800}>1 week</option>
                            <option value={2592000}>30 Days</option>
                          </NativeSelect>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Box sx={{ flexGrow: 1, border: '2px', marginTop: '2px' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={4}>
                      <span>Amount:</span>
                    </Grid>
                    <Grid item xs={6} md={8}>
                      <input
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
              <CardActions style={{display:'flex',justifyContent:"end"}}>
                <Box>
                  <Button
                    sx={{ background: '#0000FF' }}
                    variant="contained"
                    disabled={amount != 0 ? false : true}
                    onClick={handlelistfosale}
                  >
                    List for sale
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </DatailsBody>
    </>
  )
}

export default ListnftForSale
