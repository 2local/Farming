import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { BaseLayout, Card, CardFooter, Flex, Heading, Text } from '@pancakeswap-libs/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalClaim, useTotalRewards } from 'hooks/useTickets'
import { useCurrentTime } from 'hooks/useTimer'
import PastLotteryDataContext from 'contexts/PastLotteryDataContext'
import ExpandableSectionButton from 'components/ExpandableSectionButton/ExpandableSectionButton'
import YourPrizesCard from './components/YourPrizesCard'
import TicketCard from './components/TicketCard'
import TotalPrizesCard from './components/TotalPrizesCard'
import WinningNumbers from './components/WinningNumbers'
import PrizeGrid from './components/PrizeGrid'
import LotteryProgress from './components/LotteryProgress'
import { getNextLotteryDrawTime } from './helpers/CountdownHelpers'

const NextCard = styled(BaseLayout)`
  display: flex;
  width: 100%;
  align-items: start;
  margin-bottom: 10px;  
  flex-direction: row;
`

const Wrapper = styled(Flex)`
  flex-direction: column;
  background-image: url(/images/lottery/current.png);
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 32px;
  padding: 20px 100px;
  margin-bottom: 30px;

  ${({ theme }) => theme.mediaQueries.xs} {
    padding: 10px 20px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 10px 40px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 15px 60px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 15px 80px;
  }

`

const RowBetween = styled(Flex)`
  justify-content: space-between;
`

const DrawInfo = styled(Flex)`
  justify-content: space-between;
  background: #F7F8FB 0% 0% no-repeat padding-box;
  padding: 10px 20px;
  border-radius: 24px;
`

const Title = styled(Text)`
  font: normal normal normal 16px/30px Swis721 BT;
`

const Time = styled(Text)`
  font: normal normal bold 16px/30px Swis721 BT;
  letter-spacing: 0.4px;
  color: #1D2943;
`

const InfoArea = styled.div`
  margin-top: 20px;
  padding-bottom: 10px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border-radius: 24px;
`

const ExpandingWrapper = styled.div<{ showFooter: boolean }>`
  width: 80%;
  margin: 10px auto;
  display: ${(props) => (props.showFooter ? 'flex' : 'none')};
  height: ${(props) => (props.showFooter ? '100%' : '0px')};
`

const NextDrawPage: React.FC = () => {
  const [showFooter, setShowFooter] = useState(false)
  const { account } = useWallet()
  const { claimAmount } = useTotalClaim()
  const winnings = getBalanceNumber(claimAmount)
  const isAWin = winnings > 0
  const lotteryPrizeAmount = +getBalanceNumber(useTotalRewards()).toFixed(0)
  const { currentLotteryNumber } = useContext(PastLotteryDataContext)
  const currentMillis = useCurrentTime()
  const nextLotteryTime = getNextLotteryDrawTime(currentMillis, currentLotteryNumber)

  return (
    <Wrapper justifyContent="space-between">
      <RowBetween>
        <Title>Get your ticket now</Title>
        <LotteryProgress />
      </RowBetween>
      <InfoArea>
        <DrawInfo>
          <Heading size="md" mb="24px">Next Draw</Heading>
          <Time>{`#${currentLotteryNumber}`} | Draw {(new Date(nextLotteryTime)).toLocaleString()}</Time>
        </DrawInfo>
        <NextCard>
          <TotalPrizesCard />
          <TicketCard isSecondCard={isAWin} />
        </NextCard>
        <ExpandableSectionButton onClick={() => setShowFooter(!showFooter)} expanded={showFooter} />
        <ExpandingWrapper showFooter={showFooter}>
          <PrizeGrid totalPrize={lotteryPrizeAmount} />
        </ExpandingWrapper>
      </InfoArea>      
    </Wrapper>
  )
}

export default NextDrawPage
