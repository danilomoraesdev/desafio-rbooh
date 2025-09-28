import {
  Tooltip,
  IconButton as MuiIconButton,
  type IconButtonProps,
} from "@mui/material"

interface CustomIconButtonProps extends Omit<IconButtonProps, "title"> {
  title?: string
  icon: React.ReactNode
}

export function IconButton({
  title,
  icon,
  sx,
  ...props
}: CustomIconButtonProps) {
  const button = (
    <MuiIconButton
      size="small"
      sx={{
        padding: 1,
        "&:hover": {
          backgroundColor: `${props.color || "primary"}.main`,
          color: "white",
        },
        ...sx,
      }}
      {...props}
    >
      {icon}
    </MuiIconButton>
  )

  if (title) {
    return <Tooltip title={title}>{button}</Tooltip>
  }

  return button
}
