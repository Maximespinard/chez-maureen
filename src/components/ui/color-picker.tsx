import { cn } from '@/lib/utils'

interface ColorPickerProps {
  className?: string
  disabled?: boolean
  id?: string
  name?: string
  onBlur?: () => void
  onChange: (color: string) => void
  value: string
}

export function ColorPicker({
  className,
  disabled,
  id,
  name,
  onBlur,
  onChange,
  value,
}: ColorPickerProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="relative">
        <input
          className="size-12 cursor-pointer rounded-lg border-0 p-0 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={disabled}
          id={id}
          name={name}
          type="color"
          value={value}
          onBlur={onBlur}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <div className="flex-1">
        <input
          className="border-border-subtle focus:border-primeur-green focus:ring-primeur-green/20 w-full rounded-xl border bg-white px-4 py-3 font-mono text-sm uppercase transition-all duration-200 focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          disabled={disabled}
          placeholder="#000000"
          type="text"
          value={value.toUpperCase()}
          onBlur={onBlur}
          onChange={(e) => {
            const val = e.target.value
            if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
              onChange(val)
            }
          }}
        />
      </div>
      {/* Color preview swatch */}
      <div
        className="size-12 shrink-0 rounded-lg border shadow-sm"
        style={{ backgroundColor: value }}
      />
    </div>
  )
}
