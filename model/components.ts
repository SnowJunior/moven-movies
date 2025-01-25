export interface Button {
  title: string
  onClick?: () => void
  disabled?: boolean
  isLoading?: boolean
  type: "submit" | "reset" | "button"
}