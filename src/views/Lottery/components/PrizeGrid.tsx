import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { Heading, Text } from '@pancakeswap-libs/uikit'

export interface PrizeGridProps {
  lotteryNumber?: number
  totalPrize?: number
  pastDraw?: boolean
  matchCounts?: number[]
}

const Grid = styled.div<{ pastDraw?: boolean }>`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(${(props) => (props.pastDraw ? 3 : 2)}, 1fr);
  grid-template-rows: repeat(4, auto);
`

const RightAlignedText = styled(Text)`
  text-align: right;
`

const RightAlignedHeading = styled(Heading)`
  text-align: right;
`

const GridItem = styled.div<{ marginBottom?: string }>`
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '10px')};
`

const PastDrawGridItem = styled(GridItem)`
  transform: translate(-40%, 0%);
`

const PrizeGrid: React.FC<PrizeGridProps> = ({
  totalPrize = 0,
  pastDraw = false,
  matchCounts,
}) => {
  const sixMatchesAmount = +((totalPrize / 100) * 40).toFixed(2)
  const fiveMatchesAmount = +((totalPrize / 100) * 20).toFixed(2)
  const fourMatchesAmount = +((totalPrize / 100) * 10).toFixed(2)
  const threeMatchesAmount = +((totalPrize / 100) * 5).toFixed(2)
  const twoMatchesAmount = +((totalPrize / 100) * 3).toFixed(2)
  const oneMatchesAmount = +((totalPrize / 100) * 2).toFixed(2)
  const burnAmount = +((totalPrize / 100) * 19).toFixed(2)
  const TranslateString = useI18n()

  return (
    <Grid pastDraw={pastDraw}>
      <GridItem>
        <Text fontSize="14px" color="textSubtle">
          {TranslateString(999, 'No. Matched')}
        </Text>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedText fontSize="14px" color="textSubtle">
            {TranslateString(999, 'Winners')}
          </RightAlignedText>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedText fontSize="14px" color="textSubtle">
          {TranslateString(999, 'Prize Pot')}
        </RightAlignedText>
      </GridItem>
      {/* 6 matches row */}
      <GridItem>
        <Heading size="lg">6</Heading>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedHeading size="lg">{matchCounts[5]}</RightAlignedHeading>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedHeading size="lg">{sixMatchesAmount.toLocaleString()}</RightAlignedHeading>
      </GridItem>
      {/* 5 matches row */}
      <GridItem>
        <Heading size="md">5</Heading>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedHeading size="md">{matchCounts[4]}</RightAlignedHeading>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedHeading size="md">{fiveMatchesAmount.toLocaleString()}</RightAlignedHeading>
      </GridItem>
      {/* 4 matches row */}
      <GridItem>
        <Heading size="md">4</Heading>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedHeading size="md">{matchCounts[3]}</RightAlignedHeading>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedHeading size="md">{fourMatchesAmount.toLocaleString()}</RightAlignedHeading>
      </GridItem>
      {/* 3 matches row */}
      <GridItem>
        <Text bold>3</Text>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedText bold>{matchCounts[2]}</RightAlignedText>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedText>{threeMatchesAmount.toLocaleString()}</RightAlignedText>
      </GridItem>
      {/* 2 matches row */}
      <GridItem>
        <Text>2</Text>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedText>{matchCounts[1]}</RightAlignedText>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedText>{twoMatchesAmount.toLocaleString()}</RightAlignedText>
      </GridItem>
      {/* 1 matches row */}
      <GridItem marginBottom="20px">
        <Text>1</Text>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem marginBottom="20px">
          <RightAlignedText>{matchCounts[0]}</RightAlignedText>
        </PastDrawGridItem>
      )}
      <GridItem marginBottom="20px">
        <RightAlignedText>{oneMatchesAmount.toLocaleString()}</RightAlignedText>
      </GridItem>
      {/* Burn row */}
      <GridItem marginBottom="0">
        <Text>{TranslateString(999, `${pastDraw ? 'Burned' : 'To burn'}`)}:</Text>
      </GridItem>
      {pastDraw ? (
        <>
          <GridItem marginBottom="0" />
          <GridItem marginBottom="0">
            <RightAlignedText>{burnAmount.toLocaleString()}</RightAlignedText>
          </GridItem>
        </>
      ) : (
        <GridItem marginBottom="0">
          <RightAlignedText>{burnAmount.toLocaleString()}</RightAlignedText>
        </GridItem>
      )}
    </Grid>
  )
}

export default PrizeGrid
