import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer
} from 'recharts'

type Props = {
  data?: {
    date: string
    value: number
  }[]
}

export const RadarVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer
      width='100%'
      height={350}
    >
      <RadarChart
        data={data}
        cx='50%'
        cy='50%'
        outerRadius='60%'
      >
        <PolarGrid />
        <PolarAngleAxis
          dataKey='date'
          style={{ fontSize: 12 }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 1000]}
          style={{ fontSize: 12 }}
        />
        <Radar
          dataKey='value'
          stroke='#3b82f6'
          fill='#3b82f6'
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
