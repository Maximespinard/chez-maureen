import { useState } from 'react'
import { Check, ChevronDown, X } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface MultiSelectOption {
  label: string
  value: string
  color?: string // For badge colors
}

interface MultiSelectProps {
  disabled?: boolean
  emptyMessage?: string
  onChange: (selected: Array<string>) => void
  options: Array<MultiSelectOption>
  placeholder?: string
  selected: Array<string>
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = 'Sélectionner...',
  emptyMessage = 'Aucune option disponible',
  disabled = false,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter options based on search
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get selected options
  const selectedOptions = options.filter((opt) => selected.includes(opt.value))

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  const removeOption = (value: string) => {
    onChange(selected.filter((v) => v !== value))
  }

  const clearAll = () => {
    onChange([])
  }

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'focus-visible:ring-ring/50 flex h-9 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm transition-all outline-none focus-visible:ring-[3px]',
          disabled && 'cursor-not-allowed opacity-50',
          isOpen && 'ring-ring/50 ring-[3px]',
        )}
      >
        <div className="flex flex-1 flex-wrap gap-1.5">
          {selectedOptions.length === 0 ? (
            <span className="text-text-body">{placeholder}</span>
          ) : (
            selectedOptions.map((option) => (
              <span
                key={option.value}
                className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium"
                style={{
                  backgroundColor: option.color
                    ? `${option.color}15`
                    : '#f3f4f6',
                  color: option.color || '#374151',
                }}
              >
                {option.label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeOption(option.value)
                  }}
                  className="hover:opacity-70"
                >
                  <X className="size-3" />
                </button>
              </span>
            ))
          )}
        </div>
        <ChevronDown
          className={cn(
            'text-text-body ml-2 size-4 shrink-0 transition-transform',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Content */}
          <div className="border-border-subtle absolute z-50 mt-1 w-full rounded-md border bg-white shadow-lg">
            {/* Search Input */}
            <div className="border-border-subtle border-b p-2">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-gray-200 px-3 py-1.5 text-sm outline-none"
              />
            </div>

            {/* Options List */}
            <div className="max-h-60 overflow-auto p-1">
              {filteredOptions.length === 0 ? (
                <div className="text-text-body py-6 text-center text-sm">
                  {searchQuery ? 'Aucun résultat' : emptyMessage}
                </div>
              ) : (
                <>
                  {/* Select/Deselect All */}
                  {filteredOptions.length > 1 && (
                    <button
                      type="button"
                      onClick={clearAll}
                      className="hover:bg-surface-subtle text-text-dark mb-1 w-full rounded-md px-3 py-2 text-left text-sm"
                    >
                      Tout désélectionner
                    </button>
                  )}

                  {/* Options */}
                  {filteredOptions.map((option) => {
                    const isSelected = selected.includes(option.value)
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => toggleOption(option.value)}
                        className={cn(
                          'hover:bg-surface-subtle flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors',
                          isSelected && 'bg-surface-subtle',
                        )}
                      >
                        {/* Checkbox */}
                        <div
                          className={cn(
                            'flex size-4 shrink-0 items-center justify-center rounded border',
                            isSelected
                              ? 'border-primary bg-primary'
                              : 'border-gray-300',
                          )}
                        >
                          {isSelected && (
                            <Check className="size-3 text-white" />
                          )}
                        </div>

                        {/* Label with color indicator */}
                        <div className="flex flex-1 items-center gap-2">
                          {option.color && (
                            <div
                              className="size-3 shrink-0 rounded-full"
                              style={{ backgroundColor: option.color }}
                            />
                          )}
                          <span className="text-text-dark">{option.label}</span>
                        </div>
                      </button>
                    )
                  })}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
