interface ButtonProps {
  style: string;
  handler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  name: string;
  disabled: boolean;
}

function Button({ style, handler, name, disabled = false }: ButtonProps) {
  return (
    <button
      onClick={handler}
      className={`${style}`}
      disabled={disabled}
    >
      {name}
    </button>
  );
}

export default Button;
