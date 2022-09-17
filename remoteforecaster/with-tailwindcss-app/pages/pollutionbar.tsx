import { AxisBottom, AxisLeft } from '@visx/axis'
import React, { useMemo } from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { GradientTealBlue } from '@visx/gradient';
import { scaleBand, scaleLinear } from '@visx/scale';

export type BarsProps = {
  width: number;
  height: number;
  events?: boolean;
};

const margins = {
  left: 30,
}

interface PollutionValues {
  location: string;
  pollutionLevel: number;
}
let indoor = {location: "indoor", pollutionLevel: 10}
let outdoor = {location: "outdoor", pollutionLevel: 25}

const data = [indoor, outdoor];
const verticalMargin = 50;

// accessors
const getLocation = (d: PollutionValues) => d.location;
const getLevel = (d: PollutionValues) => Number(d.pollutionLevel);

export default function Chart({ width, height, events = false }: BarsProps) {
  // bounds
  const xMax = width - margins.left
  const yMax = height - verticalMargin

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map(getLocation),
        padding: 0.4,
      }),
    [xMax],
  )

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getLevel))],
      }),
    [yMax],
  )

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <GradientTealBlue id="teal" />
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <Group top={verticalMargin / 2} left={margins.left}>
        {data.map((d) => {
          const letter = getLocation(d)
          const barWidth = xScale.bandwidth()
          const barHeight = yMax - (yScale(getLevel(d)) ?? 0)
          const barX = xScale(letter)
          const barY = yMax - barHeight
          return (
            <Bar
              key={`bar-${letter}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(0, 0, 151, .5)"
              onClick={() => {
                if (events) alert(`clicked: ${JSON.stringify(Object.values(d))}`)
              }}
            />
          )
        })}
        <AxisBottom
          numTicks={data.length}
          top={yMax}
          scale={xScale}
          tickLabelProps={() => ({
            fill: '#ffeb3b',
            fontSize: 11,
            textAnchor: 'middle',
          })}
        />
        <AxisLeft
          scale={yScale.nice()}
          numTicks={10}
          top={0}
          tickLabelProps={(e) => ({
            fill: '#ffeb3b',
            fontSize: 10,
            textAnchor: 'end',
            x: -12,
            y: (yScale(e) ?? 0) + 3,
          })}
        />
      </Group>
    </svg>
  )
}