import React from 'react'
import { Sun, Cloud } from 'lucide-react'

interface ControlPanelProps {
  sunlight: number
  water: number
  onSunlightChange: (value: number) => void
  onWaterChange: (value: number) => void
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  sunlight,
  water,
  onSunlightChange,
  onWaterChange,
}) => {
  return (
    <div className="mt-6 space-y-4">
      <div>
        <label htmlFor="sunlight" className="flex items-center mb-2 text-gray-700">
          <Sun className="w-6 h-6 mr-2 text-yellow-500" />
          Sunlight
        </label>
        <input
          type="range"
          id="sunlight"
          min="0"
          max="100"
          value={sunlight}
          onChange={(e) => onSunlightChange(Number(e.target.value))}
          className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      <div>
        <label htmlFor="water" className="flex items-center mb-2 text-gray-700">
          <Cloud className="w-6 h-6 mr-2 text-blue-500" />
          Water
        </label>
        <input
          type="range"
          id="water"
          min="0"
          max="100"
          value={water}
          onChange={(e) => onWaterChange(Number(e.target.value))}
          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  )
}

export default ControlPanel