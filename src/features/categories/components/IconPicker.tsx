import type { CategoryIcon } from '@/schemas/category.schema'
import { ICON_MAP } from '@/lib/icon-map'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CATEGORY_ICON_OPTIONS } from '@/schemas/category.schema'

interface IconPickerProps {
  disabled?: boolean
  onChange: (icon: string) => void
  value?: string
}

export function IconPicker({ disabled, onChange, value }: IconPickerProps) {
  const IconComponent = value ? ICON_MAP[value as CategoryIcon] : null

  return (
    <Select disabled={disabled} value={value} onValueChange={onChange}>
      <SelectTrigger>
        <div className="flex items-center gap-2">
          {IconComponent && <IconComponent className="size-4" />}
          <SelectValue placeholder="Choisir une icône" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <div className="grid grid-cols-4 gap-2 p-2">
          {CATEGORY_ICON_OPTIONS.map((iconName) => {
            const Icon = ICON_MAP[iconName]
            return (
              <SelectItem key={iconName} value={iconName}>
                <div className="flex flex-col items-center gap-1">
                  <Icon className="size-5" />
                  <span className="text-xs">{iconName}</span>
                </div>
              </SelectItem>
            )
          })}
        </div>
      </SelectContent>
    </Select>
  )
}
